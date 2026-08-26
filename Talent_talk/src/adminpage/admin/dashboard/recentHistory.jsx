import React from "react";
import { useAdminTheme } from "../adminThemeHook";


function History(props){
    const { theme } = useAdminTheme();
    const statusStyles = {
        completed: "bg-emerald-50 text-emerald-700",
        "in progress": "bg-amber-50 text-amber-700",
        pending: "bg-slate-100 text-slate-700",
        "in review": "bg-sky-50 text-sky-700"
    };

    const badgeStyle = statusStyles[props.status] || "bg-slate-100 text-slate-700";

    return (
        <div className={`mb-2 rounded-lg border p-3 transition-colors ${theme === "dark" ? "border-white/5 bg-white/[0.04] hover:bg-white/[0.08]" : "border-sky-100 bg-sky-50/60 hover:bg-cyan-50"}`}>
            <div className="flex items-center gap-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16IKltmGi-BDqf01o3nCUbAxbZ3hWSLJz-A&s" alt="" className="h-10 w-10 rounded-lg object-cover ring-2 ring-white"/>
                <div className="min-w-0 flex-1">
                    <h1 className={`truncate text-sm font-medium ${theme === "dark" ? "text-zinc-200" : "text-slate-800"}`}>Project: {props.project}</h1>
                    <p className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${badgeStyle}`}>{props.status}</p>
                </div>
                <div className="shrink-0">
                    <p className="text-xs font-medium text-slate-400">{props.time}</p>
                </div>
                
            </div>
        </div>
    )
}

export default History;
