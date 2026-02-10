import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import type { Occasion, Product } from "@/types/shop";

interface OccasionsTabProps {
  occasions: Occasion[];
  products: Product[];
}

interface OccasionForm {
  id: string;
  name: string;
  emoji: string;
}

const emptyForm: OccasionForm = { id: "", name: "", emoji: "🎉" };

const OccasionsTab = ({ occasions, products }: OccasionsTabProps) => {
  const qc = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<OccasionForm>(emptyForm);
  const [saving, setSaving] = useState(false);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (o: Occasion) => {
    setEditingId(o.id);
    setForm({ id: o.id, name: o.name, emoji: o.emoji });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.emoji.trim()) {
      toast({ title: "Missing fields", description: "Name and emoji are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const id = form.id.trim() || form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

    if (editingId) {
      const { error } = await supabase.from("occasions").update({ name: form.name.trim(), emoji: form.emoji.trim() }).eq("id", editingId);
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Occasion updated" });
    } else {
      const { error } = await supabase.from("occasions").insert({ id, name: form.name.trim(), emoji: form.emoji.trim() });
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Occasion added" });
    }
    setSaving(false);
    setModalOpen(false);
    qc.invalidateQueries({ queryKey: ["occasions"] });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this occasion?")) return;
    const { error } = await supabase.from("occasions").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Occasion deleted" });
    qc.invalidateQueries({ queryKey: ["occasions"] });
  };

  return (
    <>
      <motion.div
        key="occasions"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-foreground">Occasions</h2>
          <button onClick={openAdd} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" /> Add Occasion
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Emoji</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Gifts</th>
                <th className="text-right p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {occasions.map((occ) => {
                const count = products.filter((p) => p.occasion.includes(occ.id)).length;
                return (
                  <tr key={occ.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4 text-2xl">{occ.emoji}</td>
                    <td className="p-4 text-sm font-medium text-foreground">{occ.name}</td>
                    <td className="p-4 text-sm text-muted-foreground">{count} gifts</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(occ)} className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(occ.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-bold text-foreground">{editingId ? "Edit Occasion" : "Add Occasion"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Emoji *</label>
                <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm" />
              </div>
              {!editingId && (
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">ID (auto-generated if empty)</label>
                  <input value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="e.g. easter" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm" />
                </div>
              )}
              <button onClick={handleSave} disabled={saving} className="w-full py-3 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50">
                {saving ? "Saving..." : editingId ? "Update Occasion" : "Add Occasion"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OccasionsTab;
