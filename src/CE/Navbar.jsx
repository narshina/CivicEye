import React from 'react'
import ProfileDropdown from './ProfileDropdown'
import celogofull from "../CE/img/celogofull.png";
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
        <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
         <img src={celogofull} alt="" className="h-10"/>
        <ul className="flex space-x-8">
        <Link to="/user">  <li className="cursor-pointer text-gray-700 hover:text-blue-500 transition duration-300">
            Home
          </li></Link>
        <Link to="/user/vcomplaint">  <li className="cursor-pointer text-gray-700 hover:text-blue-500 transition duration-300">
            My Complaints
          </li></Link>
          <li className="cursor-pointer text-gray-700 hover:text-blue-500 transition duration-300">
            About
          </li>
          <li className="cursor-pointer text-gray-700 hover:text-blue-500 transition duration-300">
            Contact
          </li>
          <li className="cursor-pointer text-gray-700 hover:text-blue-500 transition duration-300">
           Feedback
          </li>
        </ul>
        <ProfileDropdown />
        </nav>
       <Outlet></Outlet>
    </div>
  
  )
}

export default Navbar