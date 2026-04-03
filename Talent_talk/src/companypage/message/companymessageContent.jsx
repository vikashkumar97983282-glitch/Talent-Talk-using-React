import React from "react";
import { Eye, Pencil, Trash } from "lucide-react";

const messages = [
  {
    name: "Jackson Reed",
    time: "2 mints ago",
    text: "Mobile application Project Requirement",
  },
  {
    name: "Jackson Reed",
    time: "2 hours ago",
    text: "UI/UX Designer Project Requirement",
  },
  {
    name: "Jackson Reed",
    time: "3 hours ago",
    text: ".net C# Project Requirement",
  },
  {
    name: "Jackson Reed",
    time: "1 days ago",
    text: "Project design requirement",
  },
];

function CompanyMessageContent() {
  return (
    <div className="min-h-screen bg-[#f7f4ea] p-6 text-slate-900">
      
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Messages</h2>

      <div className="space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-2xl bg-[#fffdf8] px-6 py-4 shadow-sm ring-1 ring-[#e7dfcc]"
          >
            
            {/* Left */}
            <div className="flex items-center gap-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="profile"
                className="w-12 h-12 rounded-full"
              />

              <div>
                <h3 className="font-semibold">{msg.name}</h3>
                <p className="text-sm text-slate-500">{msg.time}</p>
              </div>
            </div>

            {/* Message */}
            <div className="text-slate-700">
              {msg.text}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 text-[#1f5a49]">
              <Eye className="cursor-pointer text-[#2d6b58]" />
              <Pencil className="cursor-pointer text-[#3c7a63]" />
              <Trash className="cursor-pointer text-red-600" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default CompanyMessageContent;
