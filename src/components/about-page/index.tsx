import {Leading} from "@/components/about-page/leading.tsx";
import {WorkExperience} from "@/components/about-page/work-experience.tsx";
import {KnowledgeSpotlight} from "@/components/about-page/knowledge-spotlight.tsx";
import {ProjectSpotlight} from "@/components/about-page/project-spotlight.tsx";

export function MainPage() {
  return <>
    <Leading/>
    <div className="mt-16 md:mt-20 space-y-16 md:space-y-20">
      <WorkExperience/>
      <KnowledgeSpotlight/>
      <ProjectSpotlight/>
    </div>
  </>;
}
