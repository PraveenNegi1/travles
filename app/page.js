import FormPage from "@/components/form";
import HomePage from "@/components/home";
import DiversityPage from "@/components/Regions";
import Cta from "@/components/Cta";


export default function Home() {
  return (
    <div> 
     <HomePage />
      {/* <FormPage/> */}
      <DiversityPage />
      <Cta />

    </div>
  );
}
