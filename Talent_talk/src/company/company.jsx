import React from "react";
import Navbar from "../users/navbar";
import CompanyContainer from "./companyContainer";



function Company(){

    const companies = [
  {
    id: 1,
    name: "Tech Innovators Inc.",
    category: "Technology",
    description: "Tech Innovators Inc. is a leading technology company specializing in software development and IT solutions.",
    image: "https://plus.unsplash.com/premium_photo-1682095147192-4d79c98ec421?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "Global Solutions Ltd.",
    category: "Consulting",
    description: "Global Solutions Ltd. offers comprehensive consulting services to businesses worldwide.",
    image: "https://images.unsplash.com/photo-1661529667854-f80158f30f22?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    name: "Creative Minds Co.",
    category: "Design",
    description: "Creative Minds Co. is a design agency known for its innovative and creative solutions.",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGlub3ZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 4,
    name: "Digital Dynamics Corp.",
    category: "Software",
    description: "Digital Dynamics Corp. is a software company focused on creating dynamic digital experiences.",
    image: "https://plus.unsplash.com/premium_photo-1672759360872-791a5ba6e2cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW5vdmF0aW9ufGVufDB8fDB8fHww"
  },
  {
    id: 5,
    name: "Strategic Ventures LLC.",
    category: "Finance",
    description: "Strategic Ventures LLC. is a finance firm specializing in strategic investments and financial planning.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGlub3ZhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 6,
    name: "Innovative Systems Group",
    category: "Engineering",
    description: "Innovative Systems Group is an engineering company that develops cutting-edge systems and technologies.",
    image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5vdmF0aW9ufGVufDB8fDB8fHww"
  }
];


    

    return (
        <div>
            <Navbar/>
            <div className="h-100% w-full flex flex-wrap justify-center">
            <div className="h-100% w-[70%] mb-10">
                <div className="flex flex-wrap justify-between mt-5 mb-5">
                    <h1 className="font-bold text-2xl">Company Verification</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                    {companies.map((elem,idx)=>{
                        return <CompanyContainer key={idx} name={elem.name} cate={elem.category} desc={elem.description} img={elem.image}/>
                    })}
                </div>

                

            </div>
        </div>
        </div>
    )
}

export default Company;