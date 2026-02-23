import { Link } from "react-router-dom";
import { type LucideIcon, ArrowRight } from "lucide-react";

interface CategoryCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  color: string;
}

const iconBgMap: Record<string, string> = {
  "healthcare-teal": "bg-healthcare-teal text-white",
  "healthcare-blue": "bg-healthcare-blue text-white",
  "healthcare-red": "bg-healthcare-red text-white",
  "healthcare-green": "bg-healthcare-green text-white",
  "healthcare-orange": "bg-healthcare-orange text-white",
  "healthcare-purple": "bg-healthcare-purple text-white",
};

const accentMap: Record<string, string> = {
  "healthcare-teal": "text-healthcare-teal",
  "healthcare-blue": "text-healthcare-blue",
  "healthcare-red": "text-healthcare-red",
  "healthcare-green": "text-healthcare-green",
  "healthcare-orange": "text-healthcare-orange",
  "healthcare-purple": "text-healthcare-purple",
};

export function CategoryCard({ id, name, icon: Icon, description, color }: CategoryCardProps) {
  const iconCls = iconBgMap[color] ?? iconBgMap["healthcare-teal"];
  const accentCls = accentMap[color] ?? accentMap["healthcare-teal"];

  return (
    <Link
      to={`/category/${id}`}
      className="group block rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-xl hover:-translate-y-1.5"
    >
      {/* Icon */}
      <div className={`mb-4 inline-flex rounded-xl p-3 ${iconCls}`}>
        <Icon className="h-6 w-6" />
      </div>

      {/* Text */}
      <h3 className="mb-1.5 font-display text-lg font-semibold text-foreground">{name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

      {/* Arrow */}
      <div className={`mt-4 flex items-center gap-1 text-xs font-medium ${accentCls} opacity-0 group-hover:opacity-100 transition-opacity`}>
        Learn more <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}
