import React from "react";
import './home.css'
import Panel from "./panel";


function Home(){

    const panels = ["student","company","admin"]


    return (
        <div className="parent">
            <div className="home">
            <h1>Welcome to Talent Talk</h1>
            
        </div>
            <div className="panel">
            {panels.map((elem,idx)=>{
                return <Panel key={idx} panel={elem}/>
            })}
        </div>
        </div>
        
    )
}

export default Home;