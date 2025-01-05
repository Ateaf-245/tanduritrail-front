import "../styles.css";
import logo from "../assets/logo.png";
import React, { useState } from "react";
import { NavItems } from "../constants";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileDrawerOpen, setmobileDrawerOpen] = useState(false);
  const toggleNavbar = () => {
    setmobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 h-16 z-50 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img
              className="w-12 h-13 mr2 rounded-full mt-2"
              src={logo}
              alt="logo"
            />
            <span className="text-xl tracking-tight mt-2 ml-2">
              TanduriTrail
            </span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-5 mt-2">
            {NavItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="h-10 py-2 px-2 hover:bg-slate-300 hover:text-black rounded-md"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className=" hidden lg:flex justify-center space-x-12 items-center ">
            <Link
              to="/SignIn"
              className="py-2 px-3 border rounded-md hover:bg-slate-300 hover:text-black"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="py-2 px-3 border rounded-md bg-gradient-to-r from-orange-500 to-orange-800  hover:text-black"
            >
              Create Account
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div
            className=" fixed right-0 z-20 bg-neutral-900 w-full p-12 flex-col justify-center items-center lg:hidden;
          "
          >
            <ul>
              {NavItems.map((item, index) => (
                <li
                  key={index}
                  className="mt-2 py-2 px-2 hover:bg-slate-300 hover:text-black rounded-md"
                >
                  <Link onClick={toggleNavbar} to={item.path}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className=" mt-2 flex space-x-6 justify-center">
              <Link
                onClick={toggleNavbar}
                to="/signIn"
                className="py-2 px-3 border rounded-md hover:bg-slate-300 hover:text-black"
              >
                Sign In
              </Link>
              <Link
                onClick={toggleNavbar}
                to="/register"
                className="py-2 px-3 border rounded-md bg-gradient-to-r from-orange-500 to-orange-800 hover:text-black"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
