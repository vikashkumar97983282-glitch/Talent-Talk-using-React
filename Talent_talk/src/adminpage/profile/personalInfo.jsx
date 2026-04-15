import React from "react";
import AccountSettings from "./accountsetting";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';



function PersonalInfo(){

    const navigate = useNavigate();
    const accounthandle = ()=>{
        navigate('/admin/settings/accountsetting')
    }

    const handlelogout = async ()=>{
        let res = await axios.post("http://localhost:3000/admin/logout",{},{withCredentials:true});
        console.log(res)
        if(res.data.success){
            navigate('/admin')
        }
    }

    return (
        <div className="h-full flex-1 min-w-0 overflow-y-scroll px-10 pt-10">
            <div className="flex flex-wrap items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxnsgAbYVaKCxUrJ9-dnMi0RvQ5I2mPAFIlw&s" alt="" className="h-40 w-40 rounded-full"/>
                <div className="ml-5">
                    <h1 className="font-bold">Rohit Sharma</h1>
                    <p>Admin</p>
                    <p>Joined in 2016</p>
                </div>
            </div>
            <div className="h-50 w-[80%] mt-5">
                <p className="font-bold">Personal information</p>
                <div className="font-bold text-2xl gap-10">
                    <h1>Full Name:- Rohit sharma</h1>
                    <h1>email:- rohit@gmail.com</h1>
                    <h1>phone:- 9798328268</h1>
                    <h1>location:- rajkot</h1>
                </div>
                <div className="flex flex-wrap justify-end gap-5">
                    <button className="h-8 w-22 bg-blue-800 items-center rounded-md text-white hover:bg-red-500 hover:text-black cursor-pointer text-center" onClick={accounthandle}>edit profile</button>
                    <button onClick={handlelogout} className="h-8 w-22 bg-blue-800 items-center rounded-md text-white hover:bg-red-500 hover:text-black cursor-pointer text-center">Logout</button>
                </div>
                
            </div>
        </div>
    )
}

export default PersonalInfo;
