import * as Yup from "yup";

const PastorGreetingSchemas = Yup.object({
  id: Yup.string().optional(),
  episode: Yup.number()
    .typeError("Episode wajib angka")
    .positive("Episode tidak boleh dibawah 0")
    .required("Episode wajib diisi"),
  title: Yup.string().required("Judul wajib diisi"),
  video_url: Yup.string().required("Link video wajib diisi"),
});

const initialValuesPastorGreeting = (data) => ({
  id: data.id || "",
  episode: data.episode || "",
  title: data.title || "",
  video_url: data.video_url || "",
});

export { PastorGreetingSchemas, initialValuesPastorGreeting };
