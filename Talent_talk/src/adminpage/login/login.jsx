import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();



    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const res = await axios.post("/admin/login",{email,password},
                {withCredentials: true});
                console.log(res.data)

            if (res.data.success){
            toast.success(res.data.message);
            navigate("/admin/dashboard");
            } else {
                setEmail("");
                setPassword("");
                toast.success("invalid email or password !");
            }
        }
        catch(err){
            console.log(err)
            toast.error("invalid credentials")
        }
    
        
    }



    return (
        <div className="flex h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_top_left,_#7c3aed_0%,_transparent_30%),linear-gradient(135deg,_#0f172a_0%,_#312e81_55%,_#4c1d95_100%)]">
            <Link to="/" className="absolute right-7 top-7 flex h-10 min-w-24 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 text-white backdrop-blur transition hover:bg-white/20">
                    Home
                </Link>
            <div className="relative mb-8 flex h-92.5 w-155 justify-center rounded-3xl border border-white/20 bg-white/10 p-7.5 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl">
                
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-10 text-center text-xl font-bold tracking-tight text-white">Admin Login</h2>
                    <input type="email" placeholder="email" required onChange={(e)=>{setEmail(e.target.value)}} value={email} className="mb-5 h-10 w-64 rounded-lg border border-white/20 bg-white/90 px-3 text-slate-800 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-violet-300/40"/>
                    <br/>
                    <input type="password" placeholder="password" required autoComplete="" onChange={(e)=>{setPassword(e.target.value)}} value={password} className="mb-5 h-10 w-64 rounded-lg border border-white/20 bg-white/90 px-3 text-slate-800 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-violet-300/40"/>
                    <br/>
                    <button type="submit" className="mb-4 mt-8.75 h-10 w-full cursor-pointer rounded-xl border-0 bg-gradient-to-r from-violet-500 to-indigo-500 font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:from-violet-400 hover:to-indigo-400">Login</button>
                </form>

            </div>
        </div>
    )
}

export default Login;

