'use client';

import { Header } from '@/components/Header';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const { items, clear } = useCartStore();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Header />
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">Cart ({items.length})</h2>
        {items.map((item) => (
          <div key={item.productId} className="mt-3 flex justify-between text-sm">
            <span>{item.title} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <p className="mt-4 font-semibold">Total: ₹{total}</p>
        <button onClick={clear} className="mt-3 rounded-lg border px-3 py-1.5 text-sm">Clear</button>
      </div>
    </>
  );
}
