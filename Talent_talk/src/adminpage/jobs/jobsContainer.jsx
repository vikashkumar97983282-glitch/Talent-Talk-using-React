import React from "react";


function JobContainer(props){

    return (
        <div className="flex flex-wrap mb-8">
            <div className="w-[68%] p-2">
                <h3>{props.status}</h3>
                <h1 className="font-bold">{props.title}</h1>
                <p>{props.desc}</p>
                <button className="bg-gray-200 h-8 w-30 rounded-2xl mt-2">{props.button}</button>
            </div>
            <div>
                <img src={props.img} alt="" className="h-43.5 w-75 rounded-md" />
            </div>
        </div>
    )
}

export default JobContainer;