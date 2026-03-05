import React from "react";
import Login from "../login/login";
import { useNavigate } from "react-router-dom";

function Panel(props){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    }
    
    return (
        <div className="h-[180px] w-[350px] bg-[rgb(187,128,39)] m-[26px] rounded-[10px] flex justify-center items-end" >  
            <button className="bg-[rgb(21,79,240)] h-[40px] w-[150px] mb-[10px] rounded-[22px]" onClick={handleClick}>{props.panel}</button>
        </div>
    )
}

export default Panel;