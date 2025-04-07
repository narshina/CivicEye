import React from "react";
import { Link } from "react-router-dom";
import celogofull from "../CE/img/celogofull.png";
import ProfileDropdown from "./ProfileDropdown";

const CEHome = () => {
  return (
    <div className="bg-gray-100">
     
     <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <img src={celogofull} alt="" className="h-10"/>
        <ul className="flex space-x-8">
          <li className="cursor-pointer text-gray-700 hover:text-blue-500 transition duration-300">
            Home
          </li>
          
          <li className="cursor-pointer text-gray-700 hover:text-blue-500 transition duration-300">
            About
          </li>
          <li className="cursor-pointer text-gray-700 hover:text-blue-500 transition duration-300">
            Contact
          </li>
         
        </ul>
     <Link to="/celogin">  <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
       Login
      </button></Link> 
        </nav>
      {/* Hero Section */}
      <header className="relative bg-gray-900 text-white text-center py-20">
        <img
          src="https://source.unsplash.com/1600x600/?city,people"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold">
            Make Your Voice Heard! <br />
            Report Problems, Help Your City, and Earn Rewards!
          </h2>
          <Link to="/cesignup">
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Sign Up
            </button>
          </Link>
        </div>
      </header>

      {/* Complaint Reports Section */}
      <section className="py-10 text-center">
        <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Complaints Registered</h3>
            <p className="text-2xl font-bold">1002</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Reports Filed</h3>
            <p className="text-2xl font-bold">992</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Rewards Distributed</h3>
            <p className="text-2xl font-bold">886</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Impact Made</h3>
            <p className="text-2xl font-bold">......</p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">What we do</h2>
        <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="border border-blue-500 p-4 rounded-lg">
            <p>You Register for Complaints</p>
          </div>
          <div className="border border-blue-500 p-4 rounded-lg">
            <p>Our Team Validates Your Complaint</p>
          </div>
          <div className="border border-blue-500 p-4 rounded-lg">
            <p>The Responsible Authority Acts</p>
          </div>
          <div className="border border-blue-500 p-4 rounded-lg">
            <p>Then Here’s a Reward for You</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">What our users have to say</h2>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <p className="text-gray-600 italic">
            "This is an amazing website that helps with public complaints."
          </p>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Write your feedback"
            className="border border-gray-300 p-2 rounded-lg w-1/2"
          />
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-10 grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-bold">Support Mail</h3>
          <p>For any assistance, please contact our support team.</p>
          <p className="text-blue-500">support@civiceye.com</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-bold">Make A Call</h3>
          <p>Need help? Give us a call anytime.</p>
          <p className="text-blue-500">+123 456 7890</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <div className="grid grid-cols-3 max-w-6xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold">Phone Numbers</h3>
            <p>+123 456 7890</p>
            <p>+987 654 3210</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <p>Solutions</p>
            <p>support@civiceye.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <p>Home</p>
            <p>About</p>
            <p>Contact</p>
          </div>
        </div>
        <p className="mt-4 text-sm">© CivicEye 2025 | Reporting Online. Ensuring Communities.</p>
      </footer>
    </div>
  );
};

export default CEHome;
