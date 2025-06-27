import styles from './Schedule.module.css';
import Appointment from './ui/Appointment/Appointment';
function Schedule() {
    return(
        <div className= {styles.container}>
            <Appointment />
        </div>
    )
}

export default Schedule;