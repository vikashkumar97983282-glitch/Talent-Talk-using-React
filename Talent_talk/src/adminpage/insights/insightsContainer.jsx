import React from "react";
import { BriefcaseBusiness, ChartNoAxesCombined, CircleDollarSign, UsersRound } from "lucide-react";


function InsightsContainer(props){
    const cardStyles = [
        { icon: CircleDollarSign, accent: "from-indigo-500 to-violet-500", iconBg: "bg-indigo-50 text-indigo-600" },
        { icon: UsersRound, accent: "from-cyan-500 to-sky-500", iconBg: "bg-cyan-50 text-cyan-600" },
        { icon: ChartNoAxesCombined, accent: "from-emerald-500 to-teal-500", iconBg: "bg-emerald-50 text-emerald-600" },
        { icon: BriefcaseBusiness, accent: "from-amber-500 to-orange-500", iconBg: "bg-amber-50 text-amber-600" },
    ];
    const style = cardStyles[props.index % cardStyles.length];
    const Icon = style.icon;

    return (
        <article className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(79,70,229,0.14)]">
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${style.accent}`} />
            <div className="flex items-start justify-between gap-3 pt-1">
                <div><h1 className="text-sm font-medium text-slate-500">{props.title}</h1><h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{props.value}</h2></div>
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.iconBg}`}><Icon size={20} /></span>
            </div>
            <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-emerald-600" >{props.change}</h3>
        </article>
    )
}

export default InsightsContainer;
