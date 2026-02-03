import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import FoodCard from "./FoodCard";
import { IoRestaurantOutline } from "react-icons/io5";

const AllFood = () => {
  const [foods, setFoods] = useState([]);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/foods`)
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF0]">
        <span className="loading loading-spinner loading-lg text-[#E67E22]"></span>
        <p className="mt-4 text-[#5D4037] font-medium animate-pulse">
          Preparing the menu...
        </p>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-20 bg-[#FFFBF0] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-3">
            <span className="bg-orange-100 text-[#E67E22] px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <IoRestaurantOutline /> Explore
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#5D4037] mb-4">
            Our Delicious <span className="text-[#E67E22]">Menu</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto font-light">
            Discover a world of flavors crafted with the finest ingredients and
            a pinch of passion.
          </p>
          <div className="w-24 h-1.5 bg-[#E67E22] mx-auto mt-6 rounded-full"></div>
        </div>

        {foods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-8 justify-items-center">
            {foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5058/5058432.png"
              alt="empty"
              className="w-32 mx-auto opacity-30 grayscale"
            />
            <p className="mt-6 text-gray-400 text-xl font-medium">
              No dishes found in the kitchen yet!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFood;
