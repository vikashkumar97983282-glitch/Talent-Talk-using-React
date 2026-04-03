import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";

function ClientMessageContent() {
  return (
    <div className="bg-slate-50 min-h-screen px-10 py-8 text-slate-900">

      {/* Title + Search */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Message</h1>

        <input
          type="text"
          placeholder="Search"
          className="w-72 p-2 rounded-lg border border-sky-100 bg-white text-black"
        />
      </div>

      <hr className="mb-6 border-sky-100"/>

      {/* Message List */}
      <div className="space-y-4">

        {/* Message Item */}
        <div className="bg-white text-black p-4 rounded-xl flex justify-between items-center shadow-sm ring-1 ring-sky-100">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-700 flex items-center justify-center text-white font-bold">
              T.A
            </div>

            <div>
              <h3 className="font-semibold">Tech Innovators Inc.</h3>
              <p className="text-sm text-gray-600">2 mins ago</p>
            </div>
          </div>

          <p className="text-gray-700">Project Requirement</p>

          <div className="flex gap-4 text-lg">
            <FaEye className="cursor-pointer"/>
            <FaTrash className="cursor-pointer text-red-500"/>
          </div>

        </div>

        {/* Message Item */}
        <div className="bg-white text-black p-4 rounded-xl flex justify-between items-center shadow-sm ring-1 ring-sky-100">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-100 flex items-center justify-center text-sky-950 font-bold">
              CM
            </div>

            <div>
              <h3 className="font-semibold">Creative Minds Co.</h3>
              <p className="text-sm text-gray-600">10 mints ago</p>
            </div>
          </div>

          <p className="text-gray-700">Project Inquiry</p>

          <div className="flex gap-4 text-lg">
            <FaEye className="cursor-pointer"/>
            <FaTrash className="cursor-pointer text-red-500"/>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ClientMessageContent;
