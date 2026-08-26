import React from "react";


function CompanyContainer(props){
    const fallbackImage = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60";

    return (
<<<<<<< HEAD
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div className="relative h-44 w-full overflow-hidden">
                <img src={props.img} alt={props.name} className="h-full w-full object-cover"/>
                <div className="absolute right-3 top-3 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                    Verify
                </div>
            </div>
            <div className="space-y-2 p-4">
                <h4 className="truncate text-base font-semibold text-slate-900">{props.name}</h4>
                <h5 className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{props.cate}</h5>
                <p className="max-h-[60px] overflow-hidden text-sm leading-5 text-slate-600">{props.desc}</p>
            </div>
=======
        <div className="w-40 rounded-2xl border border-white/80 bg-white/75 p-2 shadow-[0_10px_24px_rgba(79,70,229,0.10)] transition-transform hover:-translate-y-1">
            <div className="relative h-42 w-38 overflow-hidden rounded-xl bg-indigo-100">
                <img src={props.img || fallbackImage} alt="" className="h-full w-full object-cover"/>
                <div className="absolute right-3 top-3 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white">
                </div>
            </div>
            <h4 className="mt-2 truncate font-bold text-slate-800">{props.name}</h4>
            <h5 className="text-sm font-medium text-violet-600">{props.cate}</h5>
            <p className="mt-1 line-clamp-2 text-sm text-slate-500">{props.desc}</p>
>>>>>>> 0cc237e (change css and structure in admin page.)
        </div>
    )
}

export default CompanyContainer;
