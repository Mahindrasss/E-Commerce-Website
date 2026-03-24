import { Header } from '@/components/Header';
import { apiGet } from '@/lib/api';

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product = await apiGet<any>(`/products/${params.slug}`);

  return (
    <>
      <Header />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="aspect-square rounded-2xl bg-white shadow-sm" />
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-xl font-bold">{product.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{product.description}</p>
          <p className="mt-4 text-2xl font-bold text-pink-600">₹{product.price}</p>
          <button className="mt-4 rounded-xl bg-pink-600 px-4 py-2 text-sm font-semibold text-white">Add to cart</button>
        </div>
      </div>
    </>
  );
}
