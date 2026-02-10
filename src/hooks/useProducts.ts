import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product, Category, Occasion } from "@/types/shop";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        originalPrice: p.original_price ?? undefined,
        image: p.image_url,
        category: p.category,
        occasion: p.occasion ?? [],
        recipient: p.recipient ?? [],
        rating: Number(p.rating),
        reviews: p.reviews,
        badge: p.badge ?? undefined,
        description: p.description,
        variants: p.variants ?? undefined,
      }));
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useOccasions() {
  return useQuery({
    queryKey: ["occasions"],
    queryFn: async (): Promise<Occasion[]> => {
      const { data, error } = await supabase
        .from("occasions")
        .select("*")
        .order("name");
      if (error) throw error;
      return data ?? [];
    },
  });
}
