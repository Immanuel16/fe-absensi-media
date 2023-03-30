import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { dateFormat } from "../../util/util";
import moment from "moment";

const Datepicker = ({
  label,
  value,
  name,
  placeholder,
  onChange,
  minDate,
  onBlur,
  isError = false,
  maxDate
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="font-semibold text-media-primary-gray">{label}</label>
      <DatePicker
        id={name}
        onChange={onChange}
        suffixIcon={<DownOutlined />}
        disabledDate={(d) =>
          !d || (maxDate && d.isAfter(maxDate)) || (minDate && d.isBefore(minDate))
        }
        className={`datepicker-custom ${
          isError ? "border-media-danger-3" : ""
        }`}
        placeholder={placeholder}
        value={value && moment(value, dateFormat.input)}
        name={name}
        format={dateFormat.input}
        onBlur={onBlur}
        inputReadOnly={true}
      />
      <input
        type="text"
        className="hidden"
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Datepicker;
