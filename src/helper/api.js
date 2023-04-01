import Axios from "axios";

const apiHelper = Axios.create({
  baseURL: process.env.REACT_APP_URL_API_PROD,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export default apiHelper;
