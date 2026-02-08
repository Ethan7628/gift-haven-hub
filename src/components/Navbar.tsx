import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Search, Menu, X, User, LogOut, Shield } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useAuth } from "@/hooks/useAuth";
import { useWishlistStore } from "@/store/wishlist-store";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchDialog from "@/components/SearchDialog";
import logoLight from "@/assets/logo-light.jpeg";
import logoDark from "@/assets/logo-dark.jpeg";

const Navbar = () => {
  const totalItems = useCartStore((s) => s.totalItems());
  const { user, isAdmin, signOut } = useAuth();
  const { items, fetchWishlist, loaded } = useWishlistStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (user && !loaded) {
      fetchWishlist(user.id);
    }
  }, [user, loaded, fetchWishlist]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/occasions", label: "Occasions" },
    { to: "/about", label: "About" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logoLight} alt="Christian Gift Shop" className="h-10 dark:hidden" />
            <img src={logoDark} alt="Christian Gift Shop" className="h-10 hidden dark:block" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/wishlist"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors relative hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-border">
                        <p className="text-xs text-muted-foreground font-body truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/wishlist"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <Heart className="w-4 h-4" /> Wishlist
                        </Link>
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            <Shield className="w-4 h-4" /> Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            signOut();
                            setUserMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-muted transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            )}

            <button
              className="p-2 text-muted-foreground hover:text-foreground md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border overflow-hidden bg-card"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground py-2"
                >
                  Wishlist
                </Link>
                {!user && (
                  <Link
                    to="/auth"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-primary hover:text-primary/80 py-2"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Navbar;
