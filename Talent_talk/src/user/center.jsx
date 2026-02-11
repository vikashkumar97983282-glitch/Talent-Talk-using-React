import React from "react";
import Filter from "./filter";
import HistoryContent from "./historyContent";
import History from "./history";


function Center(){


    const Data = [
        { id: 1, avatar: "/avatars/1.png", role: "Freelancer", status: "Active", department: "Content" },
        { id: 2, avatar: "/avatars/2.png", role: "Designer", status: "Inactive", department: "Marketing" },
        { id: 3, avatar: "/avatars/3.png", role: "Developer", status: "Active", department: "Engineering" },
        { id: 4, avatar: "/avatars/4.png", role: "Project Manager", status: "Active", department: "Management" },
        { id: 5, avatar: "/avatars/5.png", role: "SEO Specialist", status: "Inactive", department: "Marketing" },
        { id: 6, avatar: "/avatars/6.png", role: "Content Writer", status: "Active", department: "Content" },
        { id: 7, avatar: "/avatars/7.png", role: "UI/UX Designer", status: "Active", department: "Design" },
        { id: 8, avatar: "/avatars/8.png", role: "Backend Developer", status: "Inactive", department: "Engineering" },
        { id: 9, avatar: "/avatars/9.png", role: "Frontend Developer", status: "Active", department: "Engineering" },
        { id: 10, avatar: "/avatars/10.png", role: "HR Manager", status: "Active", department: "Human Resources" },
        { id: 11, avatar: "/avatars/11.png", role: "Data Analyst", status: "Inactive", department: "Analytics" },
        { id: 12, avatar: "/avatars/12.png", role: "QA Tester", status: "Active", department: "Quality Assurance" },
        { id: 13, avatar: "/avatars/13.png", role: "Mobile Developer", status: "Active", department: "Engineering" },
        { id: 14, avatar: "/avatars/14.png", role: "DevOps Engineer", status: "Inactive", department: "Infrastructure" },
        { id: 15, avatar: "/avatars/15.png", role: "Graphic Designer", status: "Active", department: "Design" },
        { id: 16, avatar: "/avatars/16.png", role: "Social Media Manager", status: "Active", department: "Marketing" },
        { id: 17, avatar: "/avatars/17.png", role: "Technical Writer", status: "Inactive", department: "Content" },
        { id: 18, avatar: "/avatars/18.png", role: "Product Owner", status: "Active", department: "Management" },
        { id: 19, avatar: "/avatars/19.png", role: "Support Engineer", status: "Active", department: "Customer Support" },
        { id: 20, avatar: "/avatars/20.png", role: "Business Analyst", status: "Inactive", department: "Business" }
        ];


    return (
        <div className="h-100% w-full flex flex-wrap justify-center">
            <div className="h-100% w-[70%] ">
                <div className="">
                <h1 className="font-bold text-2xl mt-5 mb-5">User Management</h1>
                <input type="text" placeholder="enter the value" className="h-10 w-full bg-gray-200 rounded-md p-5"/>
                </div>
                <div className="h-100% w-[70%] mt-5">
                    <Filter/>
                </div>
                <HistoryContent/>
                <div>
                    {Data.map((elem,idx)=>{
                        return (
                            <div key={idx}>
                                <History img={elem.avatar} role={elem.role} action={elem.status} dept={elem.department}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </div>
    )
}

export default Center;