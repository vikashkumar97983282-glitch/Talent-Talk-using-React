import React from "react";
import AdminPanel from "../admin/adminPanel/adminPanel";
import JobBody from "./jobsBody";


function Job(){

    return (
        <div className="admin-page-theme flex h-screen w-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,_#dff7ff_0%,_transparent_32%),linear-gradient(135deg,_#f8fcff_0%,_#eef8ff_52%,_#f3fbfa_100%)]">
            <AdminPanel/>
            <main className="min-w-0 flex-1 overflow-y-auto bg-transparent text-slate-700">
                <JobBody/>
            </main>
        </div>
    )
}

export default Job;
