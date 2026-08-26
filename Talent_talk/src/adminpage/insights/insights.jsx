import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminPanel from "../admin/adminPanel/adminPanel";
import InsightsContainer from "./insightsContainer";
import InsightsCard from "./insightsCard";


function Insights(){
    const [adminCont, setAdminCont] = useState([]);
    const [meta, setMeta] = useState({});

    useEffect(() => {
        const getInsights = async () => {
            try {
                const res = await axios.get("/admin/insights", { withCredentials: true });
                setAdminCont(res.data?.cards || []);
                setMeta(res.data?.meta || {});
            } catch (err) {
                console.log(err);
                setAdminCont([]);
            }
        };

        getInsights();
    }, []);
    

    return (
        <div className="admin-page-theme flex min-h-screen w-full flex-col bg-slate-50 md:h-screen md:flex-row md:overflow-hidden">
            <AdminPanel/>
            <main className="min-w-0 flex-1 bg-slate-50 text-slate-700 md:overflow-y-auto">
            <div className="flex min-h-full w-full justify-center px-5 py-6 sm:px-8">
            <div className="mb-10 w-full max-w-6xl">
                <div className="mb-7 mt-5 flex flex-wrap items-end justify-between gap-3">
                    <div><h1 className="text-2xl font-bold tracking-tight text-slate-950">Admin Insights</h1><p className="mt-1 text-sm text-slate-500">A live view of platform performance and activity.</p></div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">Live data</span>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-5 sm:gap-6">
                    {adminCont.map((elem,idx)=>{
                        return <InsightsContainer key={idx} title={elem.title} value={elem.value} change={elem.change} index={idx}/>
                    })}
                </div>
                <InsightsCard meta={meta}/>

                

            </div>
            </div>
            </main>
        </div>
    )
}

export default Insights;
