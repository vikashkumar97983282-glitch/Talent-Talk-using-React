import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { CalendarClock, CircleDollarSign, FileText, Tag } from "lucide-react";


const CompanyPostJobContent = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [payment, setPayment] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const suggestedCategories = ["Design", "Development", "Marketing", "Writing"];

  const handlejob = async (event)=>{
    event.preventDefault();
    if (!title.trim() || !category.trim() || !payment || !time || !description.trim()) {
      toast.error("Please complete all job details.");
      return;
    }

    try{
      setIsSubmitting(true);
      let res = await axios.post("/company/postjob",{
        title,
        category,
        payment,
        time,
        description
      }
      ,{withCredentials:true})
      

      if(res.data.success){
        toast.success(res.data.message || "Job posted successfully.");
        navigate("/company/dashboard")
      }

    }
    catch(err){
      console.log(err)
      toast.error(err.response?.data?.message || "Failed to post job.");
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <div className="company-content flex min-h-screen flex-col items-center px-4 py-7 text-slate-900 sm:py-10">

      <div className="mb-8 w-full max-w-4xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2d6b58]">Build your team</p><h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Post a New Job</h1><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Share the right details up front so qualified freelancers can understand the opportunity quickly.</p></div>

      <form onSubmit={handlejob} className="w-full max-w-4xl rounded-[1.75rem] border border-[#dcebdd] bg-white/90 p-5 shadow-[0_20px_45px_rgba(31,58,47,0.08)] sm:p-8">

        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><FileText size={16} className="text-[#2d6b58]"/> Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required placeholder="e.g. Senior product designer" className="mb-5 w-full rounded-xl bg-slate-50 p-3.5 outline-none ring-1 ring-[#dcebdd]"
        />

        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><Tag size={16} className="text-[#2d6b58]"/> Project Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required placeholder="Choose a category" className="mb-3 w-full rounded-xl bg-slate-50 p-3.5 outline-none ring-1 ring-[#dcebdd]"
        />
        <div className="mb-5 flex flex-wrap gap-2">{suggestedCategories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">{item}</button>)}</div>

        <div className="mb-4 flex flex-col gap-4 sm:flex-row">

          <div className="w-full sm:w-1/3">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><CircleDollarSign size={16} className="text-[#2d6b58]"/> Payment (INR)</label>
            <div className="flex items-center rounded-xl bg-slate-50 px-3 ring-1 ring-[#dcebdd]">
              <span className="text-slate-400">₹</span>
              <input
                type="number" min="0" required
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                placeholder="Budget" className="w-full bg-transparent p-3 outline-none"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><CalendarClock size={16} className="text-[#2d6b58]"/> Deadline</label>
            <input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required className="w-full rounded-xl bg-slate-50 p-3 outline-none ring-1 ring-[#dcebdd]"
            />
          </div>

        </div>

        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><FileText size={16} className="text-[#2d6b58]"/> Job Description</label>
        <textarea
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required placeholder="Describe the project, responsibilities, and ideal skills..." className="w-full rounded-xl bg-slate-50 p-3.5 outline-none ring-1 ring-[#dcebdd]"
        ></textarea>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">Clear titles and realistic deadlines attract better applicants.</p>
          <button
            type="submit" disabled={isSubmitting}
            className="rounded-xl bg-linear-to-r from-[#1f5a49] to-[#3c7a63] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Posting..." : "Publish job"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CompanyPostJobContent;

