import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyPostJobContent = ({ setPostjob }) => {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [payment, setPayment] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const JobPost = () => {

    const formdata = {
      title:title,
      category:category,
      payment:payment,
      time:time,
      description:description
    };

    
    setPostjob(prev => [...prev, formdata]);

    console.log("New Job:", formdata);

    alert("job added sucessfully");

    
    // navigate("/company/dashboard");

    setTitle("");
    setCategory("");
    setPayment("");
    setTime("");
    setDescription("");
  };

  return (
    <div className="bg-teal-700 min-h-screen flex flex-col items-center py-10">

      <h1 className="text-3xl font-bold text-black mb-8">
        Post a New Job
      </h1>

      <div className="w-[600px]">

        <label className="block text-sm text-black mb-1">Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded bg-gray-200 mb-4 outline-none"
        />

        <label className="block text-sm text-black mb-1">Project Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded bg-gray-200 mb-4 outline-none"
        />

        <div className="flex gap-4 mb-4">

          <div className="w-1/3">
            <label className="block text-sm text-black mb-1">Payment</label>
            <div className="flex items-center bg-gray-200 rounded px-3">
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
            <label className="block text-sm text-black mb-1">Time Line</label>
            <input
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 bg-gray-200 rounded outline-none"
            />
          </div>

        </div>

        <label className="block text-sm text-black mb-1">Job Description</label>
        <textarea
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded bg-gray-200 outline-none"
        ></textarea>

        <div className="flex justify-end mt-6">
          <button
            onClick={JobPost}
            className="px-10 py-2 text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg"
          >
            Post
          </button>
        </div>

      </div>
    </div>
  );
};

export default CompanyPostJobContent;