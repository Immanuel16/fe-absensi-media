import React, { useEffect, useState } from "react";
import { useSpinner } from "../../../context/Spinner";
import apiHelper from "../../../helper/api";
import { convertDate } from "../../../util/util";

const Birthday = () => {
  const { setShowSpinner } = useSpinner();
  const [birthdayList, setBirthdayList] = useState([]);

  const getDataEachMonth = (data, month = "01") =>
    data
      .filter((d) => d.birth_date.split("-")[1] === month)
      .map((d) => {
        d.full_name = d.full_name.toLowerCase();
        d.username = d.username.toLowerCase();
        return d;
      })
      .sort(
        (a, b) =>
          convertDate(a.birth_date, "DD") - convertDate(b.birth_date, "DD")
      );

  const getListBirthday = async () => {
    setShowSpinner(true);
    apiHelper.get("/apps/users/birthdays").then(({ data }) => {
      const list = [];
      for (let i = 1; i <= 12; i++) {
        let obj = {
          month: convertDate(`${i > 9 ? i : `0${i}`}`, "MMMM"),
          crews: getDataEachMonth(data, `${i > 9 ? i : `0${i}`}`),
        };
        list.push(obj);
      }
      setBirthdayList(list);
      setShowSpinner(false);
    });
  };

  useEffect(() => {
    getListBirthday();
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-5">
        {birthdayList.map((data) => (
          <div className="flex flex-col space-y-2.5" key={data.month}>
            <div className="flex items-center justify-center px-4 py-2 text-lg font-semibold bg-media-secondary-blue rounded-3xl">
              {data.month}
            </div>
            {data.crews.length > 0 ? (
              data.crews.map((crew) => (
                <div className="flex flex-col border-b" key={crew.id}>
                  <div className="flex justify-between capitalize items-center py-4 px-3">
                    <p>{crew.username}</p>
                    <p className="font-bold text-media-primary-green">
                      {convertDate(crew.birth_date)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-center py-4 px-3 border-b font-semibold text-center italic text-media-danger-3">
                Tidak ada yang ulang tahun
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Birthday;
