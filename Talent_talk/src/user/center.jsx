import React from "react";


function Center(){

    return (
        <div className="h-100% w-full flex flex-wrap justify-center bg-green-300 ">
            <div className="h-100% w-[70%] ">
                <div className="">
                <h1 className="font-bold text-2xl mt-5 mb-5">User Management</h1>
                <input type="text" placeholder="enter the value" className="h-10 w-full bg-yellow-400 rounded-md p-5"/>
                </div>
            </div>
            
        </div>
    )
}

export default Center;