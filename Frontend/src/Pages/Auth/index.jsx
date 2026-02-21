import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import useFormFields from "../../Hooks/useFormFields";
import { login } from "../../Store/Slices/AuthSlice";
import notify from "../../Utils/Notify";

export default function Auth() {
  const { token } = useSelector((state) => state.auth);

  const [fields, handleChange] = useFormFields({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (token) return <Navigate to="/dashboard" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const fakeAuthData = {
      token: "test-token-123",
      user: {
        email: fields.email || "guest@local.dev",
        role: "admin",
      },
    };

    setTimeout(() => {
      dispatch(login(fakeAuthData));
      notify("success", "با موفقیت وارد شدید");
      navigate("/dashboard");
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen font-sans flex items-center justify-center login-bg px-4">
      <div className="w-full max-w-md">
        <div
          className="
        relative overflow-hidden rounded-2xl
        bg-white/5
        backdrop-blur-2xl
        border border-white/20
        shadow-2xl shadow-black/30
      "
        >
          <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent pointer-events-none" />

          <div className="relative px-6 pt-8 pb-5">
            <h1 className="text-2xl font-extrabold text-white">صفحه ورود</h1>
            <p className="mt-1 text-sm text-white/80">دسترسی محدود به داشبورد</p>
          </div>

          <form onSubmit={handleSubmit} className="relative px-6 pb-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-white/90 mb-2">
                ایمیل
              </label>
              <input
                type="text"
                name="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="anything@example.com"
                className="
              w-full rounded-xl px-4 py-3 text-sm
              bg-slate-900/50
              border border-white/30
              text-white
              placeholder:text-white/60
              backdrop-blur-md
              outline-none transition
              focus:ring-4 focus:ring-purple-400/30
              focus:border-purple-400
            "
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-white/90 mb-2">
                رمز عبور
              </label>
              <input
                type="text"
                name="password"
                value={fields.password}
                onChange={handleChange}
                placeholder="هر مقداری"
                className="
              w-full rounded-xl px-4 py-3 text-sm
              bg-slate-900/50
              border border-white/30
              text-white
              placeholder:text-white/60
              backdrop-blur-md
              outline-none transition
              focus:ring-4 focus:ring-purple-400/30
              focus:border-purple-400
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
                ? "bg-white/30 cursor-not-allowed"
                : "bg-linear-to-br from-indigo-700 to-orange-500 hover:opacity-90 shadow-lg shadow-purple-900/40"
            }
          `}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/50 border-t-white animate-spin" />
                  در حال بررسی
                </>
              ) : (
                "ورود"
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-white/70 pt-2">
              <span>ورود آزمایشی با هر مقدار ورودی</span>
              <span>v1.0</span>
            </div>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-white/70">برای ورود کافی است فرم را ارسال کنید.</p>
      </div>
    </div>
  );
}
