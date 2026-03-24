import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { apiGet } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }: { searchParams: Record<string, string> }) {
  const query = new URLSearchParams(searchParams).toString();
  const products = await apiGet<any[]>(`/products${query ? `?${query}` : ''}`);

  return (
    <>
      <Header />
      <h2 className="mb-3 text-lg font-semibold">All products</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
