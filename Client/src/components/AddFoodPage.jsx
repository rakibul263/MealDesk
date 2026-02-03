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
  IoWalletOutline,
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
        confirmButtonColor: "#E67E22",
      });
      form.reset();
      navigate("/foods");
    } catch (err) {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#5D4037",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(230,126,34,0.15)] overflow-hidden flex flex-col md:flex-row border border-orange-50">
        <div className="md:w-1/3 bg-[#5D4037] p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6 leading-tight">
              Share Your <span className="text-[#E67E22]">Culinary</span> Magic
            </h2>
            <p className="text-lg opacity-80 mb-10 font-light italic">
              "Cooking is love made visible." - Post your recipe and let the
              world taste it.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <IoFlameOutline className="text-3xl text-[#E67E22]" />
                <div>
                  <p className="font-bold">Nutrition Details</p>
                  <p className="text-xs opacity-60">Help people eat healthy</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <IoStarOutline className="text-3xl text-[#E67E22]" />
                <div>
                  <p className="font-bold">Quality Rating</p>
                  <p className="text-xs opacity-60">
                    Showcase your dish's star power
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#E67E22]/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="md:w-2/3 p-8 lg:p-14 bg-white">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-[#5D4037]">Food Details</h3>
            <div className="h-1 w-16 bg-[#E67E22] mt-2 rounded-full"></div>
          </div>

          <form
            onSubmit={handleAddFood}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Food Name */}
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-[#E67E22]">
                <IoFastFoodOutline size={18} />
              </span>
              <input
                name="foodName"
                placeholder="Food Name (e.g. Spicy Ramen)"
                className="pl-11 w-full h-12 bg-orange-50/50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:bg-white transition-all outline-none"
                required
              />
            </div>

            {/* Category */}
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-[#E67E22]">
                <IoLayersOutline size={18} />
              </span>
              <input
                name="category"
                placeholder="Category (e.g. Italian)"
                className="pl-11 w-full h-12 bg-orange-50/50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:bg-white transition-all outline-none"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="relative w-1/2">
                <span className="absolute inset-y-0 left-3 flex items-center text-[#E67E22]">
                  <IoWalletOutline size={16} />
                </span>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Price"
                  className="pl-9 w-full h-12 bg-orange-50/50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-[#E67E22] outline-none"
                  required
                />
              </div>
              <div className="relative w-1/2">
                <input
                  name="quantity"
                  type="number"
                  placeholder="Qty"
                  className="w-full h-12 bg-orange-50/50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-[#E67E22] px-4 outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-[#E67E22]">
                <IoStarOutline size={18} />
              </span>
              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="Rating (1-5)"
                className="pl-11 w-full h-12 bg-orange-50/50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-[#E67E22] outline-none"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-[#E67E22]">
                <IoFlameOutline size={18} />
              </span>
              <input
                name="calories"
                type="number"
                placeholder="Calories"
                className="pl-11 w-full h-12 bg-orange-50/50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-[#E67E22] outline-none"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-[#E67E22]">
                <IoGlobeOutline size={18} />
              </span>
              <input
                name="origin"
                placeholder="Origin (Country)"
                className="pl-11 w-full h-12 bg-orange-50/50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-[#E67E22] outline-none"
                required
              />
            </div>

            <div className="relative md:col-span-2">
              <span className="absolute inset-y-0 left-4 flex items-center text-[#E67E22]">
                <IoImageOutline size={18} />
              </span>
              <input
                name="foodImage"
                placeholder="Food Image URL"
                className="pl-11 w-full h-12 bg-orange-50/50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-[#E67E22] outline-none"
                required
              />
            </div>

            <div className="relative md:col-span-2">
              <span className="absolute top-3 left-4 text-[#E67E22]">
                <IoListOutline size={18} />
              </span>
              <textarea
                name="ingredients"
                placeholder="Ingredients (separate with commas: Cheese, Flour...)"
                className="pl-11 pt-3 w-full h-20 bg-orange-50/50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-[#E67E22] outline-none"
                required
              ></textarea>
            </div>
            <div className="relative md:col-span-2">
              <span className="absolute top-3 left-4 text-[#E67E22]">
                <IoChatbubbleEllipsesOutline size={18} />
              </span>
              <textarea
                name="description"
                placeholder="Write a tasty description..."
                className="pl-11 pt-3 w-full h-24 bg-orange-50/50 border border-orange-100 rounded-xl focus:ring-2 focus:ring-[#E67E22] outline-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full h-14 bg-[#E67E22] hover:bg-[#D35400] text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <>
                  <IoFastFoodOutline size={22} />
                  Add to Menu
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFoodPage;
