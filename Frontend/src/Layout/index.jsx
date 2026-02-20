import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { X } from "lucide-react";
import Nav from "../Components/Nav";
import SideBar from "../Components/SideBar";
import { logout } from "../Store/Slices/AuthSlice";

export default function Layout() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!token || (user?.role !== "admin" && user?.role !== "super_admin")) {
    dispatch(logout());
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-700 via-slate-800 to-neutral-950 text-slate-100">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_12%,rgba(148,163,184,0.22),transparent_38%),radial-gradient(circle_at_86%_84%,rgba(120,113,108,0.2),transparent_35%)]" />

      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/45 backdrop-blur-xl">
        <Nav
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
        />
      </header>

      <div className="relative mx-auto w-full max-w-400 px-3 py-6 sm:px-4 lg:px-6">
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition lg:hidden ${
            isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr] lg:gap-6">
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-72 p-3 transition-transform duration-300 lg:relative lg:inset-auto lg:z-auto lg:w-auto lg:p-0 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:bg-slate-900/45">
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 lg:hidden">
                <p className="text-sm font-semibold text-slate-200">Menu</p>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="rounded-lg p-1.5 text-slate-200 hover:bg-white/10"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="h-full overflow-y-auto p-3">
                <SideBar onNavigate={() => setIsSidebarOpen(false)} />
              </div>
            </div>
          </aside>

          <main className="min-w-0 rounded-2xl border border-white/10 bg-slate-900/30 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.25)] backdrop-blur-md sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
