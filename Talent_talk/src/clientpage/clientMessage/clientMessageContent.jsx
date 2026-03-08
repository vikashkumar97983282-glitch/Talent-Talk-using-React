import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";

function ClientMessageContent() {
  return (
    <div className="bg-teal-700 min-h-screen px-10 py-8 text-white">

      {/* Title + Search */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Message</h1>

        <input
          type="text"
          placeholder="Search"
          className="w-72 p-2 rounded-lg text-black"
        />
      </div>

      <hr className="mb-6 border-gray-300"/>

      {/* Message List */}
      <div className="space-y-4">

        {/* Message Item */}
        <div className="bg-gray-200 text-black p-4 rounded-xl flex justify-between items-center">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-400 flex items-center justify-center text-white font-bold">
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
        <div className="bg-gray-200 text-black p-4 rounded-xl flex justify-between items-center">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-200 flex items-center justify-center text-black font-bold">
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