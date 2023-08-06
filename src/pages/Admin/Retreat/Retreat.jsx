import React, { useEffect, useState } from "react";
import { useSpinner } from "../../../context/Spinner";
import apiHelper from "../../../helper/api";

const Retreat = () => {
  const { setShowSpinner } = useSpinner();
  const [retreats, setRetreats] = useState([]);

  const getListRetreat = async () => {
    setShowSpinner(true);
    apiHelper.get("/public/retreat/list").then(({ data }) => {
      setRetreats(data);
      setShowSpinner(false);
    });
  };

  useEffect(() => {
    getListRetreat();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between w-full mb-4 text-sm font-medium">
        <p>
          Total Crew Ikut:{" "}
          <span className="font-semibold">
            {retreats.filter((data) => data.join).length}
          </span>
        </p>

        <p>
          Total Crew Tidak Ikut:{" "}
          <span className="font-semibold">
            {retreats.filter((data) => !data.join).length}
          </span>
        </p>
      </div>
      <div className="flex flex-col space-y-8 pb-20">
        {/* ikut */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-center px-4 py-2 text-lg font-semibold bg-media-secondary-blue rounded-3xl">
            IKUT
          </div>
          <div className="flex flex-col space-y-3 w-full justify-center items-center">
            {retreats.length > 0 &&
              retreats
                .filter((data) => data.join)
                .map((retreat, idx) => (
                  <div
                    className="border-b w-full border-b-media-primary-gray p-3 text-center"
                    key={idx}
                  >
                    <p className="capitalize">{retreat.name}</p>
                  </div>
                ))}
          </div>
        </div>

        {/* tidak ikut */}
        {retreats.filter((data) => !data.join).length > 0 && (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-center px-4 py-2 text-lg font-semibold bg-media-danger-3 text-white rounded-3xl">
              TIDAK IKUT
            </div>
            <div className="flex flex-col space-y-3 w-full justify-center items-center">
              <div className="grid grid-cols-2 p-3 border-b-media-primary-gray border-b bg-media-secondary-blue-2 w-full font-semibold gap-4 text-center">
                <p>Nama</p>
                <p>Alasan</p>
              </div>
              {retreats.length > 0 &&
                retreats
                  .filter((data) => !data.join)
                  .map((retreat) => (
                    <div
                      className="grid grid-cols-2 gap-4 border-b w-full border-b-media-primary-gray p-3 text-center"
                      key={retreat.name}
                    >
                      <p className="capitalize">{retreat.name}</p>
                      <p className="capitalize">{retreat.reason}</p>
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Retreat;
