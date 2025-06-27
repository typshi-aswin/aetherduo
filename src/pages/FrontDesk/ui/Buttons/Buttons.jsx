import styles from './Buttons.module.css';
import { useNavigate } from 'react-router-dom';
function Buttons() {
    const navigate = useNavigate();
    return( 
        <div className ={styles.buttonContainer}>
            <button onClick={() => {navigate(`/schedules`)}}> New Appointment </button>
            <button> Emergency </button>
         </div>
    )
}

export default Buttons;