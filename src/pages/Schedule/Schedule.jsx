import styles from './Schedule.module.css';
import Appointment from './ui/Appointment/Appointment';
import Calendar from './ui/Calendar/Calendar';
import { useState } from 'react';
function Schedule() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    return(
        <div className= {styles.container}>
            <Calendar date={selectedDate} setDate={setSelectedDate} />
            <Appointment date={selectedDate} />

        </div>
    )
}

export default Schedule;