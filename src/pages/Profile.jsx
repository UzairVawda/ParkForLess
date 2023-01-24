import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Profile() {
	const auth = getAuth();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }
	
  function handleSignOut(event) {
    event.preventDefault();
    auth.signOut();
    navigate("/");
  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6">My Profile</h1>
        <div className="w-full md:w-[67%] mt-6 px-3">
          <form>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled
              className="w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border border-gray-200 rounded-xl transition ease-in-out"
            />
						<input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className="w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border border-gray-200 rounded-xl transition ease-in-out"
            />
						<div className="mb-6 flex justify-between whitespace-nowrap text-sm sm:text-lg">
							<p className="flex items-center">Do you want to change your name?
								<span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer">Edit</span>
							</p>
							<p onClick={handleSignOut} className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 ml-1 cursor-pointer">Sign Out</p>
						</div>
          </form>
        </div>
      </section>
    </>
  );
}
