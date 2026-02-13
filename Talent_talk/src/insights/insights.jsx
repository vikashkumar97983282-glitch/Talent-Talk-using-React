import React from "react";
import Navbar from "../users/navbar";
import InsightsContainer from "./insightsContainer";
import InsightsCard from "./insightsCard";


function Insights(){

    const adminCont = [
  {
    title: "Revenue",
    value: "$2.5M",
    change: "+10%"
  },
  {
    title: "User Growth",
    value: "+15%",
    change: "+5%"
  },
  {
    title: "Project Completion",
    value: "92%",
    change: "+2%"
  },
  {
    title: "Active Bids",
    value: "1200",
    change: "+8%"
  }
];
    

    return (
        <div>
            <Navbar/>
            <div className="h-100% w-full flex flex-wrap justify-center">
            <div className="h-100% w-[70%] mb-10">
                <div className="flex flex-wrap justify-between mt-5 mb-5">
                    <h1 className="font-bold text-2xl">Admin Insights</h1>
                </div>
                <div className="flex flex-wrap gap-5">
                    {adminCont.map((elem,idx)=>{
                        return <InsightsContainer key={idx} title={elem.title} value={elem.value} change={elem.change}/>
                    })}
                </div>
                <InsightsCard/>

                

            </div>
        </div>
        </div>
    )
}

export default Insights;