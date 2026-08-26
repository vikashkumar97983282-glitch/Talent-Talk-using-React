import React from "react";


function HistoryContent(){


    

    return(
        <div className="mt-5 flex h-11 w-full flex-wrap items-center rounded-t-2xl border border-sky-100 bg-sky-50/80 text-xs font-bold uppercase tracking-wider text-sky-700">
            <div className="h-50% w-[35%] flex flex-wrap gap-5 ml-5">
                <p>User</p>
                <p>Role</p>
            </div>
            <div className="flex flex-wrap gap-40 justify-center">
                <p>Status</p>
                <p>Actions</p>
            </div>
        </div>
    )
}

export default HistoryContent;
