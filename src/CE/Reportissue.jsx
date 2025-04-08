import React, { useRef, useState } from "react";
import axios from "axios"; 
import { toast } from "react-hot-toast"; 

const ReportIssueForm = () => {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState({
    des: "",
    type: "",
    location: "",
    proof: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setData((prevData) => ({
        ...prevData,
        proof: file,
      }));
    }
  };

  const handleChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("userid", id);
    formData.append("des", data.des);
    formData.append("type", data.type);
    formData.append("location", data.location);
    if (data.proof) {
      formData.append("proof", data.proof);
    }

    try {
      const response = await axios.post(
        `https://civiceye-2.onrender.com/user/postcomplaint`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setData({ des: "", type: "", location: "", proof: null });
      setFileName("");
      toast.success("Complaint submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit complaint.");
    } finally {
      setIsSubmitting(false);
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="des"
              value={data.des}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Complaint type</label>
            <select
              name="type"
              value={data.type}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select type</option>
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
              value={data.location}
              onChange={handleChange}
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
              className={`w-1/2 px-3 py-2 text-white font-medium rounded-lg transition ${
                isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
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
