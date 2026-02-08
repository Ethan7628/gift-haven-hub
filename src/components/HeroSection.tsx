import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
      <img
        src={heroBanner}
        alt="Beautiful gift boxes with gold ribbons"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="text-primary-foreground/80 font-body text-sm tracking-[0.2em] uppercase mb-4">
            Thoughtful Gifts, Beautifully Delivered
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
            Make Every Moment{" "}
            <span className="italic text-primary">Unforgettable</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-md font-body">
            Discover curated gifts for every occasion. From luxury hampers to personalized treasures.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-3.5 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Shop Now
            </Link>
            <Link
              to="/occasions"
              className="inline-flex items-center px-8 py-3.5 rounded-lg font-medium text-sm border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              Browse Occasions
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
