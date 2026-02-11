import React from "react";


function History(props){

    return (
        <div className="h-10 w-full  flex flex-wrap items-center border ">
            <div className="h-50% w-[40%] flex flex-wrap gap-5 ml-5">
                <img src={props.image} className="h-7.5 w-7.5 rounded-2xl"></img>
                <p>Role</p>
            </div>
            <div className="flex flex-wrap gap-25 justify-center">
                <p>{props.role}</p>
                <p>{props.action}</p>
            </div>
            <div className="flex flex-wrap ml-40">
                <p>{props.dept}</p>
            </div>
        </div>
    )
}

export default History;