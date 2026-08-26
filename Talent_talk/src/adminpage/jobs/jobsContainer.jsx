import React from "react";


function JobContainer(props){
    const fallbackImage = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&auto=format&fit=crop&q=60";

    return (
        <article className="group grid overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_16px_30px_rgba(79,70,229,0.14)] md:grid-cols-[minmax(0,1fr)_220px]">
            <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${props.status === "Approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{props.status}</span><span className="text-xs font-medium text-slate-400">{props.company || "Unknown company"}</span></div>
                <h1 className="mt-4 text-lg font-bold tracking-tight text-slate-900">{props.title}</h1>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{props.desc}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-medium text-slate-400">Posted: {props.time || "Recently"}</p><button className="h-9 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-violet-600">{props.button}</button></div>
            </div>
            <div className="order-first h-44 overflow-hidden bg-indigo-100 md:order-none md:h-full">
                <img src={props.img || fallbackImage} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
        </article>
    )
}

export default JobContainer;
