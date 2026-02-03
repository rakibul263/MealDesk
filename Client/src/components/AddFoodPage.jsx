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
  IoSparklesOutline,
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
        title: "<span style='color:#5D4037'>Delicious!</span>",
        text: "Your food item is now live 🍕",
        icon: "success",
        confirmButtonColor: "#E67E22",
        customClass: { popup: "rounded-[2rem]" },
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
    <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(93,64,55,0.15)] overflow-hidden border border-orange-50 flex flex-col md:flex-row">
        {/* Left Side: Branding Side */}
        <div className="md:w-1/3 bg-[#5D4037] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#E67E22] rounded-full opacity-10 -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full opacity-5 -ml-10 -mb-10"></div>

          <div className="relative z-10">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-fit mb-6">
              <IoSparklesOutline className="text-[#E67E22]" size={32} />
            </div>
            <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter leading-none">
              Share Your <br />{" "}
              <span className="text-[#E67E22]">Masterpiece</span>
            </h2>
            <p className="text-orange-100/60 text-sm font-medium leading-relaxed">
              Upload your signature dish and let the world experience the magic
              of your kitchen.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <IoFlameOutline className="text-2xl text-[#E67E22]" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest">
                  Nutrition First
                </p>
                <p className="text-[10px] text-orange-100/50">
                  Details matter to health
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <IoRestaurantOutline className="text-2xl text-[#E67E22]" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest">
                  Global Reach
                </p>
                <p className="text-[10px] text-orange-100/50">
                  Visible to all foodies
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="md:w-2/3 p-8 lg:p-14 bg-white">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-[#5D4037] uppercase tracking-tighter">
              Food Details
            </h3>
            <div className="w-12 h-1 bg-[#E67E22] mt-2 rounded-full"></div>
          </div>

          <form
            onSubmit={handleAddFood}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Input Wrapper Component Style */}
            {[
              {
                name: "foodName",
                placeholder: "Food Name",
                icon: <IoFastFoodOutline />,
              },
              {
                name: "category",
                placeholder: "Category (e.g. Burger)",
                icon: <IoLayersOutline />,
              },
              {
                name: "restaurantName",
                placeholder: "Restaurant Name",
                icon: <IoRestaurantOutline />,
              },
              {
                name: "chef",
                placeholder: "Chef Name",
                icon: <IoPersonOutline />,
              },
              {
                name: "origin",
                placeholder: "Origin (e.g. Italy)",
                icon: <IoGlobeOutline />,
              },
              {
                name: "prepTime",
                placeholder: "Prep Time (e.g. 20m)",
                icon: <IoTimeOutline />,
              },
            ].map((input) => (
              <div key={input.name} className="relative group">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#E67E22] transition-colors">
                  {input.icon}
                </span>
                <input
                  name={input.name}
                  placeholder={input.placeholder}
                  className="pl-12 w-full h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none transition-all text-sm font-medium"
                  required
                />
              </div>
            ))}

            <div className="relative">
              <select
                name="dietType"
                className="w-full h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none px-4 text-sm font-medium text-gray-500"
                required
              >
                <option value="" disabled selected>
                  Select Diet Type
                </option>
                <option>Vegetarian</option>
                <option>Vegan</option>
                <option>Non-Vegetarian</option>
                <option>Keto</option>
              </select>
            </div>

            <div className="flex gap-4">
              <input
                name="price"
                type="number"
                step="0.01"
                placeholder="Price $"
                className="w-1/2 h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none px-5 text-sm font-medium"
                required
              />
              <input
                name="quantity"
                type="number"
                placeholder="Qty"
                className="w-1/2 h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none px-5 text-sm font-medium"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#E67E22]">
                <IoStarOutline size={18} />
              </span>
              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="Rating (1-5)"
                className="pl-12 w-full h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none text-sm font-medium"
                required
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400 group-focus-within:text-[#E67E22]">
                <IoFlameOutline size={18} />
              </span>
              <input
                name="calories"
                type="number"
                placeholder="Calories"
                className="pl-12 w-full h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none text-sm font-medium"
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
                className="pl-12 w-full h-14 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none text-sm font-medium"
                required
              />
            </div>

            <div className="relative md:col-span-2">
              <span className="absolute top-4 left-4 text-gray-400">
                <IoListOutline size={18} />
              </span>
              <textarea
                name="ingredients"
                placeholder="Ingredients (separate with commas: Cheese, Flour, Tomato...)"
                className="pl-12 pt-4 w-full h-24 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none text-sm font-medium"
                required
              ></textarea>
            </div>

            <div className="relative md:col-span-2">
              <span className="absolute top-4 left-4 text-gray-400">
                <IoChatbubbleEllipsesOutline size={18} />
              </span>
              <textarea
                name="description"
                placeholder="Tell us more about this delicious dish..."
                className="pl-12 pt-4 w-full h-32 bg-stone-50 border-2 border-transparent rounded-2xl focus:border-[#E67E22]/20 focus:bg-white focus:outline-none text-sm font-medium"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full h-16 bg-[#5D4037] hover:bg-[#E67E22] text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-brown-100 transition-all active:scale-95 disabled:opacity-50 mt-4"
            >
              {loading ? "Listing Dish..." : "Launch This Listing"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFoodPage;
