import React from "react";
import JobContainer from "./jobsContainer";


function JobBody(){

    const jobs = [
  {
    id: 1,
    status: "Pending",
    title: "Senior UX/UI Designer",
    description: `Design intuitive user interfaces for web and mobile applications.
Collaborate with product managers and engineers to define innovative solutions.
Conduct user research and usability testing to ensure designs meet user needs.`,
    buttonText: "Approve Job",
    image: "https://images.unsplash.com/photo-1700427296131-0cc4c4610fc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2hub2xvZ3klMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
  },
  {
    id: 2,
    status: "Approved",
    title: "Frontend Developer",
    description: `Build responsive and dynamic user interfaces using React.
Optimize applications for maximum speed and scalability.
Work closely with designers to implement pixel-perfect layouts.`,
    buttonText: "View Job",
    image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlY2hub2xvZ3klMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
  },
  {
    id: 3,
    status: "Rejected",
    title: "Backend Developer",
    description: `Develop and maintain server-side logic and databases.
Ensure high performance and responsiveness of applications.
Integrate front-end elements with backend services securely.`,
    buttonText: "Review Again",
    image: "https://media.istockphoto.com/id/2200128716/photo/ai-powers-big-data-analysis-and-automation-workflows-showcasing-neural-networks-and-data.webp?a=1&b=1&s=612x612&w=0&k=20&c=Wct3RqstuZiHOEexd0kSDNufRHJZ_ZcCeBUAkbWKjDo="
  },
  {
    id: 4,
    status: "Pending",
    title: "Product Manager",
    description: `Define product vision and roadmap based on market research.
Coordinate with cross-functional teams to deliver features on time.
Analyze user feedback to improve product performance.`,
    buttonText: "Approve Job",
    image: "https://plus.unsplash.com/premium_photo-1664304160128-ca5a08ac46ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHRlY2hub2xvZ3klMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
  },
  {
    id: 5,
    status: "Approved",
    title: "Mobile App Developer",
    description: `Develop cross-platform mobile applications.
Integrate APIs and third-party services efficiently.
Ensure smooth performance across different devices.`,
    buttonText: "View Job",
    image: "https://images.unsplash.com/photo-1689443111130-6e9c7dfd8f9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHRlY2hub2xvZ3klMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
  },
  {
    id: 6,
    status: "Pending",
    title: "Data Analyst",
    description: `Collect, process, and analyze large datasets.
Generate reports and dashboards for business insights.
Identify trends to support strategic decision-making.`,
    buttonText: "Approve Job",
    image: "https://images.unsplash.com/photo-1548092372-0d1bd40894a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHRlY2hub2xvZ3klMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
  },
  {
    id: 7,
    status: "Approved",
    title: "DevOps Engineer",
    description: `Manage CI/CD pipelines and deployment workflows.
Monitor system performance and troubleshoot issues.
Automate infrastructure using modern DevOps tools.`,
    buttonText: "View Job",
    image: "https://images.unsplash.com/photo-1524169220946-12efd782aab4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHRlY2hub2xvZ3klMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
  },
  {
    id: 8,
    status: "Rejected",
    title: "QA Engineer",
    description: `Create and execute detailed test cases.
Identify bugs and ensure software quality standards.
Collaborate with developers to resolve issues quickly.`,
    buttonText: "Review Again",
    image: "https://images.unsplash.com/photo-1686428449887-9e8c859861ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHRlY2hub2xvZ3klMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
  },
  {
    id: 9,
    status: "Pending",
    title: "Graphic Designer",
    description: `Design marketing materials and branding assets.
Collaborate with teams to create engaging visuals.
Ensure consistency across all digital platforms.`,
    buttonText: "Approve Job",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHRlY2hub2xvZ3klMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww"
  },
  {
    id: 10,
    status: "Approved",
    title: "Cybersecurity Specialist",
    description: `Monitor systems for security breaches.
Implement security protocols and best practices.
Conduct regular audits to maintain data protection.`,
    buttonText: "View Job",
    image: "https://plus.unsplash.com/premium_photo-1683121713210-97667d2e83c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaG5vbG9neSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
  }
];



    return (
        <div className="h-100% w-full flex flex-wrap justify-center overflow-y-hidden">
            <div className="h-100% w-[70%] ">
                <div className="">
                <h1 className="font-bold text-2xl mt-5 mb-5">Job Post Approval</h1>
                <div className="">
                    {jobs.map((elem,idx)=>{
                        return <JobContainer key={idx} status={elem.status} title={elem.title} desc={elem.description} button={elem.buttonText} img={elem.image}/>
                    })}
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default JobBody;