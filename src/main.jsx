import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CeLogin } from './CE/Login.jsx'
import Signup from './CE/Signup.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Adminuserlist } from './CE/Adminusers.jsx'
import Home2 from './CE/Home2.jsx'
import ReportIssueForm from './CE/Reportissue.jsx'
import CEUserprofile from './CE/Userprofile.jsx'
import CEHome from './CE/Home.jsx'
import Navbar from './CE/Navbar.jsx'
import Uservcom from './CE/Uservcom.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
  <Routes>
    <Route path="/" element={<CEHome />} />
    <Route path="/cesignup" element={<Signup />} />
    <Route path="/celogin" element={<CeLogin />} />

    {/* Nested Routes under /user/* */}
    <Route path="/user" element={<Navbar />}>
      <Route index element={<Home2 />} /> 
      <Route path="/user/ceadminuser" element={<Adminuserlist />} />
      <Route path="/user/cereportissue" element={<ReportIssueForm />} />
      <Route path="/user/ceuserprofile" element={<CEUserprofile />} />
      <Route path="/user/vcomplaint" element={<Uservcom/>} />
    </Route>
  </Routes>
</BrowserRouter>



  </StrictMode>

  ,)
