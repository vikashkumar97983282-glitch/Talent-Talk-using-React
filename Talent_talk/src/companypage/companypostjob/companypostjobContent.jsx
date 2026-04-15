import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const CompanyPostJobContent = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [payment, setPayment] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const handlejob = async ()=>{
    try{
      let res = await axios.post("http://localhost:3000/company/postjob",{
        title,
        category,
        payment,
        time,
        description
      }
      ,{withCredentials:true})
      

      if(res.data.success){
        navigate("/company/dashboard")
      }

    }
    catch(err){
      console.log(err)
    }
  }


  return (
    <div className="flex min-h-screen flex-col items-center bg-[#f7f4ea] py-10 text-slate-900">

      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        Post a New Job
      </h1>

      <div className="w-150 rounded-2xl bg-[#fffdf8] p-8 shadow-sm ring-1 ring-[#e7dfcc]">

        <label className="mb-1 block text-sm text-slate-700">Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full rounded bg-[#f7f4ea] p-3 outline-none ring-1 ring-[#e7dfcc]"
        />

        <label className="mb-1 block text-sm text-slate-700">Project Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-4 w-full rounded bg-[#f7f4ea] p-3 outline-none ring-1 ring-[#e7dfcc]"
        />

        <div className="flex gap-4 mb-4">

          <div className="w-1/3">
            <label className="mb-1 block text-sm text-slate-700">Payment</label>
            <div className="flex items-center rounded bg-[#f7f4ea] px-3 ring-1 ring-[#e7dfcc]">
              <span>$</span>
              <input
                type="text"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="w-full p-2 bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="mb-1 block text-sm text-slate-700">Time Line</label>
            <input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded bg-[#f7f4ea] p-2 outline-none ring-1 ring-[#e7dfcc]"
            />
          </div>

        </div>

        <label className="mb-1 block text-sm text-slate-700">Job Description</label>
        <textarea
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded bg-[#f7f4ea] p-3 outline-none ring-1 ring-[#e7dfcc]"
        ></textarea>

        <div className="flex justify-end mt-6">
          <button
            onClick={handlejob}
            className="rounded-full bg-linear-to-r from-[#1f5a49] to-[#3c7a63] px-10 py-2 text-lg text-white"
          >
            Post
          </button>
        </div>

      </div>
    </div>
  );
};

export default CompanyPostJobContent;
