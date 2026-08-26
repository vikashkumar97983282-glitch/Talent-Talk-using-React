import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminPanel from "../admin/adminPanel/adminPanel";
import CompanyContainer from "./companyContainer";



function Company(){
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCompanies = async () => {
            try {
                const res = await axios.get("/admin/companies", { withCredentials: true });
                setCompanies(res.data?.companies || []);
            } catch (err) {
                console.log(err);
                setCompanies([]);
            } finally {
                setLoading(false);
            }
        };

        getCompanies();
    }, []);


    

    return (
        <div className="admin-page-theme flex min-h-screen w-full flex-col bg-slate-50 md:h-screen md:flex-row md:overflow-hidden">
            <AdminPanel/>
            <main className="min-w-0 flex-1 bg-slate-50 text-slate-700 md:overflow-y-auto">
            <div className="flex min-h-full w-full justify-center px-5 py-6 sm:px-8">
            <div className="mb-10 w-full max-w-6xl">
                <div className="flex flex-wrap justify-between mt-5 mb-5">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-950">Company Verification</h1>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 sm:gap-6 lg:gap-7">
                    {loading && <p className="text-sm text-slate-500">Loading companies...</p>}
                    {!loading && companies.length === 0 && <p className="text-sm text-slate-500">No companies found.</p>}
                    {companies.map((elem,idx)=>{
                        return <CompanyContainer key={idx} name={elem.name} cate={elem.category} desc={elem.description} img={elem.image}/>
                    })}
                </div>

                

            </div>
            </div>
            </main>
        </div>
    )
}

export default Company;
