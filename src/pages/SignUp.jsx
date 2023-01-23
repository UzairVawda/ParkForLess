import React, { useState } from "react";
import {toast} from "react-toastify"
import { Link, useNavigate } from "react-router-dom";
import { AiTwotoneEyeInvisible, AiTwotoneEye } from "react-icons/ai";

import { db } from "../Firebase"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { serverTimestamp, setDoc, doc } from "firebase/firestore";

import OAuth from "../components/OAuth";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
		name: "",
    email: "",
    password: "",
  });
  const [passwordState, setPasswordState] = useState(true);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevVale) => ({
      ...prevVale,
      [name]: value,
    }));
  }

  function togglePassState() {
    setPasswordState((prevVale) => !prevVale);
  }
  
  async function submitForm(event) {
    event.preventDefault();
    try {
      const auth = getAuth();     
      const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      updateProfile(auth.currentUser, {
        displayName : formData.name
      })
      const user = userCred.user
      const { password, ...data } = formData
      data.createdTimestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), data);
      navigate("/");
    } catch (error) {
      toast.error("Failed to register!")
    }
  }

  return (
    <section>
      <h1 className="text-4xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-12 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
            alt="looking for parking"
            className="w-full rounded-xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-10 ">
          <form onSubmit={submitForm}>
						<input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="w-full px-4 py-2 mb-10 text-xl text-gray-700 bg-white border-gray-300 rounded-lg transition ease-in-out"
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              className="w-full px-4 py-2 mb-10 text-xl text-gray-700 bg-white border-gray-300 rounded-lg transition ease-in-out"
            />
            <div className="relative mb-6">
              <input
                type={passwordState ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-lg transition ease-in-out"
              />
              {passwordState ? (
                <AiTwotoneEyeInvisible
                  className="absolute right-3 top-3 text-2xl cursor-pointer"
                  onClick={togglePassState}
                />
              ) : (
                <AiTwotoneEye
                  className="absolute right-3 top-3 text-2xl cursor-pointer"
                  onClick={togglePassState}
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:tex-lg">
              <p className="mb-6">
                Already have an account?
                <Link
                  to="/sign-in"
                  className="font-medium text-red-600 hover:text-red-700 transition duration-200 ease-in-out"
                >
                  Sign in here!
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out"
                >
                  Forgot Password
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-400 px-7 py-3 rounded-lg text-white text-lg font-medium uppercase shadow-md hover:bg-emerald-500 transition duration-150 ease-in-out hover:shadow-lg active:bg-emerald-600"
            >
              Sign Up
            </button>
            <div className="my-4 before:border-t flex before:flex-1 items-center before:border-gray-500 after:border-t after:flex-1 after:border-gray-500">
              <p className="text-center font-medium mx-4">OR</p>
            </div>
						<OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
