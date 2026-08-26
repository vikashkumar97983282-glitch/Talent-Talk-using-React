import React from "react";

function PaymentHeader(props){

    return (
        <div className="">
            <div className="ml-5 flex h-50% w-full flex-wrap gap-5">
                <p>{props.header}</p>
            </div>
        </div>
    )
}

export default PaymentHeader;
