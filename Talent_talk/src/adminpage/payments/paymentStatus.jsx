import React from "react";

function PaymentStatus(props){

    return (
        
        <div className="h-25 w-[48%] rounded-2xl border border-white/80 bg-white/80 p-5 shadow-[0_10px_24px_rgba(79,70,229,0.10)]">
            <p className="text-sm font-medium text-slate-500">{props.title}</p>
            <h1 className="mt-1 font-bold tracking-tight text-slate-900">{props.amt}</h1>
        </div>
     
    )
}

export default PaymentStatus;
