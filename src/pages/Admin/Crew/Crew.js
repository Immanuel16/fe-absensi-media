import React, { useEffect, useState } from "react";
import { useSpinner } from "../../../context/Spinner";
import apiHelper from "../../../helper/api";
import { convertDate, dateFormat, getDifferentDate } from "../../../util/util";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import { InitialValuesCrew } from "../../../schemas/UserSchemas";
import { DetailCrew } from "./DetailCrew";

const Crew = () => {
  const { setShowSpinner } = useSpinner();
  const [crews, setCrews] = useState([]);

  const limit = 5;
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  /* detail */
  const [showDetail, setShowDetail] = useState(false);
  const [detailCrew, setDetailCrew] = useState(InitialValuesCrew);
  const [selectedId, setSelectedId] = useState("");

  const getCrews = async (offset = 0) => {
    setShowSpinner(true);
    apiHelper
      .get(`/apps/users?offset=${offset}&limit=${limit}`)
      .then(({ data }) => {
        data.crew.map((crew) => {
          crew.age =
            getDifferentDate(convertDate(crew.birth_date, "DD/MM/YYYY"), true) *
            -1;
          crew.username = crew.username.toLowerCase();
        });
        setCrews(data.crew);
        setTotalData(data.count);
        setShowSpinner(false);
      });
  };

  const seeDetailCrew = async (id) => {
    setShowSpinner(true);
    setShowDetail((prev) => !prev);
    apiHelper.get(`/apps/users/${id}/detail`).then(({ data }) => {
      data.birth_date = convertDate(data.birth_date, dateFormat.display);
      data.full_name = data.full_name.toLowerCase();
      data.username = data.username.toLowerCase();
      setDetailCrew(data);
      setShowSpinner(false);
    });
  };

  const onChangePage = async (page) => {
    const offset = page * limit - limit;
    setPage(page);
    getCrews(offset);
  };

  const closeModalDetail = () => {
    setShowDetail((prev) => !prev);
    setSelectedId("");
    setDetailCrew(InitialValuesCrew);
  };

  useEffect(() => {
    getCrews();
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-4">
        {/* header table */}
        <div className="grid-crews p-3 bg-media-secondary-blue font-semibold text-sm text-center rounded-md">
          <p className="text-left">Nama</p>
          <p>Usia</p>
          <p>KOM</p>
          <p>Action</p>
        </div>
      </div>
      <div className="flex flex-col space-y-6">
        {/* list crew */}
        <div className="flex flex-col space-y-3 overflow-y-auto">
          {crews.map((crew) => (
            <div
              className="grid-crews p-3 border-b border-b-media-primary-gray capitalize text-center"
              key={crew.id}
            >
              <p>{crew.username}</p>
              <p>{crew.age}</p>
              <div className="flex justify-center w-full">
                <div
                  className={`flex justify-center items-center w-6 h-6 rounded-full p-1.5 ${
                    crew.kom ? "bg-media-primary-green" : "bg-media-danger-3"
                  }`}
                >
                  {crew.kom ? (
                    <CheckOutlined
                      style={{ color: "#fff", fontSize: "14px" }}
                    />
                  ) : (
                    <CloseOutlined
                      style={{ color: "#fff", fontSize: "14px" }}
                    />
                  )}
                </div>
              </div>
              <button
                className="text-media-primary-green"
                onClick={() => seeDetailCrew(crew.id)}
              >
                Detail
              </button>
            </div>
          ))}
        </div>

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

      {/* detail Crew */}
      <DetailCrew
        closeModal={closeModalDetail}
        info={detailCrew}
        open={showDetail}
      />
    </>
  );
};

export default Crew;
