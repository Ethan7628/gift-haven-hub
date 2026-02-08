import { motion } from "framer-motion";
import { categories } from "@/data/shop-data";

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-warm-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground font-body">Find the perfect gift in our curated collections</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer bg-card rounded-xl p-6 text-center border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-3xl mb-3 block">{cat.icon}</span>
              <h3 className="font-display text-sm font-semibold text-foreground mb-1">{cat.name}</h3>
              <p className="text-xs text-muted-foreground">{cat.count} items</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
