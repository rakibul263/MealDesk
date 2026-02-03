import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import {
  IoFastFoodOutline,
  IoTimeOutline,
  IoFlameOutline,
  IoStarOutline,
  IoGlobeOutline,
  IoLayersOutline,
  IoChatbubbleEllipsesOutline,
  IoImageOutline,
  IoRestaurantOutline,
  IoPersonOutline,
  IoListOutline,
  IoSyncOutline,
} from "react-icons/io5";

const UpdateFood = () => {
  const foodData = useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const updatedInfo = Object.fromEntries(formData.entries());

    // Data type conversion
    updatedInfo.price = parseFloat(updatedInfo.price);
    updatedInfo.quantity = parseInt(updatedInfo.quantity);
    updatedInfo.rating = parseFloat(updatedInfo.rating);
    updatedInfo.calories = parseInt(updatedInfo.calories);

    if (updatedInfo.ingredients) {
      updatedInfo.ingredients = updatedInfo.ingredients
        .split(",")
        .map((i) => i.trim());
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/update-food/${foodData._id}`,
        updatedInfo,
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Food information updated successfully",
          icon: "success",
          confirmButtonColor: "#E67E22",
          customClass: { popup: "rounded-[2rem]" },
        });
        navigate(`/food/${foodData._id}`);
      }
    } catch (err) {
      Swal.fire({
        title: "Update Failed",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#5D4037",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-orange-50 flex flex-col md:flex-row">
        {/* Left Side: Branding */}
        <div className="md:w-1/3 bg-[#5D4037] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#E67E22] rounded-full opacity-10 -mr-10 -mt-10"></div>

          <div className="relative z-10">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl w-fit mb-6">
              <IoSyncOutline
                className="text-[#E67E22] animate-spin-slow"
                size={32}
              />
            </div>
            <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter leading-none">
              Refine Your <br /> <span className="text-[#E67E22]">Recipe</span>
            </h2>
            <p className="text-orange-100/60 text-sm font-medium leading-relaxed">
              Keep your menu up to date. Adjust prices, availability, or
              descriptions to match your current kitchen status.
            </p>
          </div>

          <div className="relative z-10 p-6 bg-white/5 rounded-[2rem] border border-white/10">
            <p className="text-[10px] uppercase tracking-widest text-[#E67E22] font-black mb-2">
              Currently Editing
            </p>
            <p className="text-lg font-bold truncate">{foodData.foodName}</p>
            <p className="text-xs text-orange-100/50 italic mt-1">
              ID: {foodData._id}
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="md:w-2/3 p-8 lg:p-14 bg-white">
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Food Name */}
            <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#E67E22]">
                <IoFastFoodOutline size={18} />
              </span>
              <input
                name="foodName"
                defaultValue={foodData.foodName}
                placeholder="Food Name"
                className="pl-12 w-full h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none transition-all text-sm font-medium"
                required
              />
            </div>

            {/* Category */}
            <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#E67E22]">
                <IoLayersOutline size={18} />
              </span>
              <input
                name="category"
                defaultValue={foodData.category}
                placeholder="Category"
                className="pl-12 w-full h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none transition-all text-sm font-medium"
                required
              />
            </div>

            {/* Price & Quantity */}
            <div className="flex gap-4">
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={foodData.price}
                placeholder="Price"
                className="w-1/2 h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none px-5 text-sm font-medium"
                required
              />
              <input
                name="quantity"
                type="number"
                defaultValue={foodData.quantity}
                placeholder="Qty"
                className="w-1/2 h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none px-5 text-sm font-medium"
                required
              />
            </div>

            {/* Rating */}
            <div className="relative group">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#E67E22]">
                <IoStarOutline size={18} />
              </span>
              <input
                name="rating"
                type="number"
                step="0.1"
                defaultValue={foodData.rating}
                placeholder="Rating"
                className="pl-12 w-full h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none text-sm font-medium"
                required
              />
            </div>

            {/* Image URL */}
            <div className="relative md:col-span-2 group">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#E67E22]">
                <IoImageOutline size={18} />
              </span>
              <input
                name="foodImage"
                defaultValue={foodData.foodImage}
                placeholder="Image URL"
                className="pl-12 w-full h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none text-sm font-medium"
                required
              />
            </div>

            {/* Ingredients */}
            <div className="relative md:col-span-2 group">
              <span className="absolute top-4 left-4 text-gray-400 group-focus-within:text-[#E67E22]">
                <IoListOutline size={18} />
              </span>
              <textarea
                name="ingredients"
                defaultValue={foodData.ingredients?.join(", ")}
                placeholder="Ingredients (Cheese, Tomato...)"
                className="pl-12 pt-4 w-full h-24 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none text-sm font-medium"
                required
              ></textarea>
            </div>

            {/* Description */}
            <div className="relative md:col-span-2 group">
              <span className="absolute top-4 left-4 text-gray-400 group-focus-within:text-[#E67E22]">
                <IoChatbubbleEllipsesOutline size={18} />
              </span>
              <textarea
                name="description"
                defaultValue={foodData.description}
                placeholder="Update description..."
                className="pl-12 pt-4 w-full h-32 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none text-sm font-medium"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full h-16 bg-[#5D4037] hover:bg-[#E67E22] text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFood;
