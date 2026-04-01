import micronautLogo from "@/assets/brands/micronaut.png?url";
import helidonLogo from "@/assets/brands/helidon.png?url";
import rethinkDBLogo from "@/assets/brands/rethinkdb.png?url";
import typeormLogo from "@/assets/brands/typeorm.png?url";
import zoomLogo from "@/assets/brands/zoom.png?url";
import shadcnLogo from "@/assets/brands/shadcn.svg?url";
import teamsLogo from "@/assets/brands/msteams.svg?url";
import mattermostLogo from "@/assets/brands/mattermost.svg?url";
import ubuntuLogo from "@/assets/brands/ubuntu.svg?url";
import apiGatewayLogo from "@/assets/brands/aws/api-gateway.svg?url";
import auroraLogo from "@/assets/brands/aws/aurora.svg?url";
import cloudformationLogo from "@/assets/brands/aws/cloudformation.svg?url";
import cloudfrontLogo from "@/assets/brands/aws/cloudfront.svg?url";
import cloudwatchLogo from "@/assets/brands/aws/cloudwatch.svg?url";
import codebuildLogo from "@/assets/brands/aws/codebuild.svg?url";
import codepipelineLogo from "@/assets/brands/aws/codepipeline.svg?url";
import cognitoLogo from "@/assets/brands/aws/cognito.svg?url";
import correttoLogo from "@/assets/brands/aws/corretto.svg?url";
import dynamodbLogo from "@/assets/brands/aws/dynamodb.svg?url";
import ec2Logo from "@/assets/brands/aws/ec2.svg?url";
import ecrLogo from "@/assets/brands/aws/ecr.svg?url";
import ecsLogo from "@/assets/brands/aws/ecs.svg?url";
import iamLogo from "@/assets/brands/aws/iam.svg?url";
import lambdaLogo from "@/assets/brands/aws/lambda.svg?url";
import route53Logo from "@/assets/brands/aws/route53.svg?url";
import s3Logo from "@/assets/brands/aws/s3.svg?url";
import sesLogo from "@/assets/brands/aws/ses.svg?url";
import snsLogo from "@/assets/brands/aws/sns.svg?url";
import sqsLogo from "@/assets/brands/aws/sqs.svg?url";
import ssmLogo from "@/assets/brands/aws/ssm.svg?url";
import vpcLogo from "@/assets/brands/aws/vpc.svg?url";

export interface Knowledge {
  name: string;
  icon: string;
  link: string;
  custom?: string;
}


// const isIconFullSize = /RDS|DynamoDB|RethinkDB/;
// const needsEnhance = /MongoDB|Gather|Kotlin|NGINX|React|Bulma|Materialize|Bash|Jenkins/;


function k(name: string, icon: string, link: string, custom?: string): Knowledge {
  return { name, icon, link, custom };
}

