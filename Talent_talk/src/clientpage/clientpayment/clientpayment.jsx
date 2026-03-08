import React from "react";
import ClientPaymentContent from "./clientpaymentContent";
import ClientFindJobHeader from "../clientfindjob/clientfindjobHeader";

function ClientPayment(){

    return (
        <div>
            <ClientFindJobHeader/>
            <ClientPaymentContent/>
        </div>
    );
}

export default ClientPayment;