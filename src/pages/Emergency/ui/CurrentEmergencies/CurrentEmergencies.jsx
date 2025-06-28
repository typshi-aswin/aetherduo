import styles from './CurrentEmergencies.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';

function CurrentEmergencies() {
  const [emergencies, setEmergencies] = useState([]);

  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'emergency_appointments'));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEmergencies(data);
      } catch (error) {
        console.error('Error fetching emergency appointments:', error);
      }
    };

    fetchEmergencies();
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Current Emergencies</p>
      <div className={styles.emergencyContainer}>
        {emergencies.length === 0 ? (
          <p className={styles.noData}>No emergencies at the moment.</p>
        ) : (
          emergencies.map((emergency) => (
            <div key={emergency.id} className={styles.card}>
              <div className={styles.nameContainer}>
                <p>{emergency.patient_name}</p>
                <span>{emergency.doctor_name || "Unassigned"}</span>
              </div>
              <div className={styles.severityContainer}>
                <p>{emergency.emergency_type}</p>
                <div
                  className={`${styles.pill} ${
                    emergency.severity === 'High'
                      ? styles.high
                      : emergency.severity === 'Moderate'
                      ? styles.moderate
                      : styles.low
                  }`}
                >
                  {emergency.severity}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CurrentEmergencies;