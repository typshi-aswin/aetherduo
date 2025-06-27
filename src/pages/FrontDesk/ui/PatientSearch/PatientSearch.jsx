import { useState } from 'react';
import styles from './PatientSearch.module.css';
import rawData from '../../../dummypatients.json';



function PatientSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const patientData = rawData.patients;

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredPatients([]);
      return;
    }

    const results = patientData.filter((patient) =>
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
              <span>{patient.id}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientSearch;
