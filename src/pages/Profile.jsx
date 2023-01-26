import { db } from "../Firebase";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [changeDetails, setChangeDetails] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  function toggleChangeDetails() {
    setChangeDetails((prevValue) => !prevValue);
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== formData.name) {
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
        });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name: formData.name,
        });
        toast.success("Updated profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
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
              disabled={!changeDetails}
              className={`w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border border-gray-200 rounded-xl transition ease-in-out ${
                changeDetails && "bg-red-100 focus:bg-red-10"
              }`}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              className={
                "w-full px-4 py-2 mb-6 text-xl text-gray-700 bg-white border border-gray-200 rounded-xl transition ease-in-out"
              }
            />
            <div className="mb-6 flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetails && onSubmit();
                    toggleChangeDetails();
                  }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetails ? "Save" : "Edit"}
                </span>
              </p>
              <p
                onClick={handleSignOut}
                className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white uppercase px-7 py-3 text-medium font-medium rounded shadow-md hover:bg-emerald-500 transition duration-150 ease-in-out hover:shadow-lg"
          >
            <Link to="/create-listing" className="flex justify-center items-center">
              <AiOutlineHome className="mr-2 text-3xl bg-blue-300 rounded-full p-1 border-2"/>
              Rent Or Sell
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}
