import React from "react";


function HistoryContent(){

    return(
        <div className="h-10 w-full mt-5  flex flex-wrap items-center border rounded-t-2xl">
            <div className="h-50% w-[50%] flex flex-wrap gap-5 ml-5">
                <p>User</p>
                <p>Role</p>
            </div>
            <div className="flex flex-wrap gap-50 justify-center">
                <p>Status</p>
                <p>Actions</p>
            </div>
        </div>
    )
}

export default HistoryContent;