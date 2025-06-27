import styles from './Appointment.module.css';
import { useState } from 'react';
function Appointment() {

    const [existing, setExisting] = useState(true);
    return (
        <div className={styles.container}>

            <p> Create Appointment</p>
            <div className={styles.innerContainer1}>
                <p className> Patient Selection </p>
                <div className={styles.buttonContainer}>
                    <button
                        className={existing ? styles.activeButton : styles.inactiveButton}
                        onClick={() => setExisting(true)}> Existing </button>
                    <button
                        className={existing ? styles.inactiveButton : styles.activeButton}
                        onClick={() => setExisting(false)} > New Patient </button>
                </div>
            </div>

            {existing && (
                <div>
                    <input
                        type="text"
                        placeholder="Search patient name"
                        className={styles.searchInput}
                    />
                    </div>
            )}

            { !existing && (
                <div className={styles.inputContainer}>
                    <input placeholder='Name'/>
                    <input placeholder='Phone Number' />
                    <input placeholder='email'/>
                    
                 </div>
            )}

                    <div className={styles.dateContainer}>
                        <p>Time Slot</p>
                         {/* <starting_time> </starting_time> <ending_time> <ending_time> */}
                        <div className={styles.dateSlot}> </div>
                     </div>

                     <div className={styles.dentistContainer}> 
                        <p>Assign Dentist </p>
                         {/* <dropdown> </dropdown> */}
                     </div>

                     <div className={styles.treatmentContainer}> 
                        <p> Treatment/Procedure</p>
                        {/* <dropdown> </dropdown> */}
                        <input className={styles.inputField} type='text' placeholder='Additional Notes or Remarks' />
                     </div>

                

        </div>
    )
}

export default Appointment;