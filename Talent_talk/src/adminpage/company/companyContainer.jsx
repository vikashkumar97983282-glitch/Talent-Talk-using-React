import React from "react";


function CompanyContainer(props){
    const fallbackImage = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60";
    const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
    const imageSrc = props.img
        ? (props.img.startsWith("http") ? props.img : `${apiBaseUrl}${props.img.startsWith("/") ? props.img : `/${props.img}`}`)
        : fallbackImage;

    return (
        <article className="group w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_18px_36px_rgba(79,70,229,0.16)]">
            <div className="relative h-52 w-full overflow-hidden bg-indigo-100">
                <img src={imageSrc} alt={`${props.name || "Company"} profile`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" onError={(event) => { event.currentTarget.src = fallbackImage; }}/>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/45 to-transparent" />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-emerald-700 shadow-sm backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Verified</span>
            </div>
            <div className="p-4">
                <h4 className="truncate text-base font-bold tracking-tight text-slate-800">{props.name}</h4>
                <h5 className="mt-1 text-sm font-semibold text-indigo-600">{props.cate}</h5>
                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">{props.desc}</p>
            </div>
        </article>
    )
}

export default CompanyContainer;
