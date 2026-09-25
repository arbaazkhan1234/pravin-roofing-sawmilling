import Nav from "@/components/Nav";
import { IntroAnimation } from "@/components/IntroAnimation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WarehouseZoom from "@/components/WarehouseZoom";
import ProductCategories from "@/components/ProductCategories";
import Gallery from "@/components/Gallery";
import WoodSpecies from "@/components/WoodSpecies";
import Process from "@/components/Process";
import Trust from "@/components/Trust";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <IntroAnimation />
        <Hero />
        <About />
        <WarehouseZoom />
        <ProductCategories />
        <Gallery />
        <WoodSpecies />
        <Process />
        <Trust />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
