import React from "react";
import Navbar from "../Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Shared/Footer/Footer";

const RouterLayouts = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-15  bg-[#EEE6CA] ">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RouterLayouts;
