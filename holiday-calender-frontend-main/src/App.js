"use client";

import { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import "./App.css";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    fetchHolidays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed currentDate from dependencies

  const fetchHolidays = async () => {
    const response = await fetch(
      `https://hoilday-calender-backend.onrender.com/api/holidays?month=${
        currentDate.getMonth() + 1
      }&year=${currentDate.getFullYear()}`
    );
    const data = await response.json();
    setHolidays(data);
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  const addHoliday = async (date, name) => {
    const response = await fetch(
      "https://hoilday-calender-backend.onrender.com/api/holidays",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, name }),
      }
    );
    if (response.ok) {
      fetchHolidays();
    }
  };

  const deleteHoliday = async (id) => {
    const response = await fetch(
      `https://hoilday-calender-backend.onrender.com/api/holidays/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      fetchHolidays();
    }
  };

  return (
    <div className="App">
      <h1>Holiday Calendar</h1>
      <div className="calendar-controls">
        <button onClick={handlePrevMonth}>Previous</button>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <Calendar
        currentDate={currentDate}
        holidays={holidays}
        onAddHoliday={addHoliday}
        onDeleteHoliday={deleteHoliday}
      />
    </div>
  );
}

export default App;
