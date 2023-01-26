import React, { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 0,
    bathrooms: 0,
    parking: true,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: "1",
    discountedPrice: "1",
  });
  function handleChange(e) {}

  return (
    <main className="max-w-3xl px-2 mb-5 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <form>
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
              name="bedrooms"
              value={formData.bedrooms}
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
            name="unfurnished"
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
