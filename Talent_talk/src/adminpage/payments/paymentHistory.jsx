import React from "react";

function PaymentHistory(props){

    return (
        <div className="flex h-15 w-full flex-wrap items-center border-x border-b border-indigo-100 bg-white/75 text-sm text-slate-600 transition-colors hover:bg-violet-50/80">
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
