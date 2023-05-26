import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { useHeader } from "../../../context/Header";
import { useSpinner } from "../../../context/Spinner";
import apiHelper from "../../../helper/api";
import {
  AbsenceSchemas,
  initialValuesAbsence,
} from "../../../schemas/AbsenceSchemas";
import {
  convertDate,
  dateFormat,
  showAlertError,
  showAlertSuccess,
} from "../../../util/util";
import "./AddAbsence.scss";

const AddAbsence = () => {
  const { setTitleHeader } = useHeader();
  const { setShowSpinner } = useSpinner();
  const navigate = useNavigate();
  const [absence, setAbsence] = useState(initialValuesAbsence);

  const { id } = useParams();
  const today = dayjs().add(1, "days").format(dateFormat.value);

  const [scheduleList, setScheduleList] = useState([]);
  const [userList, setUserList] = useState([]);

  const formik = useFormik({
    initialValues: initialValuesAbsence,
    validationSchema: AbsenceSchemas,

    onSubmit: (values) => {
      saveData(values);
    },
  });

  const getDetailAbsence = async () => {
    apiHelper
      .get(`/apps/absensi/${id}/detail`)
      .then(({ data }) => {
        formik.setValues(data);
        formik.values.photo = formik.values.photo ? formik.values.photo : null;
        setAbsence(initialValuesAbsence(data));
      })
      .catch((err) => {});
  };
  const getListScheduleMinistry = async () => {
    apiHelper
      .get("/public/ministries-schedule")
      .then(({ data }) => {
        const list = data.map((d) => ({
          label: d.ir_name,
          value: d.ir_code,
        }));
        setScheduleList(list);
      })
      .catch((err) => {
        showAlertError(err.message);
      });
  };

  const getListUser = async () => {
    apiHelper
      .get("/apps/users/absence")
      .then(({ data }) => {
        const list = data.map((d) => ({
          label: d.username,
          value: d.username,
        }));
        setUserList(list);
      })
      .catch((err) => {
        showAlertError(err.message);
      });
  };

  const addAbsence = async (value) => {
    delete value.id;
    setShowSpinner(true);
    try {
      await apiHelper.post("/apps/absensi/create", value);
      setTimeout(() => {
        setShowSpinner(false);
      }, 1000);
      showAlertSuccess("Absen berhasil disimpan");
      navigate("/absen");
    } catch (error) {
      showAlertError(error.message);
      setShowSpinner(false);
    }
  };

  const editAbsence = async (value) => {
    delete value.id;
    delete value.created_by;
    delete value.updated_by;
    delete value.createdAt;
    delete value.updatedAt;
    setShowSpinner(true);
    apiHelper
      .put(`/apps/absensi/${id}/edit`, value)
      .then(() => {
        setTimeout(() => {
          setShowSpinner(false);
        }, 1000);
        showAlertSuccess("Absen berhasil diubah");
        navigate("/absen");
      })
      .catch(({ response }) => {
        showAlertError(response.data.message);
        setShowSpinner(false);
      });
  };

  const saveData = async (value) => {
    id ? editAbsence(value) : addAbsence(value);
  };

  const onChangeField = (name, e) => {
    formik.setFieldValue(
      name,
      name === "tanggal" ? convertDate(e, dateFormat.value) : e
    );
    console.log(name, e);
  };

  const onBlurField = (name) => {
    formik.setFieldTouched(name, true, true);
  };

  useEffect(() => {
    setTitleHeader(`${id ? "Edit" : "Tambah"} Absen`);
    id && getDetailAbsence();
    getListScheduleMinistry();
    getListUser();
  }, []);
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 px-6">
      <div className="flex flex-col space-y-6 overflow-y-auto h-form-absence bg-white shadow-card py-6 px-3 rounded-card rounded-t-none">
        {/* input tanggal pelayanan */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="tanggal"
            className="font-semibold text-media-primary-gray"
          >
            Tanggal Pelayanan
          </label>
          <DatePicker
            id="tanggal"
            onChange={(date, dateString) =>
              onChangeField("tanggal", dateString)
            }
            disabledDate={(d) => !d || (today && d.isAfter(today + 1))}
            className={`datepicker-custom ${
              formik.touched.tanggal && formik.errors.tanggal
                ? "border-media-danger-3"
                : ""
            }`}
            placeholder="Pilih tanggal pelayanan"
            format={dateFormat.input}
            name="tanggal"
            onBlur={(e) => onBlurField("tanggal")}
            inputReadOnly={true}
            // value={id && dayjs(formik.values.tanggal, dateFormat.value)}
            value={id && dayjs(formik.values.tanggal, dateFormat.value)}
          />
          <ErrorMessage
            show={formik.touched.tanggal && formik.errors.tanggal}
            message={formik.errors.tanggal}
          />
        </div>

        {/* input ibadah raya */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="ir"
            // className={`${formik.touched.ir && formik.errors.ir ? 'text-media-danger-3': 'text-media-primary-gray'}`}
          >
            Ibadah Raya
          </label>
          <div
            className={`border rounded-lg ${
              formik.touched.ir && formik.errors.ir
                ? "border-media-danger-3"
                : ""
            } w-full`}
          >
            <Select
              bordered={false}
              showSearch
              onBlur={() => onBlurField("ir")}
              placeholder="Pilih ibadah raya"
              optionFilterProp="children"
              onChange={(value) => onChangeField("ir", value)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={scheduleList}
              className="w-full"
              value={id && formik.values.ir}
            />
          </div>
          <ErrorMessage
            show={formik.touched.ir && formik.errors.ir}
            message={formik.errors.ir}
          />
        </div>

        {/* input operator komputer 1 */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="kom1"
            // className={`${formik.touched.kom1 && formik.errors.kom1 ? 'text-media-danger-3': 'text-media-primary-gray'}`}
          >
            Operator Komputer 1
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
              onBlur={() => onBlurField("kom1")}
              placeholder="Pilih operator komputer 1"
              optionFilterProp="children"
              onChange={(value) => onChangeField("kom1", value)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={userList}
              className="w-full"
              value={id && formik.values.kom1}
            />
          </div>
          <ErrorMessage
            show={formik.touched.kom1 && formik.errors.kom1}
            message={formik.errors.kom1}
          />
        </div>

        {/* input operator komputer 2 */}
        {!formik.values.ir.includes("BTC") && (
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="kom2"
              // className={`${formik.touched.kom2 && formik.errors.kom2 ? 'text-media-danger-3': 'text-media-primary-gray'}`}
            >
              Operator Komputer 2
            </label>
            <div
              className={`border rounded-lg ${
                formik.touched.kom2 && formik.errors.kom2
                  ? "border-media-danger-3"
                  : ""
              } w-full`}
            >
              <Select
                bordered={false}
                showSearch
                onBlur={() => onBlurField("kom2")}
                placeholder="Pilih operator komputer 2"
                optionFilterProp="children"
                onChange={(value) => onChangeField("kom2", value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={userList}
                className="w-full"
                value={id && formik.values.kom2}
              />
            </div>
            <ErrorMessage
              show={formik.touched.kom2 && formik.errors.kom2}
              message={formik.errors.kom2}
            />
          </div>
        )}

        {/* input lighting */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="lighting">Lighting</label>
          <div
            className={`border rounded-lg ${
              formik.touched.lighting && formik.errors.lighting
                ? "border-media-danger-3"
                : ""
            } w-full`}
          >
            <Select
              bordered={false}
              showSearch
              onBlur={() => onBlurField("lighting")}
              placeholder="Pilih operator lighting"
              optionFilterProp="children"
              onChange={(value) => onChangeField("lighting", value)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={userList}
              className="w-full"
              value={id && formik.values.lighting}
            />
          </div>
          <ErrorMessage
            show={formik.touched.lighting && formik.errors.lighting}
            message={formik.errors.lighting}
          />
        </div>

        {/* input cameraman 1 */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="cam1">Cameraman 1</label>
          <div
            className={`border rounded-lg ${
              formik.touched.cam1 && formik.errors.cam1
                ? "border-media-danger-3"
                : ""
            } w-full`}
          >
            <Select
              bordered={false}
              showSearch
              onBlur={() => onBlurField("cam1")}
              placeholder="Pilih cameraman 1"
              optionFilterProp="children"
              onChange={(value) => onChangeField("cam1", value)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={userList}
              className="w-full"
              value={id && formik.values.cam1}
            />
          </div>
          <ErrorMessage
            show={formik.touched.cam1 && formik.errors.cam1}
            message={formik.errors.cam1}
          />
        </div>

        {/* input cameraman 2 */}
        {!formik.values.ir.includes("BTC") && (
          <div className="flex flex-col space-y-1">
            <label htmlFor="cam2">Cameraman 2</label>
            <div
              className={`border rounded-lg ${
                formik.touched.cam2 && formik.errors.cam2
                  ? "border-media-danger-3"
                  : ""
              } w-full`}
            >
              <Select
                bordered={false}
                showSearch
                onBlur={() => onBlurField("cam2")}
                placeholder="Pilih cameraman 2"
                optionFilterProp="children"
                onChange={(value) => onChangeField("cam2", value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={userList}
                className="w-full"
                value={id && formik.values.cam2}
              />
            </div>
            <ErrorMessage
              show={formik.touched.cam2 && formik.errors.cam2}
              message={formik.errors.cam2}
            />
          </div>
        )}

        {/* input cameraman 3 */}
        {!formik.values.ir.includes("BTC") && (
          <div className="flex flex-col space-y-1">
            <label htmlFor="cam3">Cameraman 3</label>
            <div
              className={`border rounded-lg ${
                formik.touched.cam3 && formik.errors.cam3
                  ? "border-media-danger-3"
                  : ""
              } w-full`}
            >
              <Select
                bordered={false}
                showSearch
                onBlur={() => onBlurField("cam3")}
                placeholder="Pilih cameraman 3"
                optionFilterProp="children"
                onChange={(value) => onChangeField("cam3", value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={userList}
                className="w-full"
                value={id && formik.values.cam3}
              />
            </div>
            <ErrorMessage
              show={formik.touched.cam3 && formik.errors.cam3}
              message={formik.errors.cam3}
            />
          </div>
        )}

        {/* input switcher */}
        {!formik.values.ir.includes("BTC") && (
          <div className="flex flex-col space-y-1">
            <label htmlFor="switcher">Switcher</label>
            <div
              className={`border rounded-lg ${
                formik.touched.switcher && formik.errors.switcher
                  ? "border-media-danger-3"
                  : ""
              } w-full`}
            >
              <Select
                bordered={false}
                showSearch
                onBlur={() => onBlurField("switcher")}
                placeholder="Pilih switcher"
                optionFilterProp="children"
                onChange={(value) => onChangeField("switcher", value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={userList}
                className="w-full"
                value={id && formik.values.switcher}
              />
            </div>
            <ErrorMessage
              show={formik.touched.switcher && formik.errors.switcher}
              message={formik.errors.switcher}
            />
          </div>
        )}

        {/* input photografer */}
        {!formik.values.ir.includes("BTC") && (
          <div className="flex flex-col space-y-1">
            <label htmlFor="photo">Photographer</label>
            <div
              className={`border rounded-lg ${
                formik.touched.photo && formik.errors.photo
                  ? "border-media-danger-3"
                  : ""
              } w-full`}
            >
              <Select
                bordered={false}
                showSearch
                onBlur={() => onBlurField("photo")}
                placeholder="Pilih photographer"
                optionFilterProp="children"
                onChange={(value) => onChangeField("photo", value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={userList}
                className="w-full"
                value={id && formik.values.photo}
              />
            </div>
            <ErrorMessage
              show={formik.touched.photo && formik.errors.photo}
              message={formik.errors.photo}
            />
          </div>
        )}

        {/* input soundman 1 */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="sound1">Soundman 1</label>
          <div
            className={`border rounded-lg ${
              formik.touched.sound1 && formik.errors.sound1
                ? "border-media-danger-3"
                : ""
            } w-full`}
          >
            <Select
              bordered={false}
              showSearch
              onBlur={() => onBlurField("sound1")}
              placeholder="Pilih soundman 1"
              optionFilterProp="children"
              onChange={(value) => onChangeField("sound1", value)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={userList}
              className="w-full"
              value={id && formik.values.sound1}
            />
          </div>
          <ErrorMessage
            show={formik.touched.sound1 && formik.errors.sound1}
            message={formik.errors.sound1}
          />
        </div>

        {/* input soundman 2 */}
        {!formik.values.ir.includes("BTC") && (
          <div className="flex flex-col space-y-1">
            <label htmlFor="sound2">Soundman 2</label>
            <div
              className={`border rounded-lg ${
                formik.touched.sound2 && formik.errors.sound2
                  ? "border-media-danger-3"
                  : ""
              } w-full`}
            >
              <Select
                bordered={false}
                showSearch
                onBlur={() => onBlurField("sound2")}
                placeholder="Pilih soundman 2"
                optionFilterProp="children"
                onChange={(value) => onChangeField("sound2", value)}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={userList}
                className="w-full"
                value={id && formik.values.sound2}
              />
            </div>
            <ErrorMessage
              show={formik.touched.sound2 && formik.errors.sound2}
              message={formik.errors.sound2}
            />
          </div>
        )}
      </div>
      <button
        className="bg-media-primary-blue w-full text-white py-2.5 rounded-btn text-sm font-semibold"
        type="submit"
        disabled={!(formik.isValid && formik.dirty)}
      >
        Simpan
      </button>
    </form>
  );
};

export default AddAbsence;
