"use client";
import { useState } from "react";
import style from "./datePicker.module.css";
import dayjs from "dayjs";

function DatePicker() {
  const [startDay, setStartDay] = useState<null | dayjs.Dayjs>(null);
  const [endDay, setEndDay] = useState<null | dayjs.Dayjs>(null);

  const dateObj = dayjs();
  const firstDayThisMonth = dateObj.startOf("month");
  const lastDayThisMonth = dateObj.endOf("month");
  const firstWeekStartDay = firstDayThisMonth.startOf("week");
  // const daysInMonth = dateObj.daysInMonth(); // 當月天數

  const daysArray = [];
  for (let i = 0; i < 35; i++) {
    daysArray.push(firstWeekStartDay.add(i, "day"));
  }

  const handlePeriodStyle = (date: dayjs.Dayjs) => {
    if (startDay === null && endDay === null) return;
    if (date.isSame(startDay, "day") || date.isSame(endDay, "day"))
      return style.period;
    if (date.isAfter(startDay) && date.isBefore(endDay)) return style.period;
    return "";
  };

  const handleDateOnClick = (date: dayjs.Dayjs) => {
    if (date.month() !== dateObj.month()) return; // 非當前月份
    if (!startDay) {
      setStartDay(date);
    } else {
      date.isBefore(startDay) ? setStartDay(date) : setEndDay(date);
    }
  };

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
            } ${handlePeriodStyle(el)} 
            ${dateObj.isSame(el, "day") ? style.today : ""}`}
            onClick={() => handleDateOnClick(el)}
          >
            {el.format("D")}日
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatePicker;
