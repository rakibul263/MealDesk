import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";
import { IoFastFoodOutline } from "react-icons/io5";

const PrivateRouter = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0]">
        <div className="animate-bounce flex flex-col items-center gap-4">
          <IoFastFoodOutline className="text-6xl text-[#E67E22]" />
          <p className="text-[#5D4037] font-black uppercase tracking-widest">
            Loading Your Data...
          </p>
        </div>
      </div>
    );
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/signin"></Navigate>;
};

export default PrivateRouter;
