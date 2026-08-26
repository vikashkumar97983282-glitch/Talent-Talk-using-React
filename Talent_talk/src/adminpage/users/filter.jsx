import React from "react";


function Filter(){

    return (
        <div>
            <div className="">
                <label for="user"></label>
                <select id="user" name="user" className="h-9 w-24 rounded-lg border border-indigo-100 bg-white/80 text-center text-sm font-medium text-slate-600 outline-none focus:border-violet-300">
                    <option value="vikash">vikash</option>
                    <option value="ram">ram</option>
                    <option value="filter" selected>filter</option>
                </select>
            </div>
        </div>
    )
}

export default Filter;
