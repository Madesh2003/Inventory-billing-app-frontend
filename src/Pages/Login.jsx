import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../Components/Contexts/AuthContext";
import { setSessionStorageData } from "../Storage/Sessionstorage";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
    const { setLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(event) {
        event.preventDefault();
        axios.post("https://inventory-billing-app-backend-03.onrender.com/api/signin", { email, password})
            .then((response) => {
                if (response.status === 200) {
                    setLoggedIn(true);
                    setSessionStorageData("_tk", response.data.token);
                    navigate("/invoices-data");
                    toast(response.data.message);
                }else{
                    toast(response.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
                toast(err.response.data.message);
            });
    }
        
    return (
        <div className="flex flex-col items-center justify-center min-h-screen m-5 bg-gray-50">
            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                <form onSubmit={handleLogin}>
                    <div className="mt-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                        
                    <div className="mt-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <button 
                            type="submit" 
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-700 transform bg-brand-bg rounded-md hover:bg-black focus:outline-none"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-gray-700">
                    Create a new account{" "}
                    <span>
                        <Link to='/signup' className="text-myblue hover:underline">
                                SignUp
                        </Link>
                    </span>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}  
