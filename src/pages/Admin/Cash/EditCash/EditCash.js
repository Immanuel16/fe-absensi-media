import { useFormik } from "formik";
import React, { useState } from "react";
import { useSpinner } from "../../../../context/Spinner";
import apiHelper from "../../../../helper/api";
import {
  CashSchemas,
  initialValuesCash,
} from "../../../../schemas/CashSchemas";
import { useParams } from "react-router";
import { DatePicker, Input, InputNumber, Select } from "antd";
import { convertDate, dateFormat, formatRupiah } from "../../../../util/util";
import { ErrorMessage } from "../../../../components/ErrorMessage/ErrorMessage";
import dayjs from "dayjs";
import { CurrencyInput } from "react-currency-mask";

const EditCash = () => {
  const { setShowSpinner } = useSpinner();
  const { id } = useParams();
  const today = dayjs().add(1, "days").format(dateFormat.value);
  const formik = useFormik({
    initialValues: initialValuesCash,
    validationSchema: CashSchemas,
    onSubmit: (values) => {
      saveData(values);
    },
  });

  const onChangeField = (name, e) => {
    formik.setFieldValue(
      name,
      name === "tanggal" ? convertDate(e, dateFormat.value) : e
    );
  };

  const onBlurField = (name) => {
    formik.setFieldTouched(name, true, true);
  };

  const editCash = async (value) => {};

  const addCash = async (value) => {
    delete value.id;

    setShowSpinner(true);
    apiHelper.post(({ data }) => {});
  };

  const saveData = async (value) => {
    id ? editCash(value) : addCash(value);
  };
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 px-6">
      <div className="flex flex-col space-y-6 overflow-y-auto h-form-absence bg-white shadow-card py-6 px-3 rounded-t-none">
        {/* input tanggal */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="tanggal"
            className="font-semibold text-media-primary-gray"
          >
            Tanggal Transaksi
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
            placeholder="Pilih tanggal"
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

        {/* input item */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="item"
            className="font-semibold text-media-primary-gray"
          >
            Deskripsi Item
          </label>
          <Input
            name="item"
            id="item"
            type="text"
            placeholder="Masukkan deskripsi pengeluaran atau pemasukan"
            className={`${
              formik.touched.item && formik.errors.item
                ? "border-media-danger-3"
                : "border-media-secondary-gray"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.item}
          />
          <ErrorMessage
            show={formik.touched.item && formik.errors.item}
            message={formik.errors.item}
          />
        </div>

        {/* input item */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="item"
            className="font-semibold text-media-primary-gray"
          >
            Jumlah Item
          </label>
          <Input
            name="total_item"
            id="total_item"
            type="number"
            placeholder="Masukkan jumlah item"
            className={`${
              formik.touched.total_item && formik.errors.total_item
                ? "border-media-danger-3"
                : "border-media-secondary-gray"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.total_item}
            min={1}
          />
          <ErrorMessage
            show={formik.touched.total_item && formik.errors.total_item}
            message={formik.errors.total_item}
          />
        </div>

        {/* input harga */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="price"
            className="font-semibold text-media-primary-gray"
          >
            Harga Barang
          </label>
          <CurrencyInput
            onChangeValue={(e, origValue, maskedValue) => {
              onChangeField("price", origValue);
            }}
            locale="id-ID"
            currency="IDR"
            InputElement={
              <Input
                name="price"
                id="price"
                type="text"
                placeholder="Masukkan harga item"
                className={`${
                  formik.touched.price && formik.errors.price
                    ? "border-media-danger-3"
                    : "border-media-secondary-gray"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
            }
          />
          <ErrorMessage
            show={formik.touched.price && formik.errors.price}
            message={formik.errors.price}
          />
        </div>

        {/* input tipe transaksi */}
        <div className="flex flex-col space-y-1">
          <label htmlFor="type">Tipe Transaksi</label>
          <Select
            placeholder="Pilih tipe transaksi"
            id="type"
            className="w-full"
            onBlur={() => onBlurField("type")}
            onChange={(value) => onChangeField("type", value)}
            options={[
              {
                value: 1,
                label: "Pemasukan",
              },
              {
                value: 0,
                label: "Pengeluaran",
              },
            ]}
          />
        </div>

        {/* input attachment */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="item"
            className="font-semibold text-media-primary-gray"
          >
            Link attachment
          </label>
          <Input
            name="item"
            id="item"
            type="text"
            placeholder="Masukkan link bukti transaksi"
            className={`${
              formik.touched.item && formik.errors.item
                ? "border-media-danger-3"
                : "border-media-secondary-gray"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.item}
          />
          <ErrorMessage
            show={formik.touched.item && formik.errors.item}
            message={formik.errors.item}
          />
        </div>
      </div>
    </form>
  );
};

export default EditCash;
