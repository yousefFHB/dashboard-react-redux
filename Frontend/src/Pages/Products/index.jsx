import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useMatch, useNavigate } from "react-router-dom";
import { PackagePlus, Pencil, Star, Trash2 } from "lucide-react";
import Loading from "../../Components/Loading";
import notify from "../../Utils/Notify";
import { deleteProduct, setProducts } from "../../Store/Slices/ProductSlice";

export default function Products() {
  const { product: products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onProductsIndex = Boolean(useMatch("/dashboard/products"));
  const onCreatePage = Boolean(useMatch("/dashboard/products/create"));
  const onUpdatePage = Boolean(useMatch("/dashboard/products/update"));

  const shouldShowList = onProductsIndex && !onCreatePage && !onUpdatePage;

  useEffect(() => {
    if (!shouldShowList || products.length > 0) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("fetch failed");

        const data = await res.json();
        dispatch(setProducts(data));
        notify("success", "با موفقیت داده ارسال شد");
      } catch (error) {
        notify("error", "مشکلی در ارسال داده");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch, products.length, shouldShowList]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    notify("success", "محصول مدنظر حذف شد");
  };
  const items = products.map((item) => (
    <article
      key={item.id}
      className="group hover:bg-white/10  overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300"
    >
      <div className="h-44 bg-white/10 p-4">
        <img
          src={item.image}
          alt={item.title}
          className="h-full group-hover:scale-105 w-full object-contain transition-all duration-300"
        />
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-white">{item.title}</h3>
          <span className="shrink-0 rounded-full bg-indigo-500/20 px-2 py-1 text-[11px] font-semibold text-indigo-200">
            {item.category}
          </span>
        </div>

        <p className="line-clamp-2 text-xs text-slate-300">{item.description}</p>

        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-emerald-300">${item.price}</span>
          <span className="inline-flex items-center gap-1 text-amber-300">
            <Star size={14} className="fill-amber-300" />
            {item.rating?.rate ?? "-"}
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/products/update", { state: { productId: item.id } })}
            className="inline-flex  items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/20"
          >
            <Pencil size={14} />
            ویرایش
          </button>
          <button
            type="button"
            onClick={() => handleDelete(item.id)}
            className="inline-flex items-center gap-1 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/30"
          >
            <Trash2 size={14} />
            حذف
          </button>
        </div>
      </div>
    </article>
  ))

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">محصولات</h1>
          <p className="text-sm text-slate-300">تمامی محصولات را بررسی کنید</p>
        </div>

        <Link
          to="/dashboard/products/create"
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 hover:opacity-90"
        >
          <PackagePlus size={16} />
          ساختن
        </Link>
      </div>

      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <NavLink
          end
          to="/dashboard/products"
          className={({ isActive }) =>
            `rounded-lg px-3 py-1.5 text-sm transition ${isActive ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10"
            }`
          }
        >
          لیست محصولات ({products.length})
        </NavLink>
        <NavLink
          to="/dashboard/products/create"
          className={({ isActive }) =>
            `rounded-lg px-3 py-1.5 text-sm transition ${isActive ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10"
            }`
          }
        >
          ساختن
        </NavLink>
        <NavLink
          to="/dashboard/products/update"
          className={({ isActive }) =>
            `rounded-lg px-3 py-1.5 text-sm transition ${isActive ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10"
            }`
          }
        >
          ویرایش محصول
        </NavLink>
      </div>

      {shouldShowList ? (
        loading ? (
          <div className="min-h-[280px] flex items-center justify-center">
            <Loading />
          </div>
        ) : products.length ? (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items}
          </section>
        ) : (
          <section className="rounded-xl border border-dashed border-white/20 bg-white/5 px-5 py-10 text-center">
            <h3 className="text-lg font-semibold text-white">محصولی موجود نیست</h3>
            <p className="mt-1 text-sm text-slate-300">محصول خود را درست کنید</p>
          </section>
        )
      ) : (
        <Outlet />
      )}
    </div>
  );
}
