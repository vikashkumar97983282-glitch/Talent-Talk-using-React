import React from "react";
import { useAdminTheme } from "../adminThemeHook";

function EarnOverview(){
    const { theme } = useAdminTheme();
    return (
        <div className={`w-full rounded-xl border p-5 shadow-[0_12px_30px_rgba(14,165,233,0.10)] ${theme === "dark" ? "border-slate-700/70 bg-[#142033]" : "border-sky-100 bg-white/90"}`}>
            <div className="flex items-start justify-between">
                <div>
                    <h1 className={`text-xs font-medium ${theme === "dark" ? "text-zinc-500" : "text-slate-500"}`}>Total revenue</h1>
                    <h2 className={`mt-2 text-3xl font-semibold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-950"}`}>$89,012</h2>
                    <h3 className="mt-2 text-xs font-medium text-emerald-400" >+25.0% from last month</h3>
                </div>
                <div className="h-10 w-20 text-emerald-400" aria-hidden="true">
                    <svg viewBox="0 0 80 36" className="h-full w-full" fill="none"><path d="M2 29C13 27 16 15 25 20C34 25 37 28 45 17C53 6 57 18 65 11C71 6 74 7 78 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
            </div>
        </div>
    )
}

export default EarnOverview;
