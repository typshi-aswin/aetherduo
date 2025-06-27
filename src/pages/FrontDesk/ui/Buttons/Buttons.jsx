import styles from './Buttons.module.css';

function Buttons() {

    return( 
        <div className ={styles.buttonContainer}>
            <button> New Appointment </button>
            <button> Emergency </button>
            <button> Check in</button>
         </div>
    )
}

export default Buttons;