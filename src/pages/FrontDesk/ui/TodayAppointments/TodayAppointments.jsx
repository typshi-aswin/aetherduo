import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../../firebase";
import styles from './TodayAppointments.module.css';
import { FaUserCircle } from 'react-icons/fa';

function TodayAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'appointments'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.appointmentHeader}>
        <h1>Today's Appointments</h1>
        <p>{appointments.length} total appointments</p>
      </div>

      <div className={styles.tableContainer}>
        {appointments.map((patient, index) => (
          <div key={patient.id || index} className={styles.row}>
            <div className={styles.profileContainer}>
              <FaUserCircle className={styles.profileIcon} size={28} />
              <div className={styles.nameContainer}>
                <h1>{patient.patientName}</h1>
                <p>{patient.procedure}</p>
              </div>
            </div>

            <div className={styles.timeContainer}>
              <h1>{patient.time}</h1>
              <p>{patient.doctor}</p>
            </div>

            <div
              className={styles.tagDesign}
              style={{
                backgroundColor:
                  patient.checkin_status === 'checkedin' ? '#25473c' : '#534224',
                color:
                  patient.checkin_status === 'checkedin' ? '#13b981' : '#f59e10'
              }}
            >
              <p>
                {patient.checkin_status === 'checkedin'
                  ? 'Checked In'
                  : 'Not Checked In'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodayAppointments;