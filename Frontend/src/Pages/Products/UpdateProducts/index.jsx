import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { setProductId, updateProduct } from "../../../Store/Slices/ProductSlice";
import notify from "../../../Utils/Notify";

export default function UpdateProducts() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, productId } = useSelector((state) => state.product);

  const selectedId = Number(id) || location.state?.productId || productId;
  const selectedProduct = product.find((item) => Number(item.id) === Number(selectedId));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedProduct) return;

    setTitle(selectedProduct.title || "");
    setDescription(selectedProduct.description || "");
    setImage(selectedProduct.image || "");
    setPrice(String(selectedProduct.price ?? ""));
    setCategory(selectedProduct.category || "");
    dispatch(setProductId(selectedProduct.id));
  }, [dispatch, selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      notify("error", "محصولی برای ویرایش انتخاب نشده است");
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedImage = image.trim();

    if (!trimmedTitle || !trimmedDescription || !trimmedImage) {
      notify("error", "لطفاً عنوان، توضیحات و تصویر را وارد کنید");
      return;
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      notify("error", "قیمت معتبر وارد کنید");
      return;
    }

    setLoading(true);

    const updated = {
      ...selectedProduct,
      title: trimmedTitle,
      description: trimmedDescription,
      image: trimmedImage,
      price: numericPrice,
      category: category.trim() || "سایر",
    };

    setTimeout(() => {
      dispatch(updateProduct(updated));
      notify("success", "محصول با موفقیت ویرایش شد");
      setLoading(false);
      navigate("/dashboard/products");
    }, 250);
  };

  if (!selectedProduct) {
    return (
      <div className="rounded-xl border border-amber-300/30 bg-amber-500/10 p-4 text-sm text-amber-200" dir="rtl">
        محصولی برای ویرایش پیدا نشد. از لیست محصولات یکی را انتخاب کنید.
        <div className="mt-3">
          <Link to="/dashboard/products" className="inline-flex rounded-lg bg-white/10 px-3 py-2 text-xs text-white hover:bg-white/20">
            بازگشت به محصولات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-1 sm:px-2" dir="rtl">
      <div className="mb-6 text-right">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">ویرایش محصول</h2>
        <p className="mt-2 text-sm text-slate-300">مشخصات محصول خود را ویرایش کنید.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-slate-900/45 backdrop-blur-xl shadow-[0_20px_45px_rgba(0,0,0,0.35)] p-6 sm:p-8 space-y-6"
      >
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-100 block">عنوان محصول</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/30"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-100 block">توضیحات</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/30"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-100 block">قیمت</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/30"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-100 block">دسته‌بندی</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/30"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-100 block">آدرس تصویر (URL)</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/30"
          />
          {image.trim() ? (
            <div className="mt-3 h-44 rounded-xl border border-white/10 bg-white/5 p-3">
              <img src={image} alt="preview" className="h-full w-full object-contain" />
            </div>
          ) : null}
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            انصراف
          </button>
          <button
            disabled={loading}
            type="submit"
            className={`min-w-[120px] px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all ${
              loading
                ? "bg-slate-500 cursor-not-allowed"
                : "bg-linear-to-r from-indigo-600 to-orange-500 hover:opacity-90"
            }`}
          >
            {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
        </div>
      </form>
    </div>
  );
}
