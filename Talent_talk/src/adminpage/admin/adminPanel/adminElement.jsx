import React from "react";
import { useNavigate } from "react-router-dom";



function AdminElement(props){

    const navigate = useNavigate('')
    
    const user = ()=>{
        let rot = props.name.toLowerCase()
        navigate(`/${rot}`)
        console.log(rot.toLowerCase())
    } 

    return (
        <div className="flex flex-col items-center">
            <button onClick={user} className="h-10 w-[83%] text-black bg-aliceblue m-px cursor-pointer flex justify-start gap-5 items-center rounded-md hover:bg-gray-500">
                <img src={props.img} alt="" className="h-4.5 w-4.5 ml-2"/>{props.name}
            </button>
        </div>
    )
}

export default AdminElement;