import React from "react";


function DashCont(props){
    return (
        <div className='flex h-28 w-60 items-center rounded-2xl border border-white/80 bg-white/75 text-slate-800 shadow-[0_12px_30px_rgba(79,70,229,0.10)] backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(79,70,229,0.16)]'>
            <div className="px-5">
                <h1 className="text-sm font-medium text-slate-500">{props.user}</h1>
                <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{props.count}</h2>
                <h3 className="mt-1 text-xs font-bold uppercase tracking-wider text-violet-600" >{props.growth}</h3>
            </div>
        </div>
    )
}

export default DashCont;
