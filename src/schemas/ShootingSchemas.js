import * as Yup from "yup";

export const ShootingSchema = Yup.object({
  name: Yup.string().required("Nama lengkap wajib diisi"),
  phone: Yup.string()
    .required("Nomor handphone wajib diisi")
    .matches(/^[0-9]*$/, "Nomor handphone wajib angka"),
  division: Yup.string().required("Divisi wajib diisi"),
  description: Yup.string().required("Keterangan shooting wajib diisi"),
  request_date: Yup.string().required("Tanggal shooting wajib diisi"),
  request_time: Yup.string().required("Jam shooting wajib diisi"),
});

export const initialValuesShooting = {
  name: "",
  phone: "",
  division: "",
  description: "",
  request_date: "",
  request_time: "",
};
