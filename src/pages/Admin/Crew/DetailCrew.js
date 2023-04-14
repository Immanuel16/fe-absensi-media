import React from "react";
import BottomSheetDetail from "../../../components/BottomSheetDetail/BottomSheetDetail";
import { convertDate, dateFormat } from "../../../util/util";
import { DefaultAva } from "../../../assets";

const ContentDetailCrew = ({ info }) => (
  <div className="flex flex-col w-full mt-4 space-y-5 px-5">
    {/* area header */}
    <div className="flex flex-col justify-center items-center w-full space-y-2.5">
      {/* photo profile */}
      <div
        className={`rounded-full w-20 h-20 p-2 ${
          info.photo ? "border border-media-primary-blue" : ""
        } bg-white shadow`}
      >
        <img
          src={info.photo ?? DefaultAva}
          alt=""
          className={`rounded-full ${
            info.photo
              ? "max-w-full max-h-full border aspect-1  border-media-primary-gray shadow-lg z-10"
              : ""
          }`}
        />
      </div>

      {/* nama */}
      <div className="flex flex-col items-center">
        <p className="text-sm font-semibold capitalize">{info.full_name}</p>
        <p className="text-media-primary-gray italic capitalize">
          {info.username}
        </p>
      </div>

      {/* keterangan kom, hmc, baptis */}
      <div className="flex justify-around space-x-3">
        {/* baptis */}
        {info.baptis ? (
          <div className="rounded-2xl px-3 border border-media-secondary-green text-media-secondary-green">
            Baptis
          </div>
        ) : (
          <></>
        )}

        {/* hmc */}
        {info.hmc ? (
          <div className="rounded-2xl px-3 border border-media-secondary-green text-media-secondary-green">
            HMC
          </div>
        ) : (
          <></>
        )}

        {/* kom */}
        {info.kom ? (
          <div className="rounded-2xl px-3 border border-media-secondary-green text-media-secondary-green">
            KOM
          </div>
        ) : (
          <></>
        )}

        {/* orientasi */}
        {info.orientasi ? (
          <div className="rounded-2xl px-3 border border-media-secondary-green text-media-secondary-green">
            Orientasi
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>

    {/* area content */}
    <div className="flex flex-col space-y-3">
      <div>
        <p className="text-media-primary-gray">Tanggal Lahir</p>
        <p>{convertDate(info?.birth_date, dateFormat.display)}</p>
      </div>

      <div>
        <p className="text-media-primary-gray">Nomor Whatsapp</p>
        <p>{info.phone}</p>
      </div>

      <div>
        <p className="text-media-primary-gray">Alamat</p>
        <p>{info.address}</p>
      </div>
    </div>
  </div>
);

export const DetailCrew = ({ info, closeModal, open }) => {
  return (
    <BottomSheetDetail
      content={<ContentDetailCrew info={info} />}
      open={open}
      closeModal={closeModal}
    />
  );
};
