import React from "react";
import { ArrowRight, BriefcaseBusiness, Clock3, Eye } from "lucide-react";

function JobContainer(props) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&auto=format&fit=crop&q=60";
  const status = String(props.status || "Pending");
  const isApproved = status.toLowerCase() === "approved";

  return (
    <article className="group grid overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_20px_40px_rgba(79,70,229,0.16)] md:grid-cols-[minmax(0,1fr)_240px]">
      <div className="order-2 p-5 sm:p-6 md:order-1">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              isApproved ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
            }`}
          >
            {status}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <BriefcaseBusiness size={13} />
            {props.company || "Unknown company"}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">
          {props.title || "Untitled job"}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
          {props.desc || "No description available for this job yet."}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
            <Clock3 size={13} />
            Posted: {props.time || "Recently"}
          </p>

          <button
            type="button"
            onClick={props.onOpen}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200/60 transition hover:-translate-y-0.5"
          >
            <Eye size={16} />
            {isApproved ? "View Job" : "Review Job"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="order-1 h-52 overflow-hidden bg-slate-100 md:order-2 md:h-full">
        <img
          src={props.img || fallbackImage}
          alt={props.title || "Job cover"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
    </article>
  );
}

export default JobContainer;
