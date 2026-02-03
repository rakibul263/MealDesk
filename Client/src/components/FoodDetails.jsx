import React from "react";
import { useLoaderData, Link } from "react-router";
import {
  IoTimerOutline,
  IoFlameOutline,
  IoEarthOutline,
  IoLeafOutline,
  IoCartOutline,
  IoStar,
  IoPersonOutline,
  IoStorefrontOutline,
} from "react-icons/io5";

const FoodDetails = () => {
  const food = useLoaderData();
  const {
    foodName,
    foodImage,
    category,
    restaurantName,
    chef,
    dietType,
    origin,
    price,
    quantity,
    rating,
    prepTime,
    calories,
    ingredients,
    description,
    addedBy,
  } = food;

  return (
    <div className="min-h-screen bg-[#FFFBF0] pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-[0_20px_60px_rgba(93,64,55,0.1)] rounded-[3rem] overflow-hidden border border-orange-50">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-4 md:p-8">
            <div className="relative group h-full">
              <img
                src={foodImage}
                alt={foodName}
                className="w-full h-[400px] lg:h-full object-cover rounded-[2.5rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full shadow-lg">
                <span className="text-[#E67E22] font-black uppercase tracking-widest text-xs">
                  {category}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:pl-4 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-1 bg-orange-100 text-[#E67E22] px-3 py-1 rounded-full text-sm font-bold">
                <IoStar /> {rating}
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-[#5D4037] font-medium flex items-center gap-1">
                <IoStorefrontOutline /> {restaurantName}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-[#5D4037] mb-4 leading-tight">
              {foodName}
            </h1>

            <div className="flex items-center gap-2 mb-8 text-gray-500">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#E67E22]">
                <IoPersonOutline size={20} />
              </div>
              <p className="font-medium">
                Masterfully crafted by{" "}
                <span className="text-[#5D4037] font-bold">Chef {chef}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 p-6 bg-orange-50/50 rounded-[2rem] border border-orange-100/50">
              <div className="text-center">
                <IoLeafOutline
                  className="mx-auto text-[#E67E22] mb-2"
                  size={24}
                />
                <p className="text-[10px] uppercase text-gray-400 font-bold">
                  Diet
                </p>
                <p className="text-sm font-bold text-[#5D4037]">{dietType}</p>
              </div>
              <div className="text-center">
                <IoEarthOutline
                  className="mx-auto text-[#E67E22] mb-2"
                  size={24}
                />
                <p className="text-[10px] uppercase text-gray-400 font-bold">
                  Origin
                </p>
                <p className="text-sm font-bold text-[#5D4037]">{origin}</p>
              </div>
              <div className="text-center">
                <IoTimerOutline
                  className="mx-auto text-[#E67E22] mb-2"
                  size={24}
                />
                <p className="text-[10px] uppercase text-gray-400 font-bold">
                  Time
                </p>
                <p className="text-sm font-bold text-[#5D4037]">{prepTime}m</p>
              </div>
              <div className="text-center">
                <IoFlameOutline
                  className="mx-auto text-[#E67E22] mb-2"
                  size={24}
                />
                <p className="text-[10px] uppercase text-gray-400 font-bold">
                  Calories
                </p>
                <p className="text-sm font-bold text-[#5D4037]">{calories}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">
                  Current Price
                </p>
                <p className="text-4xl font-black text-[#E67E22]">৳{price}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm font-medium mb-1">
                  Availability
                </p>
                <p
                  className={`text-lg font-bold ${quantity > 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {quantity > 0 ? `${quantity} in stock` : "Out of stock"}
                </p>
              </div>
            </div>

            <button className="group w-full h-16 bg-[#5D4037] hover:bg-[#E67E22] text-white rounded-2xl font-bold text-xl shadow-xl shadow-brown-100 hover:shadow-orange-200 transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]">
              <IoCartOutline
                size={26}
                className="group-hover:rotate-12 transition-transform"
              />
              Purchase Now
            </button>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-stone-50/50 border-t border-gray-100 flex flex-col md:flex-row gap-12">
          <div className="md:w-2/3">
            <h3 className="text-2xl font-black text-[#5D4037] mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-[#E67E22] rounded-full"></span>
              The Story of this Dish
            </h3>
            <p className="text-gray-500 leading-relaxed text-lg font-light italic">
              "{description}"
            </p>
          </div>

          <div className="md:w-1/3">
            <h3 className="text-xl font-bold text-[#5D4037] mb-4">
              Key Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((item, index) => (
                <span
                  key={index}
                  className="bg-white text-[#5D4037] px-4 py-2 rounded-xl border border-orange-100 text-sm font-medium shadow-sm hover:border-[#E67E22] transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-12 py-6 bg-white border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Listed by:{" "}
            <span className="text-[#E67E22] font-bold">{addedBy.name}</span>
          </p>
          <Link
            to="/foods"
            className="text-xs font-bold text-[#5D4037] hover:text-[#E67E22] underline underline-offset-4"
          >
            Browse similar dishes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
