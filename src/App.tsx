import {Header} from "@/components/main-page/header.tsx";
import {Leading} from "@/components/main-page/leading.tsx";
import {WorkExperience} from "@/components/main-page/work-experience.tsx";
import {KnowledgeSpotlight} from "@/components/main-page/knowledge-spotlight.tsx";
import {ProjectSpotlight} from "@/components/main-page/project-spotlight.tsx";
import {Footer} from "@/components/main-page/footer.tsx";

// function InteractiveShowcase() {
//   return <div>
//     <h2 className="text-xl font-semibold">
//       This website is more than a portfolio!
//     </h2>
//     It’s also an interactive showcase!
//   </div>;
// }

function Main() {
  return <div className="max-[57.75rem]:mx-3 max-w-4xl min-[57.75rem]:mx-auto">
    <Header/>
    <Leading/>
      <div className="my-6 space-y-6">
        <WorkExperience/>
        <KnowledgeSpotlight/>
        <ProjectSpotlight/>
        {/*<InteractiveShowcase/>*/}
      </div>
  </div>;
}

function App() {
  return <>
    <Main/>
    <Footer/>
  </>;
}

export default App
