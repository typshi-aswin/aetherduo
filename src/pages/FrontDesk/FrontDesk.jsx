import TodayAppointments from "./ui/TodayAppointments/TodayAppointments";
import AtGlance from "./ui/GlanceBox/GlanceBox";
import Notifications from "./ui/Notifications/Notifications";
import PatientSearch from "./ui/PatientSearch/PatientSearch";
import Buttons from "./ui/Buttons/Buttons";
import styles from "./FrontDesk.module.css";

function FrontDesk() {
    return (
        <div className={styles.row}>
            <div className={styles.appointNotif}>
                <TodayAppointments />
                <Notifications />
            </div>
            <div className={styles.patientGlance}>
            <PatientSearch />
            <AtGlance />
            <Buttons />
            </div>
        </div>
    );
}

export default FrontDesk;