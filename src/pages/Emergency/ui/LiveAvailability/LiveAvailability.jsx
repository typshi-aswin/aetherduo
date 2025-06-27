import styles from './LiveAvailability.module.css';
import { FaChair } from "react-icons/fa";
function LiveAvailability() {
    return(
        <div className ={styles.container}>
            <p>Live Availability Snapshot</p>
            {/* <div> Show total number of FaChair icons here. FaChairs should be red [#f87272] if occupied, default color if not
            </div> */}
            <div className ={styles.doctorStatus}>
                <p> Available </p>
                {/* <div> show available doctors here, with a tag on the right showing their specialty </div> */}
            </div>
        </div>
    );
}

export default LiveAvailability;