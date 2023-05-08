import React, { useEffect, useState } from "react";
import apiHelper from "../../helper/api";
import { convertDate } from "../../util/util";

const Shooting = () => {
  const [schedules, setSchedules] = useState([]);
  const getListSchedule = async () => {
    apiHelper
      .get("/public/shooting/list")
      .then(({ data }) => {
        setSchedules(data);
      })
      .catch((err) => setSchedules([]));
  };

  useEffect(() => {
    // getListSchedule();
    setSchedules([
      {
        request_date: "2023-05-12",
        name: "Nuel",
        division: "PBI",
        description: "ini buat testing",
      },
      {
        request_date: "2023-05-12",
        name: "Nuel",
        division: "PBI",
        description: "ini buat testing",
      },
    ]);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center space-y-8 bg-white w-full py-8">
      <h2 className="text-xl">List Permintaan Jadwal Shooting</h2>

      <div className="flex justify-center items-center w-full">
        <table className="table-auto w-3/4 border-separate">
          <thead>
            <tr className="text-left">
              <th className="p-2">Tanggal Shooting</th>
              <th className="p-2">Nama</th>
              <th className="p-2">Divisi</th>
              <th className="p-2">Keperluan Shooting</th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr>
                  <td className="py-2 border">
                    {convertDate(schedule.request_date)}
                  </td>
                  <td className="py-2 border">{schedule.name}</td>
                  <td className="py-2 border">{schedule.division}</td>
                  <td className="py-2 border">{schedule.description}</td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shooting;
