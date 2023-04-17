import React from "react";
import { BackIcon } from "../../../assets/icons";
import { useNavigate } from "react-router";
import { useUser } from "../../../context/Auth";
import { DefaultAva } from "../../../assets";
import { Input } from "antd";

const BankAccount = () => {
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
          <p>Akun Bank</p>
          <p></p>
        </div>

        {/* main */}
        <div className="flex flex-col space-y-8 items-center w-full px-4">
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
            {/* Nomor Rekening */}
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="norek"
                className="font-semibold text-media-black-3"
              >
                Nomor Rekening
              </label>
              <Input
                className="text-media-black-4 border-media-secondary-gray"
                value={user.bank_acc_num}
                readOnly
              />
            </div>

            {/* Nama Bank */}
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="norek"
                className="font-semibold text-media-black-3"
              >
                Nama Bank
              </label>
              <Input
                className="text-media-black-4 border-media-secondary-gray"
                value={user.bank_name}
                readOnly
              />
            </div>

            {/* Atas Nama */}
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="bank_acc_name"
                className="font-semibold text-media-black-3"
              >
                Atas Nama
              </label>
              <Input
                className="text-media-black-4 border-media-secondary-gray"
                value={user.bank_acc_name}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankAccount;
