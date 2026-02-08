import { useParams, Link } from "react-router-dom";
import { products } from "@/data/shop-data";
import { productImages } from "@/data/product-images";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart-store";
import { Star, ShoppingBag, ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Product not found</h1>
          <Link to="/shop" className="text-primary hover:underline text-sm">Back to shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const image = productImages[product.id] || "/placeholder.svg";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to shop
        </Link>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="rounded-xl overflow-hidden bg-card border border-border">
            <img src={image} alt={product.name} className="w-full aspect-square object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            {product.badge && (
              <span className="inline-block w-fit px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full mb-4">
                {product.badge}
              </span>
            )}
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-2xl font-bold text-foreground">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">{product.description}</p>

            {product.variants?.map((v) => (
              <div key={v.type} className="mb-6">
                <label className="text-sm font-medium text-foreground mb-2 block">{v.type}</label>
                <div className="flex flex-wrap gap-2">
                  {v.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedVariants((prev) => ({ ...prev, [v.type]: opt }))}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                        selectedVariants[v.type] === opt
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 text-muted-foreground hover:text-foreground">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-medium text-foreground">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 text-muted-foreground hover:text-foreground">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => addItem(product, qty, selectedVariants)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
