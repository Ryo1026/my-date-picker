import style from "./datePicker.module.css";
import dayjs from "dayjs";

function DatePicker() {
  const dateObj = dayjs(); // 0- 星期天

  // const daysInMonth = dateObj.daysInMonth(); // 當月天數

  const firstDayThisMonth = dateObj.startOf("month");
  const lastDayThisMonth = dateObj.endOf("month");
  const firstWeekStartDay = firstDayThisMonth.startOf("week");

  const daysArray = [];
  for (let i = 0; i < 35; i++) {
    daysArray.push(firstWeekStartDay.add(i, "day"));
  }

  return (
    <div className={style.datePicker}>
      <div className={style.header}>
        <span>{`<`}</span>
        <div className={style.currentMonth}>
          {dateObj.format("YYYY")}年{dateObj.format("M")}月
        </div>
        <span>{`>`}</span>
      </div>
      <div className={style.dates}>
        {daysArray.map((el) => (
          <div
            key={el.format("YYMMDD")}
            className={`${style.day} ${
              el.isBefore(firstDayThisMonth) || el.isAfter(lastDayThisMonth)
                ? style.disableDay
                : ""
            }`}
          >
            {el.format("D")}日
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatePicker;
