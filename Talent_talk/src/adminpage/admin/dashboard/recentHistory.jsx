import React from "react";


function History(props){
    return (
        <div className="mb-3 rounded-lg bg-indigo-50 p-3 transition-colors hover:bg-indigo-100">
            <div className="flex items-center gap-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16IKltmGi-BDqf01o3nCUbAxbZ3hWSLJz-A&s" alt="" className="h-10 w-10 rounded-md object-cover"/>
                <div className="min-w-0 flex-1">
                    <h1 className="truncate text-sm font-medium">Project: {props.project}</h1>
                    <p className="text-sm text-slate-600">{props.status}</p>
                </div>
                <div className="shrink-0">
                    <p className="text-xs text-slate-500">{props.time}</p>
                </div>
                
            </div>
        </div>
    )
}

export default History;
