import React, { useState, useEffect } from 'react';

function NewApt({ onAddAppointment }) {
    const [datetime, setDatetime] = useState('');
    const [patientId, setPatientId] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [error, setError] = useState('');
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {

        fetch('/api/patients')
            .then(response => response.json())
            .then(data => setPatients(data))
            .catch(error => {
                console.error('Error fetching patients', error);
                setError('Failed to fetch patients');
            });

        fetch('/api/doctors')  
            .then(response => response.json())
            .then(data => setDoctors(data))
            .catch(error => {
                console.error('Error fetching doctors', error);
                setError('Failed to fetch doctors');
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        fetch('/api/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                datetime,
                patient_id: patientId,  
                doctor_id: doctorId    
            }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then(newAppointment => {
            onAddAppointment(newAppointment);
            setDatetime('');
            setPatientId('');
            setDoctorId('');  
            setError('');
        })
        .catch(error => {
            console.error('Error adding appointment', error);
            setError(error.message);
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Date and Time:
                <input
                    type="datetime-local"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                    required
                />
            </label>
            <label>
                Patient:
                <select
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a patient</option>
                    {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                            {patient.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Doctor:
                <select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a doctor</option>
                    {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">Add Appointment</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default NewApt;
