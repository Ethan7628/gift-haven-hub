import { Package, ShoppingBag, CalendarHeart, Users } from "lucide-react";

interface AdminStatsProps {
  productCount: number;
  categoryCount: number;
  occasionCount: number;
}

const AdminStats = ({ productCount, categoryCount, occasionCount }: AdminStatsProps) => {
  const stats = [
    { label: "Total Products", value: productCount, icon: Package, color: "text-primary" },
    { label: "Categories", value: categoryCount, icon: ShoppingBag, color: "text-primary" },
    { label: "Occasions", value: occasionCount, icon: CalendarHeart, color: "text-primary" },
    { label: "Customers", value: "2,500+", icon: Users, color: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      {stats.map((s) => (
        <div key={s.label} className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <s.icon className={`w-5 h-5 ${s.color}`} />
            <span className="text-xs text-muted-foreground font-body">{s.label}</span>
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
