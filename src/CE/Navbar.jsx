import React from 'react'
import ProfileDropdown from './ProfileDropdown'
import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
        <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition duration-300">
          <span className="text-black">Civic</span>
          <span className="text-blue-500">EYE</span>
        </h1>
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
        </ul>
        <ProfileDropdown />
        </nav>
       <Outlet></Outlet>
    </div>
  
  )
}

export default Navbar