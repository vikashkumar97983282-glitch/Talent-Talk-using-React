import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { BadgeCheck, LockKeyhole, LogOut, Pencil, ShieldCheck } from "lucide-react";



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
        <div className="min-w-0 flex-1 px-5 py-6 text-slate-700 sm:px-10 sm:py-10 md:h-full md:overflow-y-scroll">
            <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Account settings</h1><p className="mt-1 text-sm text-slate-500">Manage your profile details and account access.</p></div>
            <div className="flex flex-col gap-5 rounded-3xl border border-white/80 bg-white/75 p-6 shadow-[0_16px_38px_rgba(79,70,229,0.12)] sm:flex-row sm:items-center">
                <img src={getAvatarUrl(user.avatar)} alt="Admin profile" className="h-28 w-28 rounded-full object-cover ring-4 ring-violet-200 ring-offset-4 ring-offset-white sm:h-32 sm:w-32"/>
                <div className="min-w-0 flex-1">
                    <h2 className="truncate text-2xl font-bold tracking-tight text-slate-950">{`${user.firstname || ""} ${user.lastname || ""}`.trim() || "Admin"}</h2>
                    <p className="mt-2 inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">{user.role || "Administrator"}</p>
                    <p className="mt-2 text-sm text-slate-500">{user.createdAt ? `Member since ${new Date(user.createdAt).getFullYear()}` : ""}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3"><button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-600" onClick={accounthandle}><Pencil size={15}/>Edit profile</button><button onClick={handlelogout} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-600 transition hover:bg-rose-500 hover:text-white"><LogOut size={15}/>Logout</button></div>
            </div>
            <div className="mt-5 grid w-full max-w-6xl gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
            <section className="rounded-3xl border border-white/80 bg-white/75 p-6 shadow-[0_16px_38px_rgba(79,70,229,0.12)]">
                <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><ShieldCheck size={20}/></span><div><p className="font-bold text-slate-900">Personal information</p><p className="text-sm text-slate-500">Your account contact details.</p></div></div>
                <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                    <p className="rounded-2xl bg-slate-50 p-4"><span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Full name</span><span className="mt-1 block text-base font-semibold text-slate-800">{user.firstname} {user.lastname}</span></p>
                    <p className="rounded-2xl bg-slate-50 p-4"><span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Email</span><span className="mt-1 block break-all text-base font-semibold text-slate-800">{user.email}</span></p>
                    <p className="rounded-2xl bg-slate-50 p-4"><span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Phone</span><span className="mt-1 block text-base font-semibold text-slate-800">{user.phone}</span></p>
                    <p className="rounded-2xl bg-slate-50 p-4"><span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Location</span><span className="mt-1 block text-base font-semibold text-slate-800">{user.address}</span></p>
                </div>
                
            </section>
            <aside className="rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-6 text-white shadow-[0_16px_38px_rgba(49,46,129,0.25)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-cyan-200"><LockKeyhole size={21}/></span>
                <h3 className="mt-5 text-lg font-bold tracking-tight">Account security</h3>
                <p className="mt-2 text-sm leading-6 text-indigo-100/75">Keep your profile protected by regularly updating your password and review your account information.</p>
                <div className="mt-6 space-y-3 border-t border-white/10 pt-5"><p className="flex items-center gap-2 text-sm font-medium text-indigo-50"><BadgeCheck size={16} className="text-cyan-300"/>Profile information ready</p><p className="flex items-center gap-2 text-sm font-medium text-indigo-50"><ShieldCheck size={16} className="text-cyan-300"/>Secure admin workspace</p></div>
                <button onClick={accounthandle} className="mt-6 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-indigo-800 transition hover:bg-cyan-50">Manage security</button>
            </aside>
            </div>
        </div>
    )
}

export default PersonalInfo;

