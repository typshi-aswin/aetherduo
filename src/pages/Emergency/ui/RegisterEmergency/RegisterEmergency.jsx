import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import styles from './RegisterEmergency.module.css';
import { serverTimestamp } from 'firebase/firestore';

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

        try {
            const appointmentsSnapshot = await getDocs(collection(db, 'appointments'));
            const emergencySnapshot = await getDocs(collection(db, 'emergency_appointments'));

            const appointments = appointmentsSnapshot.docs.map(doc => doc.data());
            const emergencies = emergencySnapshot.docs.map(doc => doc.data());

            // Merge both arrays and extract all timestamps
            const allTimestamps = [];

            appointments.forEach(app => {
                if (app.starttime?.toDate) {
                    allTimestamps.push(app.starttime.toDate().getTime());
                }
            });

            emergencies.forEach(em => {
                if (em.timestamp?.toDate) {
                    allTimestamps.push(em.timestamp.toDate().getTime());
                }
            });

            // Generate today's 30-min slots
            const today = new Date();
            today.setSeconds(0);
            today.setMilliseconds(0);
            today.setHours(8, 0, 0, 0); // start at 8:00 AM

            const slots = [];
            for (let i = 0; i < 18; i++) { // until 5:00 PM
                const slotTime = new Date(today.getTime() + i * 30 * 60000);
                slots.push(slotTime);
            }

            const occupied = new Set(allTimestamps);

            let selectedSlot = null;

            for (const slot of slots) {
                if (!occupied.has(slot.getTime())) {
                    selectedSlot = slot;
                    break;
                }
            }

            if (!selectedSlot) {
                // No free slot found, reschedule earliest appointment
                const sortedAppointments = appointments.sort((a, b) => a.starttime.toDate() - b.starttime.toDate());
                const rescheduleTarget = sortedAppointments[0];

                if (rescheduleTarget) {
                    selectedSlot = rescheduleTarget.starttime.toDate();

                    const newStart = new Date(selectedSlot.getTime() + 30 * 60000);
                    const newEnd = new Date(newStart.getTime() + 30 * 60000);

                    await addDoc(collection(db, 'appointments'), {
                        ...rescheduleTarget,
                        starttime: newStart,
                        endtime: newEnd,
                        notes: (rescheduleTarget.notes || '') + ' (Rescheduled for emergency)'
                    });
                }
            }

            if (!selectedSlot) {
                alert('No available slots or appointments to reschedule.');
                return;
            }

            const newEmergency = {
                patient_name: patientName,
                phone: Number(phone),
                emergency_type: emergencyType,
                severity,
                notes,
                doctor_name: '',
                timestamp: selectedSlot,     
                createdAt: serverTimestamp()  
            };


            await addDoc(collection(db, 'emergency_appointments'), newEmergency);
            alert(`Emergency scheduled at ${selectedSlot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}!`);

            // Reset fields
            setPatientName('');
            setPhone('');
            setSelectedType('');
            setCustomType('');
            setSeverity('');
            setNotes('');

        } catch (err) {
            console.error("Error handling emergency scheduling:", err);
            alert("Something went wrong.");
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
                Register Emergency to the Earliest Available Slot
            </button>
        </div>
    );
}

export default RegisterEmergency;