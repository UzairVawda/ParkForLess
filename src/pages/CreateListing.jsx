import React, { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../Firebase";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router";

export default function CreateListing() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 0,
    bathrooms: 0,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: "1",
    discountedPrice: "1",
    latitude: 0,
    longitude: 0,
    images: {},
  });

  const [geoLocationApiEnabled, setGeoLocationApiEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    const { name, value, files } = e.target;
    let boolCheck = null;
    if (value === "true") boolCheck = true;
    if (value === "false") boolCheck = false;
    if (files) {
      setFormData((prevVal) => ({
        ...prevVal,
        images: files,
      }));
    }
    if (!files) {
      setFormData((prevVal) => ({
        ...prevVal,
        [name]: boolCheck ?? value,
      }));
    }
  }

  async function submitListing(e) {
    e.preventDefault();
    setLoading(true);
    if (+formData.discountedPrice >= +formData.regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    let geolocation = {};
    let location;
    if (geoLocationApiEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${formData.address}&key=${process.env.REACT_APP_GEOCODING_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      if (location === undefined) {
        setLoading(false);
        toast.error("please enter a correct address");
        return;
      }
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }
    const imgUrls = await Promise.all(
      [...formData.images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const copyFormData = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
    };
    delete copyFormData.images;
    !copyFormData.offer && delete copyFormData.discountedPrice;
    delete formData.latitude;
    delete formData.longitude;
    const docRef = await addDoc(collection(db, "listings"), copyFormData);
    setLoading(false);
    toast.success("Listing Created!");
    navigate(`/category/${formData.type}/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="max-w-3xl px-2 mb-5 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <form onSubmit={submitListing}>
        <p className="text-lg mt-6 font-semibold">Sell/Rent</p>
        <div className="flex">
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              formData.type === "sell"
                ? "bg-slate-600 text-white"
                : "bg-white text-black"
            }`}
            type="button"
            value="sell"
            onClick={handleChange}
            name="type"
          >
            Sell
          </button>
          <button
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              formData.type === "rent"
                ? "bg-slate-600 text-white"
                : "bg-white text-black"
            }`}
            type="button"
            value="rent"
            onClick={handleChange}
            name="type"
          >
            Rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          maxLength="32"
          minLength="10"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white-border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <div className="flex items-center space-x-6 mb-6">
          <div>
            <p className="text-lg mt-6 font-semibold">Bed</p>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min="0"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <div>
            <p className="text-lg mt-6 font-semibold">Bath</p>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min="0"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold">Parking Spot</p>
        <div className="flex">
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              formData.parking
                ? "bg-slate-600 text-white"
                : "bg-white text-black"
            }`}
            type="button"
            value={true}
            onClick={handleChange}
            name="parking"
          >
            Yes
          </button>
          <button
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !formData.parking
                ? "bg-slate-600 text-white"
                : "bg-white text-black"
            }`}
            type="button"
            value={false}
            onClick={handleChange}
            name="parking"
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex">
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              formData.furnished
                ? "bg-slate-600 text-white"
                : "bg-white text-black"
            }`}
            type="button"
            value={true}
            onClick={handleChange}
            name="furnished"
          >
            Yes
          </button>
          <button
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !formData.furnished
                ? "bg-slate-600 text-white"
                : "bg-white text-black"
            }`}
            type="button"
            value={false}
            onClick={handleChange}
            name="furnished"
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Address</p>
        <input
          type="textarea"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          placeholder="address"
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
        />
        {!geoLocationApiEnabled && (
          <div className="flex space-x-6 justify-start mb-6">
            <div>
              <p className="text-lg mt-6 font-semibold">Latitude</p>
              <input
                type="number"
                onChange={handleChange}
                name="latitude"
                value={formData.latitude}
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                min="-90"
                max="90"
              />
            </div>
            <div>
              <p className="text-lg mt-6 font-semibold">Longitude</p>
              <input
                type="number"
                onChange={handleChange}
                name="longitude"
                value={formData.longitude}
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                min="-180"
                max="180"
              />
            </div>
          </div>
        )}
        <p className="text-lg mt-6 font-semibold">Description</p>
        <input
          type="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="description"
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
        />
        <p className="text-lg mt-6 font-semibold">Offer</p>
        <div className="flex">
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              formData.offer ? "bg-slate-600 text-white" : "bg-white text-black"
            }`}
            type="button"
            value={true}
            onClick={handleChange}
            name="offer"
          >
            Yes
          </button>
          <button
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !formData.offer
                ? "bg-slate-600 text-white"
                : "bg-white text-black"
            }`}
            type="button"
            value={false}
            onClick={handleChange}
            name="offer"
          >
            No
          </button>
        </div>
        <div className="flex w-full items-end space-x-6">
          <div>
            <p className="text-lg mt-6 font-semibold">Regular Price</p>
            <input
              type="number"
              name="regularPrice"
              value={formData.regularPrice}
              onChange={handleChange}
              min="10"
              max="10000000000000"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          {formData.type === "rent" && (
            <div className="">
              <p className="text-lg mt-6 font-semibold">$ / month</p>
            </div>
          )}
        </div>
        {formData.offer && (
          <div className="flex w-full items-end space-x-6">
            <div>
              <p className="text-lg mt-6 font-semibold">Discounted Price</p>
              <input
                type="number"
                name="discountedPrice"
                value={formData.discountedPrice}
                onChange={handleChange}
                min="10"
                max="10000000000000"
                required={formData.offer}
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
            {formData.type === "rent" && (
              <div className="">
                <p className="text-lg mt-6 font-semibold">$ / month</p>
              </div>
            )}
          </div>
        )}
        <div className="mb-6">
          <p className="text-lg mt-6 font-semibold">Name</p>
          <p className="text-gray-500">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            name="images"
            id="images"
            onChange={handleChange}
            accept=".jpg, .png, .jpeg "
            required
            multiple
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-emerald-400 text-white font-bold text-medium uppercase rounded shadow-md hover:bg-emerald-500 hover:shadow-lg focus:bg-emerald-500 focus:shadow-lg active:bg-emerald-500 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create Listing
        </button>
      </form>
    </main>
  );
}
