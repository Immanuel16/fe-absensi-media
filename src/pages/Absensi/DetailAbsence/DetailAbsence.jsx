import React from "react";
import BottomSheetDetail from "../../../components/BottomSheetDetail/BottomSheetDetail";
import { convertDate } from "../../../util/util";

const ContentDetailAbsence = ({ info }) => (
  <div className="flex flex-col space-y-5 w-full mt-4">
    <div className="flex justify-between">
      <div className="flex space-x-4">
        <div className="px-2.5 py-1 rounded-2xl font-semibold text-media-primary-green bg-media-secondary-green-2">
          {info.ir.includes("IR") ? "Mega Bekasi" : "BTC"}
        </div>

        <div
          className={`px-2.5 py-1 rounded-2xl font-semibold text-media-primary-orange bg-media-secondary-orange`}
        >
          {info.ir.includes("BTC")
            ? info.ir === "BTC 1"
              ? "IR 1"
              : "IR 2"
            : info.ir}
        </div>
      </div>

      <p className="text-base">{convertDate(info.tanggal)}</p>
    </div>

    <div className="flex flex-col space-y-3">
      {/* operator komputer 1 */}
      <div className="flex justify-between">
        <p className="text-media-primary-gray font-semibold">
          Operator Komputer {info.ir.includes("IR") && "1"}
        </p>
        <p className="capitalize">{info.kom1 || "-"}</p>
      </div>

      {/* operator komputer 2 */}
      {info.ir.includes("IR") && (
        <div className="flex justify-between">
          <p className="text-media-primary-gray font-semibold">
            Operator Komputer 2
          </p>
          <p className="capitalize">{info.kom2 || "-"}</p>
        </div>
      )}

      {/* lighting */}
      <div className="flex justify-between">
        <p className="text-media-primary-gray font-semibold">Lighting</p>
        <p className="capitalize">{info.lighting || "-"}</p>
      </div>

      {/* cameraman 1 */}
      <div className="flex justify-between">
        <p className="text-media-primary-gray font-semibold">
          Cameraman {info.ir.includes("IR") && "1"}
        </p>
        <p className="capitalize">{info.cam1 || "-"}</p>
      </div>

      {/* cameraman 2 */}
      {info.ir.includes("IR") && (
        <div className="flex justify-between">
          <p className="text-media-primary-gray font-semibold">Cameraman 2</p>
          <p className="capitalize">{info.cam2 || "-"}</p>
        </div>
      )}

      {/* cameraman 3 */}
      {info.ir.includes("IR") && (
        <div className="flex justify-between">
          <p className="text-media-primary-gray font-semibold">Cameraman 3</p>
          <p className="capitalize">{info.cam3 || "-"}</p>
        </div>
      )}

      {/* switcher */}
      {info.ir.includes("IR") && (
        <div className="flex justify-between">
          <p className="text-media-primary-gray font-semibold">Switcher</p>
          <p className="capitalize">{info.switcher || "-"}</p>
        </div>
      )}

      {/* photografer */}
      {info.ir.includes("IR") && (
        <div className="flex justify-between">
          <p className="text-media-primary-gray font-semibold">Photografer</p>
          <p className="capitalize">{info.photo || "-"}</p>
        </div>
      )}

      {/* soundman 1 */}
      <div className="flex justify-between">
        <p className="text-media-primary-gray font-semibold">
          Soundman {info.ir.includes("IR") && "1"}
        </p>
        <p className="capitalize">{info.sound1 || "-"}</p>
      </div>

      {/* soundman 2 */}
      {info.ir.includes("IR") && (
        <div className="flex justify-between">
          <p className="text-media-primary-gray font-semibold">Soundman 2</p>
          <p className="capitalize">{info.sound2 || "-"}</p>
        </div>
      )}

      {/* PIC */}
      <div className="flex justify-between">
        <p className="text-media-primary-gray font-semibold">PIC</p>
        <p className="capitalize">{info.created_by || "-"}</p>
      </div>
    </div>
  </div>
);

export const DetailAbsence = ({ info, closeModal, open }) => {
  return (
    <BottomSheetDetail
      content={<ContentDetailAbsence info={info} />}
      open={open}
      closeModal={closeModal}
    />
  );
};
