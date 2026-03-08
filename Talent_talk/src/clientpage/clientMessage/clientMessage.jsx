import React from "react";
import ClientMessageContent from "./clientMessageContent";
import ClientFindJobHeader from "../clientfindjob/clientfindjobHeader";


function ClientMessage(){

    return (
        <div>
            <ClientFindJobHeader/>
            <ClientMessageContent/>
        </div>
    );
}

export default ClientMessage;