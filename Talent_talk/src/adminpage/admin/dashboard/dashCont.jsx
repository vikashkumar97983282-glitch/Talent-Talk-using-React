import React from "react";


function DashCont(props){
    return (
        <div className='flex h-25 w-55 items-center rounded-md bg-gradient-to-br from-indigo-100 to-sky-50 text-slate-800 shadow-sm'>
            <div className="px-5">
                <h1 className="text-sm text-slate-600">{props.user}</h1>
                <h2 className="text-2xl font-bold">{props.count}</h2>
                <h3 className="text-sm font-bold text-indigo-600" >{props.growth}</h3>
            </div>
        </div>
    )
}

export default DashCont;
