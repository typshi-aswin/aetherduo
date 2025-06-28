import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import styles from './RegisterEmergency.module.css';

function RegisterEmergency() {
  const [emergencyTypes, setEmergencyTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [customType, setCustomType] = useState('');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [severity, setSeverity] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchEmergencyTypes = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'emergency'));
        const types = snapshot.docs.map(doc => doc.data().type);
        setEmergencyTypes(types);
      } catch (err) {
        console.error('Failed to fetch emergency types:', err);
      }
    };

    fetchEmergencyTypes();
  }, []);

  const handleSubmit = async () => {
    const emergencyType = customType || selectedType;

    if (!patientName || !phone || !emergencyType || !severity || !notes) {
      alert("Please fill in all fields");
      return;
    }

    const newEmergency = {
      patient_name: patientName,
      phone: Number(phone),
      emergency_type: emergencyType,
      severity,
      notes,
      doctor_name: '' // can be updated later
    };

    try {
      await addDoc(collection(db, 'emergency_appointments'), newEmergency);
      alert('Emergency case registered successfully!');
      // Reset fields
      setPatientName('');
      setPhone('');
      setSelectedType('');
      setCustomType('');
      setSeverity('');
      setNotes('');
    } catch (err) {
      console.error("Error adding emergency appointment:", err);
    }
  };

  return (
    <div className={styles.container}>
      <p>Register Emergency Case</p>

      <div className={styles.patientDetails}>
        <input
          placeholder='Patient Name'
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <input
          placeholder='Phone number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className={styles.emergencyTypeContainer}>
        <p>Emergency Type</p>
        <div className={styles.emergencyButtonGrid}>
          {emergencyTypes.map((type, idx) => (
            <button
              key={idx}
              className={`${styles.emergencyButton} ${selectedType === type ? styles.selected : ''}`}
              onClick={() => {
                setSelectedType(type);
                setCustomType('');
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <input
          placeholder='Custom Emergency Type'
          value={customType}
          onChange={(e) => {
            setCustomType(e.target.value);
            setSelectedType('');
          }}
        />
      </div>

      <div className={styles.severityRating}>
        <p>Severity Rating</p>
        <div className={styles.buttonContainer}>
          {['Low', 'Moderate', 'High'].map((level) => (
            <button
              key={level}
              className={severity === level ? styles.selected : ''}
              onClick={() => setSeverity(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.symptomsContainer}>
        <p>Symptoms/Notes</p>
        <input
          placeholder='Add notes'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button className={styles.submitButton} onClick={handleSubmit}>
        Register Emergency
      </button>
    </div>
  );
}

export default RegisterEmergency;