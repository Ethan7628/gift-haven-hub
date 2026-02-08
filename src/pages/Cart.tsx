import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/cart-store";
import { useAuth } from "@/hooks/useAuth";
import { productImages } from "@/data/product-images";
import { formatPrice } from "@/lib/format";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in or create an account before checkout.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    toast({
      title: "Checkout coming soon",
      description: "Payment integration with Muno Pay is being set up.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground font-body mb-6">Your cart is empty</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-3 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const image = productImages[item.product.id] || "/placeholder.svg";
                return (
                  <div key={item.product.id} className="flex gap-4 p-4 bg-card border border-border rounded-xl">
                    <img src={image} alt={item.product.name} className="w-24 h-24 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-semibold text-foreground truncate">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{formatPrice(item.product.price)}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-border rounded-lg">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 text-muted-foreground hover:text-foreground">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-medium text-foreground">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 text-muted-foreground hover:text-foreground">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.product.id)} className="p-1.5 text-destructive hover:text-destructive/80">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-body font-bold text-sm text-foreground">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24">
              <h2 className="font-display text-lg font-bold text-foreground mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">{formatPrice(totalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-primary font-medium">Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between font-display font-bold text-foreground">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice())}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {user ? "Proceed to Checkout" : "Sign In to Checkout"}
              </button>
              <button onClick={clearCart} className="w-full mt-3 py-2 text-xs text-muted-foreground hover:text-destructive transition-colors">
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