const K = {
  aws: {
    apigateway: k("API Gateway", apiGatewayLogo, "https://aws.amazon.com/api-gateway", "fullsize"),
    aurora: k("RDS Aurora", auroraLogo, "https://aws.amazon.com/aurora", "fullsize"),
    cloudformation: k("Cloud Formation", cloudformationLogo, "https://aws.amazon.com/cloudformation", "fullsize"),
    cloudfront: k("CloudFront", cloudfrontLogo, "https://aws.amazon.com/cloudfront", "fullsize"),
    cloudwatch: k("CloudWatch", cloudwatchLogo, "https://aws.amazon.com/cloudwatch", "fullsize"),
    codebuild: k("CodeBuild", codebuildLogo, "https://aws.amazon.com/codebuild", "fullsize"),
    codepipeline: k("CodePipeline", codepipelineLogo, "https://aws.amazon.com/codepipeline", "fullsize"),
    cognito: k("Cognito", cognitoLogo, "https://aws.amazon.com/cognito", "fullsize"),
    corretto: k("Corretto", correttoLogo, "https://aws.amazon.com/corretto", "fullsize"),
    dynamodb: k("DynamoDB", dynamodbLogo, "https://aws.amazon.com/dynamodb", "fullsize"),
    ec2: k("EC2", ec2Logo, "https://aws.amazon.com/ec2", "fullsize"),
    ecr: k("ECR", ecrLogo, "https://aws.amazon.com/ecr", "fullsize"),
    ecs: k("ECS", ecsLogo, "https://aws.amazon.com/ecs", "fullsize"),
    iam: k("IAM", iamLogo, "https://aws.amazon.com/iam", "fullsize"),
    lambda: k("Lambda", lambdaLogo, "https://aws.amazon.com/lambda", "fullsize"),
    route53: k("Route 53", route53Logo, "https://aws.amazon.com/route53", "fullsize"),
    s3: k("S3", s3Logo, "https://aws.amazon.com/s3", "fullsize"),
    ses: k("SES", sesLogo, "https://aws.amazon.com/ses", "fullsize"),
    sns: k("SNS", snsLogo, "https://aws.amazon.com/sns", "fullsize"),
    sqs: k("SQS", sqsLogo, "https://aws.amazon.com/sqs", "fullsize"),
    ssm: k("Systems Manager", ssmLogo, "https://aws.amazon.com/systems-manager/", "fullsize"),
    vpc: k("VPC", vpcLogo, "https://aws.amazon.com/vpc", "fullsize"),
  },
  backend: {
    express: k("Express", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", "https://expressjs.com"),
    graphql: k("GraphQL", "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg", "https://graphql.org"),
    helidon: k("Helidon", helidonLogo, "https://helidon.io"),
    jdbi: k("JDBI", "https://cdn.jsdelivr.net/gh/jdbi/jdbi@refs/heads/master/docs/src/adoc/images/logo.svg", "https://jdbi.org", "bigger-1"),
    micronaut: k("Micronaut", micronautLogo, "https://www.micronaut.com/", "bigger-3"),
    nestjs: k("NestJS", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg", "https://nestjs.com/"),
    prisma: k("Prisma", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg", "https://www.prisma.io"),
    sequelize: k("Sequelize", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sequelize/sequelize-original.svg", "https://sequelize.org/", "bigger-2"),
    serverless: k("Serverless", "https://www.vectorlogo.zone/logos/serverless/serverless-icon.svg", "https://www.serverless.com/"),
    spring: k("Spring", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg", "https://spring.io/"),
    typeorm: k("TypeORM", typeormLogo, "https://typeorm.io"),
  },
  collab: {
    gworkspace: k("Google Workspaces", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg", "https://workspace.google.com"),
    bitbucket: k("Bitbucket", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bitbucket/bitbucket-original.svg", "https://bitbucket.org", "bigger-3"),
    bookstack: k("Bookstack", "https://cdn.jsdelivr.net/gh/BookStackApp/BookStack@development/public/icon.png", "https://www.bookstackapp.com", "bigger-2"),
    confluence: k("Confluence", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/confluence/confluence-original.svg", "https://www.atlassian.com/software/confluence"),
    gather: k("Gather", "https://avatars.githubusercontent.com/u/64757313?v=4", "https://gather.town", "bigger-4"),
    github: k("GitHub", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", "https://github.com"),
    gitlab: k("GitLab", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg", "https://gitlab.com"),
    jira: k("JIRA", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg", "https://www.atlassian.com/software/jira"),
    mattermost: k("Mattermost", mattermostLogo, "https://mattermost.com", "bigger-1"),
    teams: k("MS Teams", teamsLogo, "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software"),
    slack: k("Slack", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg", "https://slack.com"),
    trello: k("Trello", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-original.svg", "https://trello.com"),
    zoom: k("Zoom", zoomLogo, "https://zoom.us", "fullsize"),
  },
  db: {
    dynamodb: k("DynamoDB", dynamodbLogo, "https://aws.amazon.com/dynamodb", "fullsize"),
    mariadb: k("MariaDB", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg", "https://mariadb.org/"),
    mongodb: k("MongoDB", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", "https://www.mongodb.com/", "bigger-3"),
    mysql: k("MySQL", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", "https://www.mysql.com/"),
    postgres: k("Postgres", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", "https://www.postgresql.org"),
    rds_aurora: k("RDS Aurora", auroraLogo, "https://aws.amazon.com/aurora", "fullsize"),
    rethinkdb: k("RethinkDB", rethinkDBLogo, "https://rethinkdb.com", "fullsize"),
    sqlite: k("SQLite", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg", "https://www.sqlite.org/"),
  },
  deploy: {
    ansible: k("Ansible", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg", "https://www.ansible.com/"),
    teamcity: k("TeamCity", "https://upload.wikimedia.org/wikipedia/commons/2/29/TeamCity_Icon.svg", "https://www.jetbrains.com/teamcity/"),
    aws: k("AWS", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", "https://aws.amazon.com"),
    circleci: k("CircleCI", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/circleci/circleci-plain.svg", "https://circleci.com"),
    cloudflare: k("Cloudflare", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg", "https://www.cloudflare.com", "bigger-2"),
    debian: k("Debian", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/debian/debian-original.svg", "https://www.debian.org/"),
    jenkins: k("Jenkins", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg", "https://www.jenkins.io", "bigger-3"),
    kubernetes: k("Kubernetes", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg", "https://kubernetes.io/"),
    sonarqube: k("Sonarqube", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sonarqube/sonarqube-original.svg", "https://www.sonarqube.org/"),
    terraform: k("Terraform", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg", "https://www.terraform.io/"),
    traefik: k("Traefik", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/traefikproxy/traefikproxy-original.svg", "https://traefik.io/"),
    portainer: k("Portainer", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/portainer/portainer-original.svg", "https://www.portainer.io/", "bigger-2"),
    travisci: k("TravisCI", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/travis/travis-original.svg", "https://travis-ci.org", "bigger-2"),
    ubuntu: k("Ubuntu", ubuntuLogo, "https://ubuntu.com/", "fullsize"),
    ghactions: k("GitHub Actions", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", "https://actions.github.com"),
    k3s: k("K3s", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/k3s/k3s-original.svg", "https://k3s.io/"),
    oracle: k("Oracle Cloud", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg", "https://www.oracle.com/cloud/"),
  },
  dev: {
    bun: k("Bun", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bun/bun-original.svg", "https://bun.sh/", "bigger-2"),
    docker: k("Docker", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", "https://www.docker.com/", "bigger-4"),
    postman: k("Postman", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", "https://postman.com"),
    electron: k("Electron", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg", "https://www.electronjs.org"),
    figma: k("Figma", "https://www.vectorlogo.zone/logos/figma/figma-icon.svg", "https://www.figma.com/"),
    git: k("Git", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", "https://git-scm.com/", "bigger-1"),
    gradle: k("Gradle", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gradle/gradle-original.svg", "https://gradle.org", "bigger-1"),
    insomnia: k("Insomnia", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/insomnia/insomnia-original.svg", "https://insomnia.rest"),
    intellij: k("IntelliJ", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg", "https://www.jetbrains.com/idea/", "bigger-2"),
    linux: k("Linux", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", "https://www.linux.org/"),
    nginx: k("NGINX", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg", "https://www.nginx.com", "bigger-2"),
    nodeJs: k("NodeJS", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", "https://nodejs.org", "bigger-1"),
    npm: k("NPM", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg", "https://www.npmjs.com/", "bigger-2"),
    playwright: k("Playwright", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg", "https://playwright.dev", "bigger-4"),
    pnpm: k("PNPM", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pnpm/pnpm-original.svg", "https://pnpm.io/"),
    puppeteer: k("Puppeteer", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/puppeteer/puppeteer-original.svg", "https://github.com/puppeteer/puppeteer"),
    redis: k("Redis", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg", "https://redis.io", "bigger-1"),
    rxjs: k("RxJS", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rxjs/rxjs-original.svg", "https://rxjs.dev", "bigger-1"),
    ssh: k("SSH", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ssh/ssh-original-wordmark.svg", "https://www.ssh.com/ssh/"),
    vsCode: k("VS Code", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", "https://code.visualstudio.com/", "bigger-1"),
    wasm: k("WASM", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wasm/wasm-original.svg", "https://webassembly.org/"),
    webpack: k("Webpack", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg", "https://webpack.js.org"),
    webstorm: k("Webstorm", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webstorm/webstorm-original.svg", "https://www.jetbrains.com/webstorm/", "bigger-2"),
    yarn: k("Yarn", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/yarn/yarn-original.svg", "https://yarnpkg.com/"),
  },
  embedded: {
    arduino: k("Arduino", "https://www.vectorlogo.zone/logos/arduino/arduino-icon.svg", "https://www.arduino.cc/"),
    rpi: k("Raspberry Pi", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/raspberrypi/raspberrypi-original.svg", "https://www.raspberrypi.org/"),
  },
  frontend: {
    bulma: k("Bulma", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bulma/bulma-plain.svg", "https://bulma.io/", "bigger-2"),
    css3: k("CSS3", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", "https://www.w3schools.com/css/", "bigger-1"),
    html5: k("HTML5", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", "https://www.w3.org/html/", "bigger-1"),
    materialize: k("Materialize", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materializecss/materializecss-original.svg", "https://materializecss.com/", "bigger-4"),
    mui: k("MUI", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-plain.svg", "https://mui.com/material-ui/", "bigger-1"),
    nextjs: k("NextJS", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", "https://nextjs.org/"),
    react: k("React", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", "https://reactjs.org/", "bigger-4"),
    sass: k("Sass", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg", "https://sass-lang.com/", "bigger-2"),
    shadcn: k("Shadcn UI", shadcnLogo, "https://ui.shadcn.com/", "bigger-3"),
    tailwind: k("Tailwind", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", "https://tailwindcss.com/"),
    vite: k("Vite", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg", "https://vitejs.dev", "bigger-2"),
  },
  lang: {
    bash: k("Bash", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", "https://www.gnu.org/software/bash/", "bigger-3"),
    c: k("C", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", "https://en.wikipedia.org/wiki/C_(programming_language)", "bigger-2"),
    cpp: k("C++", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", "https://en.wikipedia.org/wiki/C%2B%2B", "bigger-2"),
    java: k("Java", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", "https://www.java.com", "bigger-2"),
    js: k("JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", "https://www.javascript.com/", "fullsize"),
    kt: k("Kotlin", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg", "https://kotlinlang.org", "bigger-4"),
    lua: k("Lua", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg", "https://www.lua.org/", "bigger-1"),
    pwsh: k("Powershell", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/powershell/powershell-original.svg", "https://learn.microsoft.com/en-us/powershell/", "bigger-2"),
    ts: k("TypeScript", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", "https://www.typescriptlang.org/", "fullsize"),
  },
  ai: {
    claudeCode: k("Claude Code", "https://cdn.jsdelivr.net/gh/NotJustAnna/extended-lobe-icons@main/packages/icons/claude/dark-colorbg-avatarfit.png", "https://claude.ai/code", "fullsize"),
    copilot: k("GitHub Copilot", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", "https://github.com/features/copilot"),
    cursor: k("Cursor", "https://www.cursor.com/favicon.ico", "https://www.cursor.com/", "fullsize"),
    ollama: k("Ollama", "https://cdn.jsdelivr.net/gh/NotJustAnna/extended-lobe-icons@main/packages/icons/ollama/light-bg-avatarfit.png", "https://ollama.com/", "fullsize"),
    antigravity: k("Antigravity", "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@latest/icons/googlegemini.svg", "https://gemini.google.com"),
    mcp: k("MCP", "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@latest/icons/modelcontextprotocol.svg", "https://modelcontextprotocol.io/"),
    qwen: k("Qwen", "https://cdn.jsdelivr.net/gh/NotJustAnna/extended-lobe-icons@main/packages/icons/qwen/dark-colorbg-avatarfit.png", "https://qwenlm.github.io/", "fullsize"),
    gemma: k("Gemma", "https://cdn.jsdelivr.net/gh/NotJustAnna/extended-lobe-icons@main/packages/icons/gemma/dark-colorbg-avatarfit.png", "https://ai.google.dev/gemma", "fullsize"),
    phi: k("Microsoft Phi", "https://cdn.jsdelivr.net/gh/NotJustAnna/extended-lobe-icons@main/packages/icons/copilot/light-color-bg-avatarfit.png", "https://azure.microsoft.com/en-us/products/phi", "fullsize"),
  }
};

export const knowledgebase = {
  aws: {
    spotlight: [
      K.aws.apigateway, K.aws.lambda,
      K.aws.cloudfront, K.aws.s3,
      K.aws.corretto, K.aws.route53,
    ],
    others: [
      K.aws.cloudformation, K.aws.cloudwatch,
      K.aws.codebuild, K.aws.codepipeline,
      K.aws.cognito, K.aws.dynamodb,
      K.aws.ec2, K.aws.ecr,
      K.aws.ecs, K.aws.iam,
      K.aws.aurora, K.aws.ses,
      K.aws.sns, K.aws.sqs,
      K.aws.ssm, K.aws.vpc,
    ],
  },
  backend: {
    spotlight: [
      K.backend.graphql, K.backend.micronaut,
      K.backend.serverless, K.backend.spring,
      K.backend.helidon, K.backend.prisma,
    ],
    others: [K.backend.express, K.backend.nestjs, K.backend.jdbi, K.backend.sequelize, K.backend.typeorm],
  },
  collaboration: {
    spotlight: [
      K.collab.gworkspace,
      K.collab.github,
      K.collab.jira,
      K.collab.confluence,
      K.collab.slack,
      K.collab.teams,
    ],
    others: [
      K.collab.bitbucket,
      K.collab.bookstack,
      K.collab.gather,
      K.collab.gitlab,
      K.collab.mattermost,
      K.collab.zoom,
      K.collab.trello,
    ]
  },
  databases: {
    all: [
      K.db.rds_aurora,
      K.db.dynamodb,
      K.db.mariadb,
      K.db.mongodb,
      K.db.mysql,
      K.db.postgres,
      K.db.rethinkdb,
      K.db.sqlite,
    ],
  },
  deployment: {
    spotlight: [
      K.deploy.aws,
      K.deploy.cloudflare,
      K.deploy.terraform,
      K.deploy.kubernetes,
      K.deploy.ghactions,
      K.deploy.ubuntu,
    ],
    others: [
      K.deploy.sonarqube,
      K.deploy.teamcity,
      K.deploy.traefik,
      K.deploy.jenkins,
      K.deploy.circleci,
      K.deploy.travisci,
      K.deploy.debian,
      K.deploy.portainer,
      K.deploy.ansible,
      K.deploy.k3s,
      K.deploy.oracle,
    ],
  },
  development: {
    spotlight: [
      K.dev.intellij, K.dev.webstorm,
      K.dev.vsCode, K.dev.nodeJs,
      K.dev.docker, K.dev.bun,
      K.dev.git, K.dev.linux,
    ],
    others: [
      K.dev.gradle,
      K.dev.yarn,
      K.dev.npm,
      K.dev.pnpm,
      K.dev.electron,
      K.dev.figma,
      K.dev.insomnia,
      K.dev.nginx,
      K.dev.playwright,
      K.dev.puppeteer,
      K.dev.redis,
      K.dev.rxjs,
      K.dev.ssh,
      K.dev.wasm,
      K.dev.webpack,
      K.dev.postman,
    ]
  },
  embedded: {
    all: [K.embedded.rpi, K.embedded.arduino],
  },
  frontend: {
    spotlight: [
      K.frontend.vite, K.frontend.tailwind,
      K.frontend.react, K.frontend.nextjs,
      K.frontend.shadcn, K.frontend.sass,
    ],
    others: [K.frontend.html5, K.frontend.css3, K.frontend.bulma, K.frontend.materialize, K.frontend.mui],
  },
  languages: {
    spotlight: [
      K.lang.java, K.lang.kt,
      K.lang.ts, K.lang.js,
      K.lang.c, K.lang.cpp,
    ],
    others: [K.lang.lua, K.lang.pwsh, K.lang.bash]
  },
  ai: {
    spotlight: [
      K.ai.claudeCode,
      K.ai.copilot,
      K.ai.cursor,
      K.ai.ollama,
      K.ai.antigravity,
      K.ai.mcp,
    ],
    others: [
      K.ai.qwen,
      K.ai.gemma,
      K.ai.phi,
    ],
  },
  count: 0,
};

knowledgebase.count = Object.values(knowledgebase).reduce((acc: number, it) => {
  return typeof it !== "object"
    ? acc
    : Object.values(it).reduce((subAcc, subIt) => subAcc + subIt.length, acc);
}, 0);
