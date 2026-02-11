import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useCategoryCounts() {
  return useQuery({
    queryKey: ["category-counts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("category");
      if (error) throw error;
      const counts: Record<string, number> = {};
      (data ?? []).forEach((p: any) => {
        counts[p.category] = (counts[p.category] || 0) + 1;
      });
      return counts;
    },
  });
}
