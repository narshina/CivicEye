import React, { useState } from 'react';
import celogofull from '../CE/img/celogofull.png';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export const CeLogin = () => {
    const navigate=useNavigate();
    const [logindata, setlogindata] = useState({});


    const change = (event) => {
        setlogindata({ ...logindata, [event.target.name]: event.target.value });
    };

    const submit = async (event) => {
        event.preventDefault();
        try {
            let response= await axios.post("https://civiceye-2.onrender.com/user/login", logindata,{
                headers: {
                    "Content-Type": "application/json",
                }
        });
        console.log(response);
        if(response.data){
            localStorage.setItem("id",response.data._id);
            localStorage.setItem("token",response.data.token);
            console.log(response.data.usertype);
            console.log(response.data);
            
            
            if(response.data.usertype==="admin"){
                navigate("/admin");
            }
            else{
                navigate("/user");
            }
            
        }
           
        
        } catch (error) {
            console.log("CL", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 px-6">
            {/* Outer Container */}
            <div className="bg-white flex flex-col md:flex-row w-full md:w-[850px] shadow-lg rounded-2xl p-10">
                
                {/* Left Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-gray-300 p-8">
                    <img src={celogofull} alt="Civic Eye Logo" className="w-40 mb-4" />
                    <p className="text-gray-800 text-lg font-medium text-center">
                        Welcome to <span className="font-semibold">CivicEye!</span>
                    </p>
                    <p className="text-gray-500 text-center mt-2">
                        Your platform to report, track, <br />
                        and resolve public issues with ease.
                    </p>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center p-8">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                        SIGN <span className="text-[#00B9FF]">IN</span>
                    </h2>

                    <form className="w-full max-w-sm" onSubmit={submit}>
                        {/* Email Field */}
                        <div className="mb-4">
                            <input
                                onChange={change}
                                id="email"
                                name="email"
                                type="email"
                                className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#00B9FF] placeholder-gray-500"
                                placeholder="Email"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-2">
                            <input
                                onChange={change}
                                id="password"
                                name="password"
                                type="password"
                                className="w-full px-4 py-2 border border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#00B9FF] placeholder-gray-500"
                                placeholder="Password"
                            />
                        </div>

                        {/* Forgot Password */}
                        <div className="w-full text-right mb-6">
                            <a href="#" className="text-sm text-[#00B9FF] hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#00B9FF] text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            SIGN IN
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-gray-600 text-sm mt-4">
                        Don't Have an Account?{' '}
                        <Link to="/cesignup" className="text-[#00B9FF] font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};
