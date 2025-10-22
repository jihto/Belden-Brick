import Image from "next/image"; 
import HeroSection from "@/features/home/HeroSection";
import TileProductSlider from "@/features/home/TileProductSlider";
import SolutionsTabs from "@/features/home/SolutionsTabs";
import NewsBlogSection from "@/features/home/NewsBlogSection";
import ProjectsSection from "@/features/home/ProjectsSection";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <TileProductSlider/>
      <SolutionsTabs/>
      <NewsBlogSection/>
      <ProjectsSection/>
    </>
  );
}
