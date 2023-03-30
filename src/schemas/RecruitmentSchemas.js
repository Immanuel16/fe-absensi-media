import * as Yup from "yup";

export const RecruitmentSchema = Yup.object({
  name: Yup.string().required("Nama lengkap wajib diisi"),
  phone: Yup.string()
    .required("Nomor whatsapp wajib diisi")
    .matches(/^[0-9]*$/, "Nomor whatsapp wajib angka"),
  job: Yup.string().optional(),
  age: Yup.string()
    .required("Usia wajib diisi")
    .matches(/^[0-9]*$/, "Usia wajib angka"),
  role: Yup.string().required("Minat pelayanan wajib diisi"),
});

export const initialValuesRecruitment = {
  name: "",
  phone: "",
  job: "",
  age: "",
  role: "",
};
