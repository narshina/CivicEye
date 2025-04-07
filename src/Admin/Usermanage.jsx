import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';

const Usermanage = () => {
  const [data, setData] = useState([]);
    const token = localStorage.getItem("token");
  
    useEffect(() => {
      if (!token) {
        toast.error("Authentication token missing!");
        return;
      }
  
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/user/vuser", {
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

  return (
    <div>
      <div className="overflow-x-auto p-4">
            <table className="w-full border-collapse border border-gray-300 shadow-lg">
              {/* Table Head */}
              <thead className="bg-gray-200">
                <tr className="text-left text-gray-800">
                  <th className="p-3 border border-gray-300">Name</th>
                  <th className="p-3 border border-gray-300">Email</th>
                  <th className="p-3 border border-gray-300">Address</th>
                  <th className="p-3 border border-gray-300">Phone Number</th>
                 
                </tr>
              </thead>
      
              {/* Table Body */}
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"} border border-gray-300`}>
                    <td className="p-3 border border-gray-300">{item.name}</td>
                    <td className="p-3 border border-gray-300">{item.email}</td>
                    <td className="p-3 border border-gray-300">{item.address}</td>
             
      
                    <td className="p-3 border border-gray-300">{item.phonenumber}</td>
                  
      
                    
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default Usermanage