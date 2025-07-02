import { useEffect, useState } from 'react';
import { collection, updateDoc, doc } from 'firebase/firestore';
import { db } from "../../../../firebase";
import styles from './TodayAppointments.module.css';
import { FaUserCircle, FaCheck, FaUndo } from 'react-icons/fa';
import { onSnapshot } from 'firebase/firestore';

function TodayAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'appointments'), (querySnapshot) => {
      const todayObj = new Date();
      const today = todayObj.getFullYear() + '-' +
        String(todayObj.getMonth() + 1).padStart(2, '0') + '-' +
        String(todayObj.getDate()).padStart(2, '0'); // "YYYY-MM-DD"

      const data = querySnapshot.docs
        .map(doc => {
          const docData = doc.data();
          const startDate = docData.starttime?.toDate?.();
          const dateStr = startDate?.toISOString()?.split('T')[0];

          return {
            id: doc.id,
            ...docData,
            starttimeFormatted: startDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endtimeFormatted: docData.endtime?.toDate?.().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            _dateString: dateStr
          };
        })
        .filter(appointment => appointment._dateString === today);

      setAppointments(data);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Toggle check-in status in Firestore and locally
  const toggleCheckIn = async (id, currentStatus) => {
    const newStatus = currentStatus === 'checkedin' ? 'not_checkedin' : 'checkedin';
    try {
      const docRef = doc(db, 'appointments', id);
      await updateDoc(docRef, { checkin_status: newStatus });
      setAppointments(prev => prev.map(appt =>
        appt.id === id
          ? { ...appt, checkin_status: newStatus }
          : appt
      ));
    } catch (error) {
      console.error('Failed to update check-in status:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.appointmentHeader}>
        <h1>Today's Appointments</h1>
        <p>{appointments.length} total appointments</p>
      </div>
      {appointments && (
        <div className={styles.tableContainer}>
          {appointments.map((patient, index) => (
            <div key={patient.id || index} className={styles.row}>
              <div className={styles.profileContainer}>
                <FaUserCircle className={styles.profileIcon} size={28} />
                <div className={styles.nameContainer}>
                  <h1>{patient.patientName}</h1>
                  <p>{patient.procedures}</p>
                </div>
              </div>

              <div className={styles.timeContainer}>
                <h1>{patient.starttimeFormatted} to {patient.endtimeFormatted}</h1>
                <p>{patient.doctor}</p>
              </div>

              <button
                className={styles.toggleBtn}
                style={{
                  backgroundColor: patient.checkin_status === 'checkedin' ? '#25473c' : '#534224',
                  color: patient.checkin_status === 'checkedin' ? '#13b981' : '#f59e10',
                  border: 'none',
                  borderRadius: '20px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  padding: '0.5rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  width: '10rem'
                }}
                onClick={() => toggleCheckIn(patient.id, patient.checkin_status)}
              >
                {patient.checkin_status === 'checkedin' ? <FaCheck /> : <FaUndo />}
                {patient.checkin_status === 'checkedin' ? 'Checked In' : 'Not Checked In'}
              </button>
            </div>
          ))}


        </div>
      )}

      {(!appointments || appointments.length === 0) && (
        <div className={styles.noAppointment}> No Appointments Today. </div>
      )}
    </div>
  );
}

export default TodayAppointments;