import styles from './TodayAppointments.module.css';
import patientData from './dummypatients.json';
import { FaUserCircle } from 'react-icons/fa';
function TodayAppointments () {

    return(
        <div className = {styles.container}> 
            <div className = {styles.appointmentHeader}>
                <h1> Today's Appointments </h1>
                <p> 15 total appoinments </p>
            </div>

            <div className ={styles.tableContainer}>
                {patientData.patients.map((patient, index) => (
                    <div key= {index} className={styles.row}> 
                        <FaUserCircle className={styles.profileIcon} size={28} />
                        <div className ={styles.nameContainer}> 
                            <h1> {patient.name} </h1> 
                            <p> {patient.issue} </p>
                        </div>

                        <div className ={styles.timeContainer}> 
                            <h1> {patient.time} </h1>
                            <p> {patient.doctor_name} </p>
                        </div>

                        <div className ={styles.tagDesign} 
                        style={{ backgroundColor: patient.checkin_status === 'checkedin' ? '#25473c' : '#534224',
                            color: patient.checkin_status === 'checkedin' ? '#13b981' : '#f59e10'
                         }}> 
                            <p>{patient.checkin_status === 'checkedin'? "Checked In" : "Not Checked In"}</p>
                         </div>
                     </div> 
        ))}
             </div>
        </div>
    )
}

export default TodayAppointments;