import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { apiGet } from '@/lib/api';

type Banner = { title: string; imageUrl: string; ctaLink: string };
type Category = { _id: string; name: string; icon?: string; slug: string };

export default async function HomePage() {
  const [products, meta] = await Promise.all([
    apiGet<any[]>('/products/recommendations'),
    apiGet<{ banners: Banner[]; categories: Category[] }>('/storefront')
  ]);

  return (
    <>
      <Header />

      <section className="mb-6 grid gap-3 md:grid-cols-2">
        {meta.banners.map((banner) => (
          <a key={banner.title} href={banner.ctaLink} className="rounded-3xl bg-gradient-to-r from-pink-100 to-purple-100 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-pink-700">{banner.title}</p>
            <h2 className="mt-2 text-2xl font-bold">Buy trending products and resell with margins.</h2>
          </a>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="mb-3 text-lg font-semibold">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {meta.categories.map((category) => (
            <a key={category._id} href={`/products?category=${category.name}`} className="rounded-full bg-white px-3 py-1.5 text-sm shadow-sm">
              {category.icon ? `${category.icon} ` : ''}
              {category.name}
            </a>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Trending now</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
