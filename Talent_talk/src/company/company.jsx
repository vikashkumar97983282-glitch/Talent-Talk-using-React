import React from "react";
import Navbar from "../users/navbar";
import CompanyContainer from "./companyContainer";



function Company(){

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
                    <h1 className="font-bold text-2xl">Company Verification</h1>
                </div>
                <div className="flex flex-wrap gap-5">
                    <CompanyContainer/>
                </div>

                

            </div>
        </div>
        </div>
    )
}

export default Company;