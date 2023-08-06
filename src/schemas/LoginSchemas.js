import * as Yup from "yup";

export const LoginSchema = Yup.object({
  username: Yup.string()
    .required("username wajib diisi")
    .min(3, "username minimal 3 karakter"),
  password: Yup.string().required("Password wajib diisi"),
});

export const initialValuesLogin = {
  username: "",
  password: "",
};
