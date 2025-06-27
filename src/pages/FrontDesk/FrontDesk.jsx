import TodayAppointments from "./ui/TodayAppointments/TodayAppointments";
import AtGlance from "./ui/GlanceBox/GlanceBox";
import styles from "./FrontDesk.module.css";

function FrontDesk() {
    return (
        <div className={styles.row}>
            <TodayAppointments />
            <AtGlance />
        </div>
    );
}

export default FrontDesk;