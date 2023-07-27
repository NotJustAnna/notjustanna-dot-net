<script>
    import Container from "../../components/container.svelte";
</script>
<title>NotJustAnna.net - About</title>
<meta name="description" content="Hello, I'm Anna!
I am a full-stack developer, currently studying at Douglas College.
Here you can find what I have worked on, and what I am currently developing.">
<meta property="og:url" content="https://notjustanna.net">
<meta property="og:type" content="website">
<meta property="og:title" content="NotJustAnna.net - About">
<meta property="og:description" content="Hello, I'm Anna!
This is my about page.">
<meta name="twitter:card" content="summary">
<meta property="twitter:domain" content="notjustanna.net">
<meta property="twitter:url" content="https://notjustanna.net">
<meta name="twitter:title" content="NotJustAnna.net - About">
<meta name="twitter:description" content="Hello, I'm Anna!
This is my about page.">
<Container>
    <h1>Hello, I'm <span class="emphasis">Anna</span>!</h1>
    <div class="about">
        This is my <span class="emphasis">about page</span>.
    </div>
    <br>
    <h3>My journey so far</h3>
    <div class="about">
        I self-taught myself programming in 2013, mostly because of the modding community in videogames.
        I started with Lua and batch files, then good old jQuery-based JavaScript and PHP (with HTML and CSS) with some MySQL.
    </div>
    <div class="about">
        I started my Computer Science Technician degree in 2015 (which I finished in 2017), where I learned
        C, C# and Java, as well as JSP, Windows Forms and two flavors of SQL (Postgres and SQL Server).
        During this degree, I also self-taught myself C++, Groovy and Kotlin.
    </div>
    <div class="about">
        After that, I then started my Bachelor's degree in Computer Science in 2018, where I had a lot of reinforcement
        in everything I had learned before, as well as a newfound love for System Engineering and DevOps, as well as
        Compilers and Programming Languages. I never managed to finish this degree, due to the COVID-19 pandemic, as well
        as getting a job in the industry, where I strove to learn as much as I could, and apply my knowledge to real-world
        problems.
    </div>
    <div class="about">
        I worked from Dec 2020 to Jun 2023 in <a href="https://www.tokenlab.com.br/">Tokenlab</a>, where I applied as an
        intern, actually started as a Junior Software Developer, and climbed my way up to a Mid Software Developer.
        I worked with a lot of different technologies, such as AWS, Docker, AppSync, NestJS, GraphQL, Grails, Spring,
        Angular and TypeScript, just to name a few. I also developed a lot of soft skills, such as teamwork, communication,
        and both self-management and leadership. I delivered a lot of value to the company, and I'm very proud of my work there.
    </div>
    <div class="about">
        During my time there, I got to freelance a bit in the frontend side of things. I self-taught myself React,
        NextJS and Svelte, the latter of which I'm using to build this website. I developed some public and private
        websites for clients, and received a lot of praise for my work.
    </div>
    <div class="about">
        Lastly, the reason I left Tokenlab was to pursue the continuation of my degree and furthering my education.
        My desire to learn got me into a Computer Science degree Douglas College, in British Columbia, Canada.
    </div>
    <br>
    <h3>TL;DR</h3>
    <div class="about">
        Self-taught myself a lot of programming languages and technologies,
        which I reinforced in my degree and in the industry, where I worked for 3 years.
        I am now in pursuit of furthering my education, as well as my career.
    </div>
    <br>
    <h3>Tech Soup</h3>
    <div class="about">
        Below, you can find pretty much everything I've worked with, in no particular order.
        <br>
        Feel free to test my knowledge on any of these, I'm always up for a challenge.
    </div>
    <h4>Programming Languages</h4>
    <div class="about">
        JavaScript TypeScript Java<sup>(7 to modern)</sup> Kotlin Groovy Lua<sup>(5.1-5.2)</sup> C C# C++ SQL HTML CSS Sass
    </div>
    <h4>Frameworks and Libraries</h4>
    <div class="about">
        React NextJS Angular NestJS Grails SpringBoot Bootstrap Materialize MaterialUI Bulma CreateReactApp
    </div>
    <h4>Tools and Technologies</h4>
    <div class="about">
        AWS Docker Docker-Compose GraphQL Git GitHub GitLab Bitbucket Gradle<sup>(Groovy & Kotlin)</sup> NPM
        Yarn<sup>(1 & 2)</sup> Webpack RESTful JSP JSON WinForms VPS<sup>(Linux)</sup> PostgreSQL DNS HTTPS LetsEncrypt
        CloudFlare Redis ZeroMQ
    </div>
    <h4>AWS Services</h4>
    <div class="about">
        Lambda S3 CloudFront CloudFormation IAM Cognito AppSync APIGateway Route53 SES SQS SNS RDS Aurora CodeBuild
        CodePipeline
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

    .about {
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