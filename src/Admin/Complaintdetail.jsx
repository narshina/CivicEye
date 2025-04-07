import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Complaintdetail = () => {
  const [data, setData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem('token');
  const { id } = useParams();

  useEffect(() => {
    if (!token) {
      toast.error('Authentication token missing!');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/vcomdetail/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error(error.response?.data?.message || 'Something went wrong!');
      }
    };

    fetchData();
  }, [id, token, refresh]);

  const handleChange = (event) => {
    setData((prevData) => ({ ...prevData, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/user/managecom/${id}`,
        { status }, // Send status as JSON
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      setRefresh(!refresh);
      toast.success(`Complaint marked as ${status}`);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };
  

  return (
    <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Complaint Details</h1>
      <p><strong>Description:</strong> {data.des}</p>
      <p><strong>Type:</strong> {data.type}</p>
      <p><strong>Location:</strong> {data.location}</p>
      <p><strong>Status:</strong> {data.status}</p>
      <p><strong>Date:</strong> {data.createdAt ? new Date(data.createdAt).toLocaleString() : 'N/A'}</p>
      {data.proof && (
        <div className="mt-4">
          <strong>Proof:</strong>
          <video controls className="w-full mt-2">
            <source src={`http://localhost:5000/uploads/proof/${data.proof}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div className="mt-4 flex gap-4">
        <button onClick={() => { handleSubmit('reject') }} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Reject</button>
        <button onClick={() => { handleSubmit('resolve') }} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Resolve</button>
      </div>
    </div>
  );
};

export default Complaintdetail;
