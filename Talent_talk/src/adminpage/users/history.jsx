import React from "react";


function History(props){
    const fallbackImage = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop&q=60";
    const avatarSrc = props.image ? `${(import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "")}${props.image.startsWith("/") ? props.image : `/${props.image}`}` : fallbackImage;
    const joinedDate = props.createdAt ? new Date(props.createdAt).toLocaleDateString() : "-";

    return (
        <article className="grid grid-cols-1 gap-3 border-b border-slate-100 px-5 py-4 text-sm text-slate-600 transition-colors hover:bg-violet-50/40 md:grid-cols-[minmax(220px,2fr)_minmax(120px,1fr)_minmax(110px,0.8fr)_minmax(120px,1fr)_minmax(100px,0.8fr)] md:items-center md:gap-4">
            <div className="flex min-w-0 items-center gap-3"><img src={avatarSrc} onError={(event) => { event.currentTarget.src = fallbackImage; }} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-white"/><div className="min-w-0"><p className="truncate font-semibold text-slate-800">{props.name || "Unknown user"}</p><p className="truncate text-xs text-slate-400">{props.email || "No email"}</p></div></div>
            <p><span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Role</span><span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700">{props.role || "Client"}</span></p>
            <p><span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Status</span><span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{props.action || "Active"}</span></p>
            <p><span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Department</span>{props.dept || "Client"}</p>
            <p><span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:hidden">Joined</span>{joinedDate}</p>
        </article>
    )
}

export default History;
