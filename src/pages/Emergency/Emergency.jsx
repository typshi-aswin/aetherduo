import RegisterEmergency from "./ui/RegisterEmergency/RegisterEmergency";
import LiveAvailability from "./ui/LiveAvailability/LiveAvailability";
import styles from './Emergency.module.css';

function Emergency(){
    return(
        <div className={styles.container}> 
        <RegisterEmergency />
        <LiveAvailability />
         </div>
    );
}

export default Emergency;