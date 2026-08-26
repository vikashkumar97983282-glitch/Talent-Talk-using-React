import React from "react";


function InsightsContainer(props){

    return (
        <div className='flex h-25 w-45 items-center rounded-2xl border border-white/80 bg-white/80 shadow-[0_10px_24px_rgba(79,70,229,0.10)]'>
            <div className="ml-5">
                <h1 className="text-sm font-medium text-slate-500">{props.title}</h1>
                <h2 className="font-bold tracking-tight text-slate-900">{props.value}</h2>
                <h3 className="text-sm font-semibold text-emerald-600" >{props.change}</h3>
            </div>
        </div>
    )
}

export default InsightsContainer;
