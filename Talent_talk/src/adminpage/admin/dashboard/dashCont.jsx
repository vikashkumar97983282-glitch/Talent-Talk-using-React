import React from "react";
import { useAdminTheme } from "../adminThemeHook";


function DashCont(props){
    const { theme } = useAdminTheme();
    return (
        <div className={`min-w-[180px] flex-1 rounded-xl border p-4 transition-colors sm:min-w-52 ${theme === "dark" ? "border-slate-700/70 bg-[#142033] text-slate-300 hover:border-cyan-400/40 hover:bg-[#182940]" : "border-sky-100 bg-white text-slate-700 hover:border-sky-200 hover:bg-sky-50"}`}>
            <div>
                <h1 className={`text-xs font-medium ${theme === "dark" ? "text-zinc-500" : "text-slate-500"}`}>{props.user}</h1>
                <h2 className={`mt-2 text-2xl font-semibold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-950"}`}>{props.count}</h2>
                <h3 className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-emerald-400" >{props.growth}</h3>
            </div>
        </div>
    )
}

export default DashCont;
