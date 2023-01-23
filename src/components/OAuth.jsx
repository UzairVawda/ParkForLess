import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";

import { db } from "../Firebase"
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function OAuth() {
  const navigate = useNavigate(); 
  async function googleRegistration() {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider)
      const user = result.user 
      const data = {
        name: user.displayName,
        email: user.email,
        createdTimestamp:  serverTimestamp()
      }
      await setDoc(doc(db, "users", user.uid), data);
      navigate("/");
    } catch (error) {
      toast.error("Failed to register with google")
      console.log(error)
    }
  }

  return (
    <button type="button" onClick={googleRegistration}
    className="flex items-center justify-center w-full bg-red-500 px-7 py-3 rounded-lg text-white text-lg font-medium uppercase shadow-md hover:bg-red-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-700">
      <AiOutlineGoogle className="mr-5 text-black bg-white rounded-lg text-xl" />
      continue with google
    </button>
  );
}
