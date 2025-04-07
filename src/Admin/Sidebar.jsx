import { useState } from "react";
import { FaHome, FaUser, FaCog, FaBars ,FaUserEdit} from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from "./Home";
import Usermanage from "./Usermanage";
import Feedback from "./Feedback";
import Complaints from "./Complaints";
import Complaintdetail from "./Complaintdetail";
import { IoLogOutSharp } from "react-icons/io5";



const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate=useNavigate()
  let id=localStorage.getItem("id")
  let token=localStorage.getItem("token")

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handlelogout=()=>{
    localStorage.removeItem("id")
    localStorage.removeItem("token")
    navigate("/")
    
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-gray-900 h-screen p-5 transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
        <div className="flex justify-between items-center">
          <h1 className={`text-white text-lg font-bold transition-all ${isOpen ? "block" : "hidden"}`}>
            Dashboard
          </h1>
          <button onClick={toggleSidebar} className="text-white">
            <FaBars size={20} />
          </button>
        </div>

        <nav className="mt-10">
    <Link to="/admin"> <NavItem icon={<FaHome />} text="Home" isOpen={isOpen} /></Link> 
      <Link to='/admin/usermanage'><NavItem icon={<FaUser />} text="User Management" isOpen={isOpen} /></Link>
      <Link to="/admin/complaints">  <NavItem icon={<FaUserEdit />} text="Complaints" isOpen={isOpen} /></Link>
      <Link to="/admin/feedback"> <NavItem icon={<MdFeedback />} text="Feedback" isOpen={isOpen} /></Link>
    <div onClick={handlelogout}> <NavItem  icon={<IoLogOutSharp />} text="Logout" isOpen={isOpen} /></div> 
        </nav>
      </div>


      <div className="flex-1 p-5">
       <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/usermanage" element={<Usermanage/>}></Route>
        <Route path="/feedback" element={<Feedback/>}></Route>
        <Route path="/complaints" element={<Complaints/>}></Route>
        <Route path="/complaintsdetail/:id" element={<Complaintdetail></Complaintdetail>}></Route>


       </Routes>
      </div>
    </div>
  );
};


const NavItem = ({ icon, text, isOpen }) => (
  <div className="flex items-center p-3 mt-2 text-gray-300 hover:bg-gray-700 rounded-lg cursor-pointer">
    <div className="text-xl">{icon}</div>
    <span className={`ml-4 text-lg transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
      {text}
    </span>
  </div>
);

export default Sidebar;
