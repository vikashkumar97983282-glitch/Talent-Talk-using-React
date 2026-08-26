import React from "react";
import { CircleDollarSign, Clock3 } from "lucide-react";

function PaymentStatus(props){
    const Icon = props.index === 0 ? CircleDollarSign : Clock3;
    const tone = props.index === 0 ? "bg-indigo-50 text-indigo-600" : "bg-amber-50 text-amber-600";

    return (
        
        <article className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(79,70,229,0.14)]">
            <div className="flex items-start justify-between"><div><p className="text-sm font-medium text-slate-500">{props.title}</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{props.amt}</h1></div><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon size={20}/></span></div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"><div className={`h-full w-2/3 rounded-full ${props.index === 0 ? "bg-indigo-500" : "bg-amber-500"}`}/></div>
        </article>
     
    )
}

export default PaymentStatus;
