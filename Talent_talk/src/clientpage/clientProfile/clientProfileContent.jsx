import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";

function ClientProfileContent() {
  
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const joinedYear = user?.createdAt ? new Date(user.createdAt).getFullYear() : "";

  useEffect(()=>{
    const data = async ()=>{
      try{
        const res = await axios.get("http://localhost:3000/client/profile",{withCredentials:true});
        setUser(res.data)
        // console.log(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    data()
  },[])

  const edit = ()=>{
    navigate("/client/profileEdit")
  }


  return (
    <div className="flex-1 bg-slate-50 p-12 text-slate-900">

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-10">

        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-20 h-20 rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold">
            {user.firstname} {user.lastname}
          </h2>
          <p className="text-slate-500 text-sm">
            {joinedYear ? `Joined in ${joinedYear}` : "Joined recently"}
          </p>
        </div>

      </div>

      {/* Personal Info */}
      <h3 className="font-semibold mb-4">Personal Information</h3>

      <div className="space-y-3 text-lg">
        <p><strong>Full Name :</strong> {user.firstname} {user.lastname}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Phone Number :</strong> {user.phone}</p>
      </div>

      {/* Edit Button */}
      <div className="mt-10">
        <button onClick={edit} className="bg-linear-to-r from-indigo-700 to-sky-700 text-white px-4 py-2 rounded-lg">
          Edit Profile
        </button>
      </div>

    </div>
  );
}

export default ClientProfileContent;
