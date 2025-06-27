import styles from './Appointment.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';

function Appointment() {
  const [existing, setExisting] = useState(true);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [procedures, setProcedures] = useState([]);

  // generate 30-min interval future times
  useEffect(() => {
    const generateTimeSlots = () => {
      const now = new Date();
      now.setSeconds(0);
      now.setMilliseconds(0);

      const minutes = now.getMinutes();
      const roundedMinutes = Math.ceil(minutes / 30) * 30;
      now.setMinutes(roundedMinutes);
      const slots = [];

      for (let i = 0; i < 12; i++) {
        const slot = new Date(now.getTime() + i * 30 * 60000);
        const formatted = slot.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });
        slots.push(formatted);
      }

      setAvailableTimes(slots);
    };

    generateTimeSlots();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      const snapshot = await getDocs(collection(db, 'doctors'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDoctors(data);
    };

    fetchDoctors(); 
  }, []);

  useEffect(() => {
    const fetchProcedures = async () => {
      const snapshot = await getDocs(collection(db, 'procedures'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProcedures(data);
    };

    fetchProcedures();
  }, []);

  return (
    <div className={styles.container}>
      <p>Create Appointment</p>

      <div className={styles.innerContainer1}>
        <p>Patient Selection</p>
        <div className={styles.buttonContainer}>
          <button
            className={existing ? styles.activeButton : styles.inactiveButton}
            onClick={() => setExisting(true)}
          >
            Existing
          </button>
          <button
            className={existing ? styles.inactiveButton : styles.activeButton}
            onClick={() => setExisting(false)}
          >
            New Patient
          </button>
        </div>
      </div>

      {existing && (
        <input
          type="text"
          placeholder="Search patient name"
          className={styles.searchInput}
        />
      )}

      {!existing && (
        <div className={styles.inputContainer}>
          <input placeholder="Name" />
          <input placeholder="Phone Number" />
          <input placeholder="Email" />
        </div>
      )}

      <div className={styles.dateContainer}>
        <p>Time Slot</p>
        <div className={styles.dateSlot}>
          <select
            className={styles.dropdown}
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
          >
            <option value="">Start Time</option>
            {availableTimes.map((time, idx) => (
              <option key={idx} value={time}>
                {time}
              </option>
            ))}
          </select>

          <select
            className={styles.dropdown}
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
          >
            <option value="">End Time</option>
            {availableTimes.map((time, idx) => (
              <option key={idx} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.dentistContainer}>
        <p>Assign Dentist</p>
        <select className={styles.dropdown}>
          <option value="">Select Doctor</option>
          {doctors.map(doc => (
            <option key={doc.id} value={doc.name}>
              {doc.name}{doc.speciality ? ` (${doc.speciality})` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.treatmentContainer}>
        <p>Treatment/Procedure</p>
        <select className={styles.dropdown}>
          <option value="">Select Procedure</option>
          {procedures.map(proc => (
            <option key={proc.id} value={proc.name}>
              {proc.name}
            </option>
          ))}
        </select>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Additional Notes or Remarks"
        />
      </div>
    </div>
  );
}

export default Appointment;