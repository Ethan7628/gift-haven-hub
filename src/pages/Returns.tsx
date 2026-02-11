import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RotateCcw, ShieldCheck, AlertTriangle, Mail } from "lucide-react";

const Returns = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">Returns & Refund Policy</h1>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {[
          { icon: RotateCcw, title: "7-Day Returns", desc: "Return eligible items within 7 days of delivery" },
          { icon: ShieldCheck, title: "Quality Guarantee", desc: "Damaged or defective items replaced at no cost" },
          { icon: AlertTriangle, title: "Conditions Apply", desc: "Items must be in original, unused condition" },
          { icon: Mail, title: "Easy Process", desc: "Contact us to initiate a return — we'll guide you through" },
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

      <div className="space-y-6 text-sm text-muted-foreground font-body leading-relaxed">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">Eligible for Returns</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Items in original, unused condition with all packaging intact</li>
            <li>Damaged or defective products (notify us within 24 hours with photos)</li>
            <li>Wrong item received</li>
            <li>Items significantly different from the product description</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">Not Eligible for Returns</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Perishable items (chocolates, flowers, fresh hampers) once delivered</li>
            <li>Personalized or custom-made gifts</li>
            <li>Items returned after 7 days of delivery</li>
            <li>Items without original packaging or in used condition</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">How to Return</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Contact us at <span className="text-foreground font-medium">lytonerica@gmail.com</span> or call <span className="text-foreground font-medium">+256 780363863</span></li>
            <li>Provide your order number and reason for return</li>
            <li>We'll confirm eligibility and arrange pickup or drop-off</li>
            <li>Refund processed within 3–5 business days after we receive the item</li>
          </ol>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-2">Refund Methods</h2>
          <p>Refunds are issued to your original payment method (Mobile Money, bank transfer). Cash-on-delivery orders receive Mobile Money refunds.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Returns;
