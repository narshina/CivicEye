import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Uservcom = () => {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/vcom`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          console.log("Error Data:", error.response.data);
          console.log("Error Status:", error.response.status);
          toast.error(error.response.data);
        } else {
          console.log("Error Message:", error.message);
          toast.error("Something went wrong!");
        }
      }
    };
    fetchData();
  }, [id,token]);
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
  
 

  return (
    <div>
      <div className="flex-1 p-12">
        <div className="bg-white rounded-lg shadow-2xl p-6">
          <div className="grid grid-cols-6 gap-6 p-4 text-2xl font-bold border-b">
            <div>Complaint Type</div>
            <div>Description</div>
            <div>location</div>
            <div>Date</div>
            <div>IProof</div>
          </div>

          {data.length > 0 ? (
            data.map((user, index) => (
              <div
                key={index}
                className={`grid grid-cols-6 gap-8 p-4 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <div>{user.complaints.type}</div>
                <div>{user.complaints.des}</div>
                <div>{user.complaints.location}</div>
                <div>{formatDate(user.complaints.createdAt)}</div>
                <div>{user.complaints.proof}</div>
                
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-xl font-medium">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Uservcom;
