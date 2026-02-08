function Login(){
    return (
        <div className="w-full h-screen flex justify-center items-end bg-[#f0f2f5]">
            <div className="h-92.5 w-155 p-7.5 bg-[#ca0e0e] rounded-lg mb-8 flex justify-center">
                <form>
                    <h2 className="text-white mb-10 text-center">Admin Login</h2>
                    <input type="email" placeholder="email" required className="w-64 h-10 mb-5 px-2 rounded-lg border border-gray-300 bg-white"/>
                    <br/>
                    <input type="password" placeholder="password" required className="w-64 h-10 mb-5 px-2 rounded-lg border border-gray-300 bg-white"/>
                    <br/>
                    <button type="submit" className="mt-8.75 mb-15 w-full h-10 bg-[#4CAF50] text-white border-0 rounded-[10px] cursor-pointer">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;