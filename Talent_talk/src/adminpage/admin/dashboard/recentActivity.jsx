import React from "react";
import History from "./recentHistory";
import { useAdminTheme } from "../adminThemeHook";


function RecentActivity({ history = [] }){
    const { theme } = useAdminTheme();

    return (
        <div className={`rounded-xl border p-4 shadow-[0_12px_30px_rgba(14,165,233,0.10)] backdrop-blur ${theme === "dark" ? "border-slate-700/70 bg-[#142033]" : "border-sky-100 bg-white/85"}`}>
            <div className="mb-4">
                <h1 className={`text-sm font-semibold tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>Recent Activity</h1>
            </div>
            {history.map((ele,idx)=>{
                return <History key={idx} project={ele.project} status={ele.status} time={ele.time}/>
            })}
        </div>
    )
}

export default RecentActivity;
