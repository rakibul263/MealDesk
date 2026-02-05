import React from "react";
import {
  IoTrashOutline,
  IoTimeOutline,
  IoLayersOutline,
  IoLocationOutline,
} from "react-icons/io5";
import Swal from "sweetalert2";
import axios from "axios";

const MyOrderCard = ({ food }) => {
  const {
    orderId,
    foodName,
    foodImage,
    price,
    purchaseQuantity,
    purchaseDate,
    location,
  } = food;

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E67E22",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `${import.meta.env.VITE_API_URL}/delete-order/${orderId}`,
          );
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your order has been cancelled.", "success");
          }
        } catch (error) {
          Swal.fire("Error", "Could not delete the order.", "error");
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-orange-50 shadow-sm hover:shadow-xl transition-all duration-500 group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={foodImage}
          alt={foodName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm">
          <p className="text-[#E67E22] font-black text-lg">
            ৳{price * purchaseQuantity}
          </p>
        </div>
        <div className="absolute bottom-4 left-4 bg-[#5D4037]/80 backdrop-blur-md px-3 py-1 rounded-xl">
          <p className="text-white text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
            <IoLayersOutline /> Qty: {purchaseQuantity}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-black text-[#5D4037] truncate group-hover:text-[#E67E22] transition-colors">
            {foodName}
          </h3>
          <div className="flex items-center gap-2 text-stone-400 mt-1">
            <IoLocationOutline className="text-[#E67E22]" size={14} />
            <p className="text-xs font-medium truncate">
              {location || "Standard Delivery"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-orange-50">
          <div className="flex items-center gap-2 text-stone-500">
            <IoTimeOutline className="text-orange-300" />
            <span className="text-xs font-bold uppercase tracking-tighter">
              {new Date(purchaseDate).toLocaleDateString()}
            </span>
          </div>

          <button
            onClick={() => handleDelete(orderId)}
            className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 group/btn"
            title="Cancel Order"
          >
            <IoTrashOutline size={20} className="group-hover/btn:rotate-12" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyOrderCard;
