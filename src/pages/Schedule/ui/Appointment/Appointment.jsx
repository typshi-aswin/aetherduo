import styles from './Appointment.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../../../firebase';

function Appointment({ date }) {
  const [existing, setExisting] = useState(true);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [procedures, setProcedures] = useState([]);

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [notes, setNotes] = useState('');
  const [searchInput, setSearchInput] = useState('');
const [patients, setPatients] = useState([]);
const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
  const fetchPatients = async () => {
    const snapshot = await getDocs(collection(db, 'patients'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPatients(data);
  };
  fetchPatients();
}, []);

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
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(data);
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchProcedures = async () => {
      const snapshot = await getDocs(collection(db, 'procedures'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProcedures(data);
    };
    fetchProcedures();
  }, []);

  const handleSubmit = async () => {
    if (!startTime || !endTime || !selectedDoctor || !selectedProcedure || (!existing && !patientName)) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      const dateStr = localDate.toISOString().split('T')[0];
      console.log(dateStr)
      const start = new Date(`${dateStr} ${startTime}`);
      const end = new Date(`${dateStr} ${endTime}`);

      const appointmentData = {
        patientName,
        phone,
        email,
        doctor: selectedDoctor,
        procedure: selectedProcedure,
        notes,
        checkin_status: 'not_checkedin',
        date: dateStr,
        starttime: Timestamp.fromDate(start),
        endtime: Timestamp.fromDate(end)
      };

      await addDoc(collection(db, 'appointments'), appointmentData);
      alert('Appointment scheduled!');
    } catch (err) {
      console.error('Error scheduling appointment:', err);
      alert('Something went wrong.');
    }
  };

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
  <>
    <input
      type="text"
      placeholder="Search patient name"
      className={styles.searchInput}
      value={searchInput}
      onChange={(e) => {
        const val = e.target.value;
        setSearchInput(val);
        const filtered = patients.filter(p =>
          p.name.toLowerCase().includes(val.toLowerCase())
        );
        setFilteredPatients(filtered);
      }}
    />
    {searchInput && filteredPatients.length > 0 && (
      <div className={styles.searchResults}>
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className={styles.resultItem}
            onClick={() => {
  setPatientName(patient.name);
  setPhone(patient.phone);
  setEmail(patient.email);
  setSearchInput(patient.name); 
  setFilteredPatients([]);
}}
          >
            <strong>{patient.name}</strong> — {patient.phone}
          </div>
        ))}
      </div>
    )}
    {searchInput && filteredPatients.length === 0 && searchInput !== "" && (
      <div className={styles.noResults}>No matching patients</div>
    )}
  </>
)}


      {!existing && (
        <div className={styles.inputContainer}>
          <input placeholder="Name" value={patientName} onChange={e => setPatientName(e.target.value)} />
          <input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      )}

      <div className={styles.dateContainer}>
        <p>Time Slot</p>
        <div className={styles.dateSlot}>
          <select className={styles.dropdown} value={startTime} onChange={e => setStartTime(e.target.value)}>
            <option value="">Start Time</option>
            {availableTimes.map((time, idx) => (
              <option key={idx} value={time}>{time}</option>
            ))}
          </select>

          <select className={styles.dropdown} value={endTime} onChange={e => setEndTime(e.target.value)}>
            <option value="">End Time</option>
            {availableTimes.map((time, idx) => (
              <option key={idx} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.dentistContainer}>
        <p>Assign Dentist</p>
        <select className={styles.dropdown} value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)}>
          <option value="">Select Doctor</option>
          {doctors.map(doc => (
            <option key={doc.id} value={doc.name}>
              {doc.name}{doc.speciality ? ` (${doc.speciality})` : ''}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.treatmentContainer}>
        <p>Treatment/Procedure</p>
        <select className={styles.dropdown} value={selectedProcedure} onChange={e => setSelectedProcedure(e.target.value)}>
          <option value="">Select Procedure</option>
          {procedures.map(proc => (
            <option key={proc.id} value={proc.name}>{proc.name}</option>
          ))}
        </select>
        <input className={styles.inputField} type="text" placeholder="Additional Notes or Remarks" value={notes} onChange={e => setNotes(e.target.value)} />
      </div>

      <button className={styles.scheduleBtn} type="button" onClick={handleSubmit}>Schedule Appointment</button>
    </div>
  );
}

export default Appointment;