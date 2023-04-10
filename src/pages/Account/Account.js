import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { ImgComingSoon } from "../../assets";
import { useUser } from "../../context/Auth";
import { useHeader } from "../../context/Header";

export default function Account() {
  const navigate = useNavigate();
  const { setTitleHeader } = useHeader();
  const { user } = useUser();
  useEffect(() => {
    setTitleHeader("Akun");
    return () => {};
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div
        className="flex flex-col justify-between items-center relative pt-6 px-4 w-full"
        style={{ height: "calc(100vh - 202px)" }}
      >
        <img src={ImgComingSoon} className="mt-10" />

        {/* button logout */}
        <button
          className="border border-salestrack-primary-blue rounded-btn text-salestrack-primary-blue font-medium text-sm w-full py-3"
          onClick={logout}
        >
          Keluar
        </button>
      </div>
    </>
  );
}
