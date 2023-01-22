import React from "react";
import { AiOutlineGoogle } from "react-icons/ai"

export default function OAuth() {
  return (
    <button
      className="flex items-center justify-center w-full bg-red-500 px-7 py-3 rounded-lg text-white text-lg font-medium uppercase shadow-md hover:bg-red-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-700"
    >
			<AiOutlineGoogle className="mr-5 text-black bg-white rounded-lg text-xl"/>
			continue with google
    </button>
  );
}
