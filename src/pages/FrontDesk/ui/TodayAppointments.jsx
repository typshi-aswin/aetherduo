import styles from './TodayAppointments.module.css';
function TodayAppointments () {

    return(
        <div className = {styles.container}> 
            <div className = {styles.appointmentHeader}>
                <h1> Today's Appointments </h1>
                <p> 15 total appoinments </p>
            </div>
        </div>
    )
}

export default TodayAppointments;