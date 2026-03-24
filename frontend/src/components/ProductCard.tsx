import Link from 'next/link';

type Product = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  rating: number;
  numReviews?: number;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-2xl bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 aspect-square rounded-xl bg-slate-100" />
      <h3 className="line-clamp-2 text-sm font-semibold">{product.title}</h3>
      <p className="mt-1 text-xs text-slate-500">⭐ {product.rating.toFixed(1)} ({product.numReviews || 0})</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold text-pink-600">₹{product.price}</span>
        <Link href={`/products/${product.slug}`} className="text-xs font-semibold text-slate-700 underline">
          View
        </Link>
      </div>
    </article>
  );
}
