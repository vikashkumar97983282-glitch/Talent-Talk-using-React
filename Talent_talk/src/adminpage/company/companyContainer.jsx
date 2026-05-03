import React from "react";


function CompanyContainer(props){

    return (
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
        </div>
    )
}

export default CompanyContainer;
