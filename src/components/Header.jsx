import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import NavImg from "../images/logo.png";
import { getAuth, onAuthStateChanged } from "firebase/auth"
export default function Header() {
  const [pageState, setPageState] = useState("Sign In")
  const currentLocation = useLocation();
	const navigate = useNavigate()
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      if(user) {
        setPageState("Profile")
      } else {
        setPageState("Sign In")
      }
    })
  }, [auth])

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
            {auth.currentUser && 
              <li
              className={`py-3 text-sm font-semibold text-gray-400 cursor-pointer border-b-[3px] border-b-transparent 
              ${ matchRoute("/reviews") && "text-black border-b-red-500" }`}
              onClick={() => navigate("/profile")}
            >
              Reviews
            </li>
            }
            <li
              className={`py-3 text-sm font-semibold text-gray-400 cursor-pointer border-b-[3px] border-b-transparent 
							${ (matchRoute("/sign-in") || matchRoute("/profile")) && "text-black border-b-red-500" }`}
							onClick={() => navigate("/profile")}
            >
              { pageState }
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
