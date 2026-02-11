import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "@/lib/format";
import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmed", icon: CheckCircle, color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Shipped", icon: Truck, color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "bg-red-100 text-red-800" },
};

const statusSteps = ["pending", "confirmed", "shipped", "delivered"];

const Orders = () => {
  const { user, loading: authLoading } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user,
  });

  if (!authLoading && !user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">My Orders</h1>

        {isLoading || authLoading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground font-body mb-6">You haven't placed any orders yet</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-3 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => {
              const config = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = config.icon;
              const currentStep = statusSteps.indexOf(order.status);
              const items = Array.isArray(order.items) ? order.items : [];

              return (
                <div key={order.id} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-xs text-muted-foreground font-body">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground font-body mt-1">
                        {new Date(order.created_at).toLocaleDateString("en-UG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`${config.color} border-0 gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {config.label}
                      </Badge>
                      <span className="font-display font-bold text-foreground">{formatPrice(order.total)}</span>
                    </div>
                  </div>

                  {/* Progress tracker */}
                  {order.status !== "cancelled" && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between">
                        {statusSteps.map((step, i) => {
                          const stepConf = statusConfig[step];
                          const StepIcon = stepConf.icon;
                          const isActive = i <= currentStep;
                          return (
                            <div key={step} className="flex-1 flex flex-col items-center relative">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                                  isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                }`}
                              >
                                <StepIcon className="w-4 h-4" />
                              </div>
                              <span className={`text-[10px] mt-1 font-body ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                                {stepConf.label}
                              </span>
                              {i < statusSteps.length - 1 && (
                                <div
                                  className={`absolute top-4 left-[calc(50%+16px)] right-[calc(-50%+16px)] h-0.5 ${
                                    i < currentStep ? "bg-primary" : "bg-muted"
                                  }`}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Items */}
                  <div className="space-y-2">
                    {items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 text-sm font-body">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                        )}
                        <span className="text-foreground flex-1">{item.name}</span>
                        <span className="text-muted-foreground">x{item.quantity}</span>
                        <span className="text-foreground font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
