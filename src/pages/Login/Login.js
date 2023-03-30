import { Input } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import apiHelper from "../../helper/api";
import { initialValuesLogin, LoginSchema } from "../../schemas/LoginSchemas";
import { base64Encrypt } from "../../util/encryptor.util";
import { showAlertError, showAlertSuccess } from "../../util/util";
import { useModals } from "../../context/ModalsContext";
import { ImgSuccessModal } from "../../assets";
import { useSpinner } from "../../context/Spinner";

const { Password } = Input;

export default function Login() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(false);
  const { setShowSpinner } = useSpinner();
  const { setShowModal, setConfig } = useModals();

  const formik = useFormik({
    initialValues: initialValuesLogin,
    validationSchema: LoginSchema,

    onSubmit: (values) => {
      login(values);
    },
  });

  const showModalSuccess = () => {
    setShowModal(true);
    setConfig((prev) => ({
      ...prev,
      message: "Welcome to Multimedia...",
      image: ImgSuccessModal,
      title: "Success!!!",
    }));
    setTimeout(() => {
      setShowModal(false);
    }, 2500);
  };

  useEffect(() => {
    if (token) navigate("/");
  }, []);

  const login = async (body) => {
    setShowSpinner(true);
    setDisableButton((prev) => !prev);
    const { username, password } = body;
    const data = {
      username,
      password: base64Encrypt(password),
    };
    apiHelper
      .post("/auth/login", data)
      .then(({ data }) => {
        setShowSpinner(false);
        setDisableButton((prev) => !prev);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        navigate("/");
        showModalSuccess();
        // showAlertSuccess("Login berhasil");
      })
      .catch((err) => {
        setShowSpinner(false);
        setDisableButton((prev) => !prev);
        showAlertError(err.message);
      });
  };

  return (
    <>
      <div className="mb-7 h-28 bg-media-secondary-blue text-white flex flex-col justify-end items-start px-4 py-3 rounded-b-xl">
        <h1 className="text-lg">Sistem Administratif Media</h1>
      </div>
      <div className="px-6">
        <h1
          className="text-2xl font-semibold mb-7 text-media-secondary-blue"
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="1200"
        >
          Masuk ke akunmu
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-7 mb-24">
            {/* input username */}
            <div
              className="flex flex-col space-y-1"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
            >
              <label htmlFor="username">Username</label>
              <Input
                name="username"
                id="username"
                className={`${
                  formik.touched.username && formik.errors.username
                    ? "border-media-danger-3"
                    : "border-media-secondary-gray"
                } p-4 font-poppins text-xs rounded-lg`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder="Masukkan username Anda"
              />
              <ErrorMessage
                show={formik.touched.username && formik.errors.username}
                message={formik.errors.username}
              />
            </div>

            {/* input password */}
            <div
              className="flex flex-col space-y-1"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="2000"
            >
              <label htmlFor="password">Password</label>
              <Password
                name="password"
                id="password"
                className={`${
                  formik.touched.password && formik.errors.password
                    ? "border-media-danger-3"
                    : "border-media-secondary-gray"
                } p-4 font-poppins text-xs rounded-lg`}
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
          <button
            className="w-full bg-media-primary-blue rounded-btn py-3 text-white text-sm font-medium"
            type="submit"
            disabled={!(formik.isValid && formik.dirty) || disableButton}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="2500"
          >
            Masuk
          </button>
        </form>
      </div>
    </>
  );
}
