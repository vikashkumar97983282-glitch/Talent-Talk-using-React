import AdminElement from "./adminElement";


function AdminPanel(){

    const menu = [
  {
    name: "Dashboard",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828673.png"
  },
  {
    name: "Users",
    img: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
  },
  {
    name: "Jobs",
    img: "https://cdn-icons-png.flaticon.com/512/942/942799.png"
  },
  {
    name: "Company Verification",
    img: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png"
  },
  {
    name: "Invoices",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135673.png"
  },
  {
    name: "Insights",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
  },
  {
    name: "Payments",
    img: "https://cdn-icons-png.flaticon.com/512/179/179457.png"
  },
  {
    name: "Settings",
    img: "https://cdn-icons-png.flaticon.com/512/2099/2099058.png"
  }
];



    return (
        <div className="h-screen w-[25vw] border-r border-[#ccc]">
          <div className="flex flex-col justify-evenly">
            <div className="flex items-center gap-2.5 p-2.5 ml-1.25">
                <img src="https://t3.ftcdn.net/jpg/01/00/57/26/360_F_100572672_6eerkmT3J2ekUtGCFP54FiGRAT9VhYsd.jpg" alt="" className="w-10 h-10 rounded-full" />
                <h1>Admin Panel</h1>
            
            </div>
            <div>
                {menu.map((elem,idx)=>{
                    return <AdminElement key={idx} name={elem.name} img={elem.img}/>
                })}
            </div>
            <div className="mt-49 flex justify-around flex-wrap items-end ">
              <button className="h-10 w-[83%] text-black bg-aliceblue m-px cursor-pointer flex justify-start gap-5 items-center rounded-md hover:bg-gray-500 "><img src="https://cdn-icons-png.flaticon.com/512/471/471664.png" className="w-7 h-7 ml-2"/>
 Help and Docs</button>
            </div>
          </div>
            
        </div>
    )
}

export default AdminPanel;