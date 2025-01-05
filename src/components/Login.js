import React, { useState } from "react";
import { Link } from "react-router-dom";
import BgImage from "../assets/bannersList/banner_4.png"; // Ensure this path is correct

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    
    const loginDetails = { email, password};

  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-100 relative">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{ backgroundImage: `url(${BgImage})` }} // Dynamically set background image
      ></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Sign in to explore delicious meals near you.
        </p>

        {error && (
          <div className="mb-4 bg-red-100 p-3 rounded text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block float-left text-gray-700 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full  bg-stone-700 px-4 py-2 border border-gray-700 rounded-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block float-left text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-stone-700  px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-xl focus:ring-orange-300 focus:outline-none hover:bg-orange-600 transition duration-300"
          >
            Sign in
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-orange-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Create Account Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 font-bold hover:underline"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
