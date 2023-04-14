import React, { useEffect, useState } from "react";
import { useHeader } from "../../context/Header";
import "./Admin.scss";
import Bank from "./Bank/Bank";
import Birthday from "./Birthday/Birthday";
import Crew from "./Crew/Crew";

const Admin = () => {
  const role = localStorage.getItem("role");
  const { setTitleHeader } = useHeader();
  const [tab, setTab] = useState(+role === 1 || +role === 2 ? 0 : 3);
  useEffect(() => {
    setTitleHeader(`List ${+role === 2 ? "Ulang Tahun" : "Bank"}`);
  }, []);

  useEffect(() => {
    printHeaderName();
  }, [tab]);

  const printHeaderName = () => {
    let title = "List ";
    switch (tab) {
      case 0:
        title += "Crew";
        break;
      case 1:
        title += "Training";
        break;
      case 2:
        title += "Ulang Tahun";
        break;
      case 3:
        title += "Bank";
        break;
      default:
        break;
    }
    setTitleHeader(title);
  };

  return (
    <>
      <div className="flex flex-col space-y-4 px-4">
        {/* tabs */}
        <div className="flex space-x-3 items-center">
          {(+role === 1 || +role === 2) && (
            <>
              {/* tab crew */}
              <button
                type="button"
                className={`text-sm pt-1 ${
                  (tab === 0 &&
                    "border-b-2 border-b-media-primary-orange pb-0.5") ||
                  "pb-1"
                }`}
                onClick={() => setTab(0)}
              >
                Crew
              </button>

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
          {/* Content Crews */}
          {tab === 0 && (
            <div className="pb-4 overflow-y-auto">
              <Crew />
            </div>
          )}

          {/* Content Birthday */}
          {tab === 2 && (
            <div className="h-birthday pb-4 overflow-y-auto">
              <Birthday />
            </div>
          )}

          {/* Content Bank */}
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
