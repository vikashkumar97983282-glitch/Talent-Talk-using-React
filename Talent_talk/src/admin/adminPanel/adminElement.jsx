import React from "react";



function AdminElement(props){
    return (
        <div className="flex flex-col items-center">
            <button className="h-10 w-[83%] text-black bg-aliceblue m-px cursor-pointer flex justify-start gap-5 items-center">
                <img src={props.img} alt="" className="h-4.5 w-4.5"/>{props.name}
            </button>
        </div>
    )
}

export default AdminElement;