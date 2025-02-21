import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown"; // Import the updated ProfileDropdown

const Home2 = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
     

      {/* Hero Section */}
      <header className="relative bg-gray-900 text-white text-center py-32">
        <img
          src="https://source.unsplash.com/1600x600/?city,people"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6">Register Complaints</h2>
          <div className="flex justify-center gap-6 mt-4">
            {["Waste Dumping", "Public Nuisance", "Traffic Violation", "Others"].map(
              (category, index) => (
               <Link to='/user/cereportissue'> <button
                  key={index}
                  className="bg-white text-black px-6 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  {category}
                </button></Link>
              )
            )}
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 text-center bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {[
            { label: "Complaints Registered", value: 1002 },
            { label: "Reports Filed", value: 992 },
            { label: "Rewards Distributed", value: 886 },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-4">{item.label}</h3>
              <p className="text-4xl font-bold text-blue-600">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Phone Numbers</h3>
            <p>+123 456 7890</p>
            <p>+987 654 3210</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <p>support@civiceye.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <p>Home</p>
            <p>My Complaints</p>
            <p>About</p>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-gray-400">
          © CivicEye 2025 | Reporting Online. Ensuring Communities.
        </p>
      </footer>
    </div>
  );
};

export default Home2;
