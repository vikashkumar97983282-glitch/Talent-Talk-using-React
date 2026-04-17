import React, { useEffect, useState } from "react";
import AccountSettings from "./accountsetting";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";



function PersonalInfo(){

    const [user, setUser] = useState([]);

    const navigate = useNavigate();
    const api = "http://localhost:3000/admin/"

    const accounthandle = ()=>{
        navigate('/admin/settings/accountsetting')
    };

    const handlelogout = async ()=>{
        try{
            let res = await axios.post(`${api}logout`,{},{withCredentials:true});
        
            if(res.data.success){
                navigate('/admin')
                toast.success(res.data.message)
            }
        }
        catch(err){
            console.log(err)
        }
    };

    useEffect(()=>{
        const admin = async ()=>{
            let res = await axios.get(`${api}profile`,{withCredentials:true});
            setUser(res.data);
        }
        admin();
    },[]);



    return (
        <div className="h-full flex-1 min-w-0 overflow-y-scroll px-10 pt-10">
            <div className="flex flex-wrap items-center">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxnsgAbYVaKCxUrJ9-dnMi0RvQ5I2mPAFIlw&s" alt="" className="h-40 w-40 rounded-full"/>
                <div className="ml-5">
                    <h1 className="font-bold">Rohit Sharma</h1>
                    <p>{user.role}</p>
                    <p>Joined in {new Date(user.createdAt).getFullYear()}</p>
                </div>
            </div>
            <div className="h-50 w-[80%] mt-5">
                <p className="font-bold">Personal information</p>
                <div className="font-bold text-2xl gap-10">
                    <h1>Full Name:- {user.firstname} {user.lastname}</h1>
                    <h1>Email:- {user.email}</h1>
                    <h1>Phone:- {user.phone}</h1>
                    <h1>Location:- {user.address}</h1>
                </div>
                <div className="flex flex-wrap justify-end gap-5 mt-30">
                    <button className="h-8 w-22 bg-blue-800 items-center rounded-md text-white hover:bg-red-500 hover:text-black cursor-pointer text-center" onClick={accounthandle}>edit profile</button>
                    <button onClick={handlelogout} className="h-8 w-22 bg-blue-800 items-center rounded-md text-white hover:bg-red-500 hover:text-black cursor-pointer text-center">Logout</button>
                </div>
                
            </div>
        </div>
    )
}

export default PersonalInfo;
