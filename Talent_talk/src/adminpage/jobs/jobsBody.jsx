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
                <div className="">
                <h1 className="mb-5 mt-5 text-2xl font-bold tracking-tight text-slate-950">Job Post Approval</h1>
                <div className="">
                    {loading && <p className="text-sm text-slate-500">Loading jobs...</p>}
                    {!loading && jobs.length === 0 && <p className="text-sm text-slate-500">No jobs found.</p>}
                    {jobs.map((elem,idx)=>{
                        return <JobContainer key={idx} status={elem.status} title={elem.title} desc={elem.description} button={elem.status === "Approved" ? "View Job" : "Review Job"} img={elem.image}/>
                    })}
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default JobBody;
