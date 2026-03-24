import { Header } from '@/components/Header';

export default function AdminDashboard() {
  return (
    <>
      <Header />
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">Admin Control Center</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-slate-600">
          <li>Approve/reject seller products</li>
          <li>Manage commissions and payouts</li>
          <li>Review disputes, returns, refunds</li>
          <li>Configure banners and categories</li>
        </ul>
      </div>
    </>
  );
}
