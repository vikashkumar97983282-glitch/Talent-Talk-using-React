import { Route, Routes } from "react-router-dom";
import Home from './adminpage/home/home'
import Login from "./adminpage/login/login";
import Dashboard from "./adminpage/admin/dashboard";
import Users from './adminpage/users/users'
import Job from './adminpage/jobs/jobs'
import Payments from './adminpage/payments/payments'
import Invoice from './adminpage/invoice/invoice'
import Insights from "./adminpage/insights/insights";
import Company from './adminpage/company/company'
import Settings from './adminpage/profile/settings'
import AccountSettings from "./adminpage/profile/accountsetting";


// company side pages
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



// client side page
import ClientRegister from "./clientpage/clientregister/clientregister";
import ClientLogin from "./clientpage/clientlogin/clientlogin";
import ClientForgetPassword from "./clientpage/clientlogin/clientforget";
import ClientDashboard from "./clientpage/clientDashboard/clientDashboard";
import ClientFindJob from "./clientpage/clientfindjob/clientfindjob";


function App() {
  return (
    <div>

    {/* // company side  pages */}
    {/* <CompanyRegister/> */}
    {/* <CompanyLogin/> */}
    {/* <CompanyForgotPassword/> */}
    {/* <CompanyDashboard/> */}
    {/* <CompanyClient/> */}
    {/* <CompanyPostJob/> */}
    {/* <CompanyManageJob/> */}
    {/* <CompanyJobApplication/> */}
    {/* <CompanyMessage/> */}
    {/* <CompanyPayment/> */}
    {/* <CompanySetting/> */}
    {/* <CompanyProfile/> */}
    {/* <CompanyEdit/> */}



    {/* client side page  */}
    {/* <ClientRegister/> */}
    {/* <ClientLogin/> */}
    {/* <ClientForgetPassword/> */}
    {/* <ClientDashboard/> */}
    <ClientFindJob/>





      {/* // admin page routing  */}
      {/* <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/users" element={<Users />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/company" element={<Company />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/accountsetting" element={<AccountSettings />} />
      </Routes> */}
    </div>
  );
}

export default App;