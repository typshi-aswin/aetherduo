import RegisterEmergency from "./ui/RegisterEmergency/RegisterEmergency";
import LiveAvailability from "./ui/LiveAvailability/LiveAvailability";
import CurrentEmergencies from "./ui/CurrentEmergencies/CurrentEmergencies";
import styles from './Emergency.module.css';

function Emergency(){
    return(
       <div className={styles.container}> 
        <RegisterEmergency />
        <div className={styles.innerContainer}> 
        <LiveAvailability />
        <CurrentEmergencies />
         </div>
         </div>
    );
}

export default Emergency;