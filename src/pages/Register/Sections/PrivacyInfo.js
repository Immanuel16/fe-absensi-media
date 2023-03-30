import { DatePicker, Input, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import {
  initialValuesRegister,
  PrivacyInfoSchemas,
} from "../../../schemas/RegisterSchemas";
import { DownOutlined } from "@ant-design/icons";
import { dateFormat } from "../../../util/util";
import moment from "moment";
import "../Register.scss";
import { useRegisterContext } from "../../../context/RegisterContext";
import apiHelper from "../../../helper/api";

const PrivacyInfo = () => {
  const { setActiveStepIndex, setRegisterData, registerData } =
    useRegisterContext();
  const maxBirthDate = new Date("2010-12-31");

  const [listBank, setListBank] = useState([]);

  const formik = useFormik({
    initialValues: initialValuesRegister.privacyInfo,
    validationSchema: PrivacyInfoSchemas,

    onSubmit: (values) => {
      nextStep(values);
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
    } catch (error) {}
  };

  useEffect(() => {
    getListBank();
  }, []);

  const onChangeField = (name, e) => {
    formik.setFieldValue(
      name,
      name === "birth_date" ? moment(e).format(dateFormat.value) : e
    );
  };

  const onBlurField = (name) => {
    formik.setFieldTouched(name, true, true);
  };

  const nextStep = (values) => {
    const data = { ...registerData, ...values };
    setRegisterData(data);
    setActiveStepIndex((prev) => prev + 1);
  };
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-4 h-form overflow-y-auto overflow-x-hidden">
        {/* input nama lengkap */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="full_name"
            // className={`${formik.touched.full_name && formik.errors.full_name ? 'text-media-danger-3': 'text-media-primary-gray'}`}
          >
            Nama Lengkap
          </label>
          <Input
            name="full_name"
            id="full_name"
            type="text"
            placeholder="Masukkan nama lengkap"
            className={`${
              formik.touched.full_name && formik.errors.full_name
                ? "border-media-danger-3"
                : "border-media-primary-gray"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.full_name}
          />
          <ErrorMessage
            show={formik.touched.full_name && formik.errors.full_name}
            message={formik.errors.full_name}
          />
        </div>

        {/* input nama panggilan */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="username"
            // className={`${formik.touched.username && formik.errors.username ? 'text-media-danger-3': 'text-media-primary-gray'}`}
          >
            Nama Panggilan
          </label>
          <Input
            name="username"
            id="username"
            type="text"
            placeholder="Masukkan nama panggilan"
            className={`${
              formik.touched.username && formik.errors.username
                ? "border-media-danger-3"
                : "border-media-primary-gray"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          <ErrorMessage
            show={formik.touched.username && formik.errors.username}
            message={formik.errors.username}
          />
        </div>

        {/* input tanggal lahir */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="birth_date"
            className="font-semibold text-media-primary-gray"
          >
            Tanggal Lahir
          </label>
          <DatePicker
            id="birth_date"
            onChange={(date, dateString) =>
              onChangeField("birth_date", dateString)
            }
            suffixIcon={<DownOutlined />}
            disabledDate={(d) =>
              !d || (maxBirthDate && d.isAfter(maxBirthDate))
            }
            className={`datepicker-custom ${
              formik.touched.birth_date && formik.errors.birth_date
                ? "border-media-danger-3"
                : "border-media-primary-gray"
            }`}
            placeholder="Pilih tanggal lahir"
            format={dateFormat.input}
            name="birth_date"
            onBlur={(e) => onBlurField("birth_date")}
            inputReadOnly={true}
          />
          <ErrorMessage
            show={formik.touched.birth_date && formik.errors.birth_date}
            message={formik.errors.birth_date}
          />
        </div>

        {/* input nomor hp */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="phone"
            // className={`${formik.touched.phone && formik.errors.phone ? 'text-media-danger-3': 'text-media-primary-gray'}`}
          >
            Nomor HP / Whatsapp
          </label>
          <Input
            name="phone"
            id="phone"
            type="text"
            placeholder="Masukkan nomor hp atau whatsapp"
            className={`${
              formik.touched.phone && formik.errors.phone
                ? "border-media-danger-3"
                : "border-media-primary-gray"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          <ErrorMessage
            show={formik.touched.phone && formik.errors.phone}
            message={formik.errors.phone}
          />
        </div>

        {/* input nama bank */}
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
              onChange={(value) => onChangeField("bank_id", value)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={listBank}
              className="w-full"
            />
          </div>
          <ErrorMessage
            show={formik.touched.bank_id && formik.errors.bank_id}
            message={formik.errors.bank_id}
          />
        </div>

        {/* input nomor rekening */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="bank_acc_num"
            // className={`${formik.touched.bank_acc_num && formik.errors.bank_acc_num ? 'text-media-danger-3': 'text-media-primary-gray'}`}
          >
            Nomor Rekening
          </label>
          <Input
            name="bank_acc_num"
            id="bank_acc_num"
            type="text"
            placeholder="Masukkan nomor rekening"
            className={`${
              formik.touched.bank_acc_num && formik.errors.bank_acc_num
                ? "border-media-danger-3"
                : "border-media-primary-gray"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bank_acc_num}
          />
          <ErrorMessage
            show={formik.touched.bank_acc_num && formik.errors.bank_acc_num}
            message={formik.errors.bank_acc_num}
          />
        </div>

        {/* input nama pemilik rekening */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="bank_acc_name"
            // className={`${formik.touched.bank_acc_name && formik.errors.bank_acc_name ? 'text-media-danger-3': 'text-media-primary-gray'}`}
          >
            Nama Pemilik Rekening
          </label>
          <Input
            name="bank_acc_name"
            id="bank_acc_name"
            type="text"
            placeholder="Masukkan nama pemilik rekening"
            className={`${
              formik.touched.bank_acc_name && formik.errors.bank_acc_name
                ? "border-media-danger-3"
                : "border-media-primary-gray"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bank_acc_name}
          />
          <ErrorMessage
            show={formik.touched.bank_acc_name && formik.errors.bank_acc_name}
            message={formik.errors.bank_acc_name}
          />
        </div>
      </div>
      <button
        className="bg-media-primary-blue w-full text-white py-2.5 rounded-btn text-sm font-semibold"
        type="submit"
        disabled={!(formik.isValid && formik.dirty)}
      >
        Selanjutnya
      </button>
    </form>
  );
};

export default PrivacyInfo;
