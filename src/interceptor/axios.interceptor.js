import apiHelper from "../helper/api";

const onRequest = (config) => {
  const token = localStorage.getItem("token");
  const urlNoAuthorization = ["auth", "public"];
  const isExistNoAuth = !!urlNoAuthorization.find((url) =>
    config.url?.includes(url)
  );
  if (!isExistNoAuth) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
};

const onResponse = (res) => res.data;

const onRequestError = (err) => Promise.reject(err);

const OnResponseError = (err) => {
  if (err.response.status === 401) {
    window.location.href = "/login";
    localStorage.clear();
  }
  return Promise.reject(err.response.data);
};

export function AxiosInterceptor() {
  apiHelper.interceptors.request.use(onRequest, onRequestError);
  apiHelper.interceptors.response.use(onResponse, OnResponseError);
  return apiHelper;
}
