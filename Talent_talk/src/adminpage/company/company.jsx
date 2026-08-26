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
<<<<<<< HEAD
        <div>
            <Navbar/>
            <div className="w-full bg-slate-100 px-4 py-6 md:px-8">
            <div className="mx-auto w-full max-w-6xl">
                <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Company Verification</h1>
                      <p className="mt-1 text-sm text-slate-600">Review company profiles and verify trusted organizations.</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">
                      Total: {companies.length} companies
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
=======
        <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
            <AdminPanel/>
            <main className="min-w-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_#e0e7ff_0%,_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_48%,_#f5f3ff_100%)] text-slate-700">
            <div className="flex min-h-full w-full justify-center px-5 py-6 sm:px-8">
            <div className="mb-10 w-full max-w-6xl">
                <div className="flex flex-wrap justify-between mt-5 mb-5">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-950">Company Verification</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                    {loading && <p className="text-sm text-slate-500">Loading companies...</p>}
                    {!loading && companies.length === 0 && <p className="text-sm text-slate-500">No companies found.</p>}
>>>>>>> 0cc237e (change css and structure in admin page.)
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
