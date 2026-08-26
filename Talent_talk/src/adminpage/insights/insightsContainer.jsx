import React from "react";


function InsightsContainer(props){

    return (
        <div className='flex h-25 w-45 items-center rounded-2xl border border-sky-100 bg-white shadow-[0_10px_24px_rgba(14,165,233,0.10)]'>
            <div className="ml-5">
                <h1 className="text-sm font-medium text-slate-500">{props.title}</h1>
                <h2 className="font-bold tracking-tight text-slate-900">{props.value}</h2>
                <h3 className="text-sm font-semibold text-teal-600" >{props.change}</h3>
            </div>
        </div>
    )
}

export default InsightsContainer;
