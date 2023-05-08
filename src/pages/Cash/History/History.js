import { useEffect, useState } from "react";
import { useHeader } from "../../../context/Header";
import { ImgComingSoon } from "../../../assets";
import apiHelper from "../../../helper/api";

const HistoryCash = () => {
  const { setTitleHeader } = useHeader();
  const [listCash, setListCash] = useState();

  const getListCash = () => {
    apiHelper.get(`/apps/history-cash`).then(({ data }) => {});
  };

  useEffect(() => {
    setTitleHeader("Kas");
  });
  return (
    <>
      <div
        className="grid place-items-center overflow-y-auto w-full"
        style={{ height: "calc(100vh - 254px)" }}
      >
        <img src={ImgComingSoon} alt="" />
      </div>
    </>
  );
};

export default HistoryCash;
