import React from "react";


function History(props){

    return (
        <div className="h-15 w-full  flex flex-wrap items-center border">
            <div className="h-50% w-[35%] flex flex-wrap gap-5 ml-5">
                <img src={props.image} className="h-7.5 w-7.5 rounded-2xl"></img>
                <p></p>
            </div>
            <div className="flex flex-wrap gap-20 justify-center">
                <div className="h-8 flex flex-wrap justify-center items-center rounded-2xl w-40 bg-gray-300">
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