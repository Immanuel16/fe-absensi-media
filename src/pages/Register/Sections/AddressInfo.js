import { Input, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { useRegisterContext } from "../../../context/RegisterContext";
import apiHelper from "../../../helper/api";
import {
  AddressInfoSchemas,
  initialValuesRegister,
} from "../../../schemas/RegisterSchemas";

const AddressInfo = () => {
  const { setActiveStepIndex, setRegisterData, registerData } =
    useRegisterContext();

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubdistricts] = useState([]);

  const formik = useFormik({
    initialValues: initialValuesRegister.addressInfo,
    validationSchema: AddressInfoSchemas,

    onSubmit: (values) => {
      nextStep(values);
    },
  });

  useEffect(() => {
    getListProvince();
  }, []);

  /* -------------- PROVINCE --------------*/
  /* get data province */
  const getListProvince = async () => {
    try {
      const { data } = await apiHelper.get("/public/area/provinces");
      const list = data.map((d) => ({
        value: d.id,
        label: d.name,
      }));
      setProvinces(list);
    } catch (error) {}
  };

  /* on change provinces */
  const onSelectProvince = (name, e) => {
    onChangeField("city", "");
    onChangeField(name, e);
    getListCity(e, name);
  };
  /* -------------- END OF PROVINCE --------------*/

  /* -------------- CITY --------------*/
  /* get data city */
  const getListCity = async (provinceId) => {
    try {
      const { data } = await apiHelper.get(`/public/area/${provinceId}/city`);
      const list = data.map((d) => ({
        value: d.id,
        label: d.name,
      }));
      setCities(list);
    } catch (error) {}
  };

  /* on change city */
  const onSelectCity = (name, e) => {
    getListDistrict(e, name);
    onChangeField(name, e);
    onChangeField("district", "");
  };
  /* -------------- END OF CITY --------------*/

  /* -------------- DISTRICT --------------*/
  /* get data district */
  const getListDistrict = async (cityId) => {
    try {
      const { data } = await apiHelper.get(`/public/area/${cityId}/districts`);
      const list = data.map((d) => ({
        value: d.id,
        label: d.name,
      }));
      setDistricts(list);
    } catch (error) {}
  };

  /* on change district */
  const onSelectDistrict = (name, e) => {
    getListSubdistrict(e);
    onChangeField(name, e);
    onChangeField("subdistrict", "");
  };
  /* -------------- END OF DISTRICT --------------*/

  /* -------------- SUBDISTRICT --------------*/
  /* get data subdistrict */
  const getListSubdistrict = async (districtId) => {
    try {
      const { data } = await apiHelper.get(
        `/public/area/${districtId}/subdistricts`
      );
      const list = data.map((d) => ({
        value: d.id,
        label: d.name,
      }));
      setSubdistricts(list);
    } catch (error) {}
  };
  const onSelectSubdistrict = (name, e) => {
    onChangeField(name, e);
  };
  /* -------------- END OF SUBDISTRICT --------------*/

  const onChangeField = (name, e) => {
    formik.setFieldValue(name, e);
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
      <div className="flex flex-col space-y-3 h-form overflow-y-auto overflow-x-hidden">
        {/* input provinsi */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="province">Provinsi</label>
          <div
            className={`border rounded-lg ${
              formik.touched.province && formik.errors.province
                ? "border-media-danger-3"
                : "border-media-primary-gray"
            } w-full`}
          >
            <Select
              bordered={false}
              showSearch
              onBlur={() => onBlurField("province")}
              placeholder="Pilih provinsi domisili anda"
              optionFilterProp="children"
              onChange={(value) => onSelectProvince("province", value)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              className="w-full capitalize"
              options={provinces}
            />
          </div>
          <ErrorMessage
            show={formik.touched.province && formik.errors.province}
            message={formik.errors.province}
          />
        </div>

        {/* input kota */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="city">Kota/Kabupaten</label>
          <div
            className={`border rounded-lg ${
              formik.touched.city && formik.errors.city
                ? "border-media-danger-3"
                : "border-media-primary-gray"
            } w-full`}
          >
            <Select
              bordered={false}
              showSearch
              onBlur={() => onBlurField("city")}
              placeholder="Pilih kota/kabupaten domisili anda"
              optionFilterProp="children"
              onChange={(value) => onSelectCity("city", value)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={cities}
              className="w-full capitalize"
              disabled={!formik.values.province}
            />
          </div>
          <ErrorMessage
            show={formik.touched.city && formik.errors.city}
            message={formik.errors.city}
          />
        </div>

        {/* input kecamatan */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="district">Kecamatan</label>
          <div
            className={`border rounded-lg ${
              formik.touched.district && formik.errors.district
                ? "border-media-danger-3"
                : "border-media-primary-gray"
            } w-full`}
          >
            <Select
              bordered={false}
              showSearch
              onBlur={() => onBlurField("district")}
              placeholder="Pilih kecamatan domisili anda"
              optionFilterProp="children"
              onChange={(value) => onSelectDistrict("district", value)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={districts}
              className="w-full capitalize"
              disabled={!formik.values.city}
            />
          </div>
          <ErrorMessage
            show={formik.touched.district && formik.errors.district}
            message={formik.errors.district}
          />
        </div>

        {/* input kelurahan */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="subdistrict">Kelurahan</label>
          <div
            className={`border rounded-lg ${
              formik.touched.subdistrict && formik.errors.subdistrict
                ? "border-media-danger-3"
                : "border-media-primary-gray"
            } w-full`}
          >
            <Select
              bordered={false}
              showSearch
              onBlur={() => onBlurField("subdistrict")}
              placeholder="Pilih Kelurahan domisili anda"
              optionFilterProp="children"
              onChange={(value) => onSelectSubdistrict("subdistrict", value)}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={subDistricts}
              className="w-full capitalize"
              disabled={!formik.values.district}
            />
          </div>
          <ErrorMessage
            show={formik.touched.subdistrict && formik.errors.subdistrict}
            message={formik.errors.subdistrict}
          />
        </div>

        {/* input alamat */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="address">Alamat</label>
          <Input
            name="address"
            id="address"
            type="text"
            placeholder="Masukkan alamat anda"
            className={`${
              formik.touched.address && formik.errors.address
                ? "border-media-danger-3"
                : "border-media-primary-gray"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          <ErrorMessage
            show={formik.touched.address && formik.errors.address}
            message={formik.errors.address}
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

export default AddressInfo;
