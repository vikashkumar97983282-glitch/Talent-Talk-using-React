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


function App() {
  return (
    <div>

    {/* // company side  pages */}
    {/* <CompanyRegister/> */}
    {/* <CompanyLogin/> */}
    <CompanyForgotPassword/>

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