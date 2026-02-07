import React from "react";
import './login.css'


function Login(){
    return (
        <div className="login-page">
            <div className="login-container">
                <form>
                    <h2>Admin Login</h2>
                    <input type="email" placeholder="email" required />
                    <br/>
                    <input type="password" placeholder="password" required />
                    <br/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;