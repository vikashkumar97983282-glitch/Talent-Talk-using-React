import React from "react";
import CompanyMessageContent from "./companymessageContent";
import CompanyHeader from "../companyclient/companyheader";

function CompanyMessage(){
    return (
        <div>
            <CompanyHeader/>
            <CompanyMessageContent/>
        </div>
    );
}

export default CompanyMessage;