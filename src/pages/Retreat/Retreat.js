import { Input, Select, Radio } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import apiHelper from "../../helper/api";
import {
  CameraSlrIcon,
  CheckIcon,
  DoubleCircleIcon,
  MediaPlayIcon,
  MediaSkipIcon,
  MusicIcon,
  PersonIcon,
  PowerStandbyIcon,
} from "../../assets/icons/recruitment/";
import {
  RetreatSchemas,
  initialValuesRetreat,
} from "../../schemas/RetreatSchemas";
import { showAlertError, showAlertSuccess } from "../../util/util";
import { ImgSuccessModal } from "../../assets";
import { useModals } from "../../context/ModalsContext";

const { TextArea } = Input;

const FormRetreat = () => {
  const navigate = useNavigate();
  const [crews, setCrews] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const { setShowModal, setConfig } = useModals();

  const formik = useFormik({
    initialValues: initialValuesRetreat,
    validationSchema: RetreatSchemas,

    onSubmit: (values, helper) => {
      saveData(values, helper);
    },
  });

  const onChangeField = (name, e) => {
    formik.setFieldValue(name, name === "join" ? e.target.value : e);
  };

  const onBlurField = (name) => {
    formik.setFieldTouched(name, true, true);
  };

  const getListCrew = async () => {
    apiHelper
      .get("/public/crew/list")
      .then(({ data }) => {
        const list = data.map((d) => ({
          label: d.username,
          value: d.username,
        }));
        setCrews(list);
      })
      .catch((err) => {
        showAlertError(err.message);
      });
  };

  const saveData = (value, helper) => {
    apiHelper
      .post("/public/retreat/add", value)
      .then((res) => {
        showModalSuccess();
        helper.resetForm(value);
        navigate("/form-retreat");
      })
      .catch(({ response }) => {
        showAlertError(response.data.message);
      });
  };

  const showModalSuccess = () => {
    setShowModal(true);
    setConfig((prev) => ({
      ...prev,
      message: "Terima kasih",
      image: ImgSuccessModal,
      title: "Success!!!",
    }));
    setTimeout(() => {
      setShowModal(false);
    }, 2500);
  };

  useEffect(() => {
    getListCrew();
  }, []);

  return (
    <>
      <div className="h-screen bg-media-primary-blue">
        <div
          className="flex items-center justify-center relative text-2xl text-white font-bold"
          style={{ height: "130px" }}
        >
          <img alt="" src={PersonIcon} className="absolute top-3 left-3.5" />
          <img alt="" src={MusicIcon} className="absolute top-3 left-1/3" />
          <img
            alt=""
            src={MediaSkipIcon}
            className="absolute top-5 right-1/3"
          />
          <img
            alt=""
            src={MediaPlayIcon}
            className="absolute top-4 right-5"
            style={{ right: "21.23px" }}
          />

          <img
            alt=""
            src={DoubleCircleIcon}
            className="absolute bottom-3 left-8"
          />
          <img
            alt=""
            src={PowerStandbyIcon}
            className="absolute bottom-7"
            style={{ left: "43%" }}
          />

          <img
            alt=""
            src={CameraSlrIcon}
            className="absolute bottom-3.5"
            style={{ right: "98.61px" }}
          />

          <img
            alt=""
            src={CheckIcon}
            className="absolute bottom-6"
            style={{ right: "14.23px" }}
          />

          <p>Form Retreat</p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="shadow-2xl bg-white px-4 flex flex-col h-form-recruitment"
          style={{ borderTopRightRadius: "55px", borderTopLeftRadius: "55px" }}
        >
          <div
            className="flex flex-col space-y-7 w-full overflow-y-auto overflow-x-hidden mt-14 mb-10"
            style={{ height: "calc(100vh - 320px)" }}
          >
            {/* input nama lengkap */}
            <div className="flex flex-col space-y-2 w-full animate_1.5s animate_fadeInUp">
              <label htmlFor="name" className="text-media-primary-black">
                Nama
              </label>
              <div
                className={`border rounded-lg ${
                  formik.touched.kom1 && formik.errors.kom1
                    ? "border-media-danger-3"
                    : ""
                } w-full`}
              >
                <Select
                  bordered={false}
                  showSearch
                  onBlur={() => onBlurField("name")}
                  placeholder="Pilih nama anda"
                  optionFilterProp="children"
                  onChange={(value) => onChangeField("name", value)}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={crews}
                  className="w-full"
                />
              </div>
              <ErrorMessage
                show={formik.touched.name && formik.errors.name}
                message={formik.errors.name}
              />
            </div>

            {/* input availability */}
            {formik.values.name && (
              <div className="flex flex-col space-y-2 w-full animate_1.5s animate_fadeInUp">
                <label htmlFor="name" className="text-media-primary-black">
                  Apakah bisa ikut retreat?
                </label>
                <Radio.Group
                  name="join"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="join"
                  defaultValue={formik.values.join}
                >
                  <Radio value={true}>Ya, bisa</Radio>
                  <Radio value={false}>Tidak</Radio>
                </Radio.Group>
              </div>
            )}

            {/* input alasan */}
            {!formik.values.join && (
              <div className="flex flex-col space-y-2 w-full animate_1.5s animate_fadeInUp">
                <label htmlFor="reason" className="text-media-primary-black">
                  Alasan
                </label>
                <TextArea
                  name="reason"
                  id="reason"
                  className={`shadow-md ${
                    formik.touched.reason && formik.errors.reason
                      ? "border-media-danger-3"
                      : "border-media-secondary-gray"
                  } p-4 font-poppins text-xs rounded-lg`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.reason}
                  placeholder="Masukkan alasan tidak ikut"
                />
                <ErrorMessage
                  show={formik.touched.reason && formik.errors.reason}
                  message={formik.errors.reason}
                />
              </div>
            )}
          </div>

          {((formik.values.join && formik.values.name) ||
            (!formik.values.join && formik.values.reason)) && (
            <button
              className="bg-media-primary-blue w-full text-white py-2.5 rounded-btn text-sm font-semibold animate_1.5s animate_fadeInUp"
              type="submit"
              disabled={
                !(formik.isValid && formik.dirty) ||
                disabled ||
                (!formik.values.reason && !formik.values.join)
              }
            >
              Simpan
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default FormRetreat;
