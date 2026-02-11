import React from "react";


function Filter(){

    return (
        <div>
            <div className="">
                <label for="user"></label>
                <select id="user" name="user" className="w-20 bg-gray-400 rounded-2xl text-center">
                    <option value="vikash" className="w-20 bg-gray-400 text-center">vikash</option>
                    <option value="ram">ram</option>
                    <option value="filter" selected>filter</option>
                </select>
            </div>
        </div>
    )
}

export default Filter;