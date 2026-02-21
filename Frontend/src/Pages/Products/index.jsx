import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useMatch } from "react-router-dom";
import { PackagePlus } from "lucide-react";
import Loading from "../../Components/Loading";
import notify from "../../Utils/Notify";
import { deleteProduct, setProducts } from "../../Store/Slices/ProductSlice";
import Card from "./Card";

export default function Products() {
  const { product: products, fetched } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const onProductsIndex = Boolean(useMatch("/dashboard/products"));
  const onCreatePage = Boolean(useMatch("/dashboard/products/create"));
  const onUpdatePage = Boolean(useMatch("/dashboard/products/update"));

  const shouldShowList = onProductsIndex && !onCreatePage && !onUpdatePage;

  useEffect(() => {
    if (!shouldShowList || fetched) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("fetch failed");

        const data = await res.json();
        dispatch(setProducts(data));
        notify("success", "محصولات با موفقیت دریافت شدند");
      } catch (error) {
        notify("error", "خطا در دریافت داده‌ها");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch, fetched, shouldShowList]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    notify("success", "محصول با موفقیت حذف شد");
  };

  const items = products.map((item) => (
    <Card
      key={item.id}
      handleDelete={handleDelete}
      rating={item.rating}
      id={item.id}
      title={item.title}
      price={item.price}
      category={item.category}
      description={item.description}
      image={item.image}
    />
  ));

  return (
    <div className="space-y-5" dir="rtl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">محصولات</h1>
          <p className="text-sm text-slate-300">تمامی محصولات را بررسی و مدیریت کنید</p>
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
            `rounded-lg px-3 py-1.5 text-sm transition ${
              isActive ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10"
            }`
          }
        >
          لیست محصولات ({products.length})
        </NavLink>
        <NavLink
          to="/dashboard/products/create"
          className={({ isActive }) =>
            `rounded-lg px-3 py-1.5 text-sm transition ${
              isActive ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10"
            }`
          }
        >
          ساختن
        </NavLink>
        <NavLink
          to="/dashboard/products/update"
          className={({ isActive }) =>
            `rounded-lg px-3 py-1.5 text-sm transition ${
              isActive ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10"
            }`
          }
        >
          ویرایش محصول
        </NavLink>
      </div>

      {shouldShowList ? (
        loading ? (
          <div className="min-h-70 flex items-center justify-center">
            <Loading />
          </div>
        ) : products.length ? (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" dir="ltr">
            {items}
          </section>
        ) : (
          <section className="rounded-xl border border-dashed border-white/20 bg-white/5 px-5 py-10 text-center">
            <h3 className="text-lg font-semibold text-white">محصولی موجود نیست</h3>
            <p className="mt-1 text-sm text-slate-300">در حال حاضر محصولی برای نمایش وجود ندارد</p>
          </section>
        )
      ) : (
        <Outlet />
      )}
    </div>
  );
}
