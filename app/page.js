import Animation from "@/components/Animation";
import FormPage from "@/components/form";
import Hero from "@/components/Hero";
import DestinationPage from "./Destinations/page";
import HomePage from "@/components/home";
import DiversityPage from "@/components/Regions";
import Cta from "@/components/Cta";


export default function Home() {
  return (
    <div> 
     <HomePage />
      {/* <Hero />
      <Animation /> */}
      {/* <FormPage/> */}
      <DiversityPage />
      <Cta />

    </div>
  );
}
