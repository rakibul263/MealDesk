import React, { useState, use } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import {
  IoBagCheckOutline,
  IoCashOutline,
  IoCalendarOutline,
  IoPersonOutline,
  IoMailOutline,
  IoCartOutline,
  IoAlertCircleOutline,
  IoLocationOutline,
} from "react-icons/io5";

const PurchasePage = () => {
  const food = useLoaderData();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [buyingQty, setBuyingQty] = useState(1);
  const [location, setLocation] = useState("");
  const [order, setOrder] = useState(false);

  const { _id, foodName, price, quantity, addedBy, foodImage } = food;

  const handlePurchase = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedInfo = Object.fromEntries(formData.entries());
    updatedInfo.foodId = { id: _id };

    axios
      .post(`${import.meta.env.VITE_API_URL}/orderData`, updatedInfo)
      .then((res) => {
        setOrder(true);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Order Placed! 🎊",
            text: "Thank you for your purchase.",
            icon: "success",
            confirmButtonColor: "#E67E22",
          });
          navigate("/foods");
        }
      })
      .catch((error) => {
        Swal.fire("Error", "Purchase failed. Try again.", "error");
      });
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-[0_30px_70px_rgba(93,64,55,0.12)] border border-orange-50 overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Order Summary */}
        <div className="md:w-5/12 bg-[#5D4037] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#E67E22] rounded-full opacity-10 -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
              <IoBagCheckOutline className="text-[#E67E22]" /> Order Summary
            </h2>
            <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10 backdrop-blur-md mb-8">
              <img
                src={foodImage}
                className="w-full h-40 object-cover rounded-2xl mb-4 shadow-lg"
                alt=""
              />
              <h3 className="text-xl font-bold mb-1">{foodName}</h3>
              <p className="text-orange-100/50 text-xs uppercase tracking-widest font-black">
                Premium Quality
              </p>
              <div className="mt-6 flex justify-between items-end">
                <p className="text-3xl font-black text-[#E67E22]">৳{price}</p>
                <p className="text-[10px] text-orange-100/40 uppercase font-bold">
                  Price Per Unit
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-orange-100/70">
                <IoAlertCircleOutline size={18} className="text-[#E67E22]" />
                <span>Available Stock: {quantity} items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Checkout Form */}
        <div className="md:w-7/12 p-8 lg:p-14">
          <form onSubmit={handlePurchase} className="space-y-6">
            <h3 className="text-2xl font-black text-[#5D4037] uppercase tracking-tighter mb-8">
              Checkout Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Other Inputs remain same */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                  Food Name
                </label>
                <div className="relative">
                  <IoCartOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    readOnly
                    name="foodName"
                    value={foodName}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 rounded-2xl border-none text-sm font-bold text-[#5D4037]"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                  Price (৳)
                </label>
                <div className="relative">
                  <IoCashOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    readOnly
                    name="foodPrice"
                    value={price}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 rounded-2xl border-none text-sm font-bold text-[#5D4037]"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                  Buyer Name
                </label>
                <div className="relative">
                  <IoPersonOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    readOnly
                    name="displayName"
                    value={user?.displayName}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 rounded-2xl border-none text-sm font-bold text-[#5D4037]"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                  Buyer Email
                </label>
                <div className="relative">
                  <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    readOnly
                    name="email"
                    value={user?.email}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 rounded-2xl border-none text-sm font-bold text-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-[10px] font-black uppercase text-[#E67E22] tracking-widest ml-1">
                Delivery Location
              </label>
              <div className="relative group">
                <IoLocationOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E67E22] transition-colors" />
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your full address (Street, City, Area...)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-stone-50 rounded-2xl border-2 border-transparent focus:border-[#E67E22]/20 focus:bg-white focus:outline-none transition-all text-sm font-bold text-[#5D4037]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-[#E67E22] tracking-widest ml-1">
                  Quantity to Buy
                </label>
                <input
                  type="number"
                  min="1"
                  name="quantity"
                  max={quantity}
                  value={buyingQty}
                  onChange={(e) => setBuyingQty(e.target.value)}
                  className="w-full px-5 py-3.5 bg-orange-50/50 rounded-2xl border-2 border-orange-100 focus:border-[#E67E22] focus:outline-none transition-all font-black text-[#5D4037]"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">
                  Buying Date
                </label>
                <div className="relative">
                  <IoCalendarOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input
                    name="date"
                    readOnly
                    value={new Date().toLocaleDateString()}
                    className="w-full pl-11 pr-4 py-3.5 bg-stone-50 rounded-2xl border-none text-sm font-bold text-[#5D4037]"
                  />
                </div>
              </div>
            </div>

            <button
              disabled={quantity === 0}
              className="w-full py-5 bg-[#5D4037] hover:bg-[#E67E22] text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-brown-100 transition-all active:scale-[0.98] disabled:bg-gray-200 disabled:shadow-none"
            >
              {quantity === 0 ? "Out of Stock" : "Confirm Purchase"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
