import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./filter";
import HistoryContent from "./historyContent";
import History from "./history";


function Center(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get("/admin/users", { withCredentials: true });
                setUsers(res.data?.users || []);
            } catch (err) {
                console.log(err);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);


    return (
        <div className="flex min-h-full w-full justify-center px-5 py-6 sm:px-8">
            <div className="w-full max-w-6xl">
                <div className="">
                <h1 className="mb-5 mt-5 text-2xl font-bold tracking-tight text-slate-950">User Management</h1>
                <input type="text" placeholder="enter the value" className="h-11 w-full rounded-xl border border-indigo-100 bg-white/80 px-5 text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"/>
                </div>
                <div className="mt-5">
                    <Filter/>
                </div>
                <HistoryContent/>
                <div className="mb-10">
                    {loading && <p className="p-4 text-sm text-slate-500">Loading users...</p>}
                    {!loading && users.length === 0 && <p className="p-4 text-sm text-slate-500">No users found.</p>}
                    {users.map((elem,idx)=>{
                        return (
                            <div key={idx}>
                                <History image={elem.avatar} role={elem.role} action={elem.status} dept={elem.department}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </div>
    )
}

export default Center;
