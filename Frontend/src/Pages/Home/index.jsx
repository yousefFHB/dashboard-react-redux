import React from "react";
import { DollarSignIcon, Target, UserSquare2Icon } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  performanceData,
  revenueData,
  trafficSources,
  userData,
} from "../../data/data";
import MetricCard from "./MetricCard";

const totals = revenueData.reduce(
  (acc, item) => {
    acc.revenue += item.revenue;
    acc.growth += item.growth;
    return acc;
  },
  { revenue: 0, growth: 0 },
);

const avgGrowth = (totals.growth / revenueData.length).toFixed(1);
const maxUserOrders = Math.max(...userData.map((user) => user.orders), 1);

export default function Home() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard
          title="کل درآمد"
          value="2.4M"
          change={32.1}
          icon={DollarSignIcon}
          gradient="from-green-300 to-green-600"
          subtitle="ماه گذشته"
          trend={[45, 52, 48, 61, 55, 67]}
        />
        <MetricCard
          title="کاربران فعال"
          value="62.1K"
          change={18.1}
          icon={UserSquare2Icon}
          gradient="from-orange-300 to-orange-600"
          subtitle="فعال در ماه جاری"
          trend={[45, 52, 48, 80, 55, 44]}
        />
        <MetricCard
          title="نرخ بازگشت"
          value="12.8%"
          change={25.4}
          icon={Target}
          gradient="from-indigo-300 to-indigo-600"
          subtitle="۳۰ روز گذشته"
          trend={[28, 52, 35, 61, 34, 67]}
        />
      </section>

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
          <p className="text-xs text-slate-300">محصول برتر</p>
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
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">نمودار ناحیه‌ای درآمد</h3>
          <span className="text-xs text-slate-300">منبع: revenueData</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.03} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#cbd5e1", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fill: "#cbd5e1", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                formatter={(value) => [`$${Number(value).toLocaleString()}`, "درآمد"]}
                labelStyle={{ color: "#0f172a", fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#60a5fa"
                strokeWidth={2}
                fill="url(#revenueFill)"
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className=" grid grid-cols-1 gap-4 lg:grid-cols-2">
        <article className=" rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-4 text-lg font-semibold text-white">منابع ترافیک</h3>
          <div className="space-y-3">
            {trafficSources.map((source) => {
              const Icon = source.icon;
              return (
                <div key={source.name} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${source.color}22` }}
                      >
                        <Icon size={16} style={{ color: source.color }} />
                      </span>
                      <span className="text-sm font-medium text-slate-100">{source.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{source.value}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${source.value}%`, backgroundColor: source.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="overflow-y-scroll rounded-xl border border-white/10 bg-white/5 p-4">
          <h3 className="mb-4 text-lg font-semibold text-white">فعالیت‌های زنده</h3>
          <div className="space-y-3">
            {userData
              .slice()
              .sort((a, b) => b.orders - a.orders)
              .map((user) => (
                <div key={user.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{user.name}</p>
                      <p className="text-xs text-slate-300">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-300">{user.orders} سفارش</p>
                      <p className="text-xs text-slate-300">{user.role}</p>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-emerald-400 to-cyan-400"
                      style={{ width: `${(user.orders / maxUserOrders) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </article>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 className="mb-4 text-lg font-semibold text-white">داده‌های عملکرد</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-300">
              <tr className="border-b border-white/10">
                <th className="px-3 py-2">ماه</th>
                <th className="px-3 py-2">سفارش‌ها</th>
                <th className="px-3 py-2">نرخ تبدیل</th>
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
