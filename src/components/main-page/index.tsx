import {Header} from "@/components/main-page/header.tsx";
import {Leading} from "@/components/main-page/leading.tsx";
import {WorkExperience} from "@/components/main-page/work-experience.tsx";
import {KnowledgeSpotlight} from "@/components/main-page/knowledge-spotlight.tsx";
import {ProjectSpotlight} from "@/components/main-page/project-spotlight.tsx";

// function InteractiveShowcase() {
//   return <div>
//     <h2 className="text-xl font-semibold">
//       This website is more than a portfolio!
//     </h2>
//     It’s also an interactive showcase!
//   </div>;
// }

export function MainPage() {
  return <>
    {/* Ambient Background */}
    <div className="fixed inset-0 -z-10 h-full w-full bg-background transition-colors duration-300">
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(120,119,198,0.25),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
    </div>
    
    <div className="relative max-[57.75rem]:mx-3 max-w-4xl min-[57.75rem]:mx-auto pt-6 pb-12 transition-all">
      <Header/>
      <Leading/>
      <div className="my-10 space-y-10">
        <WorkExperience/>
        <KnowledgeSpotlight/>
        <ProjectSpotlight/>
        {/*<InteractiveShowcase/>*/}
      </div>
    </div>
  </>;
}