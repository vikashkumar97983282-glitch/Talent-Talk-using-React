import React from "react";


function History(props){
    const fallbackImage = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop&q=60";

    return (
        <div className="flex h-15 w-full flex-wrap items-center border-x border-b border-indigo-100 bg-white/75 text-sm text-slate-600 transition-colors hover:bg-violet-50/80">
            <div className="h-50% w-[35%] flex flex-wrap gap-5 ml-5">
                <img src={props.image || fallbackImage} className="h-7.5 w-7.5 rounded-2xl ring-2 ring-white"></img>
                <p></p>
            </div>
            <div className="flex flex-wrap gap-20 justify-center">
                <div className="flex h-8 w-40 flex-wrap items-center justify-center rounded-2xl bg-indigo-100 text-xs font-semibold text-indigo-700">
                    <p>{props.role}</p>
                </div>
                <p>{props.action}</p>
            </div>
            <div className="flex flex-wrap ml-40">
                <p>{props.dept}</p>
            </div>
        </div>
    )
}

export default History;
