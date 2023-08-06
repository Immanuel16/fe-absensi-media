import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MobileLayout() {
  return (
    <div className="bg-gray-200 min-h-screen w-full relative">
      <div className="bg-white max-w-480 mx-auto font-poppins text-media-primary-black">
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  );
}
