import React from "react";
import DashCont from "./dashCont";


function Dashboard(){

    const userCont = [{user: "Total Users", count: 4824, growth: "+12%"},{user: "Active Users", count: 3824, growth: "+8%"},{user: "New Users", count: 1024, growth: "+20%"}]

    return (
        <div className="h-screen w-[84vw]">
            <div className="ml-5 mt-5 font-bold text-2xl">
                <h1>Dashboard</h1>
            </div>
            <div className="flex flex-wrap gap-5 mt-5 ml-5 ">
                {userCont.map((ele,idx)=>{
                    return <DashCont key={idx} user={ele.user} count={ele.count} growth={ele.growth}/>
                })}
            </div>
        </div>
    )
}

export default Dashboard