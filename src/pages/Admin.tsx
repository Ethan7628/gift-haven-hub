import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useProducts, useCategories, useOccasions } from "@/hooks/useProducts";
import AdminStats from "@/components/admin/AdminStats";
import ProductsTab from "@/components/admin/ProductsTab";
import OccasionsTab from "@/components/admin/OccasionsTab";
import { AnimatePresence } from "framer-motion";

type Tab = "products" | "occasions";

const Admin = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const { data: products = [], isLoading: loadingProducts } = useProducts();
  const { data: categories = [] } = useCategories();
  const { data: occasions = [] } = useOccasions();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading || loadingProducts) {
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Admin Dashboard</h1>

        <AdminStats productCount={products.length} categoryCount={categories.length} occasionCount={occasions.length} />

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

        <AnimatePresence mode="wait">
          {activeTab === "products" && <ProductsTab products={products} categories={categories} occasions={occasions} />}
          {activeTab === "occasions" && <OccasionsTab occasions={occasions} products={products} />}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
