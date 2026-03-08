import React from "react";
import ClientJobContent from "./clientjobContent";
import ClientFindJobHeader from "../clientfindjob/clientfindjobHeader";

function ClientJob(){

    return (
        <div>
            <ClientFindJobHeader/>
            <ClientJobContent/>
        </div>
    );
}


export default ClientJob;