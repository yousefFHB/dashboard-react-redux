import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircleCheckBig, CloudUpload, CircleX } from "lucide-react";
import { addBrand } from "../../../Store/Slices/BrandSlice";
import notify from "../../../Utils/Notify";

export default function CreateBrand() {
  const [title, setTitle] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [img, setImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!img) {
      setPreviewUrl("");
      return undefined;
    }

    const url = URL.createObjectURL(img);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [img]);

  const resetImage = () => {
    setImg(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      notify("error", "لطفاً عنوان برند را وارد کنید");
      return;
    }

    setLoading(true);

    const payload = {
      id: nanoid(),
      title: trimmedTitle,
      isPublished,
      image: previewUrl || "",
      createdAt: Date.now(),
    };

    setTimeout(() => {
      dispatch(addBrand(payload));
      notify("success", "برند با موفقیت ایجاد شد");
      setLoading(false);
      navigate("/dashboard/brands");
    }, 300);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-8 px-1 sm:px-2">
      <div className="mb-6 text-center sm:text-left">
        <h2 dir="rtl" className=" text-2xl sm:text-3xl text-right font-extrabold text-white tracking-tight">
          ایجاد برند
        </h2>
        <p className="mt-2 text-right text-sm text-slate-300">
          یک برند جدید اضافه کنید و وضعیت نمایش آن را مدیریت کنید.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="
          rounded-2xl border border-white/10 bg-slate-900/45 backdrop-blur-xl
          shadow-[0_20px_45px_rgba(0,0,0,0.35)] p-6 sm:p-8 space-y-8
        "
      >
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-100 block">
            عنوان برند
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثلاً نایک، آدیداس، سونی"
            className="
              w-full rounded-xl border border-white/20 bg-white/5
              px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400
              focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-300/30
              transition-all duration-200 shadow-sm
            "
          />
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-100 block">
            لوگوی برند <span className="text-slate-400 font-normal">(اختیاری)</span>
          </label>

          <label
            className={`
              relative flex flex-col items-center justify-center gap-4
              rounded-xl border-2 border-dashed
              ${img
                ? "border-slate-400/70 bg-white/10"
                : "border-white/25 bg-white/5 hover:bg-white/10"
              }
              p-8 cursor-pointer transition-all duration-200 group
            `}
          >
            {!img ? (
              <>
                <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CloudUpload className="text-slate-200 h-6 w-6" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-semibold text-slate-100">
                    برای آپلود تصویر کلیک کنید
                  </p>
                  <p className="text-xs text-slate-300">PNG، JPG یا WEBP (حداکثر ۲MB)</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-200 bg-emerald-500/20 border border-emerald-300/20 px-4 py-2 rounded-full mb-2">
                  <CircleCheckBig className="h-4 w-4" />
                  تصویر انتخاب شد
                </span>
                <p className="text-xs text-slate-200 font-medium">{img.name}</p>
              </div>
            )}

            <input
              type="file"
              onChange={(e) => setImg(e.target.files?.[0] || null)}
              accept="image/*"
              className="hidden"
            />
          </label>

          {img && (
            <div className="mt-4 relative group w-full max-w-50 mx-auto sm:mx-0">
              <div className="overflow-hidden rounded-xl border border-white/15 shadow-sm bg-slate-800/70 aspect-square flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <button
                type="button"
                onClick={resetImage}
                className="
                  absolute -top-2 -right-2
                  rounded-full bg-slate-900 text-slate-300 border border-white/20
                  p-1.5 shadow-md transition-all
                  hover:text-red-300 hover:border-red-300/30 hover:bg-red-500/20
                "
              >
                <CircleX size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-slate-100">انتشار در فروشگاه</p>
            <p className="text-xs text-slate-300">
              این برند بلافاصله برای کاربران قابل مشاهده شود.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              px-5 py-2.5 rounded-xl
              text-sm font-semibold text-slate-300
              hover:bg-white/10 hover:text-white
              transition-colors duration-200
            "
          >
            انصراف
          </button>

          <button
            disabled={loading}
            type="submit"
            className={`
              min-w-30 px-6 py-2.5 rounded-xl
              text-sm font-bold text-white shadow-lg shadow-slate-900/20
              flex items-center justify-center gap-2
              transition-all duration-200
              ${loading
                ? "bg-slate-500 cursor-not-allowed"
                : "bg-linear-to-r from-indigo-600 to-orange-500 hover:opacity-90 hover:-translate-y-0.5"
              }
            `}
          >
            {loading ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>در حال ذخیره...</span>
              </>
            ) : (
              "ایجاد برند"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
