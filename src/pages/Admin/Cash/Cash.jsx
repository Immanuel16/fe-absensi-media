import React, { useEffect, useState } from "react";
import { useSpinner } from "../../../context/Spinner";
import apiHelper from "../../../helper/api";
import { convertDate, formatRupiah } from "../../../util/util";
import { Tooltip } from "antd";
import EditCash from "./EditCash/EditCash";

const Cash = () => {
  const { setShowSpinner } = useSpinner();
  const [listHistory, setListHistory] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const getHistoryCash = async () => {
    setShowSpinner(true);
    apiHelper.get("/apps/history-cash").then(({ data }) => {
      setShowSpinner(false);
      data.history_cash.map((history) => {
        history.tanggal = convertDate(history.tanggal, "dddd, DD MMMM YYYY");
        history.totals = formatRupiah(
          history.totals < 0 ? history.totals * -1 : history.totals
        );
      });
      setListHistory(data.history_cash);
    });
  };

  useEffect(() => {
    getHistoryCash();
  }, []);
  return showForm ? (
    <div className="flex flex-col space-y-4">
      {/* header table */}
      <div className="grid-cash p-3 bg-media-secondary-blue font-semibold text-sm text-center rounded-md">
        <p className="">Tanggal</p>
        <p>Item</p>
        <p>
          Harga <br />
          (jmlh)
        </p>
        <p>Total</p>
        <p>Aksi</p>
      </div>

      {/* list cash history */}
      <div className="flex flex-col space-y-3 h-bank overflow-y-auto text-center">
        {listHistory.map((history) => (
          <div
            className="grid-cash p-3 border-b border-b-media-primary-gray text-center "
            key={history.id}
          >
            <p className="text-left">{history.tanggal}</p>
            <Tooltip title={history.item}>
              <span className="dotted-text">{history.item}</span>
            </Tooltip>
            <p>
              {formatRupiah(history.price)}{" "}
              <span className="font-semibold">({history.total_item})</span>
            </p>
            <p className="text-center">{history.totals}</p>
            <div className="flex space-x-2">
              <button className="text-media-primary-yellow">Edit</button>
              <button className="text-media-danger-3">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <EditCash />
  );
};

export default Cash;
