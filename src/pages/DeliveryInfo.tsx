import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, Clock, MapPin, Phone } from "lucide-react";

const deliveryZones = [
  { zone: "Kampala Central", time: "Same day", fee: "UGX 5,000" },
  { zone: "Greater Kampala", time: "1–2 business days", fee: "UGX 10,000" },
  { zone: "Wakiso, Entebbe, Mukono", time: "1–2 business days", fee: "UGX 12,000" },
  { zone: "Jinja, Mbarara, Gulu", time: "2–4 business days", fee: "UGX 20,000" },
  { zone: "Other regions", time: "3–5 business days", fee: "UGX 25,000" },
];

const DeliveryInfo = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Delivery Information</h1>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {[
          { icon: Truck, title: "Free Delivery", desc: "On orders above UGX 100,000 within Kampala" },
          { icon: Clock, title: "Same-Day Delivery", desc: "Order before 12 PM for same-day in Kampala Central" },
          { icon: MapPin, title: "Nationwide Coverage", desc: "We deliver across all regions of Uganda" },
          { icon: Phone, title: "Live Updates", desc: "Track your order status in real-time from your account" },
        ].map((item) => (
          <div key={item.title} className="bg-card border border-border rounded-xl p-5">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground font-body">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-xl font-bold text-foreground mb-4">Delivery Zones & Fees</h2>
      <div className="bg-card border border-border rounded-xl overflow-hidden mb-10">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-semibold text-foreground">Zone</th>
              <th className="text-left p-3 font-semibold text-foreground">Estimated Time</th>
              <th className="text-left p-3 font-semibold text-foreground">Fee</th>
            </tr>
          </thead>
          <tbody>
            {deliveryZones.map((z) => (
              <tr key={z.zone} className="border-b border-border last:border-0">
                <td className="p-3 text-foreground">{z.zone}</td>
                <td className="p-3 text-muted-foreground">{z.time}</td>
                <td className="p-3 text-foreground font-medium">{z.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display text-xl font-bold text-foreground mb-4">How It Works</h2>
      <div className="space-y-4 text-sm text-muted-foreground font-body leading-relaxed mb-6">
        <p><strong className="text-foreground">1. Place Your Order</strong> — Browse our shop, add items to your cart, and complete checkout.</p>
        <p><strong className="text-foreground">2. Order Confirmed</strong> — You'll receive an email/SMS confirmation with your order details.</p>
        <p><strong className="text-foreground">3. We Prepare & Ship</strong> — Our team carefully packages your gift and dispatches it.</p>
        <p><strong className="text-foreground">4. Track & Receive</strong> — Monitor your order status from your account. Our rider will call before delivery.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default DeliveryInfo;
