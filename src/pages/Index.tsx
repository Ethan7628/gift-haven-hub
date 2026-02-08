import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import OccasionsSection from "@/components/OccasionsSection";
import TrustBanner from "@/components/TrustBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <OccasionsSection />
        <TrustBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
