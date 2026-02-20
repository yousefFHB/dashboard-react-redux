import React from "react";
import { HomeIcon, PackageSearch, Shirt } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menu = [
  { label: "خانه", to: "/dashboard", icon: HomeIcon },
  { label: "برند ها", to: "/dashboard/brands", icon: Shirt },
  { label: "محصولات", to: "/dashboard/products", icon: PackageSearch },
  { label: "دسته بندی", to: "/dashboard/category", icon: PackageSearch },
];

export default function SideBar({ onNavigate }) {
  const location = useLocation();

  return (
    <div className="h-full">
      <div className="relative mb-4 rounded-xl px-3 py-2 overflow-hidden group">
  
  {/* Base Gradient */}
  <div className="absolute inset-0 bg-linear-to-tl from-indigo-700 to-orange-500 transition-opacity duration-500 ease-in-out group-hover:opacity-0" />
  
  {/* Inverted Gradient */}
  <div className="absolute inset-0 bg-linear-to-tl from-orange-500 to-indigo-700 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
  
  {/* Content */}
  <div className="relative ">
    <p className="text-xs font-semibold tracking-wide text-slate-100">
      مدیریت
    </p>
  </div>

</div>


      <nav className="flex flex-col gap-1.5">
        {menu.map(({ label, to, icon: Icon }) => {
          const active =
            to === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname === to || location.pathname.startsWith(`${to}/`);

          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              className={`group flex bg-none items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-white/15 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                  : "text-slate-300 hover:bg-white/8 hover:text-white bg-none"
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
