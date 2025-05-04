import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";



const Uservcom = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    if (!token) {
      toast.error("Authentication token missing!");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("https://civiceye-2.onrender.com/user/viewcomplaint", {
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

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://civiceye-2.onrender.com/user/deletecomplaint/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Complaint deleted successfully!");
      setData(data.filter((complaint) => complaint._id !== id)); // Remove deleted complaint from state
    } catch (error) {
      console.error("Error deleting complaint:", error);
      toast.error(error.response?.data?.message || "Failed to delete complaint");
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(`https://civiceye-2.onrender.com/uploads/proof/${filename}`, {
        responseType: "blob", // Important for handling binary data
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Download with the correct filename
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download proof.");
    }
  };
  
 
  

  return (
    <div>
      <div className="flex-1 p-12">
        <div className="bg-white rounded-lg shadow-2xl p-5">
          <div className="grid grid-cols-7 gap-6 p-3 text-2xl font-bold border-b">
            <div>Complaint Type</div>
            <div>Description</div>
            <div>Location</div>
            <div>Date</div>
            <div>Proof</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {data.length > 0 ? (
            data.map((user, index) => (
              <div
                key={user._id}
                className={`grid grid-cols-7 gap-8 p-4 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <div>{user.type}</div>
                <div>{user.des}</div>
                <div>{user.location}</div>
                <div>{formatDate(user.createdAt)}</div>
              <div>
  {user.proof ? (
    <div className="flex flex-row gap-8">
      {/* View Proof */}
      <a
              href={`https://civiceye-2.onrender.com/uploads/proof/${user.proof}`}
        target="_blank" 
        rel="noopener noreferrer"
        
      >
       <FaEye size={23}/>
      </a>

      {/* Download Proof */}
     
  <button
    onClick={() => handleDownload(user.proof)}
    className=""
  >
   <IoMdDownload  size={23}/>
  </button>

    </div>
  ) : (
    "No Proof"
  )}
</div>

                <div>{user.status}</div>
                <div className="text-blue-500">
                  <RiDeleteBinFill onClick={() => handleDelete(user._id)} size={25} className="cursor-pointer" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-xl font-medium">
              No complaints found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Uservcom;
