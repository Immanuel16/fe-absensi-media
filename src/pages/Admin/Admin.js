import React, { useEffect, useState } from "react";
import { useHeader } from "../../context/Header";
import "./Admin.scss";
import Birthday from "./Birthday/Birthday";

const Admin = () => {
  const role = localStorage.getItem("role");
  const { setTitleHeader } = useHeader();
  const [tab, setTab] = useState(2);
  useEffect(() => {
    setTitleHeader("List Ulang Tahun");
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-4 px-4">
        {/* tabs */}
        <div className="flex space-x-3 items-center">
          {(+role === 1 || +role === 2) && (
            <>
              {/* tab crew */}
              {/* <button
                type="button"
                className={`text-sm pt-1 ${
                  (tab === 0 &&
                    "border-b-2 border-b-media-primary-orange pb-0.5") ||
                  "pb-1"
                }`}
              >
                Crew
              </button> */}

              {/* tab training */}
              {/* <button
                type="button"
                className={`text-sm pt-1 ${
                  (tab === 1 &&
                    "border-b-2 border-b-media-primary-orange pb-0.5") ||
                  "pb-1"
                }`}
              >
                Training
              </button> */}

              {/* tab birthday */}
              <button
                type="button"
                className={`text-sm pt-1 ${
                  (tab === 2 &&
                    "border-b-2 border-b-media-primary-orange pb-0.5") ||
                  "pb-1"
                }`}
              >
                Ulang Tahun
              </button>
            </>
          )}
        </div>

        {/* content tab */}
        <div className="flex flex-col space-y-4">
          {/* Content Crew */}
          {tab === 2 && (
            <div className="h-birthday pb-4 overflow-y-auto">
              <Birthday />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
