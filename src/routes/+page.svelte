<script>
    import Container from "../components/container.svelte";
</script>
<title>NotJustAnna.net</title>
<meta name="description" content="Hello, I'm Anna!
I am a full-stack developer, currently studying at Douglas College.
Here you can find what I have worked on, and what I am currently developing.">
<meta property="og:url" content="https://notjustanna.net">
<meta property="og:type" content="website">
<meta property="og:title" content="NotJustAnna.net">
<meta property="og:description" content="Hello, I'm Anna!
I am a full-stack developer, currently studying at Douglas College.
Here you can find what I have worked on, and what I am currently developing.">
<meta name="twitter:card" content="summary">
<meta property="twitter:domain" content="notjustanna.net">
<meta property="twitter:url" content="https://notjustanna.net">
<meta name="twitter:title" content="NotJustAnna.net">
<meta name="twitter:description" content="Hello, I'm Anna!
I am a full-stack developer, currently studying at Douglas College.
Here you can find what I have worked on, and what I am currently developing.">
<Container>
    <h1>Hello, I'm <span class="emphasis">Anna</span>!</h1>
    <div class="introduction">
        I am a <span class="emphasis">full-stack developer</span>, currently
        studying at <span class="emphasis">Douglas College</span>.
    </div>
    <div class="introduction">
        Here you can find what I have worked on, and what I am currently developing.
    </div>
    <div class="introduction">
        If you wanna contact me or just learn more about me, you can check out my <a href="about">about page</a>.
    </div>
    <br>
    <h3>Language parsing and virtual machines</h3>
    <div class="introduction">
        I spent a good amount of time learning about programming language tokenizing and parsing, and
        how to build efficient bytecodes and virtual machines for them.
    </div>
    <div class="introduction">
        I have built a toy language called <a href="https://github.com/NotJustAnna/Lin">Lin</a> featuring its own
        <a href="https://github.com/NotJustAnna/lin-playground">barebones playground</a>. It is a dynamically typed
        and based on Kotlin's syntax.
    </div>
    <div class="introduction">
        To support the language, I have also built a <a href="https://github.com/NotJustAnna/tartar">lexical analysis
        and pratt-style parser library</a> in Kotlin with a DSL-like syntax, and a
        <a href="https://github.com/NotJustAnna/leanvm">somewhat generic bytecode virtual machine</a> also in Kotlin.
        Both projects heavily used Kotlin Multiplatform to support JVM, JS and Native targets.
    </div>
    <h3>Nanoflakes</h3>
    <div class="introduction">
        I currently maintain a <a href="https://github.com/nanoflakes">standard</a> based on Twitter's Snowflake ID
        specification, and reference implementations in <a href="https://github.com/nanoflakes/nanoflakes-js">TypeScript</a>,
        <a href="https://github.com/nanoflakes/nanoflakes-java">Java</a> and
        <a href="https://github.com/nanoflakes/nanoflakes-kotlin">Kotlin</a>.
    </div>
    <div class="introduction">
        Nanoflakes are 64-bit IDs that are sortable by time, and are guaranteed to be unique within a cluster of machines.
        They are 1:1 compatible with Twitter's Snowflake IDs, but offer a more simple worker ID system, and more
        flexibility in terms of the timestamp epoch.
    </div>
    <h3>Working with back-end</h3>
    <div class="introduction">
        I have worked with a few back-end frameworks, including Spring, Ktor, NestJS, Apollo Server, Express, Javalin,
        Spark, Micronaut, Grails, pretty much anything that is either JVM or JS based.
    </div>
    <div class="introduction">
        I worked a lot with AWS, going as far as building Serverless applications at work, and dealing with DynamoDB
        and Aurora. I lack a bit of experience with Kubernetes, but I can compensate with having quite a lot of
        experience with Docker.
    </div>
    <h3>Working with front-end</h3>
    <div class="introduction">
        My front-end experience is a bit less extravagant, but I have either worked, freelanced or experimented with
        Angular, React and now Svelte, which I am using to build this exact website.
    </div>
    <div class="introduction">
        I have built single-page applications, portfolio websites and even a back-office application, mostly from
        freelancing work.
    </div>
    <div class="fill"></div>
</Container>
<style>
    h1, h2 {
        font-weight: 400;
        margin-bottom: 2rem;
    }
    .emphasis {
        color: white;
    }
    h1 .emphasis {
        font-weight: bold;
    }

    .introduction {
        font-size: 1.3rem;
        margin-left: 2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .fill {
        margin-bottom: 10rem;
    }
    a, a:link {
        color: #bcd7ff;
        /*color: #8eb8ff;*/
    }
    a:hover {
        color: #8eb8ff;
    }
    a:visited {
        color: #8c88fc;
    }
    a:active {
        color: #3c81ff;
    }

</style>