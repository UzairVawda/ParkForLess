import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function ContactForm(props) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", props.userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Failed to fetch landlord data. ");
      }
    }
    getLandlord();
  }, [props.userRef]);

  function onChange(e) {
    setMessage(e.target.value);
  }

  return (
    <>
      {landlord !== null && (
        <div>
          <p>
            Contact {landlord.name} for the {props.listing.name.toLowerCase()}!{" "}
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            className="w-full px-4 py-2 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded
						transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
          ></textarea>
          <a
            href={`mailto:${landlord.email}?subject=${props.listing.name}&body=${message}`}
          >
            <button
              className="w-full bg-blue-500 px-7 py-3 text-white rounded-md uppercase shadow-mg 
					hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg transition duration ease-in-out"
              type="button"
              target="_top"
            >
              Send Message Landlord
            </button>
          </a>
        </div>
      )}
    </>
  );
}
