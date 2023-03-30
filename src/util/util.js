import * as moment from "moment";
import "moment/locale/id";
import { toast } from "react-toastify";

const getFilterMonthRange = () => {
  const year = new Date().getFullYear();
  let rangeList = [];
  moment.locale("id");
  for (let month = 1; month <= 12; month++) {
    let startDate = moment([year, month - 1]).format("YYYY-MM-DD");
    let endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");
    let monthName = moment([year, month - 1]).format("MMMM");
    rangeList.push({ start: startDate, end: endDate, month: monthName });
  }
  return rangeList;
};

const convertDate = (date, format = dateFormat.display) => {
  moment.locale("id");
  return moment(date).format(format);
};

const dateFormat = {
  display: "DD MMMM YYYY",
  input: "DD MMM YYYY",
  value: "YYYY-MM-DD",
};

const showAlertSuccess = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
  });
};

const showAlertError = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
  });
};

/* for pagination */
// const itemRender = (_, type, originalElement) => {
//   if (type === "prev") {
//     return <a>Previous</a>;
//   }
//   if (type === "next") {
//     return <a>Next</a>;
//   }
//   return originalElement;
// };

const listRoleMinistry = [
  {
    label: "cameraman",
    value: "cameraman",
  },
  {
    label: "lighting",
    value: "lighting",
  },
  {
    label: "photografer",
    value: "photografer",
  },
  {
    label: "sound",
    value: "sound",
  },
];

export {
  getFilterMonthRange,
  convertDate,
  dateFormat,
  showAlertError,
  showAlertSuccess,
  listRoleMinistry,
};
