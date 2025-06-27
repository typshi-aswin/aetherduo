import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../../firebase";
import styles from './PatientSearch.module.css';

function PatientSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [allPatients, setAllPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'patients'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredPatients([]);
      return;
    }

    const results = allPatients.filter((patient) =>
      patient.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(results);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Search Patient Records</p>
      </div>

      <input
        type="text"
        placeholder="Type patient name..."
        className={styles.searchInput}
        value={searchQuery}
        onChange={handleInputChange}
      />

      {filteredPatients.length > 0 && (
        <div className={styles.resultsContainer}>
          {filteredPatients.map((patient, index) => (
            <div key={index} className={styles.resultItem}>
              <p>{patient.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientSearch;