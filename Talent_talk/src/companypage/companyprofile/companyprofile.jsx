import React from "react";
import CompanyProfileContent from "./companyprofileContent";
import CompanyAdminPanel from "../companyadmin/companyadminpanel";
import { useState } from "react";


function CompanyProfile(){

    const [profile, setProfile] = useState([
    {
      name:"Rohit Sharma",
      email:"rohit@gmail.com",
      phone:"9798328268",
      location:"nagpur,mumbai,maharastra,340005"
    }
  ]);

    return (
        <div className="flex">
            <CompanyAdminPanel setProfile={setProfile}/>
            <CompanyProfileContent profile={profile}/>
        </div>
    );
}


export default CompanyProfile;