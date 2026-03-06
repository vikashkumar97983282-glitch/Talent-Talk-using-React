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
    <div className="p-6 bg-teal-700 min-h-screen">
      
      <h2 className="text-2xl font-bold text-black mb-6">Messages</h2>

      <div className="space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-200 rounded-full px-6 py-4"
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
                <p className="text-sm text-gray-500">{msg.time}</p>
              </div>
            </div>

            {/* Message */}
            <div className="text-gray-700">
              {msg.text}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Eye className="cursor-pointer" />
              <Pencil className="cursor-pointer" />
              <Trash className="cursor-pointer text-red-600" />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default CompanyMessageContent;