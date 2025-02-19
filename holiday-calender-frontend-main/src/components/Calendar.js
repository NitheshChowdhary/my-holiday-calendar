import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import "./Calendar.css";

const Calendar = ({ currentDate, holidays, onAddHoliday, onDeleteHoliday }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleAddHoliday = (date) => {
    const name = prompt("Enter holiday name:");
    if (name) {
      onAddHoliday(date, name);
    }
  };

  return (
    <div className="calendar">
      <h2>{format(currentDate, "MMMM yyyy")}</h2>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        {daysInMonth.map((date) => (
          <div
            key={date.toString()}
            className={`calendar-day ${
              !isSameMonth(date, currentDate) ? "different-month" : ""
            }`}
          >
            <span>{format(date, "d")}</span>
            {holidays
              .filter((holiday) => isSameDay(new Date(holiday.date), date))
              .map((holiday) => (
                <div key={holiday._id} className="holiday">
                  {holiday.name}
                  <button onClick={() => onDeleteHoliday(holiday._id)}>
                    X
                  </button>
                </div>
              ))}
            <button
              className="add-holiday"
              onClick={() => handleAddHoliday(date)}
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
