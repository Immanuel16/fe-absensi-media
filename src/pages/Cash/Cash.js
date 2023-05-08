import { useEffect, useState } from "react";
import apiHelper from "../../helper/api";
import "./Cash.scss";
import { convertDate, formatRupiah } from "../../util/util";

const Cash = () => {
  const [listCash, setListCash] = useState([]);
  const [totalCash, setTotalCash] = useState(0);

  const getListCash = () => {
    apiHelper.get(`/apps/history-cash`).then(({ data }) => {
      setTotalCash(data.total_cash);
      data.history_cash.map((history) => {
        history.tanggal = convertDate(history.tanggal, "dddd, DD MMMM YYYY");
        history.totals = formatRupiah(history.totals);
      });
      setListCash(data.history_cash);
    });
  };

  useEffect(() => {
    getListCash();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center overflow-y-auto w-full pb-24">
        {/* header */}
        <div className="bg-media-secondary-blue-2 h-40 rounded-b-header w-full">
          <div className="bg-media-primary-blue rounded-b-header h-32"></div>
        </div>

        {/* info total kas */}
        <div className="px-5 pb-10 w-full" style={{ marginTop: "-100px" }}>
          <div className="bg-gradient-total-cash text-white p-10 rounded-card w-full">
            <div className="flex flex-col space-y-1 text-center font-bold">
              <p className="text-base">Total Uang Kas</p>
              <h2
                className="text-4xl"
                style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
              >
                {formatRupiah(totalCash)}
              </h2>
            </div>
          </div>
        </div>

        <div className="px-4 w-full flex flex-col space-y-4">
          {/* section title and button detail */}
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold border-b-2 border-b-media-primary-black">
              Uang Kas
            </p>

            <button className="rounded-lg py-0.5 px-2 text-white bg-media-primary-orange font-semibold">
              Detail
            </button>
          </div>

          {/* list history cash */}
          <div className="flex flex-col space-y-3.5">
            {listCash.length > 0 &&
              listCash.map((cash) => (
                <div
                  className="area-history-cash bg-white shadow-md rounded-lg px-7 py-4 items-center space-x-1"
                  key={cash.id}
                >
                  <div className="flex flex-col space-y-1.5">
                    <p className="text-xxs text-media-black-7">
                      {cash.tanggal}
                    </p>
                    <p>{cash.item}</p>
                  </div>

                  <div
                    className={`px-2.5 py-1 ${
                      cash.type ? "bg-media-primary-blue" : "bg-media-danger-3"
                    } text-white rounded-lg`}
                  >
                    {`${cash.type ? "+" : "-"} ${cash.totals}`}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cash;
