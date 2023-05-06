import React from "react";
import { useNavigate } from "react-router";
import { BackIcon } from "../../../assets/icons";
import "../Account.scss";
import { BgTotalPk, ImgMaintenance, BadgeCheck } from "../../../assets";

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

        <div className="bg-total-pk grid place-items-center px-6 w-full">
          <div
            className="bg-white shadow-md rounded-3xl px-5 w-full flex flex-col justify-center items-center space-y-10 bg-cover"
            style={{
              height: "calc(100vh - 300px)",
            }}
          >
            <img src={BadgeCheck} alt="" />
            {/* <img src={ImgMaintenance} alt="" /> */}
            <div className="flex flex-col space-y-3 w-full">
              <div className="flex justify-between px-3">
                {/* left */}
                <div className="flex flex-col space-y-1">
                  <p className="opacity-70">Date</p>
                  <p className="text-sm">13/04/2023</p>
                </div>

                {/* right */}
                <div className="flex flex-col space-y-1 text-right">
                  <p className="opacity-70">No.Rek</p>
                  <p className="text-sm">12345678910</p>
                </div>
              </div>

              {/* divider */}
              <div className="border w-full border-media-primary-black"></div>

              <div className="flex justify-between opacity-70 px-3">
                <p>Item</p>
                <p className="text-right">Subtotal</p>
              </div>

              <div className="flex flex-col space-y-1 text-sm px-3">
                <div className="flex justify-between items-center">
                  <p>Potongan Seragam</p>
                  <p className="text-right">-Rp. 50.000</p>
                </div>

                <div className="flex justify-between items-center">
                  <p>Potongan Gathering</p>
                  <p className="text-right">-Rp. 100.000</p>
                </div>

                <div className="flex justify-between items-center">
                  <p>PK</p>
                  <p className="text-right">Rp. 500.000</p>
                </div>
              </div>

              {/* divider */}
              <div className="border w-full border-media-primary-black"></div>

              <div className="flex justify-between items-center text-sm px-3">
                <p className="text-media-danger-3 font-bold uppercase text-xl">
                  total
                </p>
                <p>Rp. 350.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalPk;
