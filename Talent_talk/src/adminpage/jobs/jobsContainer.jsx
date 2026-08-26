import React from "react";


function JobContainer(props){
    const fallbackImage = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&auto=format&fit=crop&q=60";

    return (
        <div className="mb-5 flex flex-wrap overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-[0_10px_24px_rgba(14,165,233,0.10)]">
            <div className="w-[68%] p-5">
                <h3 className="text-sm font-semibold text-sky-600">{props.status}</h3>
                <h1 className="mt-1 font-bold text-slate-900">{props.title}</h1>
                <p className="mt-1 text-sm text-slate-500">{props.desc}</p>
                <button className="mt-3 h-9 w-30 rounded-lg bg-sky-100 text-sm font-semibold text-sky-700 transition hover:bg-sky-600 hover:text-white">{props.button}</button>
            </div>
            <div>
                <img src={props.img || fallbackImage} alt="" className="h-43.5 w-75 object-cover" />
            </div>
        </div>
    )
}

export default JobContainer;
