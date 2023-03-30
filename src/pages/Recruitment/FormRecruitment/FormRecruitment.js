import { Input, Select } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import apiHelper from "../../../helper/api";
import {
  initialValuesRecruitment,
  RecruitmentSchema,
} from "../../../schemas/RecruitmentSchemas";
import {
  listRoleMinistry,
  showAlertError,
  showAlertSuccess,
} from "../../../util/util";
import "./FormRecruitment.scss";
import RecruitmentIcon from "../../../assets/icons/recruitment/";

const FormRecruitment = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValuesRecruitment,
    validationSchema: RecruitmentSchema,

    onSubmit: (values, helper) => {
      saveData(values, helper);
    },
  });

  const onChangeField = (name, e) => {
    formik.setFieldValue(name, e);
  };

  const onBlurField = (name) => {
    formik.setFieldTouched(name, true, true);
  };

  const saveData = (value, helper) => {
    apiHelper
      .post("/public/recruitment/add", value)
      .then((res) => {
        showAlertSuccess("Data anda berhasil disimpan");
        helper.resetForm(value);
        navigate("/form-recruitment");
      })
      .catch((err) => {
        showAlertError(err.message);
      });
  };
  return (
    <>
      <div
        className="h-screen bg-media-primary-blue relative"
        style={{ paddingTop: "159px" }}
      >
        <form
          className="shadow-2xl bg-white px-4 flex flex-col h-form-recruitment"
          style={{ borderTopRightRadius: "55px", borderTopLeftRadius: "55px" }}
          onSubmit={formik.handleSubmit}
        >
          <div
            className="flex flex-col space-y-4 w-full overflow-y-auto overflow-x-hidden mt-14 mb-4"
            style={{ height: "calc(100vh - 320px)" }}
          >
            {/* input nama lengkap */}
            <div
              className="flex flex-col space-y-1 w-full"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
            >
              <label htmlFor="name" className="text-media-primary-black">
                Nama Lengkap
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
                placeholder="Nama Lengkap"
              />
              <ErrorMessage
                show={formik.touched.name && formik.errors.name}
                message={formik.errors.name}
              />
            </div>

            {/* input nomor whatsapp */}
            <div
              className="flex flex-col space-y-1 w-full"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
            >
              <label htmlFor="phone" className="text-media-primary-black">
                Nomor Whatsapp
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
                placeholder="Nomor Whatsapp"
              />
              <ErrorMessage
                show={formik.touched.phone && formik.errors.phone}
                message={formik.errors.phone}
              />
            </div>

            {/* input pekerjaan */}
            <div
              className="flex flex-col space-y-1 w-full"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
            >
              <label htmlFor="job" className="text-media-primary-black">
                Pekerjaan
              </label>
              <Input
                name="job"
                id="job"
                className={`shadow-md ${
                  formik.touched.job && formik.errors.job
                    ? "border-media-danger-3"
                    : "border-media-secondary-gray"
                } p-4 font-poppins text-xs rounded-lg`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.job}
                placeholder="Pekerjaan"
              />
              <ErrorMessage
                show={formik.touched.job && formik.errors.job}
                message={formik.errors.job}
              />
            </div>

            {/* input usia */}
            <div
              className="flex flex-col space-y-1 w-full"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
            >
              <label htmlFor="age" className="text-media-primary-black">
                Usia
              </label>
              <Input
                name="age"
                id="age"
                className={`shadow-md ${
                  formik.touched.age && formik.errors.age
                    ? "border-media-danger-3"
                    : "border-media-secondary-gray"
                } p-4 font-poppins text-xs rounded-lg`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
                placeholder="Usia"
              />
              <ErrorMessage
                show={formik.touched.age && formik.errors.age}
                message={formik.errors.age}
              />
            </div>

            {/* input minat pelayanan */}
            <div
              className="flex flex-col space-y-1"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
            >
              <label htmlFor="role" className="text-media-primary-black">
                Minat Pelayanan
              </label>
              <div
                className={`border rounded-lg ${
                  formik.touched.role && formik.errors.role
                    ? "border-media-danger-3"
                    : ""
                } w-full`}
              >
                <Select
                  bordered={false}
                  showSearch
                  onBlur={() => onBlurField("role")}
                  placeholder="Minat Pelayanan"
                  optionFilterProp="children"
                  onChange={(value) => onChangeField("role", value)}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={listRoleMinistry}
                  className="w-full shadow-md"
                />
              </div>
              <ErrorMessage
                show={formik.touched.role && formik.errors.role}
                message={formik.errors.role}
              />
            </div>
          </div>

          <button
            className="w-full bg-media-primary-blue rounded-btn py-3 text-white text-sm font-medium"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
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
};

export default FormRecruitment;
