import * as Yup from "yup";

export const RetreatSchemas = Yup.object({
  name: Yup.string().required("Nama wajib diisi"),
  join: Yup.boolean().optional(),
  reason: Yup.string().optional(),
});

export const initialValuesRetreat = {
  name: "",
  join: true,
  reason: "",
};
