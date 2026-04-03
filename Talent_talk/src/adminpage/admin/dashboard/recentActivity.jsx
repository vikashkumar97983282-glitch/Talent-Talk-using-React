import React from "react";
import History from "./recentHistory";


function RecentActivity(){

   const history = [
  { project: "Website Redesign", status: "completed", time: "2 hours ago" },
  { project: "Mobile App UI", status: "in progress", time: "5 hours ago" },
  { project: "API Integration", status: "pending", time: "1 day ago" },
  { project: "Bug Fixing", status: "completed", time: "2 days ago" },
  { project: "New Feature Release", status: "in review", time: "3 days ago" },
  { project: "Performance Optimization", status: "completed", time: "1 week ago" }
];

    return (
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-indigo-100">
            <div className="mb-3">
                <h1 className="text-base font-semibold">Recent Activity</h1>
            </div>
            {history.map((ele,idx)=>{
                return <History key={idx} project={ele.project} status={ele.status} time={ele.time}/>
            })}
        </div>
    )
}

export default RecentActivity;
