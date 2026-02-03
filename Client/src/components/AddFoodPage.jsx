import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AddFoodPage = () => {
  const { user, setLoading, loading } = useContext(AuthContext);

  const handleAddFood = async (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30">
        <div className="p-10">
          <h2 className="text-3xl font-bold text-center text-[#7C6261] mb-2">
            🍽️ Add New Food Item
          </h2>
          <p className="text-center text-sm text-[#7C6261] mb-8">
            Share your delicious recipes with the community
          </p>

          <form
            onSubmit={handleAddFood}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              name="foodName"
              placeholder="Food Name"
              className="input input-bordered rounded-xl focus:ring-2 focus:ring-[#DCE1CB] border-gray-300 hover:border-gray-400 transition"
              required
            />

            <input
              name="foodImage"
              placeholder="Food Image URL"
              className="input input-bordered rounded-xl focus:ring-2 focus:ring-[#DCE1CB] border-gray-300 hover:border-gray-400 transition"
              required
            />

            <input
              name="category"
              placeholder="Food Category"
              className="input input-bordered rounded-xl focus:ring-2 focus:ring-[#DCE1CB] border-gray-300 hover:border-gray-400 transition"
              required
            />

            <input
              name="origin"
              placeholder="Food Origin (Country)"
              className="input input-bordered rounded-xl focus:ring-2 focus:ring-[#DCE1CB] border-gray-300 hover:border-gray-400 transition"
              required
            />

            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              className="input input-bordered rounded-xl focus:ring-2 focus:ring-[#DCE1CB] border-gray-300 hover:border-gray-400 transition"
              required
            />

            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Price"
              className="input input-bordered rounded-xl focus:ring-2 focus:ring-[#DCE1CB] border-gray-300 hover:border-gray-400 transition"
              required
            />

            <input
              value={user?.displayName}
              disabled
              className="input input-bordered rounded-xl bg-gray-100 text-gray-700"
            />

            <input
              value={user?.email}
              disabled
              className="input input-bordered rounded-xl bg-gray-100 text-gray-700"
            />

            <textarea
              name="description"
              placeholder="Ingredients, making procedure, etc."
              className="textarea textarea-bordered rounded-xl md:col-span-2 h-32 focus:ring-2 focus:ring-[#DCE1CB] border-gray-300 hover:border-gray-400 transition w-full"
              required
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 btn rounded-xl bg-gradient-to-r from-[#DCE1CB] to-[#A3B18A] text-black font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              {loading ? "Adding..." : "➕ Add Item"}
            </button>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      <div className="toast toast-top toast-end hidden" id="successToast">
        <div className="alert alert-success shadow-lg">
          <span>Food item added successfully! 🎉</span>
        </div>
      </div>

      {/* Error Toast */}
      <div className="toast toast-top toast-end hidden" id="errorToast">
        <div className="alert alert-error shadow-lg">
          <span>Something went wrong 😢</span>
        </div>
      </div>
    </div>
  );
};

export default AddFoodPage;
