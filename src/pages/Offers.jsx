import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingTile from "../components/ListingTile";

export default function Offers() {
  const [loading, setLoading] = useState(true);
  const [offerListings, setOfferListings] = useState(null);
  const [lastFetchedListings, setLastFetchedListings] = useState(null);

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
        const qOfferSnap = await getDocs(qOffer);
        const lastVisible = qOfferSnap.docs[qOfferSnap.docs.length - 1];
        setLastFetchedListings(lastVisible);
        const qOfferListings = [];
        qOfferSnap.forEach((doc) => {
          return qOfferListings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(qOfferListings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
    getListings();
  }, []);

  async function fetchMoreListings() {
    try {
      const listingRef = collection(db, "listings");
      const qOffer = query(
        listingRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListings),
        limit(4)
      );
      const qOfferSnap = await getDocs(qOffer);
      const lastVisible = qOfferSnap.docs[qOfferSnap.docs.length - 1];
      setLastFetchedListings(lastVisible);
      const qOfferListings = [];
      qOfferSnap.forEach((doc) => {
        return qOfferListings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setOfferListings((prevState) => [...prevState, ...qOfferListings]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h2 className="text-3xl text-center mt-6 font-bold">All Offers</h2>
      {offerListings && offerListings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListings.map((listing) => (
                <ListingTile
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </main>
          {lastFetchedListings && (
            <div className="flex justify-center items-center">
              <button
                className="bg-white px-3 py-1.5 text-gray-700 border 
							border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 east"
                onClick={fetchMoreListings}
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>NO CURRENT OFFERS!!!</p>
      )}
    </div>
  );
}
