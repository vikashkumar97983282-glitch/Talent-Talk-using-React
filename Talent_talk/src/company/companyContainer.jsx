import React from "react";


function CompanyContainer(props){

    return (
        <div className="w-40">
            <div className="relative h-42 w-38 rounded-2xl  bg-amber-200 overflow-hidden">
                <img src={props.img} alt="" className="h-full w-full object-cover"/>
                <div className="absolute top-3 right-3 h-3 w-3 bg-gray-200 rounded-sm">
                </div>
            </div>
            <h4 className="mt-2 font-bold">{props.name}</h4>
            <h5>{props.cate}</h5>
            <p className="text-sm">{props.desc}</p>
        </div>
    )
}

export default CompanyContainer;