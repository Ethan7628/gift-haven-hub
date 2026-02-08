import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { products } from "@/data/shop-data";
import { productImages } from "@/data/product-images";
import { formatPrice } from "@/lib/format";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState("");

  const filtered = query.trim().length > 0
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Search Gifts</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search for gifts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>
        {query.trim().length > 0 && (
          <div className="max-h-80 overflow-y-auto space-y-2 mt-2">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No gifts found for "{query}"
              </p>
            ) : (
              filtered.map((product) => {
                const image = productImages[product.id] || "/placeholder.svg";
                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => {
                      onOpenChange(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <img
                      src={image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">{formatPrice(product.price)}</p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
