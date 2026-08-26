import React, { useEffect, useState } from "react";
import AccountSettings from "./accountsetting";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";



function PersonalInfo(){

    const [user, setUser] = useState({});

    const navigate = useNavigate();
    const api = "/admin/"

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

    const getAvatarUrl = (avatarName) => {
        if (!avatarName) {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxnsgAbYVaKCxUrJ9-dnMi0RvQ5I2mPAFIlw&s";
        }
        const base = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
        return `${base}/uploads/${avatarName}`;
    };


    return (
        <div className="h-full min-w-0 flex-1 overflow-y-scroll px-10 pt-10 text-slate-700">
            <div className="flex flex-wrap items-center rounded-3xl border border-white/80 bg-white/75 p-6 shadow-[0_12px_30px_rgba(79,70,229,0.10)]">
                <img src={getAvatarUrl(user.avatar)} alt="" className="h-40 w-40 rounded-full object-cover ring-4 ring-violet-200 ring-offset-4 ring-offset-white"/>
                <div className="ml-5">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-950">{`${user.firstname || ""} ${user.lastname || ""}`.trim() || "Admin"}</h1>
                    <p className="font-medium text-violet-600">{user.role}</p>
                    <p className="text-sm text-slate-500">{user.createdAt ? `Joined in ${new Date(user.createdAt).getFullYear()}` : ""}</p>
                </div>
            </div>
            <div className="mt-5 h-50 w-[80%] rounded-3xl border border-white/80 bg-white/75 p-6 shadow-[0_12px_30px_rgba(79,70,229,0.10)]">
                <p className="font-bold text-slate-900">Personal information</p>
                <div className="mt-3 space-y-1 text-lg font-semibold text-slate-700">
                    <h1>Full Name:- {user.firstname} {user.lastname}</h1>
                    <h1>Email:- {user.email}</h1>
                    <h1>Phone:- {user.phone}</h1>
                    <h1>Location:- {user.address}</h1>
                </div>
                <div className="flex flex-wrap justify-end gap-5 mt-30">
                    <button className="h-9 w-26 cursor-pointer rounded-lg bg-indigo-600 text-center text-sm font-semibold text-white transition hover:bg-violet-600" onClick={accounthandle}>edit profile</button>
                    <button onClick={handlelogout} className="h-9 w-22 cursor-pointer rounded-lg border border-rose-200 bg-rose-50 text-center text-sm font-semibold text-rose-600 transition hover:bg-rose-500 hover:text-white">Logout</button>
                </div>
                
            </div>
        </div>
    )
}

export default PersonalInfo;

