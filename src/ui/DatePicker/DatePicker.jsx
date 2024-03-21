import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useDatepickerLocales from "./useDatepickerLocales";

const DatePickerComponent = DatePicker.default ?? DatePicker;

function ReactDatePicker(props) {
  useDatepickerLocales();

  return <DatePickerComponent {...props} />;
}

export default ReactDatePicker;
