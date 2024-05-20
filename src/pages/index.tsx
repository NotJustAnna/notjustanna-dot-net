import ProfileCard from "@/components/ProfileCard"
import WarpCard from "@/components/WarpCard";
import classed from "classed-components";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

const Container = classed.div`container mx-auto sm:mt-4`;

const Separator = classed.hr`
  border-t-2 border-linkedark-600 my-4 max-w-4xl mx-auto
  `;

export default function Home() {
  const searchParams = useSearchParams();
  const profile = searchParams.get('profile') === 'personal' ? 'personal' : 'work';

  return <>
    <Head>
        <title>NotJustAnna.net</title>
        <meta name="description" content="Hello, I'm Anna!" />
        <meta property="og:url" content="https://notjustanna.net"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="NotJustAnna.net"/>
        <meta property="og:description" content="Hello, I'm Anna!"/>
        <meta name="twitter:card" content="summary"/>
        <meta property="twitter:domain" content="notjustanna.net"/>
        <meta property="twitter:url" content="https://notjustanna.net"/>
        <meta name="twitter:title" content="NotJustAnna.net"/>
        <meta name="twitter:description" content="Hello, I'm Anna!"/>
      </Head>
      <Container>
        <ProfileCard profile={profile}/>
        <WarpCard/>
      </Container>
  </>;
}