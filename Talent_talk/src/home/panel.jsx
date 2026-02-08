import React from "react";

function Panel(props){
    return (
        <div className="h-[180px] w-[350px] bg-[rgb(187,128,39)] m-[26px] rounded-[10px] flex justify-center items-end" >  
            <button className="bg-[rgb(21,79,240)] h-[40px] w-[150px] mb-[10px] rounded-[22px]">{props.panel}</button>
        </div>
    )
}

export default Panel;