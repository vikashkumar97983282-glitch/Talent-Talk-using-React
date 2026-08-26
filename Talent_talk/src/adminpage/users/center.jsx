import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryContent from "./historyContent";
import History from "./history";


function Center(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const visibleUsers = users.filter((user) => [user.name, user.email, user.role, user.department]
        .some((value) => String(value || "").toLowerCase().includes(search.trim().toLowerCase())));

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
                <div className="mb-6 mt-5 flex flex-wrap items-end justify-between gap-4">
                    <div><h1 className="text-2xl font-bold tracking-tight text-slate-950">User management</h1><p className="mt-1 text-sm text-slate-500">Review and monitor people active on your platform.</p></div>
                    <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 ring-1 ring-indigo-100">{users.length} total users</span>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                    <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, email, role, or department" className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"/>
                </div>
                <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h2 className="font-bold tracking-tight text-slate-900">Platform users</h2><span className="text-xs font-semibold text-slate-400">{visibleUsers.length} shown</span></div>
                    <HistoryContent/>
                    <div className="mb-0">
                    {loading && <p className="p-6 text-sm text-slate-500">Loading users...</p>}
                    {!loading && visibleUsers.length === 0 && <p className="p-6 text-sm text-slate-500">No users match your search.</p>}
                    {visibleUsers.map((elem)=>{
                        return <History key={elem.id} image={elem.avatar} name={elem.name} email={elem.email} role={elem.role} action={elem.status} dept={elem.department} createdAt={elem.createdAt}/>
                    })}
                    </div>
                </section>
            </div>
            
        </div>
    )
}

export default Center;
