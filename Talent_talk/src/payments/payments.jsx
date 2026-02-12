import React from "react";
import Navbar from "../users/navbar";
import PaymentsBody from "./paymentBody";


function Payments(){

    return (
        <div className="h-screen w-full">
            <Navbar/>
            <PaymentsBody/>
        </div>
    )
}

export default Payments;