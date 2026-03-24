import { Header } from '@/components/Header';

export default function CustomerDashboard() {
  return (
    <>
      <Header />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm"><h3 className="font-semibold">Order History</h3><p className="text-sm text-slate-600">Track current and past orders.</p></div>
        <div className="rounded-2xl bg-white p-4 shadow-sm"><h3 className="font-semibold">Wishlist</h3><p className="text-sm text-slate-600">Save products for later.</p></div>
        <div className="rounded-2xl bg-white p-4 shadow-sm"><h3 className="font-semibold">Referrals</h3><p className="text-sm text-slate-600">Share code and earn rewards.</p></div>
      </div>
    </>
  );
}
