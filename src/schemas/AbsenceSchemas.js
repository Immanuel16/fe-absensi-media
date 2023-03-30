import * as Yup from "yup";

export const AbsenceSchemas = Yup.object({
  id: Yup.string().optional(),
  tanggal: Yup.string().required("Tanggal pelayanan wajib diisi"),
  ir: Yup.string().required("Ibadah raya wajib diisi"),
  kom1: Yup.string().required("Operator komputer 1 wajib diisi"),
  kom2: Yup.string().optional(),
  cam1: Yup.string().required("Cameraman wajib diisi"),
  cam2: Yup.string().optional(),
  cam3: Yup.string().optional(),
  switcher: Yup.string().optional(),
  photo: Yup.string().optional(),
  sound1: Yup.string().required("Soundman wajib diisi"),
  sound2: Yup.string().optional(),
});

export const initialValuesAbsence = {
  id: "",
  tanggal: "",
  ir: "",
  kom1: "",
  kom2: "",
  cam1: "",
  cam2: "",
  cam3: "",
  switcher: "",
  photo: "",
  sound1: "",
  sound2: "",
};
