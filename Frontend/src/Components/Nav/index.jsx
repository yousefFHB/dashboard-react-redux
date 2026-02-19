import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Menu, MonitorCogIcon } from "lucide-react";
import { logout } from "../../Store/Slices/AuthSlice";

function getPageTitle(pathname) {
  if (pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/dashboard/brands")) return "Brands";
  if (pathname.startsWith("/dashboard/products")) return "Products";
  if (pathname.startsWith("/dashboard/categories")) return "Categories";
  if (pathname.startsWith("/dashboard/users")) return "Users";

  const lastSegment = pathname.split("/").filter(Boolean).pop();
  if (!lastSegment) return "Dashboard";
  return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
}

export default function Nav({ onToggleSidebar, isSidebarOpen }) {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const pageTitle = useMemo(() => getPageTitle(location.pathname), [location.pathname]);
  const localTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const localDate = now.toLocaleDateString([], {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div
      className={`relative w-full transition-all duration-300 ${isScrolled
          ? "bg-slate-900/80 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
          : "bg-slate-900/50 backdrop-blur-xl"
        }`}
    >
      <div className="mx-auto flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onToggleSidebar}
            className="rounded-xl border border-white/15 bg-white/5 p-2 text-slate-100 transition hover:bg-white/10 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={18} className={isSidebarOpen ? "text-white" : "text-slate-200"} />
          </button>

          {location.pathname == "/dashboard" && (<div className="h-12 w-12 rounded-2xl bg-linear-to-br from-indigo-700 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-900/40">
            <MonitorCogIcon className="h-6 w-6 text-white" />
          </div>)}

          <div className="flex flex-col leading-tight">
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
              {pageTitle}
            </h2>
            <p className="text-xs font-medium text-white/60">Management Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {token && (
            <button
              onClick={() => dispatch(logout())}
              className="rounded-lg border border-white/15 bg-white/5 px-2.5 py-2 text-xs font-semibold text-slate-100 transition hover:border-rose-300/60 hover:bg-rose-500/20 hover:text-rose-100 md:hidden"
            >
              Logout
            </button>
          )}

          <div className="hidden sm:flex flex-col items-end rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-right backdrop-blur-xl">
            <p className="text-xs font-medium text-slate-200">{localDate}</p>
            <p className="text-sm font-semibold text-white">{localTime}</p>
          </div>

          <div className="relative hidden md:flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-3 py-2 backdrop-blur-2xl shadow-[0_12px_30px_rgba(2,6,23,0.45)]">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-white/[0.12] via-transparent to-white/[0.04]" />

            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-400 flex items-center justify-center text-slate-900 text-sm font-extrabold shadow-[0_8px_20px_rgba(15,23,42,0.35)]">
              {user?.email ? user.email[0].toUpperCase() : "A"}
            </div>

            <div className="relative flex flex-col leading-tight">
              <p className="text-sm font-semibold text-white">Admin User</p>
              <p className="max-w-[180px] truncate text-xs text-slate-200/80 font-medium">
                {user?.email || "No email"}
              </p>
            </div>

            {token && (
              <button
                onClick={() => dispatch(logout())}
                className="relative rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-rose-300/60 hover:bg-rose-500/20 hover:text-rose-100"
              >
                Logout
              </button>
            )}
          </div>

          <ul className="hidden sm:flex items-center gap-3">
            <li>
              <Link
                to="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200/90 transition hover:bg-white/10 hover:text-white"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
