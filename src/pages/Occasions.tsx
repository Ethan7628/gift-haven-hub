import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useOccasions, useProducts } from "@/hooks/useProducts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Occasions = () => {
  const { data: occasions = [] } = useOccasions();
  const { data: products = [] } = useProducts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Shop by Occasion
          </h1>
          <p className="text-muted-foreground font-body text-lg">
            Never miss a moment to celebrate — find the perfect gift for every occasion
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasions.map((occ, i) => {
            const count = products.filter((p) => p.occasion.includes(occ.id)).length;
            return (
              <motion.div
                key={occ.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/shop?occasion=${occ.id}`}
                  className="block bg-card border border-border rounded-xl p-8 text-center hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-5xl mb-4 block">{occ.emoji}</span>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                    {occ.name}
                  </h2>
                  <p className="text-sm text-muted-foreground font-body">
                    {count} {count === 1 ? "gift" : "gifts"} available
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Occasions;
