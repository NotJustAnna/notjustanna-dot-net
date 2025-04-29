import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge.tsx";
import type {Knowledge} from "@/components/main-page/lib/knowledge.ts";
import {knowledgebase} from "@/components/main-page/lib/knowledge.ts";
import {useMediaQuery} from "usehooks-ts";

const enhanceClasses: Record<string, string> = {
  "bigger-4": "p-0",
  "bigger-3": "p-0.25",
  "bigger-2": "p-0.5",
  "bigger-1": "p-0.75",
};

function Knowledge({ value }: { value: Knowledge }) {
  return <a href={value.link} className="flex flex-col items-center gap-1.5 text-center hover:scale-115 transition-transform duration-200 ease-in-out">
    <div className="size-12 bg-white rounded-2xl flex items-center">
      <img src={value.icon} alt={`${value.name} Icon`} className="p-2" />
    </div>
    <div className="text-xs font-semibold text-muted-foreground text-center text-balance">{value.name}</div>
  </a>;
}

function MinorKnowledge({ value }: { value: Knowledge }) {
  return <a href={value.link} className="flex items-center gap-2 hover:scale-115 transition-transform duration-200 ease-in-out">
    {(value.custom === "fullsize") ? <img src={value.icon} alt={`${value.name} Icon`} className="size-6 min-[360px]:size-8 rounded-lg" /> :
      <div className="size-6 min-[360px]:size-8 rounded-lg bg-white flex items-center">
        <img src={value.icon} alt={`${value.name} Icon`} className={enhanceClasses[value.custom || ""] || "p-1"} />
      </div>}
    <div className="text-xs font-semibold text-muted-foreground min-sm:w-16 text-balance flex-1 ">{value.name}</div>
  </a>;
}

