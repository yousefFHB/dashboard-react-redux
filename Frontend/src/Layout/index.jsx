import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Nav from "../Components/Nav";
import SideBar from "../Components/SideBar";
import { logout } from "../Store/Slices/AuthSlice";

export default function Layout() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!token || (user?.role !== "admin" && user?.role !== "super_admin")) {
    dispatch(logout());
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 via-slate-800 to-neutral-950 text-slate-100">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_18%_12%,rgba(148,163,184,0.22),transparent_38%),radial-gradient(circle_at_86%_84%,rgba(120,113,108,0.2),transparent_35%)]" />

      <header className="w-full sticky top-0 z-50 border-b border-white/10 bg-slate-900/45 backdrop-blur-xl">
        <Nav />
      </header>

      <div className="relative mx-auto max-w-[1600px] px-3 py-6 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr] lg:gap-6">
          <aside className="lg:sticky lg:top-[92px] lg:h-[calc(100vh-108px)]">
            <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/45 shadow-[0_20px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="h-full overflow-y-auto p-3">
                <SideBar />
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
