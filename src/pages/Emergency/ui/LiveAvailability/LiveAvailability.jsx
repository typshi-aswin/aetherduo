import styles from './LiveAvailability.module.css';
import { FaChair } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';

function LiveAvailability() {
  const [occupiedChairs, setOccupiedChairs] = useState(0);
  const [availableDoctors, setAvailableDoctors] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log('Fetching appointments...');
        const snapshot = await getDocs(collection(db, 'appointments'));
        console.log('Appointments snapshot:', snapshot.docs.length, 'documents');
        const now = new Date();

        const activeAppointments = snapshot.docs.filter(doc => {
          const data = doc.data();
          const start = data.starttime?.toDate?.();
          const end = data.endtime?.toDate?.();

          return (
            start &&
            end &&
            now >= start &&
            now <= end &&
            data.checkin_status === 'checkedin'
          );
        });

        console.log('Active appointments:', activeAppointments.length);
        setOccupiedChairs(activeAppointments.length);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    const fetchDoctors = async () => {
      try {
        console.log('Fetching doctors...');
        const snapshot = await getDocs(collection(db, 'doctors'));
        console.log('Doctors snapshot:', snapshot.docs.length, 'documents');
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log('Available doctors:', data);
        setAvailableDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchAppointments();
    fetchDoctors();
  }, []);

  const totalChairs = 5;
  const freeChairs = totalChairs - occupiedChairs;

  return (
    <div className={styles.container}>
      <p>Live Availability Snapshot</p>

      <div className={styles.chairsSection}>
        <div className={styles.chairsRow}>
          {Array.from({ length: totalChairs }).map((_, index) => (
            <FaChair
              key={index}
              className={`${styles.chairIcon} ${
                index < occupiedChairs ? styles.chairOccupied : styles.chairFree
              }`}
            />
          ))}
          <span className={styles.availableText}>{freeChairs} available</span>
        </div>
        <div className={styles.chairsLabel}>
          {occupiedChairs}/{totalChairs} chairs occupied
        </div>
      </div>

      <div className={styles.doctorStatus}>
        <p>Available Doctors</p>
        <div className={styles.doctorList}>
          {availableDoctors.map((doc, index) => (
            <div key={index} className={styles.doctorItem}>
              <span>{doc.name}</span>
            <div className={styles.pill}> <span>{doc.speciality}</span> </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveAvailability;