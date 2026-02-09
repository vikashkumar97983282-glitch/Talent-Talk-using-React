import React from "react";


function DashCont(props){
    return (
        <div className='w-55 bg-gray-400 h-25 rounded-md flex items-center'>
            <div className="ml-5">
                <h1>{props.user}</h1>
                <h2 className="font-bold">{props.count}</h2>
                <h3 className="text-green-700 font-bold" >{props.growth}</h3>
            </div>
        </div>
    )
}

export default DashCont;