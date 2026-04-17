import { useState } from "react";
import { FaWallet, FaUser, FaChevronDown } from "react-icons/fa";
import { Outlet, Link , useNavigate} from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

function ClientRegister() {

  const navigate = useNavigate();
  
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [purpose, setPurpose] = useState("");
  const [profession, setProfession] = useState("");


  const user = {firstname,lastname,email,password,confirmpassword,address,phone,purpose,profession}

  const handleregister = async (e)=>{
    e.preventDefault()

    try{
      let res = await axios.post("http://localhost:3000/client/register", user ,{withCredentials:true});
      
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/");
      } else{
        toast.success(res.data.message);
      }

    }
    catch(err){
      console.log(err)
    }
    
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-sky-800 flex items-center justify-center p-6">
      <div className="bg-white/95 w-full max-w-5xl rounded-xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-center mb-8">Register</h1>

        <form onSubmit={handleregister}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          

          {/* Left Side */}
          <div className="space-y-4 border-r pr-6">

            <input
              type="text"
              placeholder="First Name"
              onChange={(e)=>setFirstName(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />

            <input
              type="text"
              placeholder="Last Name"
              onChange={(e)=>setLastName(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />

            <input
              type="email"
              placeholder="Enter your email Address"
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />

            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />

            {/* <input
              type="number"
              placeholder="Enter your Phone number"
              onChange={(e)=>setPhone(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            /> */}

            <textarea
              placeholder="Full Address"
              onChange={(e)=>setAddress(e.target.value)}
              rows="4"
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />
          </div>

          {/* Right Side */}
          <div className="space-y-6">

            {/* Purpose Cards */}
            <div className="flex gap-4">

              <div
                onClick={() => setPurpose("earn")}
                className={`flex-1 p-5 rounded-xl bg-white shadow cursor-pointer text-center ${
                  purpose === "earn" ? "border-2 border-sky-500" : ""
                }`}
              >
                <FaWallet className="text-4xl mx-auto mb-2" />
                <p>Earn Money</p>
              </div>

              <div
                onClick={() => setPurpose("education")}
                className={`flex-1 p-5 rounded-xl bg-white shadow cursor-pointer text-center ${
                  purpose === "education" ? "border-2 border-sky-500" : ""
                }`}
              >
                <FaUser className="text-4xl mx-auto mb-2" />
                <p>Education purpose</p>
              </div>

            </div>

            <input
              type="tel"
              maxLength={10}
              placeholder="Enter your Phone number"
              value={phone || ""}
              onChange={(e)=>setPhone(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-slate-100 outline-none"
            />

            {/* Profession Dropdown */}
            <div className="relative">
             <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-100 appearance-none outline-none"
              >
                <option value="">Choose profession</option>
                <option value="Student">Student</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Freelancer">Freelancer</option>
              </select>

              {/* <p>Selected: {profession}</p> */}

              <FaChevronDown className="absolute right-4 top-4 text-slate-500" />
            </div>

            {/* Register Button */}
            <div className="pt-12 flex flex-col items-end mt-20">
              <button className="px-8 py-3 rounded-full bg-linear-to-r from-indigo-700 to-sky-700 text-white font-semibold">
                Register
              </button>

              <p className="text-sm mt-2">
                Do you have an account?{" "}
                <Link to="/client" className="text-sky-700 cursor-pointer">Login</Link>
              </p>
            </div>

          </div>
          

        </div>
        </form>
      </div>
      <Outlet/>
    </div>
  );
}

export default ClientRegister;
