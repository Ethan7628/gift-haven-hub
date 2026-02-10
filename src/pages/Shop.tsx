import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts, useCategories, useOccasions } from "@/hooks/useProducts";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { X } from "lucide-react";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const occasionFilter = searchParams.get("occasion");

  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const { data: occasions = [] } = useOccasions();

  const filtered = useMemo(() => {
    let result = products;
    if (categoryFilter) result = result.filter((p) => p.category === categoryFilter);
    if (occasionFilter) result = result.filter((p) => p.occasion.includes(occasionFilter));
    return result;
  }, [products, categoryFilter, occasionFilter]);

  const activeCategory = categories.find((c) => c.id === categoryFilter);
  const activeOccasion = occasions.find((o) => o.id === occasionFilter);
  const clearFilters = () => setSearchParams({});
  const hasFilters = categoryFilter || occasionFilter;

  return (
    <div className="min-h-screen bg-background">
      <Navbar showSearch />
      <main className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          {activeCategory ? activeCategory.name : activeOccasion ? `${activeOccasion.name} Gifts` : "All Gifts"}
        </h1>
        <p className="text-muted-foreground font-body mb-6">
          {activeCategory || activeOccasion ? `${filtered.length} ${filtered.length === 1 ? "gift" : "gifts"} found` : "Browse our complete collection of thoughtful gifts"}
        </p>

        <div className="flex items-center gap-2 flex-wrap mb-8">
          {hasFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              {activeCategory && (
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {activeCategory.icon} {activeCategory.name}
                  <button onClick={() => { const params = new URLSearchParams(searchParams); params.delete("category"); setSearchParams(params); }}><X className="w-3 h-3" /></button>
                </span>
              )}
              {activeOccasion && (
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {activeOccasion.emoji} {activeOccasion.name}
                  <button onClick={() => { const params = new URLSearchParams(searchParams); params.delete("occasion"); setSearchParams(params); }}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground underline">Clear all</button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => { const params = new URLSearchParams(searchParams); params.delete("category"); setSearchParams(params); }}
            className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${!categoryFilter ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/30"}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { const params = new URLSearchParams(searchParams); params.set("category", cat.id); setSearchParams(params); }}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${categoryFilter === cat.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/30"}`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body mb-4">No gifts found matching your criteria.</p>
            <button onClick={clearFilters} className="text-primary hover:underline text-sm font-medium">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
