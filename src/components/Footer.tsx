import { Link } from "react-router-dom";
import logoLight from "@/assets/logo-light.jpeg";
import logoDark from "@/assets/logo-dark.jpeg";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src={logoDark} alt="Christian Gift Shop" className="h-12" />
            </Link>
            <p className="text-sm opacity-70 font-body leading-relaxed">
              Curating thoughtful gifts for every celebration. Making moments unforgettable since 2024.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Shop", to: "/shop" },
                { label: "Occasions", to: "/occasions" },
                { label: "About", to: "/about" },
                { label: "Wishlist", to: "/wishlist" },
              ].map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Customer Care</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Delivery Info", to: "/about" },
                { label: "Returns", to: "/about" },
                { label: "FAQ", to: "/about" },
                { label: "Track Order", to: "/about" },
              ].map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity font-body"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-sm opacity-70 font-body">
              <span>lytonerica@gmail.com</span>
              <span>+256 780363863</span>
              <span>+256 750227122</span>
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
