import React from "react";
import AdminElement from "./adminElement";
import { Link } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828673.png",
    path:"/admin/dashboard"
  },
  {
    name: "Users",
    img: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    path:"/admin/users"
  },
  {
    name: "Jobs",
    img: "https://cdn-icons-png.flaticon.com/512/942/942799.png",
    path:"/admin/jobs"
  },
  {
    name: "Company Verification",
    img: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png",
    path:"/admin/company"
  },
  {
    name: "Invoices",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135673.png",
    path:"/admin/invoice"
  },
  {
    name: "Insights",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    path:"/admin/insights"
  },
  {
    name: "Payments",
    img: "https://cdn-icons-png.flaticon.com/512/179/179457.png",
    path:"/admin/payments"
  },
  {
    name: "Settings",
    img: "https://cdn-icons-png.flaticon.com/512/2099/2099058.png",
    path:"/admin/settings"
  }
];

function AdminPanel(){
    return (
        <div className="h-screen w-[25vw] min-w-64 border-r border-[#ccc] bg-white">
          <div className="flex h-full flex-col gap-6 py-4">
            <Link to="/admin/settings" className="flex items-center gap-3 px-4">
                <img
                  src="https://t3.ftcdn.net/jpg/01/00/57/26/360_F_100572672_6eerkmT3J2ekUtGCFP54FiGRAT9VhYsd.jpg"
                  alt="Admin profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <h1 className="text-lg font-semibold">Admin Panel</h1>
            </Link>
            <div className="flex flex-col gap-1">
                {menu.map((elem,idx)=>{
                    return <AdminElement key={idx} name={elem.name} img={elem.img} path={elem.path}/>
                })}
            </div>
            <div className="mt-auto flex justify-center px-2">
              <button type="button" className="h-10 w-[83%] cursor-pointer rounded-md bg-slate-100 px-2 text-left text-black hover:bg-gray-200">
                <span className="flex items-center gap-5">
                  <img src="https://cdn-icons-png.flaticon.com/512/471/471664.png" alt="" className="h-7 w-7"/>
                  <span>Help and Docs</span>
                </span>
              </button>
            </div>
          </div>
            
        </div>
    )
}

export default AdminPanel;
