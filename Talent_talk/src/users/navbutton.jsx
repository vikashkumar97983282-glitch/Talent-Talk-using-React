import React from "react";
import { useNavigate } from "react-router-dom";



function NavButton(props){

    const navigate = useNavigate('')

    const btn = props.elem.toLowerCase();

    const btnclk =()=> {
        console.log("hello")
        navigate(`/${btn}`)
    }



    return (
        <div className="ml-5 ">
            <button className="m-5 font-medium" onClick={btnclk}>{props.elem}</button>
        </div>
    )
}

export default NavButton;