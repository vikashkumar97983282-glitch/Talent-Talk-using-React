import React from "react";

function PaymentHeader(props){

    return (
        <div className="">
            <div className="h-50% w-full flex flex-wrap gap-5 ml-5">
                <p>{props.header}</p>
            </div>
        </div>
    )
}

export default PaymentHeader;