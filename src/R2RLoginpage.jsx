import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import app from "./App";
import axios from "axios";
import AdminPortal from "./components/AdminPortal";
export default function R2RLoginpage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isValid = password.length >= 8;
  const isTouched = password.length > 0;
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {

    if (email === "admin" && password === "123") {
      navigate("/admin-portal");
    }
    else {

      try {
        const { data } = await axios.post(
          "http://localhost:5000/login",
          {
            username: email,
            password,
          }
        );

        if (data.success) {
          // Store logged-in user
          localStorage.setItem("user", JSON.stringify(data.user));

          console.log("Stored User:", data.user);

          // Navigate based on status
          if (data.status === "Yes") {
            navigate("/app");
          } else {
            setError(`User status: ${data.status}`);
          }
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error(err);
        setError("error: " + err.response?.data?.message || "Server error");
      }
    }
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
          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-5" >
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className={`flex items-center gap-3 px-4  transition-colors bg-white border border-gray-300 rounded-lg outline-none h-14    ${!isTouched
              ? "focus-within:ring-2 focus-within:ring-blue-500"
              : isValid
                ? "border-green-500"
                : "border-red-500"
              }`}>
              {!isTouched ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
                <rect x="3.5" y="8" width="11" height="8" rx="2" stroke="#ABABAB" strokeWidth="1.4" />
                <path d="M6 8V6a3 3 0 016 0v2" stroke="#ABABAB" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="9" cy="12" r="1.2" fill="#ABABAB" />
              </svg> : isValid ? (
                // ✅ Success icon
                <svg width="18" height="18" fill="green" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5" stroke="green" strokeWidth="3" fill="none" />
                </svg>
              ) : (
                // ❌ Error icon
                <svg width="18" height="18" fill="red" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" stroke="red" strokeWidth="3" />
                </svg>
              )}

              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Must be 8 characters"
                className="flex-1 font-sans text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none no-eye"
              />
              <button type="button" onClick={() => setShowPw(p => !p)} className="flex-shrink-0">
                {showPw ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="#ABABAB" strokeWidth="1.4" />
                    <circle cx="9" cy="9" r="2" stroke="#ABABAB" strokeWidth="1.4" />
                    <line x1="3" y1="15" x2="15" y2="3" stroke="#ABABAB" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M2 9s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="#ABABAB" strokeWidth="1.4" />
                    <circle cx="9" cy="9" r="2" stroke="#ABABAB" strokeWidth="1.4" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {error && (
            <p className="px-3 py-2 mb-5 text-sm font-medium text-red-600 border border-red-200 rounded-lg bg-red-50" >
              {error}
            </p>
          )}

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