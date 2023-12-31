import "dayjs/locale/id";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const getFilterMonthRange = () => {
  const year = new Date().getFullYear();
  let rangeList = [];
  dayjs.locale("id");
  for (let month = 1; month <= 12; month++) {
    let startDate = dayjs([year, month]).format("YYYY-MM-DD");
    let endDate = dayjs(startDate).endOf("month").format("YYYY-MM-DD");
    let monthName = dayjs([year, month]).format("MMMM");
    rangeList.push({ start: startDate, end: endDate, month: monthName });
  }
  return rangeList;
};
const getCrewAge = (birthdate) => {
  const formattedDate = birthdate.split("/");
  const birthdays = new Date(
    formattedDate[2],
    formattedDate[1] - 1,
    formattedDate[0]
  );
  const now = new Date();
  const diffTime = now.getTime() - birthdays.getTime();
  const dividedYear = 1000 * 3600 * 24 * 365.25;
  return Math.floor(diffTime / dividedYear);
};

const getDifferentDate = (birthdate) => {
  const formattedDate = birthdate.split("/");
  const today = new Date();
  const birthdays = new Date(
    today.getFullYear(),
    formattedDate[1] - 1,
    formattedDate[0]
  );
  if (today.getTime() > birthdays.getTime()) {
    birthdays.setFullYear(birthdays.getFullYear() + 1);
  }
  const diff = birthdays.getTime() - today.getTime();
  const leftDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  return leftDays;
};

const convertDate = (date, format = dateFormat.display) => {
  dayjs.locale("id");
  return dayjs(date).format(format);
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

const formatRupiah = (angka) => {
  let number_string = angka.toString(),
    sisa = number_string.length % 3,
    rupiah = number_string.substr(0, sisa),
    ribuan = number_string.substr(sisa).match(/\d{3}/g),
    separator = "";
  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }
  return `Rp ${rupiah}`;
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
  getCrewAge,
  getDifferentDate,
  dateFormat,
  showAlertError,
  showAlertSuccess,
  listRoleMinistry,
  formatRupiah,
};
