import React from "react";


function HistoryContent(){


    

    return(
        <div className="hidden grid-cols-[minmax(0,2.15fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,0.8fr)] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 md:grid">
                <p>User</p><p>Role</p><p>Status</p><p>Department</p><p>Joined</p>
        </div>
    )
}

export default HistoryContent;
