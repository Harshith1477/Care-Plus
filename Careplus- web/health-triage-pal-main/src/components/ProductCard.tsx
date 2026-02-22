import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="animate-fade-in flex-shrink-0 w-44 rounded-xl border border-border bg-card p-4 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="mb-3 h-20 w-full rounded-lg bg-secondary object-contain"
      />
      <h4 className="text-sm font-semibold text-foreground line-clamp-2">{product.name}</h4>
      <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
        {product.category}
      </span>
    </div>
  );
}
