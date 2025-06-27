import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';
import styles from './RegisterEmergency.module.css';

function RegisterEmergency() {
  const [emergencyTypes, setEmergencyTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [customType, setCustomType] = useState('');

  useEffect(() => {
    const fetchEmergencyTypes = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'emergency'));
        const types = snapshot.docs.map(doc => {
          const data = doc.data();
          return data.type;
        });
        setEmergencyTypes(types);
      } catch (err) {
        console.error('Failed to fetch emergency types:', err);
      }
    };

    fetchEmergencyTypes();
  }, []);

  return (
    <div className={styles.container}>
      <p>Register Emergency Case</p>

      <div className={styles.patientDetails}>
        <input placeholder='Patient Name' />
        <input placeholder='Phone number' />
      </div>

      <div className={styles.emergencyTypeContainer}>
        <p>Emergency Type</p>
        <div className={styles.emergencyButtonGrid}>
          {emergencyTypes.map((type, idx) => (
            <button
              key={idx}
              className={`${styles.emergencyButton} ${selectedType === type ? styles.selected : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <input
          placeholder='Custom Emergency Type'
          value={customType}
          onChange={(e) => setCustomType(e.target.value)}
        />
      </div>

      <div className={styles.severityRating}>
        <p>Severity Rating</p>
        <div className={styles.buttonContainer}>
          <button>Low</button>
          <button>Medium</button>
          <button>High</button>
        </div>
      </div>

      <div className={styles.symptomsContainer}>
        <p>Symptoms/Notes</p>
        <input placeholder='Add notes' />
      </div>
    </div>
  );
}

export default RegisterEmergency;