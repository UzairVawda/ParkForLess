import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import HomeSlider from "../components/HomeSlider";
import ListingTile from "../components/ListingTile";
import Spinner from "../components/Spinner";
import { db } from "../Firebase";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [offerListings, setOfferListings] = useState(null);
  const [rentListings, setRentListings] = useState(null);
  const [sellListings, setSellListings] = useState(null);

  useEffect(() => {
    async function getListings() {
      try {
        const listingRef = collection(db, "listings");
        const qOffer = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const qRent = query(
          listingRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const qSell = query(
          listingRef,
          where("type", "==", "sell"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const qOfferSnap = await getDocs(qOffer);
        const qRentSnap = await getDocs(qRent);
        const qSellSnap = await getDocs(qSell);
        const qOfferListings = [];
        const qRentListings = [];
        const qSellListings = [];
        qOfferSnap.forEach((doc) => {
          return qOfferListings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        qRentSnap.forEach((doc) => {
          return qRentListings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        qSellSnap.forEach((doc) => {
          return qSellListings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(qOfferListings);
        setRentListings(qRentListings);
        setSellListings(qSellListings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
    getListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <HomeSlider />
      <div className="max-w-6xl mx-auto pt-4 space-y-4">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-sem">Recent Offers</h2>
            <Link to="/category/offer">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListings.map((listing) => (
                <ListingTile
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-sem">Places for rent</h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for rent
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rentListings.map((listing) => (
                <ListingTile
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </div>
        )}
        {sellListings && sellListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-sem">Places for sale</h2>
            <Link to="/category/sell">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more places for sale
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sellListings.map((listing) => (
                <ListingTile
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
