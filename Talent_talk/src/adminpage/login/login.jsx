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
        <div className="w-full h-screen flex justify-center items-center bg-gray-400">
            <Link to="/" className="absolute right-7 top-7 flex h-10 min-w-24 items-center justify-center rounded-[10px] bg-white/80 px-4 text-slate-900 hover:bg-white">
                    Home
                </Link>
            <div className="relative h-92.5 w-155 p-7.5 bg-linear-to-br from-blue-500 via-sky-400 to-blue-300 rounded-lg mb-8 flex justify-center shadow-lg ring-1 ring-blue-400">
                
                <form onSubmit={handleSubmit}>
                    <h2 className="text-stone-800 mb-10 text-center">Admin Login</h2>
                    <input type="email" placeholder="email" required onChange={(e)=>{setEmail(e.target.value)}} value={email} className="w-64 h-10 mb-5 px-2 rounded-lg border border-gray-300 bg-white"/>
                    <br/>
                    <input type="password" placeholder="password" required autoComplete="" onChange={(e)=>{setPassword(e.target.value)}} value={password} className="w-64 h-10 mb-5 px-2 rounded-lg border border-gray-300 bg-white"/>
                    <br/>
                    <button type="submit" className="mt-8.75 mb-4 w-full h-10 bg-indigo-300 text-slate-900 border-0 rounded-[10px] cursor-pointer hover:bg-indigo-200">Login</button>
                </form>

            </div>
        </div>
    )
}

export default Login;

