import React from "react";
import { IoExpandOutline, IoRestaurantOutline } from "react-icons/io5";

const ImageCard = ({ food }) => {
  const { foodImage, foodName, category } = food;

  return (
    <div className="group relative w-full h-80 rounded-[2.5rem] overflow-hidden bg-white shadow-xl shadow-orange-900/5 border border-orange-50 cursor-pointer">
      <img
        src={foodImage}
        alt={foodName || "Culinary Delight"}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#5D4037]/90 via-[#5D4037]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
        <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          <span className="bg-[#E67E22] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
            {category || "Specialty"}
          </span>
        </div>

        <div className="mt-3 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100">
          <h3 className="text-white text-xl font-black uppercase tracking-tighter leading-none">
            {foodName || "Delicious Dish"}
          </h3>
        </div>
      </div>
      <div className="absolute inset-4 border border-white/20 rounded-[2rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default ImageCard;
