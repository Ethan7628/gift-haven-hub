import { Product } from "@/types/shop";
import { productImages } from "@/data/product-images";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useAuth } from "@/hooks/useAuth";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const addItem = useCartStore((s) => s.addItem);
  const { user } = useAuth();
  const { isWishlisted, toggleItem } = useWishlistStore();
  const navigate = useNavigate();
  const image = productImages[product.id] || "/placeholder.svg";
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save gifts to your wishlist.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    await toggleItem(user.id, product.id);
    toast({
      title: wishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: wishlisted
        ? `${product.name} removed from your wishlist.`
        : `${product.name} saved to your wishlist!`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-xl bg-card border border-border hover:shadow-xl transition-shadow duration-300">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden">
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          {product.badge && (
            <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
              {product.badge}
            </span>
          )}
        </Link>

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-card transition-colors"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? "fill-destructive text-destructive" : "text-muted-foreground"
            }`}
          />
        </button>

        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-display text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-body font-bold text-foreground">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <button
              onClick={() => addItem(product)}
              className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
