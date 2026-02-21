import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useMatch, useNavigate } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { deleteBrand } from "../../Store/Slices/BrandSlice";
import notify from "../../Utils/Notify";

export default function Brands() {
  const { brands } = useSelector((state) => state.brand);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onBrandsIndex = Boolean(useMatch("/dashboard/brands"));
  const onCreatePage = Boolean(useMatch("/dashboard/brands/create"));
  const onUpdatePage = Boolean(useMatch("/dashboard/brands/update"));

  const shouldShowList = onBrandsIndex && !onCreatePage && !onUpdatePage;

  const handleDelete = (id) => {
    dispatch(deleteBrand(id));
    notify("success", "برند با موفقیت حذف شد");
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">برند ها</h1>
          <p className="text-sm text-slate-300">
            لیست برند های خودتون رو بررسی کنید .
          </p>
        </div>

        <Link
          to="/dashboard/brands/create"
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 hover:opacity-90"
        >
          <Plus size={16} />
          ساخت برند
        </Link>
        
      </div>

      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <NavLink
          end
          to="/dashboard/brands"
          className={({ isActive }) =>
            `rounded-lg px-3 py-1.5 text-sm transition ${
              isActive ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10"
            }`
          }
        >
          تمامی برندها ({brands.length})
        </NavLink>
        <NavLink
          to="/dashboard/brands/create"
          className={({ isActive }) =>
            `rounded-lg px-3 py-1.5 text-sm transition ${
              isActive ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10"
            }`
          }
        >
          ساختن
        </NavLink>
         <NavLink
          to="/dashboard/brands/update"
          className={({ isActive }) =>
            `rounded-lg px-3 py-1.5 text-sm transition ${
              isActive ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10"
            }`
          }
        >
        ویرایش
        </NavLink>
      </div>

      {shouldShowList ? (
        brands.length > 0 ? (
          <section className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <div className="overflow-x-auto">
              <table className="w-full min-w-175 text-left text-sm">
                <thead className="bg-white/5 text-slate-300">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3">لوگو</th>
                    <th className="px-4 py-3">عنوان</th>
                    <th className="px-4 py-3">مشخصات</th>
                    <th className="px-4 py-3">ساخته شده</th>
                    <th className="px-4 py-3">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map((brand) => (
                    <tr key={brand.id} className="border-b border-white/5 text-slate-100">
                      <td className="px-4 py-3">
                        {brand.image ? (
                          <img
                            src={brand.image}
                            alt={brand.title}
                            className="h-10 w-10 rounded-lg border border-white/10 bg-slate-800 object-contain"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-800 text-xs text-slate-400">
                            N/A
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium">{brand.title}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            brand.isPublished
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-amber-500/20 text-amber-300"
                          }`}
                        >
                          {brand.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {brand.createdAt ? new Date(brand.createdAt).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => navigate("/dashboard/brands/update", { state: { brandId: brand.id } })}
                            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/10"
                          >
                            <Pencil size={14} />
                            ویرایش
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(brand.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20"
                          >
                            <Trash2 size={14} />
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="rounded-xl border border-dashed border-white/20 bg-white/5 px-5 py-10 text-center">
            <h3 className="text-lg font-semibold text-white">برندی وجود ندارد</h3>
            <p className="mt-1 text-sm text-slate-300">
             برند خود را درست کنید 
            </p>
            <Link
              to="/dashboard/brands/create"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              <Plus size={16} />
              ساخت برند
            </Link>
          </section>
        )
      ) : (
        <Outlet />
      )}
    </div>
  );
}
