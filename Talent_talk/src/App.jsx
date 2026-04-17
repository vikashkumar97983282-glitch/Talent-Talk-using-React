import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import Home from "./adminpage/home/home";
import Login from "./adminpage/login/login";
import Dashboard from "./adminpage/admin/dashboard";
import Users from "./adminpage/users/users";
import Job from "./adminpage/jobs/jobs";
import Payments from "./adminpage/payments/payments";
import Invoice from "./adminpage/invoice/invoice";
import Insights from "./adminpage/insights/insights";
import Company from "./adminpage/company/company";
import Settings from "./adminpage/profile/settings";
import AccountSettings from "./adminpage/profile/accountsetting";

import CompanyRegister from "./companypage/register/register";
import CompanyLogin from "./companypage/companylogin/companylogin";
import CompanyForgotPassword from "./companypage/register/companyforget";
import CompanyDashboard from "./companypage/companyadmin/dashboard";
import CompanyClient from "./companypage/companyclient/companyClient";
import CompanyPostJob from "./companypage/companypostjob/companypostjob";
import CompanyManageJob from "./companypage/companymanagejob/companymanagejob";
import CompanyJobApplication from "./companypage/companyJobApplication/companyJobApplication";
import CompanyMessage from "./companypage/message/companymessage";
import CompanyPayment from "./companypage/companyPayment/companyPayment";
import CompanySetting from "./companypage/companysetting/companySetting";
import CompanyProfile from "./companypage/companyprofile/companyprofile";
import CompanyEdit from "./companypage/companyEdit/companyEdit";

import ClientRegister from "./clientpage/clientregister/clientregister";
import ClientLogin from "./clientpage/clientlogin/clientlogin";
import ClientForgetPassword from "./clientpage/clientlogin/clientforget";
import ClientDashboard from "./clientpage/clientDashboard/clientDashboard";
import ClientFindJob from "./clientpage/clientfindjob/clientfindjob";
import ClientProject from "./clientpage/clientproject/clientproject";
import ClientJob from "./clientpage/clientjobapply/clientjob";
import ClientMessage from "./clientpage/clientMessage/clientMessage";
import ClientPayment from "./clientpage/clientpayment/clientpayment";
import ClientSetting from "./clientpage/clientSetting/clientSetting";
import ClientProfile from "./clientpage/clientProfile/clientProfile";
import ClientProfileEdit from "./clientpage/clientProfileEdit/clientProfileEdit";

function App() {

  // upload project company side
  const [postjob,setPostjob] = useState([
    {title:"Software Developer's",
      category:"freelancing",
      payment:"$2255",
      time:"22-05-20024",
      description:"this is simple and easy website"
    },
  ])



  return (
    <>
      <Routes>

        <Route path="/" element={<Home/>}></Route>

        {/* admin page routing  */}
        <Route path="/admin">
          <Route index element={<Login/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="users" element={<Users />} />
          <Route path="jobs" element={<Job />} />
          <Route path="payments" element={<Payments />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="insights" element={<Insights />} />
          <Route path="company" element={<Company />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/accountsetting" element={<AccountSettings />} />
        </Route>

        {/* company side routing */}
        <Route path="/company">
          <Route index element={<CompanyLogin/>} />
          <Route path="register" element={<CompanyRegister/>} />
          <Route path="forget-password" element={<CompanyForgotPassword/>} />

          <Route path="dashboard" element={<CompanyDashboard postjob={postjob} setPostjob={setPostjob}/>} />
          <Route path="client" element={<CompanyClient/>} />
          <Route path="postjob" element={<CompanyPostJob setPostjob={setPostjob}/>} />
          <Route path="managejob" element={<CompanyManageJob/>} />
          <Route path="job-application" element={<CompanyJobApplication/>} />
          <Route path="message" element={<CompanyMessage/>} />
          <Route path="payments" element={<CompanyPayment/>} />
          <Route path="settings" element={<CompanySetting/>} />
          <Route path="profile" element={<CompanyProfile/>} />
          <Route path="profile-Edit" element={<CompanyEdit/>} />
        </Route> 


        {/* client side */}
        <Route path="/client">
          <Route index element={<ClientLogin/>}/>
          <Route path="register" element={<ClientRegister/>}/>
          <Route path="forget-password" element={<ClientForgetPassword/>}/>
          <Route path="dashboard" element={<ClientDashboard/>}/>
          <Route path="projects" element={<ClientProject/>}/>
          <Route path="find-jobs" element={<ClientFindJob/>}/>
          <Route path="message" element={<ClientMessage/>}/>
          <Route path="payments" element={<ClientPayment/>}/>
          <Route path="settings" element={<ClientSetting/>}/>
          <Route path="profile" element={<ClientProfile/>}/>
          <Route path="profileEdit" element={<ClientProfileEdit/>}/>
        </Route>


      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
