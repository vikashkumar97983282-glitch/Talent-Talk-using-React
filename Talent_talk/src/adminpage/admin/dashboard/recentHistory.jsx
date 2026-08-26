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
<<<<<<< HEAD
        <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3 transition-colors hover:bg-slate-100">
=======
        <div className="mb-3 rounded-xl border border-indigo-100/80 bg-indigo-50/60 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:bg-violet-50">
>>>>>>> 0cc237e (change css and structure in admin page.)
            <div className="flex items-center gap-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16IKltmGi-BDqf01o3nCUbAxbZ3hWSLJz-A&s" alt="" className="h-10 w-10 rounded-lg object-cover ring-2 ring-white"/>
                <div className="min-w-0 flex-1">
<<<<<<< HEAD
                    <h1 className="truncate text-sm font-medium text-slate-800">{props.project}</h1>
                    <p className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${badgeStyle}`}>{props.status}</p>
=======
                    <h1 className="truncate text-sm font-semibold text-slate-800">Project: {props.project}</h1>
                    <p className="text-sm text-slate-500">{props.status}</p>
>>>>>>> 0cc237e (change css and structure in admin page.)
                </div>
                <div className="shrink-0">
                    <p className="text-xs font-medium text-slate-400">{props.time}</p>
                </div>
                
            </div>
        </div>
    )
}

export default History;
