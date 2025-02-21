import React from "react";
import celogofull from "../CE/img/celogofull.png";

const users = [
  {
    name: "Karthik m",
    email: "chimbmon@gmail.com",
    phone: "1234567890",
    address: "123 Main St, City",
    idProof: "Aadhaar",
    reports: "5",
  },
  {
    name: "Viswajith e",
    email: "jithu@gmail.com",
    phone: "9876543210",
    address: "456 Elm St, Town",
    idProof: "Driving License",
    reports: "2",
  },
  {
    name: "Milan",
    email: "milanmon@gmail.com",
    phone: "1234567890",
    address: "123 Main St, City",
    idProof: "Aadhaar",
    reports: "5",
  },
  {
    name: "Neeraj",
    email: "appumon@gmail.com",
    phone: "1234567890",
    address: "123 Main St, City",
    idProof: "PAN",
    reports: "3",
  },
];

export const Adminuserlist = () => {
  return (
    <div className="flex w-full min-h-screen bg-[#e6f8ff]">
      <div className="bg-white w-65 min-h-screen p-6 shadow-lg">
        <div className="flex justify-center items-center mb-8">
          <img src={celogofull} width="250" height="80" alt="Civic Eye Logo" />
        </div>

        <div className="space-y-5">
          <button className="hover:bg-[#00b9ff] p-4 flex font-medium items-center text-2xl w-72 hover:text-white rounded-lg">
            <span>📊</span> <span className="ml-2">Overview</span>
          </button>
          <button className="hover:bg-[#00b9ff] p-4 flex font-medium text-2xl w-72 hover:text-white rounded-lg">
            <span>⚖️</span> <span className="ml-2">Complaints</span>
          </button>
          <button className="hover:bg-[#00b9ff] p-4 flex font-medium items-center text-2xl w-72 hover:text-white rounded-lg">
            <span>👤</span> <span className="ml-2">User Management</span>
          </button>
          <button className="hover:bg-[#00b9ff] p-4 flex font-medium items-center text-2xl w-72 hover:text-white rounded-lg">
            <span>📄</span> <span className="ml-2">Reports</span>
          </button>
        </div>

        <div className="absolute bottom-6 left-6 w-72">
          <button className="text-2xl font-medium p-4 bg-[#00b9ff] text-white w-full rounded-md">
            👮 Admin Name
          </button>
        </div>
      </div>

      <div className="flex-1 p-12">
        <div className="bg-white rounded-lg shadow-2xl p-6">
          <div className="grid grid-cols-6 gap-6 p-4 text-2xl font-bold border-b">
            <div>Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Address</div>
            <div>ID Proof</div>
            <div>Reports</div>
          </div>

          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={index}
                className={`grid grid-cols-6 gap-8 p-4 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.phone}</div>
                <div>{user.address}</div>
                <div>{user.idProof}</div>
                <div>{user.reports}</div>
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
