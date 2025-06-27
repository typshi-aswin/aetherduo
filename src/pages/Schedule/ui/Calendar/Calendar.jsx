import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';

function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  const tileDisabled = ({ date, view }) => {
    // Only disable dates in month view
    if (view === 'month') {
      return date < today;
    }
    return false;
  };

  return (
    <div className="customCalendar">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="customCalendar"
        tileDisabled={tileDisabled}
      />
    </div>
  );
}

export default AppointmentCalendar;