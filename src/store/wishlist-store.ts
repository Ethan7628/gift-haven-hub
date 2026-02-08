import { create } from "zustand";
import { supabase } from "@/integrations/supabase/client";

interface WishlistStore {
  items: string[];
  loaded: boolean;
  fetchWishlist: (userId: string) => Promise<void>;
  toggleItem: (userId: string, productId: string) => Promise<void>;
  isWishlisted: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  loaded: false,

  fetchWishlist: async (userId) => {
    const { data } = await supabase
      .from("wishlists")
      .select("product_id")
      .eq("user_id", userId);

    set({ items: data?.map((w: any) => w.product_id) || [], loaded: true });
  },

  toggleItem: async (userId, productId) => {
    const { items } = get();
    if (items.includes(productId)) {
      await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", productId);
      set({ items: items.filter((id) => id !== productId) });
    } else {
      await supabase
        .from("wishlists")
        .insert({ user_id: userId, product_id: productId });
      set({ items: [...items, productId] });
    }
  },

  isWishlisted: (productId) => get().items.includes(productId),

  clear: () => set({ items: [], loaded: false }),
}));
