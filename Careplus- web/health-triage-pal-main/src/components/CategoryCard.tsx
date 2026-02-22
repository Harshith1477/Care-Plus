import { Link } from "react-router-dom";
import { type LucideIcon } from "lucide-react";

interface CategoryCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  color: string;
}

const colorMap: Record<string, string> = {
  "healthcare-teal": "bg-healthcare-teal/10 text-healthcare-teal border-healthcare-teal/20",
  "healthcare-blue": "bg-healthcare-blue/10 text-healthcare-blue border-healthcare-blue/20",
  "healthcare-red": "bg-healthcare-red/10 text-healthcare-red border-healthcare-red/20",
  "healthcare-green": "bg-healthcare-green/10 text-healthcare-green border-healthcare-green/20",
  "healthcare-orange": "bg-healthcare-orange/10 text-healthcare-orange border-healthcare-orange/20",
  "healthcare-purple": "bg-healthcare-purple/10 text-healthcare-purple border-healthcare-purple/20",
};

const iconBgMap: Record<string, string> = {
  "healthcare-teal": "bg-healthcare-teal text-primary-foreground",
  "healthcare-blue": "bg-healthcare-blue text-primary-foreground",
  "healthcare-red": "bg-healthcare-red text-primary-foreground",
  "healthcare-green": "bg-healthcare-green text-primary-foreground",
  "healthcare-orange": "bg-healthcare-orange text-accent-foreground",
  "healthcare-purple": "bg-healthcare-purple text-primary-foreground",
};

export function CategoryCard({ id, name, icon: Icon, description, color }: CategoryCardProps) {
  return (
    <Link
      to={`/category/${id}`}
      className={`group block rounded-xl border p-6 transition-all hover:shadow-lg hover:-translate-y-1 ${colorMap[color] || colorMap["healthcare-teal"]}`}
    >
      <div className={`mb-4 inline-flex rounded-lg p-3 ${iconBgMap[color] || iconBgMap["healthcare-teal"]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-1 font-display text-lg font-semibold text-foreground">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
