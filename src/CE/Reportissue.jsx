import React, { useRef, useState } from "react";
import axios from "axios"; // Make sure you have imported axios
import { toast } from "react-hot-toast"; // Ensure toast is used properly

const ReportIssueForm = () => {
  let id=localStorage.getItem('id');
  const token = localStorage.getItem("token"); 
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [data, setdata] = useState({}); // ✅ Define the missing state
  const [refresh, setRefresh] = useState(false);
// Replace with actual token logic

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setdata((prevData) => ({
        ...prevData,
        proof: file, // ✅ Store file in data state
      }));
    }
  };

  const handlechange = (event) => {
    setdata((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("userid", id);

    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    try {
      let response = await axios.post(
        `http://localhost:5000/user/postcomplaint`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setdata({}); // ✅ Reset data after submission
      toast.success("Complaint submitted successfully!");
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit complaint.");
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Report Issues Seamlessly
        </h2>
        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="des"
              value={data.des || ""}
              onChange={handlechange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Complaint type</label>
            <select
              name="type"
              value={data.type || ""}
              onChange={handlechange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>Select type</option>
              <optgroup label="Vehicle">
                <option>Riding without helmets</option>
                <option>Reckless driving</option>
              </optgroup>
              <optgroup label="Others">
                <option>Waste dumping</option>
                <option>Public nuisance</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={data.location || ""}
              onChange={handlechange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Proof</label>
            <button
              type="button"
              onClick={triggerFileSelect}
              className="w-full mt-1 px-3 py-2 bg-blue-300 text-black font-medium rounded-lg hover:bg-blue-400 transition"
            >
              {fileName ? `Uploaded: ${fileName}` : "Upload photo or video"}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,video/*"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-1/2 px-3 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              className="w-1/2 px-3 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssueForm;
