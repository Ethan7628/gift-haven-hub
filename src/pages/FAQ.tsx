import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I place an order?",
    a: "Simply browse our shop, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Mobile Money (MTN & Airtel), bank transfers, and cash on delivery within Kampala. Online card payments are coming soon.",
  },
  {
    q: "Can I track my order?",
    a: "Yes! Once logged in, go to 'My Orders' from the navigation menu to see real-time status updates for all your orders.",
  },
  {
    q: "Do you offer gift wrapping?",
    a: "All our gifts come beautifully wrapped at no extra cost. You can also add a personalized message during checkout.",
  },
  {
    q: "Can I cancel or modify my order?",
    a: "You can cancel or modify your order within 1 hour of placing it by contacting us. After that, the order may already be in processing.",
  },
  {
    q: "Do you deliver outside Kampala?",
    a: "Yes, we deliver nationwide across Uganda. Delivery times and fees vary by region — check our Delivery Info page for details.",
  },
  {
    q: "What if my gift arrives damaged?",
    a: "We take great care in packaging, but if your item arrives damaged, contact us within 24 hours with photos and we'll arrange a replacement or refund.",
  },
  {
    q: "Can I return a gift?",
    a: "Yes, we accept returns within 7 days of delivery for most items in their original condition. See our Returns page for full details.",
  },
  {
    q: "Do you offer same-day delivery?",
    a: "Yes! Orders placed before 12 PM for Kampala Central qualify for same-day delivery. Other areas may take 1–2 business days.",
  },
  {
    q: "How do I contact customer support?",
    a: "You can reach us via email at lytonerica@gmail.com, call/WhatsApp +256 780363863 or +256 750227122. We're available Mon–Sat, 8 AM – 8 PM.",
  },
];

const FAQ = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
        Frequently Asked Questions
      </h1>
      <p className="text-muted-foreground font-body mb-8">
        Find answers to the most common questions about our products, delivery, and services.
      </p>

      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded-xl px-5">
            <AccordionTrigger className="font-display text-sm font-semibold text-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground font-body leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
    <Footer />
  </div>
);

export default FAQ;
