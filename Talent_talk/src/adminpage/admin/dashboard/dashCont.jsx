import React from "react";


function DashCont(props){
    return (
        <div className='min-h-28 rounded-xl border border-slate-200 bg-white p-5 text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md'>
            <div>
                <h1 className="text-sm font-medium text-slate-500">{props.user}</h1>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">{props.count}</h2>
                <h3 className="mt-1 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">{props.growth}</h3>
            </div>
        </div>
    )
}

export default DashCont;
