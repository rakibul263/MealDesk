import axios from "axios";
import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { IoImagesOutline, IoRestaurantOutline } from "react-icons/io5";

const Gallery = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/foods`)
      .then((res) => {
        setFoods(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF0] pt-10 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-orange-50 text-[#E67E22] text-xs font-black uppercase tracking-[0.3em] mb-4 border border-orange-100">
            <IoImagesOutline size={16} /> Our Visual Story
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#5D4037] uppercase tracking-tighter">
            Culinary <span className="text-[#E67E22]">Gallery</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#E67E22] mx-auto mt-6 rounded-full"></div>
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="loading loading-spinner loading-lg text-[#E67E22]"></span>
            <p className="mt-4 text-[#5D4037] font-bold uppercase tracking-widest text-xs animate-pulse">
              Preparing the Feast...
            </p>
          </div>
        ) : foods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {foods.map((food, index) => (
              <div
                key={index}
                className="transform transition-all duration-500 hover:-translate-y-2"
              >
                <ImageCard food={food} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-orange-100">
            <IoRestaurantOutline
              size={60}
              className="mx-auto text-orange-200 mb-4"
            />
            <h3 className="text-[#5D4037] font-black text-xl uppercase">
              No Flavors Found
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              Our chef is still preparing the dishes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
