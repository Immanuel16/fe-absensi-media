import { useEffect, useState } from "react";
import { useHeader } from "../../../context/Header";
import apiHelper from "../../../helper/api";
import { convertDate, formatRupiah } from "../../../util/util";
import { Pagination } from "antd";
import { useSpinner } from "../../../context/Spinner";

const HistoryCash = () => {
  const { setTitleHeader, titleHeader } = useHeader();
  const { setShowSpinner } = useSpinner();
  const [listCash, setListCash] = useState([]);
  const [totalCash, setTotalCash] = useState(0);

  /* pagination */
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const getListCash = (offset = 0) => {
    setShowSpinner(true);
    apiHelper
      .get(`/apps/history-cash?offset=${offset}`)
      .then(({ data }) => {
        setShowSpinner(false);
        setTotalCash(data.total_cash);
        setTotalData(data.count);
        data.history_cash.map((history) => {
          history.tanggal = convertDate(history.tanggal, "dddd, DD MMMM YYYY");
          history.itemPrice = formatRupiah(
            (history.totals < 0 ? history.totals * -1 : history.totals) /
              history.total_item
          );
          history.totals = formatRupiah(
            history.totals < 0 ? history.totals * -1 : history.totals
          );
        });
        setListCash(data.history_cash);
      })
      .catch((err) => {
        setShowSpinner(false);
      });
  };

  const onChangePage = async (page) => {
    const offset = page * 4 - 4;
    setPage(page);
    getListCash(offset);
  };

  useEffect(() => {
    getListCash();
  }, []);

  useEffect(() => {
    setTitleHeader("Kas");
  });
  return (
    <div className="flex flex-col overflow-y-auto bg-total-pk relative min-h-screen">
      <header className="bg-media-primary-blue text-white text-xl font-semibold shadow-md sticky top-0 z-10 w-full py-5 rounded-br-header">
        <div className="relative">
          <div className="bg-white absolute top-12 w-2/3 h-0.5"></div>
        </div>
        <div className="px-6">{titleHeader}</div>
      </header>

      {/* total kas */}
      <div className="flex flex-col space-y-1 my-10 justify-center items-center text-white font-bold">
        <p
          className="text-base"
          style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        >
          Total Uang Kas
        </p>
        <h2
          className="text-5xl"
          style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        >
          {formatRupiah(totalCash)}
        </h2>
      </div>

      {/* all history */}
      <div className="bg-white flex flex-col space-y-8 h-all-cash rounded-t-card pt-4 pb-4">
        <div className="flex justify-center items-center">
          <div className="border-2 rounded-lg border-gray-300 w-16"></div>
        </div>
        <div className="flex flex-col space-y-6 overflow-y-auto pb-8">
          {listCash.map((cash, idx) => (
            <div
              className={`flex flex-col space-y-1 pb-4 ${
                idx !== listCash.length - 1 ? "border-b-2 border-gray-200" : ""
              }`}
            >
              <div className="area-history-cash-detail items-center text-xxs px-7">
                <p className="text-media-black-7">{cash.tanggal}</p>
                <p
                  className={`${
                    cash.type
                      ? "text-media-primary-blue"
                      : "text-media-danger-3"
                  } text-end`}
                >
                  {cash.total_item > 1 && `[${cash.total_item}]`}{" "}
                  {cash.itemPrice}
                </p>
              </div>

              <div className="area-history-cash-detail items-center px-7">
                <p>{cash.item}</p>
                <p
                  className={`${
                    cash.type
                      ? "text-media-primary-blue"
                      : "text-media-danger-3"
                  } text-end text-base`}
                >
                  {cash.type ? "+" : "-"} {cash.totals}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* pagination */}
        {totalData > 4 && (
          <div className="mx-4">
            <div className="flex justify-center items-center w-full rounded-3xl bg-white py-2 px-3 shadow-paging">
              <Pagination
                size="small"
                defaultCurrent={page}
                onChange={onChangePage}
                total={totalData}
                defaultPageSize={4}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryCash;
