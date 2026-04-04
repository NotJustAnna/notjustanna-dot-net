import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Cable} from "lucide-react";
import {useMediaQuery} from "usehooks-ts";
import type {ReactNode} from "react";

type ProjectCardProps = {
  icon?: ReactNode
  title: string
  description?: string
  children: ReactNode
}

function ProjectCard({ icon, title, description, children }: ProjectCardProps) {
  return <Card className="gap-2.5">
    <CardHeader className={icon ? "flex gap-3 items-center" : undefined}>
      {icon}
      {icon ? (
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
    <CardContent className="space-y-2">
      {children}
    </CardContent>
  </Card>;
}

export function ProjectSpotlight() {
  const hasArrows = useMediaQuery('(min-width: 640px)', { initializeWithValue: false });

  return <div className="space-y-2">
    <h2 className="text-xl font-semibold">
            Projects I&apos;m Proud
    </h2>
    <Carousel className="max-sm:-mx-3 max-sm:w-screen max-lg:mx-auto min-sm:max-lg:w-[calc(100vw-150px)] lg:w-full" opts={{align: hasArrows ? "start" : "center"}}>
      <CarouselContent className="max-sm:ps-3">
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2">
          <ProjectCard
            icon={<img src="https://avatars.githubusercontent.com/u/64380743?v=4" alt="Nanoflakes Icon" className="size-12 bg-white rounded-xl p-0.5" />}
            title="Nanoflakes"
            description="Unique IDs for small apps."
          >
            <p className="text-sm">
              &quot;Nanoflakes&quot; is a spec and libraries for unique identifiers which can be generated locally.
              It&apos;s designed to be simple and easy to implement, and it&apos;s compatible with Twitter&apos;s Snowflake algorithm.
            </p>
            <p className="text-sm">
              I developed the spec and libraries in Java, Kotlin and TypeScript.
            </p>
          </ProjectCard>
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2">
          <ProjectCard
            icon={<Cable className="size-12 bg-[#020618] text-white rounded-xl p-1.5"/>}
            title="Aux Cable"
            description="Discord Audio streaming made easy."
          >
            <p className="text-sm">
              Aux Cable is a Webview-based audio streaming application for Discord, using Discord API for Bots
              to stream audio from your computer to a Discord voice channel.
            </p>
            <p className="text-sm">
              The app was developed with Micronaut, Webview and JDA, using Java&apos;s native Sound API to capture audio.
            </p>
          </ProjectCard>
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2">
          <ProjectCard
            icon={<img src="https://cdn.jsdelivr.net/gh/notjustanna/Lin@main/resources/logo.svg" alt="Lin Icon" className="size-12 bg-blue-200 rounded-xl p-0.5" />}
            title="Lin, Tartar & LeanVM"
            description="Lean, multiplatform programming language."
          >
            <p className="text-sm">
              Lin is a portable scripting language, based on Kotlin, JS and Lua. LeanVM is a step-by-step virtual machine
              for Lin. Tartar is a library for building pratt-style parsers, which Lin uses.
            </p>
            <p className="text-sm">
              All three projects are fully written in Kotlin Multiplatform, and are designed to be easy to use and extend
              in any platform.
            </p>
          </ProjectCard>
        </CarouselItem>
        <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 max-sm:pe-3">
          <ProjectCard
            title="Open-Source Contributions"
            description="RethinkDB, Nanojson, WebviewJava, JDA, Catnip"
          >
            <p className="text-sm">
              I am passionate about open-source software and contribute to various projects when I can.
            </p>
            <p className="text-sm">
              My contributions ranged from bug fixes, to significant improvements on existing features, to new features,
              and even complete rewrites of libraries.
            </p>
          </ProjectCard>
        </CarouselItem>
      </CarouselContent>
      {hasArrows && <><CarouselPrevious/><CarouselNext/></>}
    </Carousel>
  </div>;
}
