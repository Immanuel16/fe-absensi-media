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

export const initialValuesAbsence = (params) => ({
  id: params?.id || "",
  tanggal: params?.tanggal || "",
  ir: params?.ir || "",
  kom1: params?.kom1 || "",
  kom2: params?.kom2 || "",
  cam1: params?.cam1 || "",
  cam2: params?.cam2 || "",
  cam3: params?.cam3 || "",
  switcher: params?.switcher || "",
  photo: params?.photo || "",
  sound1: params?.sound1 || "",
  sound2: params?.sound2 || "",
});
