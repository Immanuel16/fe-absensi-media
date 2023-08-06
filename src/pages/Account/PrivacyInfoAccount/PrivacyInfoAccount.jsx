import { Input } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { DefaultAva } from "../../../assets";
import { BackIcon } from "../../../assets/icons";
import { useUser } from "../../../context/Auth";
import { convertDate } from "../../../util/util";

const { TextArea } = Input;

export default function PrivacyInfoAccount() {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <>
      <div className="flex flex-col space-y-10">
        {/* header */}
        <div
          className="bg-media-primary-blue h-18 shadow-md sticky top-0 z-10 flex justify-between px-6 items-center text-white text-xl font-bold"
          style={{
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          }}
        >
          <button onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <p>Info Pribadi</p>
          <p></p>
        </div>

        {/* main */}
        <div className="flex flex-col items-center space-y-8 w-full px-4">
          {/* image */}
          <div
            className={`rounded-full ${
              user.photo ? "p-2" : "p-4"
            } bg-media-primary-blue shadow-md w-32 h-32`}
          >
            <img
              src={user.photo || DefaultAva}
              alt=""
              className={`rounded-full ${
                user.photo
                  ? "max-w-full max-h-full border-2 aspect-1 border-media-primary-gray"
                  : ""
              }`}
            />
          </div>

          {/* info */}
          <div className="flex flex-col space-y-4 w-full">
            {/* nama lengkap */}
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="tanggal"
                className="font-semibold text-media-black-3"
              >
                Nama Lengkap
              </label>
              <Input
                className="text-media-black-4 border-media-secondary-gray"
                value={user.full_name}
                readOnly
              />
            </div>

            {/* Alamat Rumah */}
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="tanggal"
                className="font-semibold text-media-black-3"
              >
                Alamat Rumah
              </label>
              <TextArea
                className="text-media-black-4 border-media-secondary-gray capitalize"
                value={user.address}
                readOnly
              />
            </div>

            {/* Tanggal Lahir */}
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="tanggal"
                className="font-semibold text-media-black-3"
              >
                Tanggal Lahir
              </label>
              <Input
                className="text-media-black-4 border-media-secondary-gray"
                value={convertDate(user.birth_date, "DD-MM-YYYY")}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
