import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import avanadeIcon from "@/assets/brands/avanade.png";
import tokenlabIcon from "@/assets/brands/tokenlab.png";
import {useMediaQuery} from "usehooks-ts";
import {Badge} from "@/components/ui/badge.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";

const freelanceImages = import.meta.glob("@/assets/freelance/*.jpg", {eager: true, import: 'default', query: '?url'});

function AvanadeTab() {
    return <Card className="gap-2.5">
        <CardHeader>
            <CardTitle className="flex gap-3 items-center">
                <Avatar>
                    <AvatarImage src={avanadeIcon}/>
                    <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <span className="text-lg">Avanade</span>
            </CardTitle>
            <CardDescription>Full-stack Developer · May 2024 - Mar 2025 (11 months)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <p>While at Avanade, I collaborated in many agile teams to deliver high-quality software solutions for
                clients.</p>
            <p>I worked on various front-end and back-end solutions, where I utilized my skills in Java/Spring,
                TypeScript/NextJS.</p>
            <p>My experience at Avanade has allowed me to grow as a developer and gain valuable insights on working with
                big corporate clients.</p>
        </CardContent>
    </Card>;
}

function FreelanceTab() {
    return <Card className="gap-2.5">
        <CardHeader>
            <CardTitle className="text-lg">
                Freelance Full-stack Developer
            </CardTitle>
            <CardDescription>Freelance · Jul 2023 - Mar 2024 (8 months)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
            <div className="space-y-2">
                <p>Developed landing pages and showcase websites for small businesses, with focus on affordable hosting
                    and easy upkeep.</p>
                <p>Deployed websites now receive 2.7k unique visitors monthly, with zero hosting costs.</p>
            </div>
            <div>
                <span
                    className="text-sm text-center text-muted-foreground mb-1 block">Showcase of completed projects</span>
                <div className="sm:grid sm:grid-cols-2 sm:gap-3 max-sm:space-y-3 max-sm:mx-auto max-sm:max-w-sm">
                    {Object.entries(freelanceImages).map(([key, value]) => <img key={key} src={value as string}
                                                                                alt={key}
                                                                                className="rounded-lg shadow"/>)}
                </div>
            </div>
        </CardContent>
    </Card>;
}

function TokenlabTab() {
    return <Card className="gap-2.5">
        <CardHeader>
            <CardTitle className="flex gap-3 items-center">
                <Avatar>
                    <AvatarImage src={tokenlabIcon}/>
                    <AvatarFallback>TL</AvatarFallback>
                </Avatar>
                <span className="text-lg">Tokenlab</span>
            </CardTitle>
            <CardDescription>Full-stack Developer · Nov 2020 - Jul 2023 (2 years 9 months)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <p>While at Tokenlab, I grew as a developer and learned to work with a variety of technologies,
                as well as to work in a team and deliver high-quality software solutions.</p>
            <p>I shined as a junior and mid developer with tons of technical knowledge and experience, being able to
                deliver high-quality software solutions in a timely manner.</p>
            <p>My knowledge and experience led me to focus on my development of soft skills, such as communication and
                teamwork.</p>
        </CardContent>
    </Card>;
}

export function WorkExperience() {
    // on 576px: replace Tabs with a simple Card.
    // const simpleCard = useMediaQuery('(max-width: 448px)');

    const orientation = useMediaQuery('(min-width: 640px)') ? 'vertical' : 'horizontal';
    return <div className="space-y-2">
        <h2 className="text-xl font-semibold flex items-center gap-3">Work Experience <Badge variant="secondary">4 years</Badge></h2>
        <Tabs defaultValue="avanade" orientation={orientation}>
            <TabsList>
                <TabsTrigger value="avanade">Avanade</TabsTrigger>
                <TabsTrigger value="freelance">Freelance</TabsTrigger>
                <TabsTrigger value="tokenlab">Tokenlab</TabsTrigger>
            </TabsList>
            <TabsContent value="avanade"><AvanadeTab/></TabsContent>
            <TabsContent value="freelance"><FreelanceTab/></TabsContent>
            <TabsContent value="tokenlab"><TokenlabTab/></TabsContent>
        </Tabs>
    </div>;
}