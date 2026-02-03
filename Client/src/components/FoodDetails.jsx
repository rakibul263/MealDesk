import React from "react";
import { useLoaderData } from "react-router";

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
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Food Image */}
        <div className="w-full md:w-1/2">
          <img
            src={foodImage}
            alt={foodName}
            className="w-full h-80 object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Right Side: Primary Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800">{foodName}</h1>
            <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
              {category}
            </span>
          </div>

          <p className="text-gray-500 mt-2 italic">
            By Chef {chef} @ {restaurantName}
          </p>

          <div className="flex items-center mt-4 gap-4">
            <p className="text-2xl font-extrabold text-green-600">${price}</p>
            <div className="flex items-center bg-yellow-400 text-white px-2 py-1 rounded-lg text-sm">
              ⭐ <span className="ml-1 font-bold">{rating}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-b py-4">
            <div>
              <p className="text-sm text-gray-400">Diet Type</p>
              <p className="font-semibold">{dietType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Origin</p>
              <p className="font-semibold">{origin}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Prep Time</p>
              <p className="font-semibold">{prepTime} mins</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Calories</p>
              <p className="font-semibold">{calories} kcal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>

        <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">
          Ingredients
        </h3>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((item, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-4 py-1 rounded-md border border-gray-200 text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t flex items-center justify-between text-sm text-gray-500">
        <p>
          Added by:{" "}
          <span className="font-medium text-gray-700">{addedBy.name}</span>
        </p>
        <p>
          Stock:{" "}
          <span
            className={`font-bold ${quantity > 0 ? "text-green-500" : "text-red-500"}`}
          >
            {quantity} available
          </span>
        </p>
      </div>

      <button className="w-full mt-6 bg-gradient-to-r from-[#5f605f] to-[#7e6262] text-white font-bold py-3 rounded-xl transition-colors">
        Purchase Now
      </button>
    </div>
  );
};

export default FoodDetails;
