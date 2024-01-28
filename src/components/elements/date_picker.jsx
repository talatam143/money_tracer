import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDatePicker = (props) => {
  const { propsValue, label, handleDateChange, name } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label || "Select Date"}
          value={dayjs(new Date(propsValue)) || dayjs(new Date())}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          name={name || "datePicker"}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
