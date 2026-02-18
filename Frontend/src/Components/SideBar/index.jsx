import React from "react";
import { HomeIcon, PackageSearch, Shirt } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menu = [
  { label: "خانه", to: "/dashboard", icon: HomeIcon },
  { label: "برندها", to: "/dashboard/brands", icon: Shirt },
  { label: "محصولات", to: "/dashboard/products", icon: PackageSearch },
  { label: "دسته بندی ها", to: "/dashboard/categories", icon: PackageSearch },
];

export default function SideBar() {
  const location = useLocation();

  return (
    <div className="h-full">
      <div className="mb-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <p className="text-xs font-semibold tracking-wide text-slate-300">
          مدیریت
        </p>
      </div>

      <nav className="flex flex-col gap-1.5">
        {menu.map(({ label, to, icon: Icon }) => {
          const active = location.pathname === to;

          return (
            <Link
              key={to}
              to={to}
              className={`group hover:scale-105 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                  : "text-slate-300 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon
                size={18}
                className={`transition ${
                  active ? "text-slate-100" : "text-slate-400 group-hover:text-slate-200"
                }`}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
