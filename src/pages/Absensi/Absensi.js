import { DownOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import { debounce } from "lodash";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ImgEmptyAbsence } from "../../assets";
import { MoreMenuIcon } from "../../assets/icons";
import BottomSheetMoreMenu from "../../components/BottomSheetMoreMenu/BottomSheetMoreMenu";
import SearchInput from "../../components/SearchInput/SearchInput";
import { useHeader } from "../../context/Header";
import { useSpinner } from "../../context/Spinner";
import apiHelper from "../../helper/api";
import { initialValuesAbsence } from "../../schemas/AbsenceSchemas";
import {
  convertDate,
  getFilterMonthRange,
  showAlertError,
  showAlertSuccess,
} from "../../util/util";
import { DetailAbsence } from "./DetailAbsence/DetailAbsence";

const ContentMoreMenu = ({ edit, deleteAbsence }) => (
  <div className="flex flex-col w-full space-y-4">
    <button className="text-left" onClick={edit}>
      Edit
    </button>
    <hr />
    <button onClick={deleteAbsence} className="text-left">
      Hapus
    </button>
  </div>
);

function Absensi() {
  const navigate = useNavigate();
  const [month, setMonth] = useState(moment().format("MMMM"));
  const { setTitleHeader } = useHeader();
  const { setShowSpinner } = useSpinner();

  const [absenceList, setAbsenceList] = useState([]);
  const rangeList = getFilterMonthRange();
  const [showMonth, setShowMonth] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  const [filterMonth, setFilterMonth] = useState({
    startDate: "",
    endDate: "",
  });
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [detailAbsence, setDetailAbsence] = useState(initialValuesAbsence);

  const [selectedId, setSelectedId] = useState("");

  const onSelectedMonth = (range) => {
    setFilterMonth((prev) => ({
      startDate: range.start,
      endDate: range.end,
    }));
    setShowMonth((prev) => !prev);
    setMonth(range.month);
    getListAbsensiFiltered(range.start, range.end);
  };

  const getListAbsensi = async (offset = 0) => {
    setShowSpinner(true);
    apiHelper
      .get(
        `/apps/absensi?keyword=${keyword}&start_date=${filterMonth.startDate}&end_date=${filterMonth.endDate}&offset=${offset}&limit=${limit}`
      )
      .then(({ data }) => {
        data.absen.map((absen) => {
          absen.tanggal = convertDate(absen.tanggal);
        });
        setAbsenceList(data.absen);
        setTotalData(data.count);
        setTimeout(() => {
          setShowSpinner(false);
        }, 1000);
      })
      .catch((err) => {
        showAlertError(err.message);
        setShowSpinner(false);
      });
  };

  const getListAbsensiFiltered = async (startDate = "", endDate = "") => {
    setShowSpinner(true);
    const offset = totalData - 1 > limit ? page * limit - limit : 0;
    apiHelper
      .get(
        `/apps/absensi?keyword=${keyword}&start_date=${startDate}&end_date=${endDate}&offset=${offset}&limit=${limit}`
      )
      .then(({ data }) => {
        data.absen.map((absen) => {
          absen.tanggal = convertDate(absen.tanggal);
        });
        setAbsenceList(data.absen);
        setTotalData(data.count);
        setTimeout(() => {
          setShowSpinner(false);
        }, 1000);
      })
      .catch((err) => {
        showAlertError(err.message);
        setShowSpinner(false);
      });
  };

  const seeDetailAbsence = async (id) => {
    setShowSpinner(true);
    setShowDetail((prev) => !prev);
    apiHelper
      .get(`/apps/absensi/${id}/detail`)
      .then(({ data }) => {
        setDetailAbsence(data);
        setShowSpinner(false);
      })
      .catch((err) => {
        setShowSpinner(false);
      });
  };

  const onSearch = (e) => {
    const { value } = e.target;
    setKeyword(value);
    onDebounceSearch(value);
  };

  const onDebounceSearch = useCallback(
    debounce(async (searchVal) => {
      const { data } = await apiHelper.get(
        `/apps/absensi?keyword=${searchVal}&start_date=${filterMonth.startDate}&end_date=${filterMonth.endDate}&offset=0&limit=${limit}`
      );
      setAbsenceList(data.absen);
      setTotalData(data.count);
    }, 800),
    []
  );

  const onChangePage = async (page) => {
    const offset = page * limit - limit;
    setPage(page);
    getListAbsensi(offset);
  };

  const openMoreMenu = (id) => {
    setSelectedId(id);
    setShowMoreMenu((prev) => !prev);
  };

  const closeMoreMenu = () => {
    setShowMoreMenu((prev) => !prev);
    setSelectedId("");
  };

  const closeModalDetail = () => {
    setShowDetail((prev) => !prev);
    setSelectedId("");
    setDetailAbsence(initialValuesAbsence);
  };

  const editAbsence = () => {};

  const deleteAbsence = () => {
    setShowSpinner(true);
    apiHelper
      .delete(`/apps/absensi/${selectedId}/delete`)
      .then((res) => {
        getListAbsensiFiltered();
        showAlertSuccess("Absen berhasil dihapus");
        closeMoreMenu();
      })
      .catch((err) => {
        showAlertError(err.message);
        setShowSpinner(false);
      });
  };

  useEffect(() => {
    getListAbsensi();
    setTitleHeader("Absensi");
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-4" id="listAbsence">
        <div className={`${absenceList.length > 0 ? "shadow-md pb-4" : ""}`}>
          <div className="space-y-4 px-4">
            {/* search bar */}
            <SearchInput value={keyword} name="keyword" onChange={onSearch} />

            {/* filter month and button add */}
            <div className="flex justify-between">
              {/* filter month */}
              <div className="relative">
                <button
                  className={`px-6 py-1 flex items-center space-x-2 font-semibold border-media-primary-blue text-media-primary-blue border rounded-2xl ${
                    showMonth ? "rounded-b-none" : ""
                  }`}
                  onClick={() => setShowMonth((prev) => !prev)}
                >
                  <p>{month}</p>
                  <DownOutlined
                    color="#2accc8"
                    className={`${showMonth ? "rotate-180" : ""}`}
                  />
                </button>

                {/* list month */}
                {showMonth && (
                  <div className="border border-media-primary-blue rounded-2xl rounded-t-none h-20 space-y-1.5 flex flex-col overflow-y-auto py-1 absolute z-10 w-full shadow-md bg-white">
                    {rangeList.map((range) => (
                      <button
                        className={`${
                          range.month === month
                            ? "bg-media-primary-blue text-white rounded-lg"
                            : ""
                        }`}
                        key={range.start}
                        onClick={() => onSelectedMonth(range)}
                      >
                        {range.month}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* button add */}
              <button
                className="px-3 py-1 flex items-center space-x-2 font-semibold border-media-primary-blue text-media-primary-blue border rounded-2xl"
                onClick={() => navigate("create")}
              >
                + Tambah Absen
              </button>
            </div>
          </div>
        </div>

        {/* list absence */}
        {absenceList.length > 0 ? (
          <div className="flex flex-col space-y-4 px-4 pb-4 h-list-absence overflow-y-auto">
            {absenceList.map((absence) => (
              <div
                className="shadow-card rounded-md bg-white px-4 py-3 flex flex-col space-y-3 animate_2.5s animate_fadeInUp"
                key={absence.id}
              >
                {/* date with more menu */}
                <div className="flex justify-between items-center">
                  <p className="font-bold">{absence.tanggal}</p>
                  <button onClick={() => openMoreMenu(absence.id)}>
                    <MoreMenuIcon />
                  </button>
                </div>

                {/* church name and ir type */}
                <div className="flex justify-between items-center">
                  <p className="text-media-primary-gray font-semibold">
                    {absence.ir.includes("IR") ? "Mega Bekasi" : "BTC"}
                  </p>
                  <div
                    className={`px-2 py-1 rounded-2xl font-semibold ${
                      absence.ir.includes("IR")
                        ? "text-media-danger-3 bg-media-danger-1"
                        : "text-media-primary-green bg-media-secondary-green-2"
                    }`}
                  >
                    {absence.ir}
                  </div>
                </div>

                <div className="flex space-x-3 capitalize">
                  <p>{absence.ir.includes("IR") ? "Cam 1" : "Kom"}</p>
                  <p>:</p>
                  <p>
                    {absence.ir.includes("IR") ? absence.cam1 : absence.kom1}
                  </p>
                </div>

                <div className="flex space-x-3 capitalize">
                  <p>{absence.ir.includes("IR") ? "Cam 2" : "Cam"}</p>
                  <p>:</p>
                  <p>
                    {absence.ir.includes("IR") ? absence.cam2 : absence.cam1}
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    className="text-media-secondary-green"
                    onClick={() => seeDetailAbsence(absence.id)}
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-form grid place-items-center">
            <div className="space-y-3 text-center">
              <img src={ImgEmptyAbsence} alt="" />
              <h2 className="text-base text-media-primary-blue font-semibold">
                Belum ada data nihh...
              </h2>
            </div>
          </div>
        )}

        {/* pagination */}
        {totalData > limit && (
          <div className="mx-4">
            <div className="flex justify-center items-center w-full rounded-3xl bg-white py-2 px-3 shadow-paging">
              <Pagination
                size="small"
                defaultCurrent={page}
                onChange={onChangePage}
                total={totalData}
                defaultPageSize={limit}
              />
            </div>
          </div>
        )}
      </div>
      <BottomSheetMoreMenu
        content={
          <ContentMoreMenu edit={editAbsence} deleteAbsence={deleteAbsence} />
        }
        open={showMoreMenu}
        closeModal={closeMoreMenu}
      />

      <DetailAbsence
        closeModal={closeModalDetail}
        info={detailAbsence}
        open={showDetail}
      />
    </>
  );
}

export default Absensi;
