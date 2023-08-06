import * as Yup from "yup";

const CashSchemas = Yup.object({
  id: Yup.string().optional(),
  tanggal: Yup.string().required("Tanggal wajib diisi"),
  item: Yup.string().required("Deskripsi item wajib diisi"),
  price: Yup.string().required("Harga wajib diisi"),
  total_item: Yup.number("Total item wajib angka").required(
    "Total item wajib diisi"
  ),
  type: Yup.string().required("Tipe wajib diisi"),
  attachment: Yup.string().optional(),
});

const initialValuesCash = {
  id: "",
  tanggal: "",
  item: "",
  price: "",
  total_item: "",
  type: "",
  attachment: "",
};

export { CashSchemas, initialValuesCash };
