import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Cable} from "lucide-react";
import {useMediaQuery} from "usehooks-ts";

function NanoflakesCard() {
    return <Card className="gap-2.5">
        <CardHeader className="flex gap-3 items-center">
            <img src="https://avatars.githubusercontent.com/u/64380743?v=4" alt="Nanoflakes Icon" className="size-12 bg-white rounded-xl p-0.5" />
            <div className="flex-1 space-y-1.5">
                <CardTitle>Nanoflakes</CardTitle>
                <CardDescription>Unique IDs for small apps.</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="space-y-2">
            <p className="text-sm">
                "Nanoflakes" is a spec and libraries for unique identifiers which can be generated locally.
                It's designed to be simple and easy to implement, and it's compatible with Twitter's Snowflake algorithm.
            </p>
            <p className="text-sm">
                I developed the spec and libraries in Java, Kotlin and TypeScript.
            </p>
        </CardContent>
    </Card>;
}
function AuxCableCard() {
    return <Card className="gap-2.5">
        <CardHeader className="flex gap-3 items-center">
            <Cable className="size-12 bg-[#020618] text-white rounded-xl p-1.5"/>
            <div className="flex-1 space-y-1.5">
                <CardTitle>Aux Cable</CardTitle>
                <CardDescription>Discord Audio streaming made easy.</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="space-y-2">
            <p className="text-sm">
                Aux Cable is a Webview-based audio streaming application for Discord, using Discord API for Bots
                to stream audio from your computer to a Discord voice channel.
            </p>
            <p className="text-sm">
                The app was developed with Micronaut, Webview and JDA, using Java's native Sound API to capture audio.
            </p>
        </CardContent>
    </Card>;
}
function LinCard() {
    return <Card className="gap-2.5">
        <CardHeader className="flex gap-3 items-center">
            <img src="https://cdn.jsdelivr.net/gh/notjustanna/Lin@main/resources/logo.svg" alt="Lin Icon" className="size-12 bg-blue-200 rounded-xl p-0.5" />
            <div className="flex-1 space-y-1.5">
                <CardTitle>Lin, Tartar & LeanVM</CardTitle>
                <CardDescription>Lean, multiplatform programming language.</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="space-y-2">
            <p className="text-sm">
                Lin is a portable scripting language, based on Kotlin, JS and Lua. LeanVM is a step-by-step virtual machine
                for Lin. Tartar is a library for building pratt-style parsers, which Lin uses.
            </p>
            <p className="text-sm">
                All three projects are fully written in Kotlin Multiplatform, and are designed to be easy to use and extend
                in any platform.
            </p>
        </CardContent>
    </Card>;
}

function OSSCard() {
    return <Card className="gap-2.5">
        <CardHeader>
            <CardTitle>Open-Source Contributions</CardTitle>
            <CardDescription>RethinkDB, Nanojson, WebviewJava, JDA, Catnip</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <p className="text-sm">
                I am passionate about open-source software and contribute to various projects when I can.
            </p>
            <p className="text-sm">
                My contributions ranged from bug fixes, to significant improvements on existing features, to new features,
                and even complete rewrites of libraries.
            </p>
        </CardContent>
    </Card>;
}

export function ProjectSpotlight() {
    const hasArrows = useMediaQuery('(min-width: 640px)');

    return <div className="space-y-2">
        <h2 className="text-xl font-semibold">
            Projects I’m Proud
        </h2>
        <Carousel className="max-lg:mx-auto min-sm:max-lg:w-[calc(100vw-150px)] lg:w-full" opts={{align: hasArrows ? "start" : "center"}}>
            <CarouselContent>
                <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2">
                    <NanoflakesCard/>
                </CarouselItem>
                <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2">
                    <AuxCableCard/>
                </CarouselItem>
                <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2">
                    <LinCard/>
                </CarouselItem>
                <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2">
                    <OSSCard/>
                </CarouselItem>
            </CarouselContent>
            {hasArrows && <><CarouselPrevious/><CarouselNext/></>}
        </Carousel>
    </div>;
}