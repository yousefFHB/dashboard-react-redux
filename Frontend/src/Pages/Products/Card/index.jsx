import React from "react";
import { Pencil, Star, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProductId } from "../../../Store/Slices/ProductSlice";

export default function Card({ id, price, image, description, title, category, rating, handleDelete }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const slug = title?.trim().replace(/\s+/g, "-").toLowerCase();

  const openProduct = () => {
    dispatch(setProductId(id));
    navigate(`/dashboard/products/${id}/${slug}`);
  };

  return (
    <article
      onClick={openProduct}
      className="group hover:bg-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300"
    >
      <div className="h-44 bg-white/10 p-4">
        <img
          src={image}
          alt={title}
          className="h-full group-hover:scale-105 w-full object-contain transition-all duration-300"
        />
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-white">{title}</h3>
          <span className="shrink-0 rounded-full bg-indigo-500/20 px-2 py-1 text-[11px] font-semibold text-indigo-200">
            {category}
          </span>
        </div>

        <p className="line-clamp-2 text-xs text-slate-300">{description}</p>

        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-emerald-300">${price}</span>
          <span className="inline-flex items-center gap-1 text-amber-300">
            <Star size={14} className="fill-amber-300" />
            {rating?.rate ?? "-"}
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-3" dir="rtl">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setProductId(id));
              navigate("/dashboard/products/update", { state: { productId: id } });
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/20"
          >
            <Pencil size={14} />
            ویرایش
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(id);
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/30"
          >
            <Trash2 size={14} />
            حذف
          </button>
        </div>
      </div>
    </article>
  );
}
