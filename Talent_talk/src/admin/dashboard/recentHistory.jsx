import React from "react";


function History(props){
    return (
        <div className="h-12 w-[90%] bg-white-100 ml-2.5 rounded-lg gap-2 mb-2 hover:bg-gray-100">
            <div className="p-1 flex items-center gap-2">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16IKltmGi-BDqf01o3nCUbAxbZ3hWSLJz-A&s" alt="" className="h-10.5 w-9.5"/>
                <div className="ml-2 w-[30%]">
                    <h1 className="text-sm">Project : {props.project}</h1>
                    <p>{props.status}</p>
                </div>
                <div className="ml-120">
                    <p className="text-xs">{props.time}</p>
                </div>
                
            </div>
        </div>
    )
}

export default History;