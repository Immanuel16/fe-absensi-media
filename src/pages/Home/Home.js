import React, { useEffect, useState } from "react";
// import {ReactComponent as NotifIcon} from '../../assets/icons/bells.svg';
import { ImgEmptyAbsence, ImgTarget } from "../../assets";
import { TaskIcon, WalletIcon } from "../../assets/icons";
import { useUser } from "../../context/Auth";
import { useSpinner } from "../../context/Spinner";
import apiHelper from "../../helper/api";
import { convertDate, formatRupiah } from "../../util/util";
import { useNavigate } from "react-router";
function Home() {
  const navigate = useNavigate();
  const { user } = useUser();
  const today = new Date();
  const { setShowSpinner } = useSpinner();
  const [listMinistry, setListMinistry] = useState([]);
  const [totalCash, setTotalCash] = useState(0);

  const getMinistryHistory = async () => {
    apiHelper
      .get(`apps/users/ministry`)
      .then(({ data }) => {
        setShowSpinner(false);
        setListMinistry(data.history);
      })
      .catch((err) => {
        setShowSpinner(false);
        console.log(err);
      });
  };

  const getListCash = () => {
    setShowSpinner(true);
    apiHelper
      .get(`/apps/history-cash`)
      .then(({ data }) => {
        setTotalCash(data.total_cash);
        getMinistryHistory();
      })
      .catch((err) => {
        setShowSpinner(false);
      });
  };

  useEffect(() => {
    getListCash();
  }, []);
  return (
    <>
      <div className="flex flex-col overflow-y-auto pb-24 w-full">
        <div
          className="bg-media-primary-blue rounded-b-xl px-4 pt-6 h-32 sticky"
          style={{
            background:
              "linear-gradient(296.66deg, #2ADAF2 17.37%, rgba(42, 204, 200, 0.512933) 108.32%, rgba(42, 204, 200, 0) 112.75%)",
          }}
        >
          <p className="text-base font-semibold text-white capitalize mt-7">
            Shalom, {user.username}
          </p>

          <div className="flex space-x-4 items-center shadow-card bg-white rounded-lg py-3 px-4 mt-4 mb-6">
            <TaskIcon />
            <div className="space-y-2">
              <p>
                Pelayanan bulan ini, sampai{" "}
                <span className="font-semibold">{convertDate(today)}</span>
              </p>
              {user.total_pelayanan ? (
                <p className="font-semibold">{`${user.total_pelayanan} kali pelayanan`}</p>
              ) : (
                <p className="italic font-semibold text-media-danger-3">
                  belum ada pelayanan
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-8 pt-16 px-4">
          {/* total kas */}
          <div
            className="flex items-center shadow-card bg-white rounded-lg justify-between py-3 px-4"
            style={{
              background:
                "linear-gradient(273.07deg, rgba(255, 216, 4, 0.2) -5.42%, rgba(255, 216, 4, 0.0985656) 105.37%, rgba(255, 216, 4, 0) 109.17%)",
              filter: "drop-shadow(2px 2px 5px rgba(42, 218, 242, 0.6))",
            }}
          >
            <div className="flex space-x-4 items-center">
              <WalletIcon />
              {/* <img src={ImgTarget} alt="" /> */}
              <div className="space-y-1">
                <p>Total kas saat ini</p>
                <p className="font-semibold">{formatRupiah(totalCash)}</p>
              </div>
            </div>
            {/* see detail cash */}
            <button
              className="text-media-primary-blue"
              onClick={() => navigate("cash/history")}
            >
              Lihat Detail
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold font-montserrat">
                Riwayat Pelayanan
              </p>
              {listMinistry.length > 0 && (
                <button
                  className="text-media-primary-orange"
                  onClick={() => navigate("account/history-ministry")}
                >
                  Lihat Semua
                </button>
              )}
            </div>
            {/* list ministry */}
            {listMinistry.length > 0 ? (
              <div className="flex flex-col space-y-6">
                {listMinistry.map((ministry) => (
                  <div
                    className="flex flex-col space-y-3 shadow-card py-3 px-4 bg-white rounded-lg"
                    key={ministry.id}
                  >
                    <p className="font-semibold">
                      {ministry.ir.replace("IR", "Ibadah Raya")}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="italic">{convertDate(ministry.tanggal)}</p>
                      <div
                        className="rounded-lg px-2 py-1 text-media-primary-green font-semibold"
                        style={{ background: "rgba(0, 186, 136, 0.2)" }}
                      >
                        {ministry.tugas}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col space-y-2 justify-center items-center text-center">
                <img src={ImgEmptyAbsence} alt="" width={"75%"} height={60} />
                <p className="font-semibold text-sm">Belum ada pelayanan</p>
              </div>
            )}
          </div>
        </div>

        {/* <img src={ImgComingSoon} /> */}
      </div>
    </>
  );
}

export default Home;
