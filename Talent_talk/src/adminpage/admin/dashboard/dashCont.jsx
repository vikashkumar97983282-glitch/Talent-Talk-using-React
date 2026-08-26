import React from "react";


function DashCont(props){
    return (
        <div className='flex h-28 w-60 items-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition-colors duration-200 hover:border-slate-300 hover:shadow-md'>
            <div className="px-5">
                <h1 className="text-sm font-medium text-slate-500">{props.user}</h1>
                <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{props.count}</h2>
                <h3 className="mt-1 text-xs font-bold uppercase tracking-wider text-cyan-600" >{props.growth}</h3>
            </div>
        </div>
    )
}

export default DashCont;
