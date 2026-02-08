import { Gift, Truck, Shield, HeadphonesIcon } from "lucide-react";

const features = [
  { icon: Gift, title: "Gift Wrapping", desc: "Complimentary premium wrapping" },
  { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery available" },
  { icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Always here to help" },
];

const TrustBanner = () => {
  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <f.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <h3 className="font-display text-sm font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-xs text-muted-foreground font-body">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
