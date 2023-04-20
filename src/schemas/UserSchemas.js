import * as Yup from "yup";
const InitialValuesCrew = {
  id: "",
  full_name: "",
  birth_date: "",
  phone: "",
  bank_id: "",
  bank_acc_num: "",
  bank_acc_name: "",
  province: "",
  city: "",
  district: "",
  subdistrict: "",
  address: "",
  username: "",
  kom: 0,
  hmc: 0,
  baptis: 0,
  orientasi: 0,
  photo: "",
  status: 1,
  role: "",
  email: "",
};

const InitialValuesBankCrew = {
  bank_name: "",
  bank_acc_num: "",
  bank_acc_name: "",
};

const BankCrewSchemas = Yup.object({
  bank_name: Yup.string().required("Nama bank wajib diisi"),
  bank_acc_num: Yup.string()
    .required("Nomor rekening wajib diisi")
    .min(10, "Nomor rekening minimal 10 angka"),
  bank_acc_name: Yup.string()
    .required("Nama pemilik rekening wajib diisi")
    .matches(/^[a-z A-Z]+$/, "Nama pemilik rekening wajib huruf"),
});

export { InitialValuesCrew, InitialValuesBankCrew, BankCrewSchemas };
