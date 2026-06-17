import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import app from "./App";
export default function R2RLoginpage() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
   navigate("/app");
   
    
  };

  return (
  
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          


          <p className="mt-1 text-sm text-gray-500">
            
          </p>
        </div>

        {/* Form */}
        <form>
          {/* User ID */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              User ID
            </label>

            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Options */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-600">
                Remember me
              </span>
            </label>

            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
              type="button"
             onClick={handleLogin}
           
            className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-sm text-center text-gray-500">
          
        </div>
      </div>
    </div>
    
    
  );
}