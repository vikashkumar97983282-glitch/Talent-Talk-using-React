import React from "react";


function HistoryContent(){


    

    return(
        <div className="hidden grid-cols-[minmax(220px,2fr)_minmax(120px,1fr)_minmax(110px,0.8fr)_minmax(120px,1fr)_minmax(100px,0.8fr)] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 md:grid">
                <p>User</p><p>Role</p><p>Status</p><p>Department</p><p>Joined</p>
        </div>
    )
}

export default HistoryContent;
