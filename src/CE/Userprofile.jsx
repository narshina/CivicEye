import axios from "axios";
import celogofull from "../CE/img/celogofull.png";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CEUserprofile = () => {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const [data, setdata] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://civiceye-2.onrender.com/user/viewprofile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setdata(response.data);
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
    fetchdata();
  }, [id, token, refresh]);

  const handlechange = (event) => {
    setdata((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handlefile = (event) => {
    setdata((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.files[0],
    }));
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    try {
      let response = await axios.put(
        `https://civiceye-2.onrender.com/user/updateprofile/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setdata(response.data);
      toast.success("Profile updated successfully!");
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="flex justify-center items-center h-95vh bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[80%] max-w-4xl">
        {/* Header with Logo */}
        <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center">
          <img src={celogofull} alt="Civic Eye Logo" className="h-10 w-auto ml-3" />
        </h1>

        <form onSubmit={handlesubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-start text-left">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={data.name || ""}
                onChange={handlechange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col items-start text-left">
              <label className="block text-sm font-medium text-gray-700">State</label>
              <select
                name="state"
                value={data.state || ""}
                onChange={handlechange}
                className="w-full p-2 border rounded-md bg-white cursor-pointer"
              >
                <option value="">Select District</option>
                {[
                  "Kasargod", "Kannur", "Wayanad", "Kozhikode", "Malappuram",
                  "Palakkad", "Thrissur", "Ernakulam", "Idukki", "Kottayam",
                  "Alappuzha", "Pathanamthitta", "Kollam", "Thiruvananthapuram"
                ].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-start text-left">
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="text"
                name="phonenumber"
                value={data.phonenumber || ""}
                onChange={handlechange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col items-start text-left">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={data.address || ""}
                onChange={handlechange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col items-start text-left">
              <label className="block text-sm font-medium text-gray-700">Email ID</label>
              <input
                type="email"
                name="email"
                value={data.email || ""}
                onChange={handlechange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col items-start text-left">
              <label className="block text-sm font-medium text-gray-700">ID Proof</label>
              <input
                type="file"
                name="idproof"
                onChange={handlefile}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col items-start text-left">
              <label className="block text-sm font-medium text-gray-700">D.O.B</label>
              <input
                type="date"
                name="dob"
                value={data.dob || ""}
                onChange={handlechange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col items-start text-left">
              <label className="block text-sm font-medium text-gray-700">ID Proof Number</label>
              <input
                type="text"
                name="idproofnumber"
                value={data.idproofnumber || ""}
                onChange={handlechange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-2xl hover:bg-blue-600 transition duration-200">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CEUserprofile;
