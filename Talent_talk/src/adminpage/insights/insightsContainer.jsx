import React from "react";


function InsightsContainer(props){

    return (
        <div className='w-45 bg-gray-200 h-25 rounded-md flex items-center'>
            <div className="ml-5">
                <h1>{props.title}</h1>
                <h2 className="font-bold">{props.value}</h2>
                <h3 className="text-green-700 " >{props.change}</h3>
            </div>
        </div>
    )
}

export default InsightsContainer;