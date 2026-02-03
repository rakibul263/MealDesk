import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import axios from "axios";
import {
  IoArrowForwardOutline,
  IoRestaurantOutline,
  IoFlashOutline,
  IoStatsChartOutline,
  IoStarOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router";
import FoodCard from "../components/FoodCard";

const Home = () => {
  const Navigate = useNavigate();
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/foods`)
      .then((res) => setTopRated(res.data.slice(0, 3)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <section className="rounded-[3rem] overflow-hidden shadow-2xl shadow-orange-900/10 border border-orange-100 mb-20">
          <Banner />
        </section>
        <section className="mb-24">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/50 text-[#E67E22] text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                <IoStarOutline size={14} /> Top Favorites
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#5D4037] uppercase tracking-tighter">
                Most Loved <span className="text-[#E67E22]">Dishes</span>
              </h2>
            </div>
            <button
              onClick={() => Navigate("/foods")}
              className="group flex items-center gap-2 text-[#5D4037] font-bold uppercase tracking-widest text-xs border-b-2 border-[#E67E22] pb-1 hover:text-[#E67E22] transition-colors"
            >
              See All Menu{" "}
              <IoArrowForwardOutline className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topRated.length > 0
              ? topRated.map((food, index) => (
                  <div
                    key={index}
                    onClick={() => Navigate(`/foods/${food._id}`)}
                  >
                    <FoodCard food={food} />
                  </div>
                ))
              : // Loading/Skeleton state
                [1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-80 bg-stone-200/50 rounded-[2.5rem] animate-pulse"
                  ></div>
                ))}
          </div>
        </section>
        {/* --- End of Top Rated --- */}

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-10 rounded-[2.5rem] border border-orange-50 shadow-xl shadow-orange-100/50 group hover:-translate-y-2 transition-all duration-500">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#E67E22] mb-6 group-hover:bg-[#E67E22] group-hover:text-white transition-colors duration-500">
              <IoRestaurantOutline size={28} />
            </div>
            <h3 className="text-xl font-black text-[#5D4037] mb-3 uppercase tracking-tighter">
              Dynamic Menu
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Update your culinary offerings in real-time with our smart menu
              management tools.
            </p>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-orange-50 shadow-xl shadow-orange-100/50 group hover:-translate-y-2 transition-all duration-500">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#E67E22] mb-6 group-hover:bg-[#E67E22] group-hover:text-white transition-colors duration-500">
              <IoFlashOutline size={28} />
            </div>
            <h3 className="text-xl font-black text-[#5D4037] mb-3 uppercase tracking-tighter">
              Instant Sync
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Orders and kitchen updates synchronized across all devices
              instantly.
            </p>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-orange-50 shadow-xl shadow-orange-100/50 group hover:-translate-y-2 transition-all duration-500">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#E67E22] mb-6 group-hover:bg-[#E67E22] group-hover:text-white transition-colors duration-500">
              <IoStatsChartOutline size={28} />
            </div>
            <h3 className="text-xl font-black text-[#5D4037] mb-3 uppercase tracking-tighter">
              Deep Analytics
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Get detailed insights into your sales, best-sellers, and customer
              preferences.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#5D4037] rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E67E22] rounded-full opacity-10 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full opacity-5 -ml-10 -mb-10"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white max-w-2xl leading-tight uppercase tracking-tighter">
              Modernize Your{" "}
              <span className="text-[#E67E22]">Kitchen Workflow</span>
            </h2>
            <p className="text-orange-100/60 mt-6 max-w-lg mx-auto font-medium">
              Ready to take your restaurant to the next level? Join MealDesk and
              experience seamless management.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => Navigate("/foods")}
                className="px-10 py-5 bg-[#E67E22] text-white font-black rounded-2xl flex items-center gap-3 hover:bg-white hover:text-[#5D4037] transition-all duration-300 shadow-2xl shadow-black/20 group uppercase tracking-widest text-xs"
              >
                Explore Menu
                <IoArrowForwardOutline
                  className="group-hover:translate-x-2 transition-transform"
                  size={18}
                />
              </button>
              <button className="px-10 py-5 bg-white/10 text-white border border-white/20 font-black rounded-2xl hover:bg-white hover:text-[#5D4037] transition-all duration-300 uppercase tracking-widest text-xs">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
