import styles from './RegisterEmergency.module.css';
function RegisterEmergency() {
    return(
        <div className={styles.container}>
            <p> Register Emergency Case </p>

            <div className ={styles.patientDetails}>
                <input placeholder='Patient Name'/>
                <input placeholder='Phone number'/>
            </div>

            <div className ={styles.emergencyTypeContainer}>
                <p> Emergency Type</p>
                 <input placeholder='Custom Emergency Type'/>
            </div>

            <div className ={styles.severityRating}> 
                <p> Severity Rating </p>
                <div className={styles.buttonContainer}> 
                    <button> Low </button>
                    <button> Medium </button>
                    <button> High </button>
                </div>

            </div>

            <div className ={styles.symptomsContainer}> 
                <p>Symptoms/Notes</p>
                <input placeholder='Add notes'/>
            </div>

            <div className ={styles.availableContainer}>
                <p> Available Doctors </p>
                {/* <div> Here you add available doctors one by one</div> */}
            </div>
        </div>

    )
}

export default RegisterEmergency;