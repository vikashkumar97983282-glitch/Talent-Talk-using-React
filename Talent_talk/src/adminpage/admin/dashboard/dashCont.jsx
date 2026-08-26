import React from "react";


function DashCont(props){
    return (
        <div className="flex min-h-28 min-w-0 items-center rounded-2xl border border-slate-200 bg-white p-5 text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md">
            <div className="min-w-0">
                <h1 className="text-sm font-semibold text-slate-500">{props.user}</h1>
                <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">{props.count}</h2>
                <h3 className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">{props.growth}</h3>
            </div>
        </div>
    )
}

export default DashCont;
