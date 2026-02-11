import React from "react";


function Navbar(){

    const button = ["Dashboard","Users","Job","Company","Invoice","Insights","Payments","Settings"]

    return (
        <div className="bg-amber-300 flex flex-wrap justify-between items-center">
            <div className="ml-5 ">
                {button.map((elem,idx)=>{
                    return <button key={idx} className="m-5">{elem}</button>
                })}
            </div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiil4tddZ1owesQPlnPuSmHhkwB2dPJ2ksDw&s" className="h-10.5 w-10.5 rounded-4xl mr-10"></img>
        </div>
    )
}

export default Navbar; 