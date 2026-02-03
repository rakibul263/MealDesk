import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
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
} from "react-icons/io5";

const AddFoodPage = () => {
  const { user, setLoading, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddFood = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const foodData = Object.fromEntries(formData.entries());

    foodData.price = parseFloat(foodData.price);
    foodData.quantity = parseInt(foodData.quantity);
    foodData.rating = parseFloat(foodData.rating);
    foodData.calories = parseInt(foodData.calories);
    foodData.purchases = 0;

    if (foodData.ingredients) {
      foodData.ingredients = foodData.ingredients
        .split(",")
        .map((item) => item.trim());
    }

    foodData.addedBy = {
      name: user?.displayName,
      email: user?.email,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/addFood`, foodData);
      Swal.fire({
        title: "Delicious!",
        text: "Your food item is now live 🍕",
        icon: "success",
        confirmButtonColor: "#588157",
      });
      form.reset();
      navigate("/foods");
    } catch (err) {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side Banner */}
        <div className="md:w-1/3 bg-[#7E6262] p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tight">
              Post Your Dish
            </h2>
            <p className="text-lg opacity-80 mb-8 font-light">
              Connect with food lovers by sharing your secret ingredients.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <IoFlameOutline className="text-3xl text-[#DCE1CB]" />
                <div>
                  <p className="font-bold">Nutrition</p>
                  <p className="text-xs opacity-70">Track calories & diet</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <IoListOutline className="text-3xl text-[#DCE1CB]" />
                <div>
                  <p className="font-bold">Ingredients</p>
                  <p className="text-xs opacity-70">List all components</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Form Side */}
        <div className="md:w-2/3 p-8 lg:p-14 bg-white">
          <form
            onSubmit={handleAddFood}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <IoFastFoodOutline size={18} />
              </span>
              <input
                name="foodName"
                placeholder="Food Name"
                className="pl-11 w-full h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A]"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <IoLayersOutline size={18} />
              </span>
              <input
                name="category"
                placeholder="Category"
                className="pl-11 w-full h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A]"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <IoRestaurantOutline size={18} />
              </span>
              <input
                name="restaurantName"
                placeholder="Restaurant Name"
                className="pl-11 w-full h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A]"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <IoPersonOutline size={18} />
              </span>
              <input
                name="chef"
                placeholder="Chef Name"
                className="pl-11 w-full h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A]"
                required
              />
            </div>

            <div className="relative">
              <select
                name="dietType"
                className="w-full h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A] px-4 text-gray-500"
                required
              >
                <option disabled selected>
                  Diet Type
                </option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Non-Vegetarian</option>
                <option>Keto</option>
              </select>
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <IoGlobeOutline size={18} />
              </span>
              <input
                name="origin"
                placeholder="Origin"
                className="pl-11 w-full h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A]"
                required
              />
            </div>

            <div className="flex gap-4">
              <input
                name="price"
                type="number"
                step="0.01"
                placeholder="Price $"
                className="w-1/2 h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A] px-4"
                required
              />
              <input
                name="quantity"
                type="number"
                placeholder="Qty"
                className="w-1/2 h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A] px-4"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <IoStarOutline size={18} />
              </span>
              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="Rating (1-5)"
                className="pl-11 w-full h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A]"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <IoTimeOutline size={18} />
              </span>
              <input
                name="prepTime"
                placeholder="Prep Time (e.g. 15m)"
                className="pl-11 w-full h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A]"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <IoFlameOutline size={18} />
              </span>
              <input
                name="calories"
                type="number"
                placeholder="Calories"
                className="pl-11 w-full h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A]"
                required
              />
            </div>

            <div className="relative md:col-span-2">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <IoImageOutline size={18} />
              </span>
              <input
                name="foodImage"
                placeholder="Image URL"
                className="pl-11 w-full h-12 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A]"
                required
              />
            </div>

            {/* Ingredients Field */}
            <div className="relative md:col-span-2">
              <span className="absolute top-3 left-4 text-gray-400">
                <IoListOutline size={18} />
              </span>
              <textarea
                name="ingredients"
                placeholder="Ingredients (separate with commas: Cheese, Flour, Tomato...)"
                className="pl-11 pt-3 w-full h-20 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A]"
                required
              ></textarea>
            </div>

            {/* Description Field */}
            <div className="relative md:col-span-2">
              <span className="absolute top-3 left-4 text-gray-400">
                <IoChatbubbleEllipsesOutline size={18} />
              </span>
              <textarea
                name="description"
                placeholder="Short description of the dish..."
                className="pl-11 pt-3 w-full h-24 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#A3B18A]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full h-14 bg-gradient-to-r from-[#5f605f] to-[#7e6262] text-white rounded-xl font-bold text-lg shadow-lg transform transition active:scale-95 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Create Food Listing"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFoodPage;
