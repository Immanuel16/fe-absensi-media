import React from "react";
import { useLocation, useNavigate } from "react-router";
import {
  HomeMenuIcon,
  AbsenceMenuIcon,
  AccountMenuIcon,
  CashMenuIcon,
  AdminMenuIcon,
} from "../../assets/icons";

export const FloatingMenu = () => {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  return (
    <div className="w-full fixed bottom-0">
      <div className="max-w-480 bg-white z-30 shadow-menu rounded-t-xl">
        <div className="flex justify-around py-3">
          <button
            className="flex flex-col justify-center items-center"
            onClick={() => navigate("/")}
          >
            <div
              className={`rounded-full w-10 h-10 flex items-center justify-center ${
                location.pathname === "/" ? "bg-media-secondary-blue-2 p-3" : ""
              }`}
            >
              <HomeMenuIcon />
            </div>
            <p
              className={`${
                location.pathname === "/"
                  ? "text-media-primary-blue"
                  : "text-media-primary-black"
              } text-xxs`}
            >
              Beranda
            </p>
          </button>

          {/* Menu Absen */}
          <button
            className="flex flex-col justify-center items-center "
            onClick={() => navigate("/absen")}
          >
            <div
              className={`rounded-full w-10 h-10 flex items-center justify-center ${
                location.pathname.includes("absen")
                  ? "bg-media-secondary-blue-2 p-3"
                  : ""
              }`}
            >
              <AbsenceMenuIcon />
            </div>
            <p
              className={`${
                location.pathname.includes("absen")
                  ? "text-media-primary-blue"
                  : "text-media-primary-black"
              } text-xxs`}
            >
              Absensi
            </p>
          </button>

          {/* Menu Admin */}
          {+role && (
            <button
              className="flex flex-col justify-center items-center "
              onClick={() => navigate("/admin")}
            >
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center ${
                  location.pathname.includes("admin")
                    ? "bg-media-secondary-blue-2 p-3"
                    : ""
                }`}
              >
                <AdminMenuIcon />
              </div>
              <p
                className={`${
                  location.pathname.includes("admin")
                    ? "text-media-primary-blue"
                    : "text-media-primary-black"
                } text-xxs`}
              >
                Admin
              </p>
            </button>
          )}

          {/* Menu Kas */}
          <button
            className="flex flex-col justify-center items-center"
            onClick={() => navigate("/cash")}
          >
            <div
              className={`rounded-full w-10 h-10 flex items-center justify-center ${
                location.pathname.includes("cash")
                  ? "bg-media-secondary-blue-2 p-3"
                  : ""
              }`}
            >
              <CashMenuIcon />
            </div>
            <p
              className={`${
                location.pathname.includes("cash")
                  ? "text-media-primary-blue"
                  : "text-media-primary-black"
              } text-xxs`}
            >
              Kas
            </p>
          </button>

          <button
            className="flex flex-col justify-center items-center space-y-0.5"
            onClick={() => navigate("/account")}
          >
            <div
              className={`rounded-full w-10 h-10 flex items-center justify-center ${
                location.pathname.includes("account")
                  ? "bg-media-secondary-blue-2 p-3"
                  : ""
              }`}
            >
              <AccountMenuIcon />
            </div>
            <p
              className={`${
                location.pathname.includes("account")
                  ? "text-media-primary-blue"
                  : "text-media-primary-black"
              } text-xxs`}
            >
              Akun
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
