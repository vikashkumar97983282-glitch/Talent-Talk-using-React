import React, { Suspense, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./adminpage/home/home";


// company side pages
const Login = lazy(() => import("./adminpage/login/login"));
const Dashboard = lazy(() => import("./adminpage/admin/dashboard"));
const Users = lazy(() => import("./adminpage/users/users"));
const Job = lazy(() => import("./adminpage/jobs/jobs"));
const Payments = lazy(() => import("./adminpage/payments/payments"));
const Invoice = lazy(() => import("./adminpage/invoice/invoice"));
const Insights = lazy(() => import("./adminpage/insights/insights"));
const Company = lazy(() => import("./adminpage/company/company"));
const Settings = lazy(() => import("./adminpage/profile/settings"));
const AccountSettings = lazy(() => import("./adminpage/profile/accountsetting"));
const CompanyRegister = lazy(() => import("./companypage/register/register"));
const CompanyLogin = lazy(() => import("./companypage/companylogin/companylogin"));
const CompanyForgotPassword = lazy(() => import("./companypage/register/companyforget"));
const CompanyDashboard = lazy(() => import("./companypage/companyadmin/dashboard"));
const CompanyClient = lazy(() => import("./companypage/companyclient/companyClient"));
const CompanyPostJob = lazy(() => import("./companypage/companypostjob/companypostjob"));
const CompanyManageJob = lazy(() => import("./companypage/companymanagejob/companymanagejob"));
const CompanyJobApplication = lazy(() => import("./companypage/companyJobApplication/companyJobApplication"));
const CompanyMessage = lazy(() => import("./companypage/message/companymessage"));
const CompanyPayment = lazy(() => import("./companypage/companyPayment/companyPayment"));
const CompanySetting = lazy(() => import("./companypage/companysetting/companySetting"));
const CompanyProfile = lazy(() => import("./companypage/companyprofile/companyprofile"));
const CompanyEdit = lazy(() => import("./companypage/companyEdit/companyEdit"));



// client side page
const ClientRegister = lazy(() => import("./clientpage/clientregister/clientregister"));
const ClientLogin = lazy(() => import("./clientpage/clientlogin/clientlogin"));
const ClientForgetPassword = lazy(() => import("./clientpage/clientlogin/clientforget"));
const ClientDashboard = lazy(() => import("./clientpage/clientDashboard/clientDashboard"));
const ClientFindJob = lazy(() => import("./clientpage/clientfindjob/clientfindjob"));
const ClientProject = lazy(() => import("./clientpage/clientproject/clientproject"));
const ClientJob = lazy(() => import("./clientpage/clientjobapply/clientjob"));
const ClientMessage = lazy(() => import("./clientpage/clientMessage/clientMessage"));
const ClientPayment = lazy(() => import("./clientpage/clientpayment/clientpayment"));
const ClientSetting = lazy(() => import("./clientpage/clientSetting/clientSetting"));
const ClientProfile = lazy(() => import("./clientpage/clientProfile/clientProfile"));
const ClientProfileEdit = lazy(() => import("./clientpage/clientProfileEdit/clientProfileEdit"));


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
    <div>

      <Suspense fallback={<div className="p-4">Loading...</div>}>
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
      </Suspense>
      


    </div>
  );
}

export default App;
