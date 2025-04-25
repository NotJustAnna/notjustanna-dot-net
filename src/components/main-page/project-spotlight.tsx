import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Cable} from "lucide-react";
import {useMediaQuery} from "usehooks-ts";

function NanoflakesCard() {
    return <Card className="gap-2.5">
        <CardHeader className="flex gap-3 items-center">
            <img src="https://avatars.githubusercontent.com/u/64380743?v=4" alt="Nanoflakes Icon" className="max-sm:hidden size-12 bg-primary rounded-xl p-0.5" />
            <div className="flex-1 space-y-1.5">
                <CardTitle>Nanoflakes</CardTitle>
                <CardDescription>Unique IDs for small apps.</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
    </Card>;
}
function AuxCableCard() {
    return <Card>
        <CardHeader className="flex gap-3 items-center">
            <Cable className="max-sm:hidden size-12 bg-[#020618] rounded-xl p-1.5"/>
            <div className="flex-1 space-y-1.5">
                <CardTitle>Aux Cable</CardTitle>
                <CardDescription>Discord Audio streaming made easy.</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
    </Card>;
}
function LinCard() {
    return <Card>
        <CardHeader className="flex gap-3 items-center">
            <img src="https://cdn.jsdelivr.net/gh/notjustanna/Lin@main/resources/logo.svg" alt="Lin Icon" className="max-sm:hidden size-12 bg-blue-200 rounded-xl p-0.5" />
            <div className="flex-1 space-y-1.5">
                <CardTitle>Lin, Tartar & LeanVM</CardTitle>
                <CardDescription>Lean, multiplatform programming language.</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
    </Card>;
}

function OSSCard() {
    return <Card>
        <CardHeader>
            <CardTitle>Open-Source Contributions</CardTitle>
            <CardDescription>RethinkDB, Nanojson, WebviewJava, JDA, Catnip</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
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
                <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
                    <NanoflakesCard/>
                </CarouselItem>
                <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
                    <AuxCableCard/>
                </CarouselItem>
                <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
                    <LinCard/>
                </CarouselItem>
                <CarouselItem className="basis-5/6 sm:basis-full md:basis-1/2 lg:basis-1/3">
                    <OSSCard/>
                </CarouselItem>
            </CarouselContent>
            {hasArrows && <><CarouselPrevious/><CarouselNext/></>}
        </Carousel>
    </div>;
}