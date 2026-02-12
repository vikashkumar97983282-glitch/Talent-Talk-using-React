import React from "react";
import Dashboard from "../admin/dashboard/dashboardpage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const handleSubmit =()=>{
        // e.preventDefault();

        if (email === "admin@gmail.com" && password === "1234"){
            setMessage("login sucessful");
            navigate("/Dashboard");
        } else {
            setEmail("");
            setPassword("");
            setMessage("invalid email or password !");
        }
    }



    return (
        <div className="w-full h-screen flex justify-center items-center bg-[#f0f2f5]">
            <div className="h-92.5 w-155 p-7.5 bg-blue-600 rounded-lg mb-8 flex justify-center">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-white mb-10 text-center">Admin Login</h2>
                    <input type="email" placeholder="email" required onChange={(e)=>{setEmail(e.target.value)}} value={email} className="w-64 h-10 mb-5 px-2 rounded-lg border border-gray-300 bg-white"/>
                    <br/>
                    <input type="password" placeholder="password" required onChange={(e)=>{setPassword(e.target.value)}} value={password} className="w-64 h-10 mb-5 px-2 rounded-lg border border-gray-300 bg-white"/>
                    <br/>
                    <button type="submit" className="mt-8.75 mb-8 w-full h-10 bg-[#4CAF50] text-white border-0 rounded-[10px] cursor-pointer">Login</button>
                    <h1 className="font-bold text-xl text-blue-400">{message}</h1>
                </form>
            </div>
        </div>
    )
}

export default Login;