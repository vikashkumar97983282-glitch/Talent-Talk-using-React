import React from "react";

function PaymentStatus(props){

    return (
        
        <div className="h-25 w-[48%] bg-gray-200 rounded-2xl  p-5 ">
            <p>{props.title}</p>
            <h1 className="font-bold">{props.amt}</h1>
        </div>
     
    )
}

export default PaymentStatus;