import React from "react";
import Panel from "./panel";
import { Outlet } from "react-router-dom";


function Home(){

    const panels = ["student","company","admin"]


    return (
        <div className="h-screen w-full bg-[rgb(12,12,12)] flex items-center">
            <div className="h-full w-full bg-[rgb(20,193,223)] flex justify-center flex-wrap m-0">
            <h1>Welcome to Talent Talk</h1>
            
        </div>
            <div className="h-screen w-[416] bg-[rgb(6,37,141)]">
            {panels.map((elem,idx)=>{
                return <Panel key={idx} panel={elem}/>
            })}
            <Outlet/>
        </div>
        </div>
        
    )
}

export default Home;