import React from "react";

function PaymentHistory(props){

    return (
        <div className="h-15 w-full  flex flex-wrap items-center border">
            <div className=" flex flex-wrap justify-between gap-15 ml-5">
                <p className="w-25">{props.id}</p>
                <p className="w-25">{props.freelancer}</p>
                <p className="w-25">{props.client}</p>
                <p className="w-20">{props.amount}({props.cur})</p>
                <p className="w-22">{props.date}</p>
                <p className="w-25">{props.status}</p>
            </div>
        </div>
    )
}

export default PaymentHistory;