import React from "react";
import Filter from "./filter";
import History from "./historyContent";


function Center(){

    return (
        <div className="h-100% w-full flex flex-wrap justify-center bg-green-300 ">
            <div className="h-100% w-[70%] ">
                <div className="">
                <h1 className="font-bold text-2xl mt-5 mb-5">User Management</h1>
                <input type="text" placeholder="enter the value" className="h-10 w-full bg-gray-200 rounded-md p-5"/>
                </div>
                <div className="h-100% w-[70%] mt-5">
                    <Filter/>
                </div>
                <History/>
            </div>
            
        </div>
    )
}

export default Center;