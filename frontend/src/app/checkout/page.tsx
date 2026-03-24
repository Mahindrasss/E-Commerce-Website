import { Header } from '@/components/Header';

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Address</h2>
          <p className="mt-2 text-sm text-slate-600">Add shipping address and choose delivery slot.</p>
        </section>
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold">Payment</h2>
          <p className="mt-2 text-sm text-slate-600">Razorpay integration + Cash on Delivery.</p>
        </section>
      </div>
    </>
  );
}
