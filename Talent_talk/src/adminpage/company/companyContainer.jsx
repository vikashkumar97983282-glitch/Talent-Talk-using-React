import React from "react";


function CompanyContainer(props){
    const fallbackImage = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60";

    return (
        <div className="w-40 rounded-2xl border border-sky-100 bg-white p-2 shadow-[0_10px_24px_rgba(14,165,233,0.10)] transition-transform hover:-translate-y-1">
            <div className="relative h-42 w-38 overflow-hidden rounded-xl bg-indigo-100">
                <img src={props.img || fallbackImage} alt="" className="h-full w-full object-cover"/>
                <div className="absolute right-3 top-3 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white">
                </div>
            </div>
            <h4 className="mt-2 truncate font-bold text-slate-800">{props.name}</h4>
            <h5 className="text-sm font-medium text-sky-600">{props.cate}</h5>
            <p className="mt-1 line-clamp-2 text-sm text-slate-500">{props.desc}</p>
        </div>
    )
}

export default CompanyContainer;
