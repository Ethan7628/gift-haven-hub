import { motion } from "framer-motion";
import { useOccasions } from "@/hooks/useProducts";
import { Link } from "react-router-dom";

const OccasionsSection = () => {
  const { data: occasions = [] } = useOccasions();

  return (
    <section className="py-20 bg-warm-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Shop by Occasion
          </h2>
          <p className="text-muted-foreground font-body">Never miss a moment to celebrate</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {occasions.map((occ, i) => (
            <motion.div
              key={occ.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/shop?occasion=${occ.id}`}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all font-body text-sm font-medium text-foreground"
              >
                <span className="text-lg">{occ.emoji}</span>
                {occ.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionsSection;
