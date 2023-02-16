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
import { FaRegPaperPlane } from "react-icons/fa";

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
      {listing.name}
    </main>
  );
}
