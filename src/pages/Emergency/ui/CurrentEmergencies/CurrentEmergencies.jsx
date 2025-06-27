import styles from './CurrentEmergencies.module.css';

function CurrentEmergencies () {
    return(
        <div className={styles.container}>
            <p>Current Emergencies </p>
            <div className={styles.emergencyContainer}>
                {/* <div> show all emergencies </div> */}
            </div>
        </div>
    );
}

export default CurrentEmergencies;