import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { FaRegPaperPlane, FaBath, FaParking, FaCouch } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { RiHotelBedFill } from "react-icons/ri";

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    async function fetchSpecificListing() {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchSpecificListing();
  }, [params.id]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[350px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => setShareLinkCopied(false), 5000);
        }}
        className="fixed bottom-[13%] right-[3%] z-10 bg-white 
					cursor-pointer border-2 border-gray-400 rounded-full 
					w-12 h-12 flex justify-center items-center"
      >
        <FaRegPaperPlane className="text-lg" />
      </div>
      {shareLinkCopied && (
        <p className="fixed bottom-[18%] right-[3%] z-10 bg-white font-semibold border-2 border-gray-400 rounded-md px-5 py-1">
          Link Copied
        </p>
      )}

      <div className="m-4 p-4 rounded bg-white shadow-lg flex flex-col md:flex-row max-w-6xl lg:mx-auto lg:space-x-5">
        <div className="w-full h-[200px] lg:h-[500px]">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - ${" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? "/ month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 text-lg">
            <SiGooglemaps className="text-green-700 mr-1" /> {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-700 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="bg-green-700 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
                $
                {(listing.regularPrice - listing.discountedPrice)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                Discount
              </p>
            )}
          </div>
          <p className="my-3 ">
            <span className="font-semibold">Description - </span>{" "}
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold">
            <li className="flex items center whitespace-nowrap">
              <FaBath className="text-lg mr-3" />
              {"   "}
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `1 Bed`}
            </li>
            <li className="flex items center whitespace-nowrap">
              <RiHotelBedFill className="text-lg mr-3" />
              {"   "}
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `1 Bath`}
            </li>
            <li className="flex items center whitespace-nowrap">
              <FaParking className="text-lg mr-3" />
              {"   "}
              {listing.parking ? "Available" : "Unavailable"}
            </li>
            <li className="flex items center whitespace-nowrap">
              <FaCouch className="text-lg mr-3" />
              {"   "}
              {listing.furnished ? "Furnished" : "Not Furnished"}
            </li>
          </ul>
        </div>
        <div className="bg-blue-200 w-full h-[200px] lg:h-[500px] z-10 overflow-x-hidden"></div>
      </div>
    </main>
  );
}
