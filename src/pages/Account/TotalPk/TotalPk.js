import React from "react";
import { useNavigate } from "react-router";
import { BackIcon } from "../../../assets/icons";
import "../Account.scss";
import { ImgMaintenance } from "../../../assets";

const TotalPk = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col relative w-full">
        {/* header */}
        <div
          className="bg-white h-18 shadow-md sticky top-0 z-10 flex justify-between items-center text-media-primary-blue text-xl font-bold px-6"
          style={{
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          <button onClick={() => navigate(-1)}>
            <BackIcon color={"#2adaf2"} />
          </button>
          <p className="font-montserrat">Total PK</p>
          <p></p>
        </div>

        <div className="bg-total-pk grid place-items-center px-6">
          <div
            className="bg-white shadow-md rounded-3xl w-full flex flex-col justify-center items-center space-y-8"
            style={{ height: "calc(100vh - 300px)" }}
          >
            <img src={ImgMaintenance} alt="" />
            <div className="flex flex-col text-media-primary-blue text-center">
              <p>This Page Under</p>
              <p className="font-bold text-base">Development!!!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalPk;
