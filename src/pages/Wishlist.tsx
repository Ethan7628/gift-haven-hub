import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/hooks/useAuth";
import { useWishlistStore } from "@/store/wishlist-store";
import { useProducts } from "@/hooks/useProducts";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Wishlist = () => {
  const { user, loading } = useAuth();
  const { items, fetchWishlist, loaded } = useWishlistStore();
  const { data: products = [] } = useProducts();

  useEffect(() => {
    if (user && !loaded) {
      fetchWishlist(user.id);
    }
  }, [user, loaded, fetchWishlist]);

  const wishlistProducts = products.filter((p) => items.includes(p.id));

  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-20 text-center">
          <Heart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">Your Wishlist</h1>
          <p className="text-muted-foreground font-body mb-6">Please sign in to view your wishlist</p>
          <Link to="/auth" className="inline-flex items-center px-8 py-3 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Sign In</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Your Wishlist</h1>
        <p className="text-muted-foreground font-body mb-10">{wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"} saved</p>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground font-body mb-6">Your wishlist is empty. Start browsing and save gifts you love!</p>
            <Link to="/shop" className="inline-flex items-center px-8 py-3 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Browse Gifts</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
