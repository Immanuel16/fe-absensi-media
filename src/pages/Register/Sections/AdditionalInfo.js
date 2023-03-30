import { Checkbox, Input } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ImgSuccessModal2 } from "../../../assets";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { useModals } from "../../../context/ModalsContext";
import { useRegisterContext } from "../../../context/RegisterContext";
import { useSpinner } from "../../../context/Spinner";
import apiHelper from "../../../helper/api";
import {
  AdditionalInfoSchemas,
  initialValuesRegister,
} from "../../../schemas/RegisterSchemas";
import { base64Encrypt } from "../../../util/encryptor.util";
import { showAlertError } from "../../../util/util";

const { Password } = Input;

const AdditionalInfo = () => {
  const navigate = useNavigate();
  const [emailHint, setEmailHint] = useState(true);
  const { setActiveStepIndex, registerData } = useRegisterContext();
  const [disableButton, setDisableButton] = useState(false);
  const { setShowModal, setConfig } = useModals();
  const { setShowSpinner } = useSpinner();

  const formik = useFormik({
    initialValues: initialValuesRegister.additionalInfo,
    validationSchema: AdditionalInfoSchemas,
    onSubmit: (values) => {
      registerCrew(values);
    },
  });

  const showModalSuccess = () => {
    setShowModal(true);
    setConfig((prev) => ({
      ...prev,
      message: "Welcome to Multimedia...",
      image: ImgSuccessModal2,
      title: "Registration Success!",
    }));
    setTimeout(() => {
      setShowModal(false);
    }, 2500);
  };

  const onChangeField = (name, e) => {
    formik.setFieldValue(name, e);
    if (name === "email") setEmailHint(false);
  };

  const onBlurField = (name) => {
    formik.setFieldTouched(name, true, true);
    if (name === "email") setEmailHint(false);
  };

  const registerCrew = async (values) => {
    setShowSpinner(true);
    setDisableButton((prev) => !prev);
    const data = { ...registerData, ...values };
    data.password = base64Encrypt(data.password);
    data.kom = data.kom ? 1 : 0;
    data.baptis = data.baptis ? 1 : 0;
    data.hmc = data.hmc ? 1 : 0;
    data.orientasi = data.orientasi ? 1 : 0;
    try {
      await apiHelper.post("/public/register", data, { timeout: 10000 });
      setShowSpinner(false);
      setActiveStepIndex(0);
      showModalSuccess();
      setTimeout(() => {
        navigate("/login");
      }, 2500);
      // showAlertSuccess("Registrasi berhasil");
    } catch (error) {
      setShowSpinner(false);
      setDisableButton((prev) => !prev);
      showAlertError(error.message);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-8 h-form overflow-y-auto overflow-x-hidden">
        <div className="space-y-4">
          {/* input email */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <Input
              name="email"
              id="email"
              type="text"
              placeholder="Masukkan email Anda"
              className={`${
                formik.touched.email && formik.errors.email
                  ? "border-media-danger-3"
                  : "border-media-primary-gray"
              }`}
              onChange={(e) => onChangeField("email", e.target.value)}
              onBlur={() => onBlurField("email")}
              value={formik.values.email}
            />
            <ErrorMessage
              show={formik.touched.email && formik.errors.email}
              message={formik.errors.email}
            />
            {emailHint && (
              <p className="text-xxs text-media-secondary-gray">
                Harap masukkan email yang valid
              </p>
            )}
          </div>

          {/* input password */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <Password
              name="password"
              id="password"
              className={`${
                formik.touched.password && formik.errors.password
                  ? "border-media-danger-3"
                  : "border-media-secondary-gray"
              } font-poppins text-xs rounded-lg`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Masukkan password Anda"
            />
            <ErrorMessage
              show={formik.touched.password && formik.errors.password}
              message={formik.errors.password}
            />
          </div>
        </div>

        {/* checkbox */}
        <div className="flex flex-col space-y-3">
          <p className="font-semibold text-media-black-3">
            Apakah Anda sudah mengikuti kegiatan ini ?
          </p>
          <div className="flex flex-col space-y-2 px-2">
            {/* checkbox baptis dan kom */}
            <div className="grid grid-cols-2">
              {/* option baptis */}
              <div className="flex space-x-2 items-center">
                <Checkbox
                  name="baptis"
                  id="baptis"
                  onChange={formik.handleChange}
                  checked={formik.values.baptis}
                />
                <label
                  htmlFor="baptis"
                  className="text-media-black-4 font-medium"
                >
                  Baptis
                </label>
              </div>

              {/* option kom */}
              <div className="flex space-x-2 items-center">
                <Checkbox
                  name="kom"
                  id="kom"
                  onChange={formik.handleChange}
                  checked={formik.values.kom}
                />
                <label htmlFor="kom" className="text-media-black-4 font-medium">
                  KOM
                </label>
              </div>
            </div>

            {/* checkbox hmc dan orientasi */}
            <div className="grid grid-cols-2">
              {/* option hmc */}
              <div className="flex space-x-2 items-center">
                <Checkbox
                  name="hmc"
                  id="hmc"
                  onChange={formik.handleChange}
                  checked={formik.values.hmc}
                />
                <label htmlFor="hmc" className="text-media-black-4 font-medium">
                  HMC
                </label>
              </div>

              {/* option orientasi */}
              <div className="flex space-x-2 items-center">
                <Checkbox
                  name="orientasi"
                  id="orientasi"
                  onChange={formik.handleChange}
                  checked={formik.values.orientasi}
                />
                <label
                  htmlFor="orientasi"
                  className="text-media-black-4 font-medium"
                >
                  Orientasi
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-media-primary-blue w-full text-white py-2.5 rounded-btn text-sm font-semibold"
        type="submit"
        disabled={!(formik.isValid && formik.dirty) || disableButton}
      >
        Simpan
      </button>
    </form>
  );
};

export default AdditionalInfo;
