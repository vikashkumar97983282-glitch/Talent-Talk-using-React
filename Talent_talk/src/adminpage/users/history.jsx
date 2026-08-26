import React from "react";
import { Mail, MoreVertical } from "lucide-react";

function History(props) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop&q=60";
  const avatarSrc = props.image
    ? `${(import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "")}${
        props.image.startsWith("/") ? props.image : `/${props.image}`
      }`
    : fallbackImage;
  const joinedDate = props.joinedLabel || "-";

  return (
    <article className="grid gap-4 border-b border-slate-100 px-5 py-5 transition hover:bg-violet-50/35 md:grid-cols-[minmax(0,2.15fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,0.8fr)] md:items-center md:gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={avatarSrc}
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
          alt={props.name || "User"}
          className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white shadow-sm"
        />
        <div className="min-w-0">
          <p className="truncate font-semibold text-slate-900">{props.name || "Unknown user"}</p>
          <p className="mt-1 inline-flex items-center gap-1.5 truncate text-xs text-slate-400">
            <Mail size={12} />
            {props.email || "No email"}
          </p>
        </div>
      </div>

      <p>
        <span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Role</span>
        <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">
          {props.role || "Client"}
        </span>
      </p>

      <p>
        <span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Status</span>
        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
          {props.action || "Active"}
        </span>
      </p>

      <p className="text-sm text-slate-600">
        <span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Department</span>
        {props.dept || "Client"}
      </p>

      <div className="flex min-w-0 items-center justify-between gap-3">
        <p className="text-sm text-slate-600">
          <span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Joined</span>
          {joinedDate}
        </p>
        <button
          type="button"
          onClick={props.onView}
          className="inline-flex w-full max-w-[110px] items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-violet-200 hover:text-violet-700 md:justify-self-end"
        >
          <MoreVertical size={14} />
          View
        </button>
      </div>
    </article>
  );
}

export default History;
