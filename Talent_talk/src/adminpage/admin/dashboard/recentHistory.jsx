import React from "react";


function History(props){
    return (
        <div className="mb-3 rounded-2xl border border-white bg-white p-3 shadow-sm transition-colors hover:bg-violet-50/40">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 text-xs font-bold text-white shadow-sm">
                    {String(props.project || "A").slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                    <h1 className="truncate text-sm font-semibold text-slate-900">Project: {props.project}</h1>
                    <p className="text-sm text-slate-500">{props.status}</p>
                </div>
                <div className="shrink-0">
                    <p className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">{props.time}</p>
                </div>
                
            </div>
        </div>
    )
}

export default History;
