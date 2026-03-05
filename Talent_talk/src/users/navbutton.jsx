import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";




function NavButton(props){

    const navigate = useNavigate()
    const location = useLocation()

    const btn = props.elem.toLowerCase();
    const [isActive,setActive] = useState(false);

    const btnclk =()=> {
        console.log("hello")
        navigate(`/${btn}`)
        setActive(true)
        
    }



    return (
        <div className="ml-5 cursor-pointer">
            <button className={`m-5 font-medium cursor-pointer hover:text-red-600 hover:scale-110 transition-transform duration-150 ${isActive? "text-blue-600":"text-black"} focus:outline-none focus:ring-2 focus:ring-blue-700`} onClick={btnclk}>{props.elem}</button>
        </div>
    )
}

export default NavButton;