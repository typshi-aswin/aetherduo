import styles from './Schedule.module.css';
import Appointment from './ui/Appointment/Appointment';
import Calendar from './ui/Calendar/Calendar';
function Schedule() {
    return(
        <div className= {styles.container}>
            <Calendar />
            <Appointment />

        </div>
    )
}

export default Schedule;