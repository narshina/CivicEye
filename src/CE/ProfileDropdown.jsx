import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutReason, setLogoutReason] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Profile
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg py-2 w-48">
          <button
            onClick={() => navigate("/user/ceuserprofile")}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300"
          >
            My Profile
          </button>
          <button
            onClick={handleLogout}// Open the modal on logout click
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-300"
          >
            Logout
          </button>
        </div>
      )}

      {/* Logout Reason Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Reason for Logout</h2>
            <select
              value={logoutReason}
              onChange={(e) => setLogoutReason(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="">Select a reason</option>
              <option value="Finished my session">Finished my session</option>
              <option value="Switching accounts">Switching accounts</option>
              <option value="Privacy concerns">Privacy concerns</option>
              <option value="Other">Other</option>
            </select>
            {logoutReason === "Other" && (
              <input
                type="text"
                placeholder="Enter your reason"
                className="w-full p-2 border rounded-md mb-4"
                onChange={(e) => setLogoutReason(e.target.value)}
              />
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={!logoutReason}
                className={`px-4 py-2 text-white rounded-md ${
                  logoutReason ? "bg-red-500 hover:bg-red-600" : "bg-gray-400"
                }`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
