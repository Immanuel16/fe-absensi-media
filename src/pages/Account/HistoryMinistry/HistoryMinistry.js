import React, { useEffect, useState } from "react";
import "../Account.scss";
import {
  BackIcon,
  PencilIcon,
  TrackingIcon,
  TrackingNonActiveIcon,
} from "../../../assets/icons";
import { useSpinner } from "../../../context/Spinner";
import apiHelper from "../../../helper/api";
import { convertDate, dateFormat, showAlertError } from "../../../util/util";
import { useNavigate } from "react-router";

export const HistoryMinistry = () => {
  const [listHistory, setListHistory] = useState([]);
  const navigate = useNavigate();
  const { setShowSpinner } = useSpinner();
  const getAllHistory = async () => {
    setShowSpinner(true);
    apiHelper
      .get(`/apps/users/ministry?offset=0&limit=20`)
      .then(({ data }) => {
        setShowSpinner(false);
        setListHistory(data.history);
      })
      .catch((err) => {
        setShowSpinner(false);
        showAlertError(err.message);
      });
  };

  const printTime = (ir) => {
    let time = "";
    if (ir.includes("IR")) {
      switch (ir) {
        case "IR 1":
          time = "09:00";
          break;
        case "IR 2":
          time = "11:00";
          break;
        case "IR 3":
          time = "13:00";
          break;
        default:
          time = "17:00";
          break;
      }
    } else {
      switch (ir) {
        case "BTC 1":
          time = "10:00";
          break;
        default:
          time = "16:00";
          break;
      }
    }

    return time;
  };

  useEffect(() => {
    getAllHistory();
  }, []);
  return (
    <>
      <div className="flex flex-col relative">
        {/* header */}
        <div
          className="bg-media-primary-blue h-18 shadow-md sticky top-0 z-10 flex justify-between items-center text-white text-xl font-bold px-6"
          style={{
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          <button onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <p className="font-montserrat">History Pelayanan</p>
          <p></p>
        </div>

        {/* history */}
        <div className="flex flex-col items-center justify-center h-history-ministry w-full py-6">
          <div className="flex flex-col space-y-9 justify-center items-center w-full">
            {listHistory.length > 0 ? (
              listHistory.map((history, idx) => (
                <div
                  className="area-history items-center text-xxs"
                  key={history.id}
                >
                  <div className="flex text-right flex-col space-y-0.5 text-media-primary-black opacity-60">
                    <p className="">{history.ir}</p>
                    <p>
                      {convertDate(history.tanggal, dateFormat.display)},{" "}
                      {printTime(history.ir)}
                    </p>
                  </div>

                  <div className="flex flex-col relative stepper">
                    <div className="z-10">
                      <div
                        className={`rounded-full flex items-center justify-center ${
                          idx === 0
                            ? "bg-media-primary-blue pulseActive"
                            : "bg-media-black-6"
                        }`}
                        style={{ width: "38px", height: "38px" }}
                      >
                        <PencilIcon />
                      </div>
                    </div>
                    {idx !== listHistory.length - 1 && (
                      <div className="lineStepper"></div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-0.5 text-media-primary-black opacity-60">
                    <p className="font-bold text-media-primary-blue text-xs">
                      {history.ir.includes("IR")
                        ? "GBI Mega Bekasi"
                        : "GBI BTC"}
                    </p>
                    <p>({history.tugas})</p>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
