import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge.tsx";
import type {Knowledge} from "@/components/about-page/lib/knowledge.ts";
import {knowledgebase} from "@/components/about-page/lib/knowledge.ts";
import {useMediaQuery} from "usehooks-ts";
import type {ReactNode} from "react";

const enhanceClasses: Record<string, string> = {
  "bigger-4": "p-0",
  "bigger-3": "p-0.25",
  "bigger-2": "p-0.5",
  "bigger-1": "p-0.75",
};

function KnowledgeItem({ value }: { value: Knowledge }) {
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

type KnowledgeCategoryCardProps = {
  title: string
  description?: string
  headerIcon?: ReactNode
  items: Knowledge[]
  moreItems?: Knowledge[]
  moreLabel?: string
  moreLabelWide?: string
  itemVariant?: "minor" | "full"
}

function KnowledgeCategoryCard({
  title,
  description,
  headerIcon,
  items,
  moreItems,
  moreLabel = "More:",
  moreLabelWide,
  itemVariant = "minor",
}: KnowledgeCategoryCardProps) {
  const isVerySmall = useMediaQuery('(max-width: 370px)', { initializeWithValue: false });
  const Item = itemVariant === "full" ? KnowledgeItem : MinorKnowledge;
  const expandLabel = moreLabelWide && !isVerySmall ? moreLabelWide : moreLabel;

  return (
    <Card className="gap-2.5">
      <CardHeader className={headerIcon ? "flex gap-3 items-center" : "space-y-1.5"}>
        {headerIcon}
        {headerIcon ? (
          <div className="flex-1 space-y-1.5">
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        ) : (
          <>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </>
        )}
      </CardHeader>
      <CardContent className={moreItems ? "space-y-1.5" : "grid grid-cols-2 gap-2"}>
        {moreItems ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              {items.map((each) => <Item key={each.name} value={each} />)}
            </div>
            <Accordion type="single" collapsible className="-mb-4">
              <AccordionItem value="more">
                <AccordionTrigger>
                  <span className="flex-1">{expandLabel}</span>
                  <Badge>{moreItems.length}</Badge>
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-2 gap-2 z-100">
                  {moreItems.map((each) => <Item key={each.name} value={each} />)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        ) : (
          items.map((each) => <Item key={each.name} value={each} />)
        )}
      </CardContent>
    </Card>
  );
}

export function KnowledgeSpotlight() {
  const hasArrows = useMediaQuery('(min-width: 640px)', { initializeWithValue: false });
  return <div className="space-y-2">
    <div>
      <h2 className="text-xl font-semibold">I already worked with…</h2>
      <p>... at least <strong>{knowledgebase.count} different technologies</strong>, and counting. I love to learn and I&apos;m always looking for new challenges.</p>
    </div>
    <Carousel className="max-sm:-mx-3 max-sm:w-screen max-lg:mx-auto min-sm:max-lg:w-[calc(100vw-150px)] lg:w-full" opts={{align: hasArrows ? "start" : "center"}}>
      <CarouselContent className="max-sm:ps-3">
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <KnowledgeCategoryCard title="Back-end development" items={knowledgebase.backend.spotlight} moreItems={knowledgebase.backend.others} />
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <KnowledgeCategoryCard title="Front-end development" items={knowledgebase.frontend.spotlight} moreItems={knowledgebase.frontend.others} />
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <KnowledgeCategoryCard title="Development tools" items={knowledgebase.development.spotlight} moreItems={knowledgebase.development.others} />
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <KnowledgeCategoryCard title="Programming languages" items={knowledgebase.languages.spotlight} moreItems={knowledgebase.languages.others} />
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <KnowledgeCategoryCard title="AI tools" description="Because AI augments human creativity." items={knowledgebase.ai.spotlight} moreItems={knowledgebase.ai.others} />
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <KnowledgeCategoryCard title="Deployment tools" items={knowledgebase.deployment.spotlight} moreItems={knowledgebase.deployment.others} />
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <KnowledgeCategoryCard
            title="Amazon Web Services"
            description="Major experience on cloud-first projects."
            headerIcon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS Icon" className="max-sm:hidden size-12 bg-white rounded-xl p-1.5" />}
            items={knowledgebase.aws.spotlight}
            moreItems={knowledgebase.aws.others}
            moreLabelWide="More services deployed:"
          />
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <KnowledgeCategoryCard title="Team collaboration" description="Working with others is the only way to ship quality software." items={knowledgebase.collaboration.spotlight} moreItems={knowledgebase.collaboration.others} />
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
          <KnowledgeCategoryCard title="Databases" description="From local to global, be it SQL or Not." items={knowledgebase.databases.all} />
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3 max-sm:pe-3">
          <KnowledgeCategoryCard title="Embedded" description="The small devices are often the most important ones." items={knowledgebase.embedded.all} itemVariant="full" />
        </CarouselItem>
      </CarouselContent>
      {hasArrows && <><CarouselPrevious/><CarouselNext/></>}
    </Carousel>
  </div>;
}
