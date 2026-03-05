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
        <div className=" ml-2.5">
            <div className="p-2 w-40">
                <h1 className="text-sm">Recent Activity</h1>
            </div>
            {history.map((ele,idx)=>{
                return <History key={idx} project={ele.project} status={ele.status} time={ele.time}/>
            })}
        </div>
    )
}

export default RecentActivity;