import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { products, categories, occasions } from "@/data/shop-data";
import { productImages } from "@/data/product-images";
import { formatPrice } from "@/lib/format";
import { Package, Users, ShoppingBag, TrendingUp, Edit, Trash2, CalendarHeart, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  { label: "Total Products", value: products.length, icon: Package, color: "text-primary" },
  { label: "Categories", value: categories.length, icon: ShoppingBag, color: "text-primary" },
  { label: "Occasions", value: occasions.length, icon: CalendarHeart, color: "text-primary" },
  { label: "Customers", value: "2,500+", icon: Users, color: "text-primary" },
];

type Tab = "products" | "occasions";

const Admin = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("products");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">Access Denied</h1>
          <p className="text-muted-foreground font-body">You need admin privileges to access this page.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const comingSoon = () =>
    toast({
      title: "Coming soon",
      description: "Full database-backed management is being set up. Stay tuned!",
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
          Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <span className="text-xs text-muted-foreground font-body">{s.label}</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["products", "occasions"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "products" && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-foreground">Products</h2>
                <button
                  onClick={comingSoon}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                      <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                      <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                      <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Rating</th>
                      <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Badge</th>
                      <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      const image = productImages[product.id] || "/placeholder.svg";
                      return (
                        <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img src={image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                              <span className="text-sm font-medium text-foreground">{product.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground capitalize">{product.category}</td>
                          <td className="p-4 text-sm font-medium text-foreground">{formatPrice(product.price)}</td>
                          <td className="p-4 text-sm text-muted-foreground">{product.rating} ★</td>
                          <td className="p-4">
                            {product.badge && (
                              <span className="px-2 py-1 text-[10px] font-bold uppercase bg-primary/10 text-primary rounded-full">
                                {product.badge}
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={comingSoon} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={comingSoon} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Occasions Tab */}
          {activeTab === "occasions" && (
            <motion.div
              key="occasions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-foreground">Occasions</h2>
                <button
                  onClick={comingSoon}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-4 h-4" /> Add Occasion
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Emoji</th>
                      <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                      <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Gifts</th>
                      <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {occasions.map((occ) => {
                      const count = products.filter((p) => p.occasion.includes(occ.id)).length;
                      return (
                        <tr key={occ.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                          <td className="p-4 text-2xl">{occ.emoji}</td>
                          <td className="p-4 text-sm font-medium text-foreground">{occ.name}</td>
                          <td className="p-4 text-sm text-muted-foreground">{count} gifts</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={comingSoon} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={comingSoon} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
