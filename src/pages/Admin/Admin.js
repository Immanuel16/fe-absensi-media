import React, { useEffect, useState } from "react";
import { useHeader } from "../../context/Header";
import "./Admin.scss";
import Bank from "./Bank/Bank";
import Birthday from "./Birthday/Birthday";

const Admin = () => {
  const role = localStorage.getItem("role");
  const { setTitleHeader } = useHeader();
  const [tab, setTab] = useState(+role === 2 ? +role : 3);
  useEffect(() => {
    setTitleHeader(`List ${+role === 2 ? "Ulang Tahun" : "Bank"}`);
  }, []);

  useEffect(() => {
    setTitleHeader(`List ${tab === 2 ? "Ulang Tahun" : "Bank"}`);
  }, [tab]);

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
                onClick={() => setTab(2)}
              >
                Ulang Tahun
              </button>
            </>
          )}

          {/* kabid and bendahara */}
          {(+role === 1 || +role === 3) && (
            <>
              {/* tab bank */}
              <button
                type="button"
                className={`text-sm pt-1 ${
                  (tab === 3 &&
                    "border-b-2 border-b-media-primary-orange pb-0.5") ||
                  "pb-1"
                }`}
                onClick={() => setTab(3)}
              >
                Bank
              </button>
            </>
          )}
        </div>

        {/* content tab */}
        <div className="flex flex-col space-y-4">
          {/* Content Birthday */}
          {tab === 2 && (
            <div className="h-birthday pb-4 overflow-y-auto">
              <Birthday />
            </div>
          )}

          {/* Content Birthday */}
          {tab === 3 && (
            <div className="pb-4 overflow-y-auto">
              <Bank />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
