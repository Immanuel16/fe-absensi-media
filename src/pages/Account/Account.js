import React, { useEffect } from "react";
import { useNavigate } from "react-router";
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
        className="flex items-end relative pt-6 px-4 w-full"
        style={{ height: "calc(100vh - 202px)" }}
      >
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
