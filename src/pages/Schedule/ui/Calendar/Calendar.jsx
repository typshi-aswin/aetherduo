import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';

function AppointmentCalendar({ date, setDate }) {
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date

  const handleDateChange = (date) => {
    setDate(date);
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
        value={date}
        className="customCalendar"
        tileDisabled={tileDisabled}
      />
    </div>
  );
}

export default AppointmentCalendar;