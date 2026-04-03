import React from "react";
import Login from "../login/login";
import { Link, useNavigate } from "react-router-dom";

function Panel(props){
    const navigate = useNavigate();
    const handleClick = () => {
        if(props.panel === "admin"){
        navigate("/admin");
    }

    if(props.panel === "company"){
        navigate("/company");
    }

    if(props.panel === "student"){
        navigate("/client");
    }
    }
    
    return (
        
            <div className="h-[180px] w-[350px] bg-[rgb(187,128,39)] m-[18px] rounded-[10px] flex justify-center items-end" >  
            <button className="bg-[rgb(21,79,240)] h-[40px] w-[145px] mb-[10px] rounded-[22px] hover:bg-blue-500 cursor-pointer" onClick={handleClick}>{props.panel}</button>
        </div>
        
        
    )
}

export default Panel;