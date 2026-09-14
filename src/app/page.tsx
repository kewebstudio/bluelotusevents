import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Enquiry from "@/components/Enquiry";

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f8f6f1]">

      {/* HERO */}
      <section id="home">
        <Hero />
      </section>

      {/* ABOUT */}
      <section id="about">
        <About />
      </section>

      {/* SERVICES */}
      <section id="services">
        <Services />
      </section>

      {/* GALLERY */}
      <section id="gallery">
        <Gallery />
      </section>

      {/* ENQUIRY */}
      <section id="enquiry">
        <Enquiry />
      </section>

    </main>
  );
}