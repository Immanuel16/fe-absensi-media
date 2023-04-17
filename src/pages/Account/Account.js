import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DefaultAva } from "../../assets";
import { BirthdayIcon } from "../../assets/icons";
import { useUser } from "../../context/Auth";
import { convertDate, getDifferentDate } from "../../util/util";
import { RightOutlined } from "@ant-design/icons";

export default function Account() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [leftBirthday, setLeftBirthday] = useState(0);

  const getLeftBirthday = () => {
    const birthdate = `${convertDate(user.birth_date, "DD/MM")}`;
    setLeftBirthday(getDifferentDate(birthdate));
  };
  useEffect(() => {
    getLeftBirthday();
    return () => {};
  }, [user]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center overflow-y-auto w-full pb-24">
        <div className="bg-media-secondary-blue-2 h-40 rounded-b-header w-full">
          <div className="bg-media-primary-blue rounded-b-header h-32"></div>
        </div>

        <div className="px-8 w-full flex flex-col justify-center items-center">
          {/* image */}
          <div
            className={`rounded-full ${
              user.photo ? "p-2" : "p-4"
            } bg-white shadow-md w-32 h-32`}
            style={{ marginTop: "-95px" }}
          >
            <img
              src={user.photo || DefaultAva}
              alt=""
              className={`rounded-full ${
                user.photo
                  ? "max-w-full max-h-full border-2 aspect-1  border-media-primary-gray"
                  : ""
              }`}
            />
          </div>

          {/* name and phone number */}
          <div className="flex flex-col space-y-0.5 text-media-primary-blue mt-2 mb-5 text-center text-sm">
            <p className="text-xl font-bold capitalize">{user?.full_name}</p>
            <p>{user.phone}</p>
          </div>
          {/* divider */}
          <div
            className="border-2 border-media-secondary-gray opacity-40 mb-6"
            style={{ width: "88%" }}
          ></div>
        </div>

        <div
          className="px-8 w-full flex flex-col items-center overflow-y-auto"
          style={{ height: "calc(100vh - 485px)" }}
        >
          {/* sections */}
          <div className="flex flex-col space-y-7 w-full items-center">
            {/* birthday sections */}
            {leftBirthday <= 30 && leftBirthday ? (
              <div className="bg-media-primary-blue flex justify-between items-center py-3 px-5 rounded-xl shadow w-full">
                <BirthdayIcon />
                <p className="text-center text-sm text-white capitalize font-semibold">
                  your birthday {leftBirthday} days left
                </p>
                <div className="rotate-90">
                  <BirthdayIcon />
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* privacy info sections */}
            <button
              onClick={() => navigate("privacy-info")}
              className="bg-white flex justify-between items-center border border-media-secondary-gray py-3 pl-6 pr-3 rounded-xl shadow w-full text-sm"
            >
              <p>Info Pribadi</p>
              <RightOutlined />
            </button>

            {/* total pk sections */}
            <button
              onClick={() => navigate("total-pk")}
              className="bg-white flex justify-between items-center border border-media-secondary-gray py-3 pl-6 pr-3 rounded-xl shadow w-full text-sm"
            >
              <p>Total PK</p>
              <RightOutlined />
            </button>

            {/* history ministry sections */}
            <button
              onClick={() => navigate("history-ministry")}
              className="bg-white flex justify-between items-center border border-media-secondary-gray py-3 pl-6 pr-3 rounded-xl shadow w-full text-sm"
            >
              <p>History Pelayanan</p>
              <RightOutlined />
            </button>

            {/* bank sections */}
            <button
              onClick={() => navigate("bank")}
              className="bg-white flex justify-between items-center border border-media-secondary-gray py-3 pl-6 pr-3 rounded-xl shadow w-full text-sm"
            >
              <p>Akun Bank</p>
              <RightOutlined />
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-4 w-full items-center mt-6">
          {/* button logout */}
          <button
            className="border border-salestrack-primary-blue rounded-xl text-media-primary-blue font-semibold text-sm w-4/5 py-1.5"
            onClick={logout}
          >
            Logout
          </button>

          {/* divider */}
          <div
            className="border-2 border-media-secondary-gray opacity-40"
            style={{ width: "20%" }}
          ></div>
        </div>
        {/* <img src={ImgComingSoon} className="mt-10" /> */}
      </div>
    </>
  );
}
