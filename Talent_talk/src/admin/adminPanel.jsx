import React from "react";
import './admin-panel.css'
import AdminElement from "./adminElement";


function AdminPanel(){

    const menu = [
  {
    name: "Dashboard",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828673.png"
  },
  {
    name: "Users",
    img: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
  },
  {
    name: "Jobs",
    img: "https://cdn-icons-png.flaticon.com/512/942/942799.png"
  },
  {
    name: "Company Verification",
    img: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png"
  },
  {
    name: "Invoices",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135673.png"
  },
  {
    name: "Insights",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
  },
  {
    name: "Payments",
    img: "https://cdn-icons-png.flaticon.com/512/179/179457.png"
  },
  {
    name: "Settings",
    img: "https://cdn-icons-png.flaticon.com/512/2099/2099058.png"
  }
];



    return (
        <div className="admin-panel">
            <div className="logo-container">
                <img src="https://t3.ftcdn.net/jpg/01/00/57/26/360_F_100572672_6eerkmT3J2ekUtGCFP54FiGRAT9VhYsd.jpg" alt="" />
                <h1>Admin Panel</h1>
            
            </div>
            <div>
                {menu.map((elem,idx)=>{
                    return <AdminElement key={idx} name={elem.name} img={elem.img}/>
                })}
            </div>
        </div>
    )
}

export default AdminPanel;