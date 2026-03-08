import React from "react";
import ClientProjectContent from "./clientprojectContent";
import ClientFindJobHeader from "../clientfindjob/clientfindjobHeader";


function ClientProject(){

    return (
        <div>
            <ClientFindJobHeader/>
            <ClientProjectContent/>
        </div>
    );
}

export default ClientProject;