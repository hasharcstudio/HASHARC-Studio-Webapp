import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";

const Services = dynamic(() => import("@/components/sections/Services"), {
  loading: () => <div className="min-h-screen bg-black" />,
});
const Reviews = dynamic(() => import("@/components/sections/Reviews"), {
  loading: () => <div className="min-h-screen bg-black" />,
});
const ProductsCarousel = dynamic(() => import("@/components/sections/ProductsCarousel"), {
  loading: () => <div className="min-h-screen bg-black" />,
});
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"), {
  loading: () => <div className="min-h-[600px] bg-black" />,
});
const Process = dynamic(() => import("@/components/sections/Process"), {
  loading: () => <div className="min-h-[600px] bg-black" />,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <div className="min-h-[600px] bg-black" />,
});

export default function Home() {
  return (
    <main>
      
      <Hero />
      <Services />
      <ProductsCarousel />
      <Reviews />
      <WhyChooseUs />
      <Process />
      <Contact />
      
    </main>
  );
}
