import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gift, Heart, Truck, Star } from "lucide-react";

const values = [
  {
    icon: Gift,
    title: "Curated with Love",
    description: "Every gift in our collection is hand-selected to bring joy and create lasting memories.",
  },
  {
    icon: Heart,
    title: "Thoughtful Gifting",
    description: "We believe every occasion deserves a gift that tells a story and touches the heart.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Same-day and scheduled delivery across Uganda, ensuring your gift arrives on time.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "From luxury hampers to fine jewelry, we source only the finest products for you.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="py-20 bg-warm-gradient">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="text-gradient-gold">Christian Gift Shop</span>
            </h1>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-lg leading-relaxed">
              Born from a passion for meaningful gifting, Christian Gift Shop is Uganda's premier destination for
              curated gifts that celebrate life's most precious moments.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                  <p>
                    Founded in 2024 in the heart of Kampala, Christian Gift Shop started with a simple mission:
                    to make gift-giving an unforgettable experience.
                  </p>
                  <p>
                    We noticed that finding the perfect gift often felt overwhelming — too many choices,
                    too little guidance. We set out to change that by curating collections organized by
                    occasion, recipient, and personal style.
                  </p>
                  <p>
                    Today, we serve thousands of happy customers across Uganda, delivering joy to doorsteps
                    with our carefully wrapped, premium gifts.
                  </p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <p className="font-display text-3xl font-bold text-primary">2,500+</p>
                    <p className="text-sm text-muted-foreground font-body mt-1">Happy Customers</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-primary">150+</p>
                    <p className="text-sm text-muted-foreground font-body mt-1">Curated Gifts</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-primary">4.8★</p>
                    <p className="text-sm text-muted-foreground font-body mt-1">Average Rating</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-primary">Same Day</p>
                    <p className="text-sm text-muted-foreground font-body mt-1">Delivery Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-warm-gradient">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
              What We Stand For
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-card border border-border rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
