import { Header } from '@/components/Header';

const stats = [
  { label: 'Total Orders', value: '324' },
  { label: 'Monthly Earnings', value: '₹1,24,000' },
  { label: 'Active Products', value: '87' }
];

export default function SellerDashboard() {
  return (
    <>
      <Header />
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-pink-600">{stat.value}</p>
          </div>
        ))}
      </div>
    </>
  );
}
