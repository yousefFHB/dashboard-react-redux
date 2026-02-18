import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Store/Slices/AuthSlice";
import { MonitorCogIcon, LucideMenuSquare, X } from "lucide-react";

export default function Nav() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`relative w-full transition-all duration-300 ${isScrolled
          ? "bg-slate-900/80 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
          : "bg-slate-900/50 backdrop-blur-xl"
        }`}
    >
      <div className="mx-auto flex items-center justify-between gap-3 px-4 py-4 sm:px-6">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-700 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-900/40">
            <MonitorCogIcon className="h-6 w-6 text-white" />
          </div>

          <div className="flex flex-col leading-tight">
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
              داشبورد مدیریت
            </h2>
            <p className="text-xs text-white/60 font-medium">
              مدیریت
            </p>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden sm:flex items-center gap-3 transition-all">
          <li>
            <Link
              to="/dashboard"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200/90 transition hover:bg-white/10 hover:text-white"
            >
              خانه
            </Link>
          </li>

          <li>
            {token ? (
              <button
                onClick={() => dispatch(logout())}
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:text-red-400 hover:border-red-400 hover:bg-white/10"
              >
                خروج
              </button>
            ) : (
              <Link
                to="/auth"
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                ورود
              </Link>
            )}
          </li>
        </ul>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all"
        >
          {isOpen ? <X size={22} /> : <LucideMenuSquare size={22} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}

      <div className={`
    sm:hidden px-4 overflow-hidden transition-all duration-300 ease-in-out
    ${isOpen ? "max-h-60 opacity-100 pb-4" : "max-h-0 opacity-0"}
  `}>
        <ul className="flex flex-col gap-2 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-3 shadow-lg">
          <li>
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
            >
              خانه
            </Link>
          </li>

          <li>
            {token ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  setIsOpen(false);
                }}
                className="w-full text-right rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10 hover:text-red-400"
              >
                خروج
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
              >
                ورود
              </Link>
            )}
          </li>
        </ul>
      </div>

    </div>
  );
}