function AWSCard() {
  const smallerText = useMediaQuery('(max-width: 370px)');
  return <Card className="gap-2.5">
    <CardHeader className="flex gap-3 items-center">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS Icon" className="max-sm:hidden size-12 bg-white rounded-xl p-1.5" />
      <div className="flex-1 space-y-1.5">
        <CardTitle>Amazon Web Services</CardTitle>
        <CardDescription>Major experience on cloud-first projects.</CardDescription>
      </div>
    </CardHeader>
    <CardContent className="space-y-1.5">
      <div className="grid grid-cols-2 gap-2">
        {knowledgebase.aws.spotlight.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
      </div>
      <Accordion type="single" collapsible className="-mb-4">
        <AccordionItem value="services">
          <AccordionTrigger>
            <span className="flex-1">{smallerText ? 'More:' : 'More services deployed:'}</span>
            <Badge>{knowledgebase.aws.others.length}</Badge>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2 z-100">
            {knowledgebase.aws.others.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>;
}

function DatabasesCard() {
  return <Card>
    <CardHeader className="space-y-1.5">
      <CardTitle>Databases</CardTitle>
      <CardDescription>From local to global, be it SQL or Not.</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-2 gap-2">
      {knowledgebase.databases.all.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
    </CardContent>
  </Card>;
}


function LanguagesCard() {
  return <Card>
    <CardHeader className="space-y-1.5">
      <CardTitle>Programming languages</CardTitle>
    </CardHeader>
    <CardContent className="space-y-1.5">
      <div className="grid grid-cols-2 gap-2">
        {knowledgebase.languages.spotlight.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
      </div>
      <Accordion type="single" collapsible className="-mb-4">
        <AccordionItem value="languages">
          <AccordionTrigger>
            <span className="flex-1">More:</span>
            <Badge>{knowledgebase.languages.others.length}</Badge>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2 z-100">
            {knowledgebase.languages.others.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>;
}

function BackendCard() {
  return <Card>
    <CardHeader className="space-y-1.5">
      <CardTitle>Back-end development</CardTitle>
    </CardHeader>
    <CardContent className="space-y-1.5">
      <div className="grid grid-cols-2 gap-2">
        {knowledgebase.backend.spotlight.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
      </div>
      <Accordion type="single" collapsible className="-mb-4">
        <AccordionItem value="backend">
          <AccordionTrigger>
            <span className="flex-1">More:</span>
            <Badge>{knowledgebase.backend.others.length}</Badge>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2 z-100">
            {knowledgebase.backend.others.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>;
}

function FrontendCard() {
  return <Card>
    <CardHeader className="space-y-1.5">
      <CardTitle>Front-end development</CardTitle>
    </CardHeader>
    <CardContent className="space-y-1.5">
      <div className="grid grid-cols-2 gap-2">
        {knowledgebase.frontend.spotlight.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
      </div>
      <Accordion type="single" collapsible className="-mb-4">
        <AccordionItem value="frontend">
          <AccordionTrigger>
            <span className="flex-1">More:</span>
            <Badge>{knowledgebase.frontend.others.length}</Badge>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2 z-100">
            {knowledgebase.frontend.others.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>;
}

function CollaborationCard() {
  return <Card>
    <CardHeader className="space-y-1.5">
      <CardTitle>Team collaboration</CardTitle>
      <CardDescription>Working with others is the only way to ship quality software.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-1.5">
      <div className="grid grid-cols-2 gap-2">
        {knowledgebase.collaboration.spotlight.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
      </div>
      <Accordion type="single" collapsible className="-mb-4">
        <AccordionItem value="collaboration">
          <AccordionTrigger>
            <span className="flex-1">More:</span>
            <Badge>{knowledgebase.collaboration.others.length}</Badge>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2 z-100">
            {knowledgebase.collaboration.others.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>;
}

function DeploymentCard() {
  return <Card>
    <CardHeader className="space-y-1.5">
      <CardTitle>Deployment tools</CardTitle>
    </CardHeader>
    <CardContent className="space-y-1.5">
      <div className="grid grid-cols-2 gap-2">
        {knowledgebase.deployment.spotlight.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
      </div>
      <Accordion type="single" collapsible className="-mb-4">
        <AccordionItem value="deployment">
          <AccordionTrigger>
            <span className="flex-1">More:</span>
            <Badge>{knowledgebase.deployment.others.length}</Badge>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2 z-100">
            {knowledgebase.deployment.others.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>;
}

function DevelopmentCard() {
  return <Card>
    <CardHeader className="space-y-1.5">
      <CardTitle>Development tools</CardTitle>
    </CardHeader>
    <CardContent className="space-y-1.5">
      <div className="grid grid-cols-2 gap-2">
        {knowledgebase.development.spotlight.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
      </div>
      <Accordion type="single" collapsible className="-mb-4">
        <AccordionItem value="development">
          <AccordionTrigger>
            <span className="flex-1">More:</span>
            <Badge>{knowledgebase.development.others.length}</Badge>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2 z-100">
            {knowledgebase.development.others.map((each) => <MinorKnowledge key={each.name} value={each}/>)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  </Card>;
}

function EmbeddedCard() {
  return <Card>
    <CardHeader className="space-y-1.5">
      <CardTitle>Embedded</CardTitle>
      <CardDescription>The small devices are often the most important ones.</CardDescription>
    </CardHeader>
    <CardContent className="grid grid-cols-2 gap-2">
      {knowledgebase.embedded.all.map((each) => <Knowledge key={each.name} value={each}/>)}
    </CardContent>
  </Card>;
}

export function KnowledgeSpotlight() {
  const hasArrows = useMediaQuery('(min-width: 640px)');
  return <div className="space-y-2">
    <div>
      <h2 className="text-xl font-semibold">I already worked with…</h2>
      <p>... at least <strong>{knowledgebase.count} different technologies</strong>, and counting. I love to learn and I’m always looking for new challenges.</p>
    </div>
    <Carousel className="max-lg:mx-auto min-sm:max-lg:w-[calc(100vw-150px)] lg:w-full" opts={{align: hasArrows ? "start" : "center"}}>
      <CarouselContent>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <BackendCard/>
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <FrontendCard/>
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <DevelopmentCard/>
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <LanguagesCard/>
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <EmbeddedCard/>
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <DeploymentCard/>
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <AWSCard/>
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <CollaborationCard/>
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <DatabasesCard/>
        </CarouselItem>
      </CarouselContent>
      {hasArrows && <><CarouselPrevious/><CarouselNext/></>}
    </Carousel>
  </div>;
}