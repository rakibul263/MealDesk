import React, { useState, useEffect } from "react";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";
import { Link } from "react-router";

const banners = [
  {
    img: banner1,
    title: "Savor the Flavor",
    sub: "Experience culinary excellence in every bite.",
  },
  {
    img: banner2,
    title: "Fresh Ingredients",
    sub: "From farm to table, we serve only the best.",
  },
  {
    img: banner3,
    title: "Spicy Delights",
    sub: "Ignite your taste buds with our signature spices.",
  },
  {
    img: banner4,
    title: "Sweet Temptations",
    sub: "Indulge in our handcrafted dessert collection.",
  },
  {
    img: banner5,
    title: "Quick & Delicious",
    sub: "Quality meals delivered right when you need them.",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] h-[400px] md:h-[500px] lg:h-[600px] shadow-2xl group">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={banner.img}
            alt={`Banner ${index + 1}`}
            className={`w-full h-full object-cover transform transition-transform duration-[5000ms] ${
              index === current ? "scale-110" : "scale-100"
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 text-white">
            <div
              className={`transition-all duration-1000 delay-300 transform ${
                index === current
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <span className="bg-[#E67E22] text-xs md:text-sm font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                Top Rated Choice
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                {banner.title.split(" ")[0]}{" "}
                <span className="text-[#E67E22]">
                  {banner.title.split(" ").slice(1).join(" ")}
                </span>
              </h1>
              <p className="text-sm md:text-lg opacity-90 max-w-md mb-8 font-light">
                {banner.sub}
              </p>
              <div className="flex gap-4">
                <Link
                  to="/foods"
                  className="bg-[#E67E22] hover:bg-[#D35400] text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/30"
                >
                  Order Now
                </Link>
                <Link
                  to="/gallery"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-bold transition-all"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? "w-10 h-3 bg-[#E67E22]"
                : "w-3 h-3 bg-white/50 hover:bg-white"
            }`}
          ></button>
        ))}
      </div>

      <button
        onClick={() =>
          setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
        }
        className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#E67E22]"
      >
        ❮
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
        className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#E67E22]"
      >
        ❯
      </button>
    </div>
  );
};

export default Banner;
