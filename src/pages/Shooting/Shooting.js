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
    getListSchedule();
  }, []);
  return (
    <div className="flex flex-col min-h-screen items-center space-y-8 bg-media-primary-blue xs:max-w-480 sm:max-w-480 md:w-full lg:w-full xl:w-full py-8">
      <h2 className="text-xl lg:text-3xl text-white font-bold font-montserrat">
        List Permintaan Jadwal Shooting
      </h2>

      {/* desktop & tablet layout */}
      <div className="hidden md:flex lg:flex justify-center items-center max-w-full shadow-md bg-white py-4 px-4 rounded-xl">
        <table className="w-full border border-slate-500">
          <thead>
            <tr className="">
              <th className="border border-slate-500 px-8 py-1">
                Tanggal Shooting
              </th>
              <th className="border border-slate-500 px-8 py-1">
                Jam Shooting
              </th>
              <th className="border border-slate-500 px-8 py-1">Nama</th>
              <th className="border border-slate-500 px-8 py-1">Divisi</th>
              <th className="border border-slate-500 px-8 py-1">
                Keperluan Shooting
              </th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr className="text-center">
                  <td className="border border-slate-500 px-8 py-2">
                    {convertDate(schedule.request_date)}
                  </td>
                  <td className="border border-slate-500 px-8 py-2">
                    {convertDate(schedule.request_date, "HH:mm")}
                  </td>
                  <td className="border border-slate-500 px-8 py-2">
                    {schedule.name}
                  </td>
                  <td className="border border-slate-500 px-8 py-2">
                    {schedule.division}
                  </td>
                  <td className="border border-slate-500 px-8 py-2">
                    {schedule.description}
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>

      {/* mobile layout */}
      <div className="flex md:hidden lg:hidden flex-col space-y-4 bg-white shadow-md rounded-lg p-4 overflow-x-auto max-w-480 mx-3">
        <div className="grid-shooting font-semibold text-sm text-center rounded-md">
          <p>Tanggal</p>
          <p>Jam</p>
          <p>Nama</p>
          <p>Divisi</p>
          <p>Keperluan</p>
        </div>

        <div className="flex flex-col space-y-4 overflow-y-auto">
          {/* list shooting */}
          {schedules.map((schedule) => (
            <div
              className="grid-shooting border p-1 text-center capitalize rounded-md"
              key={schedule.id}
            >
              <p>{convertDate(schedule.request_date)}</p>
              <p>{convertDate(schedule.request_date, "HH:mm")}</p>
              <p>{schedule.name}</p>
              <p>{schedule.division}</p>
              <p>{schedule.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shooting;
