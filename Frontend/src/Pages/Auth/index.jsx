import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import useFormFields from "../../Hooks/useFormFields";
import FetchData from "../../Utils/FetchData";
import { login } from "../../Store/Slices/AuthSlice";
import notify from "../../Utils/Notify";

export default function Auth() {
  const { token } = useSelector((state) => state.auth);

  const [fields, handleChange, setFields] = useFormFields({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await FetchData("auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(fields),
    });

    const role = String(result.data?.user?.role || "").toLowerCase();
    const isAllowedRole = role === "admin" || role === "super_admin";

    if (result.success && isAllowedRole) {
      dispatch(login(result.data));
      notify("success", result.message);
      navigate("/dashboard");
    } else {
      if (result.success && !isAllowedRole) {
        result.message = "You don't have permission to access the dashboard";
      }

      setFields({ email: "", password: "" });
      notify("error", result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-slate-200 dark:border-slate-700 shadow-xl">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-cyan-500" />

          <div className="px-6 pt-8 pb-5">
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white">Admin Login</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Secure access to dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="
                  w-full rounded-xl px-4 py-3 text-sm
                  bg-slate-100 dark:bg-slate-800
                  border border-slate-200 dark:border-slate-700
                  text-slate-800 dark:text-white
                  placeholder:text-slate-400
                  outline-none transition
                  focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500
                "
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={fields.password}
                onChange={handleChange}
                placeholder="********"
                className="
                  w-full rounded-xl px-4 py-3 text-sm
                  bg-slate-100 dark:bg-slate-800
                  border border-slate-200 dark:border-slate-700
                  text-slate-800 dark:text-white
                  placeholder:text-slate-400
                  outline-none transition
                  focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500
                "
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`
                w-full flex items-center justify-center gap-2
                rounded-xl py-3 text-sm font-bold text-white
                transition active:scale-[0.98]
                ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/30"
                }
              `}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2">
              <span>Admin-only access</span>
              <span>v1.0</span>
            </div>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
          Contact system administrator if you need access.
        </p>
      </div>
    </div>
  );
}
