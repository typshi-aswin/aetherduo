import TodayAppointments from "./ui/TodayAppointments/TodayAppointments";
import AtGlance from "./ui/GlanceBox/GlanceBox";
import Notifications from "./ui/Notifications/Notifications";
import styles from "./FrontDesk.module.css";

function FrontDesk() {
    return (
        <div className={styles.row}>
            <TodayAppointments />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                <AtGlance />
                <Notifications />
            </div>
        </div>
    );
}

export default FrontDesk;