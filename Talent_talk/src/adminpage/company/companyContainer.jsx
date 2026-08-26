import React from "react";
import { BadgeCheck, BriefcaseBusiness, Globe2, MoveRight } from "lucide-react";

function CompanyContainer(props) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60";
  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
  const imageSrc = props.img
    ? props.img.startsWith("http")
      ? props.img
      : `${apiBaseUrl}${props.img.startsWith("/") ? props.img : `/${props.img}`}`
    : fallbackImage;

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_40px_rgba(79,70,229,0.16)]">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={imageSrc}
          alt={`${props.name || "Company"} profile`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur">
            <BadgeCheck size={13} />
            Verified
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            <BriefcaseBusiness size={13} />
            {props.cate || "Category unavailable"}
          </div>
          <h4 className="mt-3 line-clamp-2 text-xl font-bold tracking-tight text-white">
            {props.name || "Unnamed company"}
          </h4>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start gap-3 text-sm text-slate-500">
          <Globe2 size={16} className="mt-0.5 shrink-0 text-violet-500" />
          <p className="line-clamp-3 leading-6">{props.desc || "No description provided for this company yet."}</p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Status</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">Ready for review</p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
            Review
            <MoveRight size={13} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default CompanyContainer;
