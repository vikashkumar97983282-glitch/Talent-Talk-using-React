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
        <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
            <AdminPanel/>
            <main className="min-w-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_48%,_#f5f3ff_100%)] text-slate-700">
            <div className="flex min-h-full w-full justify-center px-5 py-6 sm:px-8">
            <div className="mb-10 w-full max-w-6xl">
                <div className="flex flex-wrap justify-between mt-5 mb-5">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-950">Admin Insights</h1>
                </div>
                <div className="flex flex-wrap gap-5">
                    {adminCont.map((elem,idx)=>{
                        return <InsightsContainer key={idx} title={elem.title} value={elem.value} change={elem.change}/>
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
