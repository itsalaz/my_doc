import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PatientCard from '../PatientCard';
import NewPatient from './NewPatient';

function PatientList({ search }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('/api/patients')
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddPatient = (newPatient) => {
    setPatients(prevPatients => [newPatient, ...prevPatients]);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setPatients(prevPatients => prevPatients.filter(patient => patient.id !== id));
  };

  return (
    <main className="patient-container">
      <div className="patient-list">
       <NewPatient  handleAddPatient={handleAddPatient}/>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} handleDelete={() => handleDelete(patient.id)} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default PatientList;


