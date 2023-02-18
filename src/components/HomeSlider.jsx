import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Spinner from "./Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router";

export default function HomeSlider() {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    async function getHomeImages() {
      const collectionRef = collection(db, "listings");
      const q = query(collectionRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }

    getHomeImages();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return (
      <>
        <div>SIGN UP TO ADD A LISTING</div>
      </>
    );
  }

  return (
    listings && (
      <>
        <Swiper
          Autoplay
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 5000 }}
        >
          {listings.map(({ id, data }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[400px] overflow-hidden"
              ></div>
              <p
                className="text-white absolute left-1 top-5 font-medium 
							max-w-[90%] bg-[#457B9D] shadow-lg opacity-90 p-3 rounded-r-3xl"
              >
                {data.name}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
