import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="font-display text-lg font-bold mb-4">
              Christian<span className="text-primary"> Gift Shop</span>
            </h3>
            <p className="text-sm opacity-70 font-body leading-relaxed">
              Curating thoughtful gifts for every celebration. Making moments unforgettable since 2024.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Shop", "Occasions", "About", "Contact"].map((l) => (
                <Link key={l} to={`/${l.toLowerCase()}`} className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body">
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Customer Care</h4>
            <div className="flex flex-col gap-2">
              {["Delivery Info", "Returns", "FAQ", "Track Order"].map((l) => (
                <span key={l} className="text-sm opacity-70 font-body cursor-pointer hover:opacity-100 transition-opacity">
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70 font-body">
              <span>hello@christiangiftshop.com</span>
              <span>+256 700 000 000</span>
              <span>Kampala, Uganda</span>
            </div>
          </div>
        </div>
        <div className="border-t border-background/20 pt-6 text-center">
          <p className="text-xs opacity-50 font-body">
            © 2024 Christian Gift Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
