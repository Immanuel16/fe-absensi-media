import { DatePicker, Input, Select, TimePicker } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import apiHelper from "../../../helper/api";
import {
  CameraSlrIcon,
  CheckIcon,
  DoubleCircleIcon,
  MediaPlayIcon,
  MediaSkipIcon,
  MusicIcon,
  PersonIcon,
  PowerStandbyIcon,
} from "../../../assets/icons/recruitment/";
import {
  ShootingSchema,
  initialValuesShooting,
} from "../../../schemas/ShootingSchemas";
import {
  convertDate,
  dateFormat,
  showAlertError,
  showAlertSuccess,
} from "../../../util/util";
import dayjs from "dayjs";
import "./FormShooting.scss";

const FormShooting = () => {
  const navigate = useNavigate();
  const [listDivision, setDivisions] = useState([]);
  const today = dayjs().add(1, "days").format(dateFormat.value);
  // const maxDate =
  const formik = useFormik({
    initialValues: initialValuesShooting,
    validationSchema: ShootingSchema,

    onSubmit: (values, helper) => {
      saveData(values, helper);
    },
  });

  const getListDivision = async () => {
    apiHelper
      .get("/public/ministries-division")
      .then(({ data }) => {
        const list = data.map((d) => ({
          label: d.division_name,
          value: d.division_code,
        }));
        setDivisions(list);
      })
      .catch((err) => setDivisions([]));
  };

  const disabledHours = () => {
    const hours = [];
    for (let i = 0; i < 9; i += 1) hours.push(i);
    return hours;
  };

  const onChangeField = (name, e) => {
    formik.setFieldValue(
      name,
      name === "request_date" ? convertDate(e, dateFormat.value) : e
    );
  };

  const onBlurField = (name) => {
    formik.setFieldTouched(name, true, true);
  };

  const saveData = (value, helper) => {
    value.request_date = `${value.request_date} ${value.request_time}`;
    delete value.request_time;
    apiHelper
      .post("/public/shooting-request/add", value)
      .then((res) => {
        showAlertSuccess("Permintaan anda berhasil disimpan");
        helper.resetForm(value);
        navigate("/form-shooting");
      })
      .catch(({ response }) => {
        showAlertError(response.data.message);
      });
  };

  useEffect(() => {
    getListDivision();
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

          <p>Form Request Shooting</p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="shadow-2xl bg-white px-4 flex flex-col h-form-recruitment"
          style={{ borderTopRightRadius: "55px", borderTopLeftRadius: "55px" }}
        >
          <div
            className="flex flex-col space-y-4 w-full overflow-y-auto overflow-x-hidden mt-14 mb-10"
            style={{ height: "calc(100vh - 320px)" }}
          >
            {/* input nama lengkap */}
            <div className="flex flex-col space-y-1 w-full animate_1.5s animate_fadeInUp">
              <label htmlFor="name" className="text-media-primary-black">
                Nama PIC
              </label>
              <Input
                name="name"
                id="name"
                className={`shadow-md ${
                  formik.touched.name && formik.errors.name
                    ? "border-media-danger-3"
                    : "border-media-secondary-gray"
                } p-4 font-poppins text-xs rounded-lg`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="Masukkan nama PIC"
              />
              <ErrorMessage
                show={formik.touched.name && formik.errors.name}
                message={formik.errors.name}
              />
            </div>

            {/* input division */}
            {formik.values.name && (
              <div className="flex flex-col space-y-1 animate_1.5s animate_fadeInUp">
                <label htmlFor="role" className="text-media-primary-black">
                  Bidang Pelayanan
                </label>
                <div
                  className={`border rounded-lg ${
                    formik.touched.division && formik.errors.division
                      ? "border-media-danger-3"
                      : ""
                  } w-full`}
                >
                  <Select
                    bordered={false}
                    showSearch
                    onBlur={() => onBlurField("division")}
                    placeholder="Bidang Pelayanan"
                    optionFilterProp="children"
                    onChange={(value) => onChangeField("division", value)}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={listDivision}
                    className="w-full shadow-md"
                  />
                </div>
                <ErrorMessage
                  show={formik.touched.division && formik.errors.division}
                  message={formik.errors.division}
                />
              </div>
            )}

            {/* input Tanggal Shooting */}
            {formik.values.division && (
              <div className="flex justify-between items-center space-x-3">
                {/* date */}
                <div className="flex flex-col space-y-1 animate_1.5s animate_fadeInUp w-full">
                  <label
                    htmlFor="request_date"
                    className="font-semibold text-media-primary-gray"
                  >
                    Tanggal Shooting
                  </label>
                  <DatePicker
                    id="request_date"
                    onChange={(date, dateString) =>
                      onChangeField("request_date", dateString)
                    }
                    disabledDate={(d) =>
                      !d ||
                      (today && d.isBefore(today + 1)) ||
                      d.isAfter(dayjs("2023-05-14"))
                    }
                    className={`datepicker-custom ${
                      formik.touched.request_date && formik.errors.request_date
                        ? "border-media-danger-3"
                        : ""
                    }`}
                    placeholder="Pilih tanggal shooting"
                    format={dateFormat.input}
                    name="request_date"
                    onBlur={(e) => onBlurField("request_date")}
                    inputReadOnly={true}
                    // value={id && dayjs(formik.values.request_date, dateFormat.value)}
                  />
                  <ErrorMessage
                    show={
                      formik.touched.request_date && formik.errors.request_date
                    }
                    message={formik.errors.request_date}
                  />
                </div>

                {/* time */}
                <div className="flex flex-col space-y-1 animate_1.5s animate_fadeInUp w-full">
                  <label
                    htmlFor="request_time"
                    className="font-semibold text-media-primary-gray"
                  >
                    Waktu Shooting
                  </label>
                  <TimePicker
                    name="request_time"
                    id="request_time"
                    onBlur={(e) => onBlurField("request_time")}
                    onChange={(time, timeString) =>
                      onChangeField("request_time", timeString)
                    }
                    minuteStep={30}
                    format="HH:mm"
                    placeholder="Pilih waktu shooting"
                    className={`datepicker-custom ${
                      formik.touched.request_time && formik.errors.request_time
                        ? "border-media-danger-3"
                        : ""
                    }`}
                    disabledTime={disabledHours}
                  />
                  <ErrorMessage
                    show={
                      formik.touched.request_date && formik.errors.request_date
                    }
                    message={formik.errors.request_date}
                  />
                </div>
              </div>
            )}

            {/* input keterangan shooting */}
            {formik.values.request_time && (
              <div className="flex flex-col space-y-1 w-full animate_1.5s animate_fadeInUp">
                <label
                  htmlFor="description"
                  className="text-media-primary-black"
                >
                  Keperluan Shooting
                </label>
                <Input
                  name="description"
                  id="description"
                  className={`shadow-md ${
                    formik.touched.description && formik.errors.description
                      ? "border-media-danger-3"
                      : "border-media-secondary-gray"
                  } p-4 font-poppins text-xs rounded-lg`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  placeholder="Masukkan keperluan shooting"
                />
                <ErrorMessage
                  show={formik.touched.description && formik.errors.description}
                  message={formik.errors.description}
                />
              </div>
            )}

            {/* input contact person */}
            {formik.values.description && (
              <div className="flex flex-col space-y-1 w-full animate_1.5s animate_fadeInUp">
                <label htmlFor="phone" className="text-media-primary-black">
                  Contact Person
                </label>
                <Input
                  name="phone"
                  id="phone"
                  className={`shadow-md ${
                    formik.touched.phone && formik.errors.phone
                      ? "border-media-danger-3"
                      : "border-media-secondary-gray"
                  } p-4 font-poppins text-xs rounded-lg`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  placeholder="Masukkan contact person"
                />
                <ErrorMessage
                  show={formik.touched.phone && formik.errors.phone}
                  message={formik.errors.phone}
                />
              </div>
            )}
          </div>

          {formik.values.phone && (
            <button
              className="w-full bg-media-primary-blue rounded-btn py-3 text-white text-sm font-medium animate_2s animate_fadeInUp"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Kirim
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default FormShooting;
