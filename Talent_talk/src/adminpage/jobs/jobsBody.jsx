import React, { useEffect, useState } from "react";
import axios from "axios";
import JobContainer from "./jobsContainer";


function JobBody(){
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getJobs = async () => {
            try {
                const res = await axios.get("/admin/jobs", { withCredentials: true });
                setJobs(res.data?.jobs || []);
            } catch (err) {
                console.log(err);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        getJobs();
    }, []);



    return (
        <div className="flex min-h-full w-full justify-center px-5 py-6 sm:px-8">
            <div className="w-full max-w-6xl">
                <div>
                <div className="mb-6 mt-5 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-2xl font-bold tracking-tight text-slate-950">Job post approval</h1><p className="mt-1 text-sm text-slate-500">Review new opportunities and keep marketplace quality high.</p></div><span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 ring-1 ring-amber-100">{jobs.length} jobs to review</span></div>
                <div className="grid gap-5">
                    {loading && <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading jobs...</p>}
                    {!loading && jobs.length === 0 && <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">No jobs need review right now.</p>}
                    {jobs.map((elem,idx)=>{
                        return <JobContainer key={elem.id || idx} status={elem.status} title={elem.title} company={elem.companyName} time={elem.time} desc={elem.description} button={elem.status === "Approved" ? "View Job" : "Review Job"} img={elem.image}/>
                    })}
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default JobBody;
