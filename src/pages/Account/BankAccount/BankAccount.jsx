import React, { useEffect, useState } from "react";
import { BackIcon } from "../../../assets/icons";
import { useNavigate } from "react-router";
import { useUser } from "../../../context/Auth";
import { DefaultAva } from "../../../assets";
import { Input, Select } from "antd";
import { useFormik } from "formik";
import {
  BankCrewSchemas,
  InitialValuesBankCrew,
} from "../../../schemas/UserSchemas";
import apiHelper from "../../../helper/api";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { useSpinner } from "../../../context/Spinner";
import { showAlertSuccess } from "../../../util/util";

const BankAccount = () => {
  const navigate = useNavigate();
  const { setShowSpinner } = useSpinner();
  const { user, setUser } = useUser();
  const [isEdit, setIsEdit] = useState(false);
  const [listBank, setListBank] = useState([]);

  const formik = useFormik({
    initialValues: InitialValuesBankCrew,
    validationSchema: BankCrewSchemas,

    onSubmit: (values) => {
      saveData(values);
    },
  });

  const getListBank = async () => {
    try {
      const { data } = await apiHelper.get("/public/bank-account");
      const list = data.map((d) => ({
        value: d.bank_code,
        label: d.bank_name,
      }));
      setListBank(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListBank();
  }, []);

  const getDataUser = async () => {
    try {
      const { data } = await apiHelper.get("/apps/accounts");
      setUser(data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    onChangeField("bank_name", user.bank_id);
    onChangeField("bank_acc_num", user.bank_acc_num);
    onChangeField("bank_acc_name", user.bank_acc_name);
  }, [user]);

  const onChangeField = (name, e) => {
    formik.setFieldValue(name, e);
  };

  const onBlurField = (name) => {
    formik.setFieldTouched(name, true, true);
  };

  const saveData = async (data) => {
    setShowSpinner(true);
    apiHelper.put(`/apps/accounts/edit/bank-account`, data).then(() => {
      setShowSpinner(false);
      showAlertSuccess("Akun bank berhasil diubah");
      setIsEdit((prev) => !prev);
      getDataUser();
    });
  };

  const editData = () => {
    setShowSpinner(true);
    setIsEdit((prev) => !prev);
    setTimeout(() => {
      setShowSpinner(false);
    }, 1250);
  };

  const onClickButton = () => {
    isEdit ? saveData(formik.values) : editData();
  };

  const onClickBtnHeader = () => {
    !isEdit ? navigate(-1) : setIsEdit((prev) => !prev);
  };

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
          <button
            onClick={onClickBtnHeader}
            className="text-white text-base font-medium"
            type="button"
          >
            {!isEdit ? <BackIcon /> : "Close"}
          </button>
          <p>Akun Bank</p>
          {!isEdit ? (
            <p></p>
          ) : (
            <button
              type="submit"
              className="text-white text-base font-medium"
              onClick={() => saveData(formik.values)}
            >
              Save
            </button>
          )}
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
                value={formik.values.bank_acc_num}
                readOnly={!isEdit}
                onChange={formik.handleChange}
                name="bank_acc_num"
              />
            </div>

            {/* Nama Bank */}
            {!isEdit ? (
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
            ) : (
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="bank_id"
                  // className={`${formik.touched.bank_id && formik.errors.bank_id ? 'text-media-danger-3': 'text-media-primary-gray'}`}
                >
                  Nama Bank
                </label>
                <div
                  className={`border rounded-lg ${
                    formik.touched.bank_id && formik.errors.bank_id
                      ? "border-media-danger-3"
                      : "border-media-primary-gray"
                  } w-full`}
                >
                  <Select
                    bordered={false}
                    showSearch
                    onBlur={() => onBlurField("bank_id")}
                    placeholder="Pilih nama bank"
                    optionFilterProp="children"
                    onChange={(value) => onChangeField("bank_name", value)}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={listBank}
                    className="w-full"
                    value={formik.values.bank_name}
                  />
                </div>
                <ErrorMessage
                  show={formik.touched.bank_id && formik.errors.bank_id}
                  message={formik.errors.bank_id}
                />
              </div>
            )}

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
                value={formik.values.bank_acc_name}
                readOnly={!isEdit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="bank_acc_name"
              />
            </div>
          </div>

          {/* Edit Data */}
          <div className="flex flex-col space-y-4 w-full items-center mt-6">
            {/* button edit data */}
            {!isEdit && (
              <button
                className="border border-salestrack-primary-blue rounded-xl text-media-primary-blue font-semibold text-sm w-4/5 py-1.5"
                onClick={onClickButton}
              >
                {isEdit ? "Simpan" : "Edit Data"}
              </button>
            )}

            {/* divider */}
            <div
              className="border-2 border-media-secondary-gray opacity-40"
              style={{ width: "20%" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankAccount;
