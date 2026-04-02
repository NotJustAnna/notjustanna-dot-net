---
title: 'Infisical is Great, Actually'
description: "After looking at SOPS, Parameter Store, Vault: Infisical might be the homelabber's best friend."
pubDate: 'Mar 27 2026'
category: dev
heroImage: '../../assets/blog/infinite.jpg'
---
I run ArgoCD. Full GitOps — if it's not in the repo, it doesn't exist. That's great for everything except secrets, where "if it's in the repo, it might not exist for long either." GitHub secret scanning will catch an API key in a private repo, helpfully disable it, and send you a polite notification that you messed up. So I needed an ESO backend. Here's what I looked at.

## Shopping Around

I was already applying secrets manually via `kubectl` — which works fine until it doesn't, and doesn't scale past "just me doing everything." The plan was always to wire up External Secrets Operator; the question was just what it would point at.

**SOPS** came up first — a Claude recommendation. It encrypts secrets in-repo, which sounds elegant, but the decryption key has to live somewhere, and in practice that somewhere is the machine doing the decrypting. If that machine is compromised, the attacker gets the key, and the key opens everything. Security theater. My brain wanted something that felt like AWS Parameter Store — a place secrets live, accessed over an authenticated API, not a place they're hidden inside something else with the unhiding tool sitting right next to them.

The second AI-generated recommendation was **GitHub Actions Secrets**. Which, sure — except my IaC repo *has* GitHub Actions in it. Secrets that live inside the same system they're deploying feel like a liability waiting to happen. At this point it was clear I needed an actual secrets service, so I started shopping for an ESO backend.

**AWS Secrets Manager**, **AWS Parameter Store**, and **OCI Vault** were the clear, industry-standard options — the real products that do the job properly. But I'm running K3s on a free OCI ARM VM specifically because I want zero dependencies I can't walk away from. If OCI's free tier ever goes south, I want to pack up and leave — depending on OCI Vault would chain my secrets to the same cloud I'm trying to stay portable from. And pulling in AWS just for secrets would be adding a second cloud dependency for no reason.

I also stumbled upon **Doppler**, which I actually liked the look of. The DX is genuinely good, the CLI is pleasant, the UI is clean. Then I hit the pricing page: service accounts — the thing you need for any automated workflow — are a Team plan feature. $21/month per user. For just me. For secrets. No.

Then I found Infisical.

## What Infisical Is

Infisical is an open-source secrets manager with a managed cloud offering and a self-hostable option. The cloud tier is genuinely free for reasonable usage. It has a UI, a CLI, SDKs, and first-class Kubernetes support — either via its own operator or as an External Secrets Operator backend, which is what I ended up using.

## The Setup I Actually Use: ESO + Infisical Cloud

Rather than the Infisical operator, I went with [External Secrets Operator](https://external-secrets.io/) (ESO) using Infisical as the backend. ESO is a CNCF project with a clean abstraction: you define a `SecretStore` (or `ClusterSecretStore`) pointing at your secrets backend, then `ExternalSecret` resources that describe which secrets to sync and where. The output is always a standard Kubernetes `Secret`. Swap out the backend someday and your app manifests don't change.

### Installing ESO via ArgoCD

I manage everything with ArgoCD, so the ESO install is an Application pointing at the official release manifest:

```yaml
# applications/external-secrets/kustomization.yml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - https://github.com/external-secrets/external-secrets/releases/download/v2.2.0/external-secrets.yaml
  - cluster-secret-stores.yml
```

The ArgoCD Application itself:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: external-secrets
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "-1"
spec:
  project: default
  source:
    repoURL: https://github.com/notjustanna/iac.git
    targetRevision: main
    path: applications/external-secrets
  destination:
    server: https://kubernetes.default.svc
    namespace: external-secrets
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
```

The `sync-wave: "-1"` ensures ESO is fully deployed before anything tries to create `ExternalSecret` resources.

### Configuring the ClusterSecretStore

Create a machine identity in Infisical (Project → Access Control → Machine Identities), give it read access to your environment, then store the credentials:

```bash
kubectl create secret generic infisical-auth \
  --from-literal=clientId=<your-client-id> \
  --from-literal=clientSecret=<your-client-secret> \
  -n external-secrets
```

Then the `ClusterSecretStore`:

```yaml
# applications/external-secrets/cluster-secret-stores.yml
apiVersion: external-secrets.io/v1
kind: ClusterSecretStore
metadata:
  name: infisical
spec:
  provider:
    infisical:
      auth:
        universalAuthCredentials:
          clientId:
            name: infisical-auth
            namespace: external-secrets
            key: clientId
          clientSecret:
            name: infisical-auth
            namespace: external-secrets
            key: clientSecret
      secretsScope:
        projectSlug: "your-project-slug"
        environmentSlug: "prod"
        secretsPath: "/"
        recursive: true
```

One `ClusterSecretStore` serves the whole cluster. Every namespace can reference it.

### Consuming Secrets: A Real Example

Here's how I pull in the Cloudflare API token for Traefik. In Infisical, the secret lives under `/traefik`. The `ExternalSecret` syncs everything under that path into a Kubernetes secret in the `traefik` namespace:

```yaml
# applications/traefik/external-secret.yml
apiVersion: external-secrets.io/v1
kind: ExternalSecret
metadata:
  name: cloudflare-api-token
  namespace: traefik
spec:
  secretStoreRef:
    name: infisical
    kind: ClusterSecretStore
  refreshInterval: 1m
  target:
    name: cloudflare-api-token
    creationPolicy: Owner
    template:
      type: Opaque
  dataFrom:
    - find:
        path: /traefik
```

Traefik just sees a Kubernetes secret. It has no idea Infisical exists. That's the whole point.

## The Part That Actually Sold Me

The ESO pattern means **application manifests don't change** when you change secret backends. Secrets are just Kubernetes secrets to everything downstream — no SDK, no sidecar, no secret-fetching logic in application code. Infisical lives entirely in the infra layer, which is where secrets management should live.

The path-based organization (`/traefik`, `/monitoring`, and so on) felt immediately familiar — it's the same mental model as AWS Parameter Store. That's not a coincidence; it's just the right way to organize secrets. The `recursive: true` on the `ClusterSecretStore` means `ExternalSecret` resources can scope as narrowly or broadly as makes sense per workload.

## Should You Use the Cloud or Self-Host?

The managed free tier covers up to 5 projects with unlimited secrets. For a homelab or small production workload, there's genuinely no reason to self-host unless you want to.

If you do want to self-host — the Helm chart is well-documented. Just be aware of the chicken-and-egg problem: if Infisical lives on the same cluster it's serving secrets to, it becomes a bootstrap dependency, and that gets messy fast. I wrote about this failure mode [in more detail here](link-to-chicken-and-egg-post). Infisical Cloud sidesteps it entirely, which is why I'm using it.

## Bottom Line

I stopped looking for a better option. Infisical + ESO hit the threshold of "this is clearly correct" — open source, free at the scale I need, Kubernetes-native without being invasive, and not locked to any cloud. The setup I showed above is the whole thing. If you're still managing secrets via committed files, manual `kubectl create secret` commands, or CI-only stores — this is the way out.

---

> Cover photo by [Sid Verma](https://unsplash.com/@sidverma) on [Unsplash](https://unsplash.com)