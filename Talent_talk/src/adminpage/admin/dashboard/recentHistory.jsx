import React from "react";


function History(props){
    const statusStyles = {
        completed: "bg-emerald-50 text-emerald-700",
        "in progress": "bg-amber-50 text-amber-700",
        pending: "bg-slate-100 text-slate-700",
        "in review": "bg-sky-50 text-sky-700"
    };

    const badgeStyle = statusStyles[props.status] || "bg-slate-100 text-slate-700";

    return (
        <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:bg-slate-100">
            <div className="flex items-center gap-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16IKltmGi-BDqf01o3nCUbAxbZ3hWSLJz-A&s" alt="" className="h-10 w-10 rounded-md object-cover"/>
                <div className="min-w-0 flex-1">
                    <h1 className="truncate text-sm font-medium text-slate-800">{props.project}</h1>
                    <p className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${badgeStyle}`}>{props.status}</p>
                </div>
                <div className="shrink-0">
                    <p className="text-xs text-slate-500">{props.time}</p>
                </div>
                
            </div>
        </div>
    )
}

export default History;
