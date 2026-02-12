import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { formatPrice } from "@/lib/format";
import { Plus, Edit, Trash2, X, Upload, Image } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import type { Product, Category, Occasion } from "@/types/shop";

interface ProductsTabProps {
  products: Product[];
  categories: Category[];
  occasions: Occasion[];
}

interface ProductForm {
  name: string;
  price: string;
  original_price: string;
  category: string;
  occasion: string[];
  recipient: string[];
  badge: string;
  description: string;
  image_url: string;
  rating: string;
}

const emptyForm: ProductForm = {
  name: "",
  price: "",
  original_price: "",
  category: "",
  occasion: [],
  recipient: [],
  badge: "",
  description: "",
  image_url: "/placeholder.svg",
  rating: "0",
};

const recipientOptions = ["him", "her", "mom", "kids"];

const ProductsTab = ({ products, categories, occasions }: ProductsTabProps) => {
  const qc = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImagePreview(null);
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      price: String(p.price),
      original_price: p.originalPrice ? String(p.originalPrice) : "",
      category: p.category,
      occasion: p.occasion,
      recipient: p.recipient,
      badge: p.badge || "",
      description: p.description,
      image_url: p.image || "/placeholder.svg",
      rating: String(p.rating),
    });
    setImagePreview(p.image || null);
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please select an image file.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum file size is 5MB.", variant: "destructive" });
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(fileName, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
    setForm((prev) => ({ ...prev, image_url: urlData.publicUrl }));
    setImagePreview(urlData.publicUrl);
    setUploading(false);
    toast({ title: "Image uploaded" });
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.price || !form.category) {
      toast({ title: "Missing fields", description: "Name, price, and category are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      price: parseInt(form.price),
      original_price: form.original_price ? parseInt(form.original_price) : null,
      category: form.category,
      occasion: form.occasion,
      recipient: form.recipient,
      badge: form.badge.trim() || null,
      description: form.description.trim(),
      image_url: form.image_url.trim() || "/placeholder.svg",
      rating: parseFloat(form.rating) || 0,
    };

    if (editingId) {
      const { error } = await supabase.from("products").update(payload).eq("id", editingId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
      else { toast({ title: "Product updated" }); }
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
      else { toast({ title: "Product added" }); }
    }
    setSaving(false);
    setModalOpen(false);
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Product deleted" });
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  const toggleArray = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  return (
    <>
      <motion.div
        key="products"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-foreground">Products</h2>
          <button onClick={openAdd} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Rating</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Badge</th>
                <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="text-sm font-medium text-foreground">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground capitalize">{product.category}</td>
                  <td className="p-4 text-sm font-medium text-foreground">{formatPrice(product.price)}</td>
                  <td className="p-4 text-sm text-muted-foreground">{product.rating} ★</td>
                  <td className="p-4">
                    {product.badge && (
                      <span className="px-2 py-1 text-[10px] font-bold uppercase bg-primary/10 text-primary rounded-full">{product.badge}</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(product)} className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold text-foreground">{editingId ? "Edit Product" : "Add Product"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Price *</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Original Price</label>
                  <input type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Category *</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm">
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Occasions</label>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((o) => (
                    <button key={o.id} type="button" onClick={() => setForm({ ...form, occasion: toggleArray(form.occasion, o.id) })}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${form.occasion.includes(o.id) ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border"}`}>
                      {o.emoji} {o.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Recipients</label>
                <div className="flex flex-wrap gap-2">
                  {recipientOptions.map((r) => (
                    <button key={r} type="button" onClick={() => setForm({ ...form, recipient: toggleArray(form.recipient, r) })}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors capitalize ${form.recipient.includes(r) ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border"}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Rating (0-5)</label>
                  <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Badge</label>
                  <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. Bestseller" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Product Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {uploading ? (
                    <p className="text-sm text-muted-foreground">Uploading...</p>
                  ) : imagePreview ? (
                    <div className="relative w-full">
                      <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                      <p className="text-xs text-muted-foreground mt-2 text-center">Click to change image</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload image</p>
                      <p className="text-xs text-muted-foreground">Max 5MB • JPG, PNG, WebP</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm resize-none" />
              </div>
              <button onClick={handleSave} disabled={saving} className="w-full py-3 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50">
                {saving ? "Saving..." : editingId ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsTab;
