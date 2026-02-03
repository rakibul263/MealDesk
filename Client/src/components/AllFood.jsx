import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import FoodCard from "./FoodCard";

const AllFood = () => {
  const [foods, setFoods] = useState([]);
  const { loading } = use(AuthContext);

  if (loading) {
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-ring loading-xl"></span>
    </div>;
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/foods`)
      .then((res) => {
        setFoods(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="pt-10 pb-10 max-w-7xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Our Delicious Menu</h2>
        <div className="w-20 h-1 bg-red-500 mx-auto mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 justify-items-center">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default AllFood;
