import React from "react";
import { useLocation, useNavigate } from "react-router";
import NavImg from "../images/logo.png";

export default function Header() {
  const currentLocation = useLocation();
	const navigate = useNavigate()

  function matchRoute(route) {
    if (currentLocation.pathname === route) {
      return true;
    }
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-500">
      <header className="flex justify-between items-center px-3 max-w-5xl mx-auto">
        <div>
          <img src={NavImg} alt="logo" className="h-8 cursor-pointer" />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`py-3 text-sm font-semibold text-gray-400 cursor-pointer border-b-[3px] border-b-transparent 
							${ matchRoute("/") && "text-black border-b-red-500" }`}
							onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`py-3 text-sm font-semibold text-gray-400 cursor-pointer border-b-[3px] border-b-transparent 
							${ matchRoute("/offers") && "text-black border-b-red-500" }`}
							onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`py-3 text-sm font-semibold text-gray-400 cursor-pointer border-b-[3px] border-b-transparent 
							${ matchRoute("/sign-in") && "text-black border-b-red-500" }`}
							onClick={() => navigate("/sign-in")}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
