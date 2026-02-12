import React from "react";
import NavButton from "./navbutton";

function Navbar(){

    const button = ["Dashboard","Users","Job","Company","Invoice","Insights","Payments","Settings"]

    return (
        <div className=" flex flex-wrap justify-between items-center border-b gray-50">
            <div className="flex flex-wrap justify-between items-center">
                {button.map((elem,idx)=>{
                return <NavButton key={idx} elem={elem}/>
            })}
            </div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiil4tddZ1owesQPlnPuSmHhkwB2dPJ2ksDw&s" className="h-10.5 w-10.5 rounded-4xl mr-10"></img>
        </div>
    )
}

export default Navbar; 