import { Input } from "antd";
import { useFormik } from "formik";
import { useEffect } from "react";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";
import { useSpinner } from "../../../context/Spinner";
import apiHelper from "../../../helper/api";
import {
  PastorGreetingSchemas,
  initialValuesPastorGreeting,
} from "../../../schemas/PastorGreetingSchemas";
import { showAlertError } from "../../../util/util";

const UpdateSapaanGembala = ({ data, onUpdate }) => {
  const { setShowSpinner } = useSpinner();

  const filterPayload = (obj) => {
    delete obj.id;
    delete obj.createdAt;
    delete obj.updated_by;
    delete obj.updatedAt;
    return obj;
  };

  const formik = useFormik({
    initialValues: initialValuesPastorGreeting(filterPayload(data)),
    validationSchema: PastorGreetingSchemas,

    onSubmit: (values) => {
      updateData(values);
    },
  });

  const updateData = async (value) => {
    delete value.id;
    setShowSpinner(true);
    apiHelper
      .put("/apps/sapaan-gembala", value)
      .then((data) => {
        onUpdate();
      })
      .catch((err) => {
        setShowSpinner(false);
        showAlertError(err);
      });
  };

  useEffect(() => {
    formik.setValues(filterPayload(data));
  }, []);

  return (
    <form className="flex flex-col space-y-6" onSubmit={formik.handleSubmit}>
      {/* input episode */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="episode">Episode</label>
        <Input
          name="episode"
          id="episode"
          placeholder="Masukkan episode"
          className={`${
            formik.touched.episode && formik.errors.episode
              ? "border-media-danger-3"
              : "border-media-primary-gray"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.episode}
        />
        <ErrorMessage
          show={formik.touched.episode && formik.errors.episode}
          message={formik.errors.episode}
        />
      </div>
      {/* input title */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="title">Judul</label>
        <Input
          name="title"
          id="title"
          type="text"
          placeholder="Masukkan judul"
          className={`${
            formik.touched.title && formik.errors.title
              ? "border-media-danger-3"
              : "border-media-primary-gray"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        <ErrorMessage
          show={formik.touched.title && formik.errors.title}
          message={formik.errors.title}
        />
      </div>

      {/* input video_url */}
      <div className="flex flex-col space-y-1 overflow-x-hidden">
        <label htmlFor="video_url">Link Video</label>
        <Input
          name="video_url"
          id="video_url"
          type="text"
          placeholder="Masukkan link video"
          className={`${
            formik.touched.video_url && formik.errors.video_url
              ? "border-media-danger-3"
              : "border-media-primary-gray"
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.video_url}
        />
        {/* {((!formik.touched.video_url && !formik.errors.video_url) ||
          (formik.values.video_url &&
            formik.touched.video_url &&
            !formik.errors.video_url)) && (
          <p className="text-media-primary-gray">
            Example:
            https://drive.google.com/file/d/12l34FjgzxyvuNhsKKn11LPqeThoTGInL/view?usp=drive_link
          </p>
        )} */}
        <ErrorMessage
          show={formik.touched.video_url && formik.errors.video_url}
          message={formik.errors.video_url}
        />
      </div>
      <button
        className="bg-media-primary-blue w-full text-white py-2.5 rounded-btn text-sm font-semibold"
        type="submit"
        disabled={!(formik.isValid && formik.dirty)}
      >
        Update
      </button>
    </form>
  );
};

export default UpdateSapaanGembala;
