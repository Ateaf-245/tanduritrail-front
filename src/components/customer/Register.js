import React, { useEffect, useState } from "react";
import BgImage from "../../assets/bannersList/banner_4.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerCustomer } from "../../services/userService";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmedPassword] = useState("");
  const [roleName, setRoleName] = useState("BUYER");
  const [error, setError] = useState("");

  //fetching request param
  const location = useLocation();
  const requestParam = new URLSearchParams(location.search);
  const isSeller = requestParam.get("restaurants" === "true");

  useEffect(() => {
    setRoleName(isSeller ? "SELLER" : "BUYER");
  }, [isSeller]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[6-9][0-9]{9}$/.test(phone);

  // after sucessfull registeration send the jwt along with response > use token to complete
  // the registeration of resturant
  // asking the customer to update the address
  // validate email id with OTP

  //backend for resturant
  // once new restaurant is register the owner can login and access the dashboard and other feature but can't go live
  // until approved by admin (set criteria).


  const navigate = useNavigate();


  const handleRegistration = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      !email ||
      !phone
    ) {
      setError("All fields are mandatory to proceed further !");
      return;
    }

    if (password !== confirmPassword) {
      setError("password and confirmPassword does not match !");
      return;
    }

    if (!validateEmail(email)) {
      setError("please provide a valid email address !");
      return;
    }

    if (!validatePhone(phone)) {
      setError(" please provide a valid phone number !");
      return;
    }

    const customerDetails = {
      firstName,
      lastName,
      password,
      phone,
      email,
      roleName,
    };

    try {
      await registerCustomer(customerDetails);
      navigate("/updateAddress");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)] bg-gray-100 relative">
      <div
        className=" lg:absolute fixed inset-0 bg-cover bg-center  opacity-100"
        style={{ backgroundImage: `url(${BgImage})` }}
      ></div>
      <div className=" relative z-10 ml-2  sm:mt-3 mt-36 mr-2 w-full lg:max-w-xl max-w-md lg:p-8 px-8 pt-6 pb-4 bg-white rounded-lg shadow-lg">
        <h1 className="lg:text-2xl font-extrabold text-center text-gray-800 lg:mb-4 mb-3 ">
          Welcome to TanduriTrail!
        </h1>
        <p className="text-xs sm:text-sm text-center text-gray-600 mb-4">
          create a new account to explore delicious meals at you doorstep.
        </p>

        {error && (
          <div className="mb-1 text-sm bg-red-100 p-1 rounded text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleRegistration}>
          <div className="sm:grid sm:grid-cols-2 sm:gap-2">
            <div className="mb-3 ">
              <label
                htmlFor="firstName"
                className="block float-left text-gray-700 font-medium lg:text-base text-sm"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-stone-700 lg:text-base text-sm px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              ></input>
            </div>

            <div className="mb-3 ">
              <label
                htmlFor="lastName"
                className="block float-left text-gray-700 font-medium lg:text-base text-sm"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-stone-700 lg:text-base text-sm px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              ></input>
            </div>

            <div className="mb-3 ">
              <label
                htmlFor="password"
                className="block float-left text-gray-700 font-medium lg:text-base text-sm"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-stone-700  px-4 py-2 border border-gray-300 rounded-xl focus:outline-none lg:text-base text-sm focus:ring-orange-500 focus:border-orange-500"
              ></input>
            </div>

            <div className="mb-3">
              <label
                htmlFor="confirmPassword"
                className="block float-left  text-gray-700 font-medium lg:text-base text-sm"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmedPassword(e.target.value)}
                className="w-full bg-stone-700  lg:text-base text-sm px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              ></input>
            </div>

            <div className="mb-3 ">
              <label
                htmlFor="phone"
                className="block float-left  text-gray-700 font-medium lg:text-base text-sm"
              >
                Mobile Number
              </label>
              <input
                type="number"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-stone-700 lg:text-base text-sm px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              ></input>
            </div>

            <div className="mb-3 ">
              <label
                htmlFor="email"
                className="block float-left text-gray-700 font-medium lg:text-base text-sm"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full lg:text-base text-sm bg-stone-700 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              ></input>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 lg:text-base text-sm text-white font-bold  mt-4 py-2 px-4 rounded-xl focus:ring-orange-300 focus:outline-none hover:bg-orange-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link
              to="/SignIn"
              className="text-orange-500 font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
