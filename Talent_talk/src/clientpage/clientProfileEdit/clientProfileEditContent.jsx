import React from "react";
import { useNavigate , Link} from "react-router-dom";

function ClientProfileEditContent() {

  const navigate = useNavigate();

  const save = ()=>{
    navigate("/client/profile")
  }


  return (
    <div className="flex-1 bg-slate-50 p-10 text-slate-900">

      <form action="">

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">

        <img
          src="https://i.pravatar.cc/100"
          alt="profile"
          className="w-20 h-20 rounded-full"
        />
        

        <div>
          <h2 className="text-xl font-semibold">Sophia Carter</h2>
          <p className="text-slate-500 text-sm">Company Name</p>
          <p className="text-slate-400 text-sm">Joined in 2021</p>
        </div>

      </div>

      {/* Personal Information */}
      <h3 className="font-semibold mb-4">Personal Information</h3>

      <div className="max-w-md space-y-4 mb-8">

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 bg-white rounded-lg ring-1 ring-sky-100"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 bg-white rounded-lg ring-1 ring-sky-100"
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 bg-white rounded-lg ring-1 ring-sky-100"
        />

      </div>

      {/* Security Section */}
      <h3 className="font-semibold mb-4">Security</h3>

      <div className="max-w-md space-y-4">

        <input
          type="password"
          placeholder="Current Password"
          autoComplete=""
          className="w-full p-2 bg-white rounded-lg ring-1 ring-sky-100"
        />

        <input
          type="password"
          placeholder="Enter new password"
          autoComplete=""
          className="w-full p-2 bg-white rounded-lg ring-1 ring-sky-100"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          autoComplete=""
          className="w-full p-2 bg-white rounded-lg ring-1 ring-sky-100"
        />

      </div>

      {/* Save Button */}
      <div className="mt-8">
        <Link to="/client/profile" onClick={save} className="bg-gradient-to-r from-indigo-700 to-sky-700 text-white px-5 py-2 rounded-lg cursor-pointer">
          Save Changes
        </Link>
      </div>
    </form>

    </div>
  );
}

export default ClientProfileEditContent;
