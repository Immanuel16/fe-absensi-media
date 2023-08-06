import * as Yup from "yup";

export const PrivacyInfoSchemas = Yup.object({
  full_name: Yup.string()
    .required("Nama lengkap wajib diisi")
    .min(4, "Nama lengkap minimal 4 huruf"),
  username: Yup.string()
    .required("Nama panggilan wajib diisi")
    .matches(/^[a-zA-Z]+$/, "Nama panggilan wajib huruf")
    .min(3, "Nama panggilan minimal 3 huruf"),
  birth_date: Yup.string().required("Tanggal lahir wajib diisi"),
  phone: Yup.string().required("Nomor hp wajib diisi"),
  bank_id: Yup.string().required("Nama bank wajib diisi"),
  bank_acc_num: Yup.string()
    .required("Nomor rekening wajib diisi")
    .matches(/^[0-9]*$/, "Nomor rekening wajib angka"),
  bank_acc_name: Yup.string()
    .required("Nama pemilik rekening wajib diisi")
    .matches(/^[a-z A-Z]+$/, "Nama pemilik rekening wajib huruf"),
});

/* step 2 */ /* bisa diambil aja di function RegisterSchemas */
export const AddressInfoSchemas = Yup.object({
  province: Yup.string().required("Provinsi wajib diisi"),
  city: Yup.string().required("Kota wajib diisi"),
  district: Yup.string().required("Kecamatan wajib diisi"),
  subdistrict: Yup.string().required("Kelurahan wajib diisi"),
  address: Yup.string()
    .required("Alamat wajib diisi")
    .min(4, "Alamat minimal 4 huruf"),
});

/* step 3 */ /* bisa diambil aja di function RegisterSchemas */
export const AdditionalInfoSchemas = Yup.object({
  email: Yup.string().required("Email wajib diisi").email("Email tidak valid"),
  password: Yup.string()
    .required("Password wajib diisi")
    .min(3, "Password minimal 3 karakter"),
});

export const initialValuesRegister = {
  privacyInfo: {
    full_name: "",
    username: "",
    birth_date: "",
    phone: "",
    bank_id: "",
    bank_acc_num: "",
  },
  addressInfo: {
    province: "",
    city: "",
    district: "",
    subdistrict: "",
    address: "",
  },
  additionalInfo: {
    email: "",
    password: "",
    kom: false,
    hmc: false,
    baptis: false,
    orientasi: false,
    status: 1,
  },
};
