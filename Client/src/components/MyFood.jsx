import React from "react";
import { useLoaderData } from "react-router";
import FoodCard from "./FoodCard";
import { IoFastFoodOutline, IoListOutline } from "react-icons/io5";

const MyFood = () => {
  const data = useLoaderData();

  return (
    <div className="min-h-screen bg-[#FFFBF0] pt-10 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-orange-100 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E67E22]/10 text-[#E67E22] text-[10px] font-black uppercase tracking-widest mb-3">
              <IoFastFoodOutline size={14} /> My Kitchen
            </div>
            <h2 className="text-4xl font-black text-[#5D4037] uppercase tracking-tighter">
              Manage Your <span className="text-[#E67E22]">Dishes</span>
            </h2>
            <p className="text-gray-500 text-sm mt-2 font-medium">
              You have listed{" "}
              <span className="text-[#E67E22] font-bold">{data.length}</span>{" "}
              signature items.
            </p>
          </div>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((food, index) => (
              <div
                key={index}
                className="transform transition-all duration-300 hover:-translate-y-2"
              >
                <FoodCard food={food} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-orange-100 shadow-xl shadow-orange-900/5">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-200 mb-6">
              <IoFastFoodOutline size={40} />
            </div>
            <h3 className="text-[#5D4037] font-black text-xl uppercase">
              No Dishes Found
            </h3>
            <p className="text-gray-400 text-sm mt-2 max-w-xs text-center">
              You haven't added any food items yet. Start sharing your culinary
              magic today!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFood;
