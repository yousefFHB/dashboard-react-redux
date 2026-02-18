import React from "react";
import { performanceData, revenueData } from "../../data/data";

const totals = revenueData.reduce(
  (acc, item) => {
    acc.revenue += item.revenue;
    acc.growth += item.growth;
    return acc;
  },
  { revenue: 0, growth: 0 },
);

const avgGrowth = (totals.growth / revenueData.length).toFixed(1);

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-slate-300">کل درآمد</p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            ${totals.revenue.toLocaleString()}
          </h2>
        </article>
        <article className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-slate-300">میانگین رشد</p>
          <h2 className="mt-2 text-2xl font-bold text-emerald-300">{avgGrowth}%</h2>
        </article>
        <article className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-slate-300">بهترین محصول</p>
          <h2 className="mt-2 text-2xl font-bold text-white">{revenueData[0].name}</h2>
        </article>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 className="mb-4 text-lg font-semibold text-white">درآمد بر اساس محصول</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-300">
              <tr className="border-b border-white/10">
                <th className="px-3 py-2">نام محصول</th>
                <th className="px-3 py-2">درآمد</th>
                <th className="px-3 py-2">رشد</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((item) => (
                <tr key={item.name} className="border-b border-white/5 text-slate-100">
                  <td className="px-3 py-2">{item.name}</td>
                  <td className="px-3 py-2">${item.revenue.toLocaleString()}</td>
                  <td className="px-3 py-2 text-emerald-300">+{item.growth}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 className="mb-4 text-lg font-semibold text-white">داده‌های عملکرد</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-300">
              <tr className="border-b border-white/10">
                <th className="px-3 py-2">ماه</th>
                <th className="px-3 py-2">سفارش‌ها</th>
                <th className="px-3 py-2">تبدیل</th>
                <th className="px-3 py-2">میانگین ارزش سفارش</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((item) => (
                <tr key={item.month} className="border-b border-white/5 text-slate-100">
                  <td className="px-3 py-2">{item.month}</td>
                  <td className="px-3 py-2">{item.orders}</td>
                  <td className="px-3 py-2">{item.conversion}%</td>
                  <td className="px-3 py-2">${item.avgOrderValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
