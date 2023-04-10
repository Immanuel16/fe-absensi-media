import React, { useEffect } from "react";
import { ImgComingSoon } from "../../assets";
import { useHeader } from "../../context/Header";

const Cash = () => {
  const { setTitleHeader } = useHeader();

  useEffect(() => {
    setTitleHeader("Kas");
  });
  return (
    <>
      <div
        className="grid place-items-center overflow-y-auto w-full"
        style={{ height: "calc(100vh - 254px)" }}
      >
        <img src={ImgComingSoon} />
      </div>
    </>
  );
};

export default Cash;
