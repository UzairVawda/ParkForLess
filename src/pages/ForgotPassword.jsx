import React, { useState } from "react";
import { Link } from "react-router-dom";

import OAuth from "../components/OAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function handleChange(event) {
    const { value } = event.target;
    setEmail(value);
  }

  function submitForm(event) {
    event.preventDefault();
  }
  
  return (
    <section>
      <h1 className="text-4xl text-center mt-6 font-bold">Forgot Password</h1>
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
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              className="w-full px-4 py-2 mb-10 text-xl text-gray-700 bg-white border-gray-300 rounded-lg transition ease-in-out"
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:tex-lg">
              <p className="mb-6">
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="font-medium text-red-600 hover:text-red-700 transition duration-200 ease-in-out"
                >
                  Sign up here!
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="font-medium text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out"
                >
									Sign in instead
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-400 px-7 py-3 rounded-lg text-white text-lg font-medium uppercase shadow-md hover:bg-emerald-500 transition duration-150 ease-in-out hover:shadow-lg active:bg-emerald-600"
            >
							Reset Password
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
