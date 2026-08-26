import React from "react";


function History(props){
    return (
        <div className="mb-3 rounded-xl border border-indigo-100/80 bg-indigo-50/60 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:bg-violet-50">
            <div className="flex items-center gap-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16IKltmGi-BDqf01o3nCUbAxbZ3hWSLJz-A&s" alt="" className="h-10 w-10 rounded-lg object-cover ring-2 ring-white"/>
                <div className="min-w-0 flex-1">
                    <h1 className="truncate text-sm font-semibold text-slate-800">Project: {props.project}</h1>
                    <p className="text-sm text-slate-500">{props.status}</p>
                </div>
                <div className="shrink-0">
                    <p className="text-xs font-medium text-slate-400">{props.time}</p>
                </div>
                
            </div>
        </div>
    )
}

export default History;
