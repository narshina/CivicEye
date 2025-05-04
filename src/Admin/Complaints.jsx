import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye } from "react-icons/fa";

import { Link } from 'react-router-dom';

const Complaints = () => {
  const [data, setData] = useState([]);
    const token = localStorage.getItem("token");
   const id=localStorage.getItem("id");
  
    useEffect(() => {
      if (!token) {
        toast.error("Authentication token missing!");
        return;
      }
  
      const fetchData = async () => {
        try {
          const response = await axios.get("https://civiceye-2.onrender.com/user/vcom", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(response.data); // Set response data directly
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error(error.response?.data?.message || "Something went wrong!");
        }
      };
      fetchData();
    }, [token]);
  console.log(data);
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
  


  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        {/* Table Head */}
        <thead className="bg-gray-200">
          <tr className="text-left text-gray-800">
            <th className="p-3 border border-gray-300">User</th>
            <th className="p-3 border border-gray-300">Email</th>
            <th className="p-3 border border-gray-300">Complaint Type</th>
            <th className="p-3 border border-gray-300">Date</th>
           
            <th className="p-3 border border-gray-300">Status</th>
            <th className="p-3 border border-gray-300">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} border border-gray-300`}>
              <td className="p-3 border border-gray-300">{item.user.name}</td>
              <td className="p-3 border border-gray-300">{item.user.email}</td>
              <td className="p-3 border border-gray-300">{item.complaints.type}</td>
       

              <td className="p-3 border border-gray-300">{formatDate(item.complaints.createdAt)}</td>
              <td className="p-3 border border-gray-300">{item.complaints.status}</td>

              <td className="p-3 border border-gray-300">
                <div className="flex gap-4 justify-center">
              <Link to={`/admin/complaintsdetail/${item.complaints._id}`}>   <a href="#" target="_blank" rel="noopener noreferrer">
                    <FaEye size={20} />
                  </a></Link> 
                 
                </div>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Complaints