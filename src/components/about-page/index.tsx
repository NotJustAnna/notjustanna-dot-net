import {Leading} from "@/components/about-page/leading.tsx";
import {WorkExperience} from "@/components/about-page/work-experience.tsx";
import {KnowledgeSpotlight} from "@/components/about-page/knowledge-spotlight.tsx";
import {ProjectSpotlight} from "@/components/about-page/project-spotlight.tsx";

export function MainPage() {
  return <>
    <Leading/>
    <div className="my-4 md:my-10 space-y-4 md:space-y-10">
      <WorkExperience/>
      <KnowledgeSpotlight/>
      <ProjectSpotlight/>
    </div>
  </>;
}
