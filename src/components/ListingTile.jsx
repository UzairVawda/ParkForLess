import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdEditLocation, MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

export default function ListingTile(props) {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link
        className="contents"
        to={`/category/${props.listing.type}/${props.id}`}
      >
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={props.listing.imgUrls[0]}
          alt={props.listing.title}
        />

        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {props.listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdEditLocation className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {props.listing.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">
            {props.listing.name}
          </p>
          <p className="text-[#457b9d] mt-2 font-semibold">
            $
            {props.listing.offer
              ? props.listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : props.listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {props.listing.type === "rent" && " / month"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {props.listing.bedrooms > 1
                  ? `${props.listing.bedrooms} Beds`
                  : "1 Bed"}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {props.listing.bathrooms > 1
                  ? `${props.listing.bathrooms} Baths`
                  : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {props.onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-700"
          onClick={() => props.onDelete(props.id)}
        />
      )}
      {props.onEdit && (
        <MdEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer"
          onClick={() => props.onEdit(props.id)}
        />
      )}
    </li>
  );
}
