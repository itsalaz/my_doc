import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NewApt from './NewApt';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  useEffect(() => {
    fetch('/api/appointments')
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error('Error fetching appointments', error));
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const dayAppointments = appointments.filter((appointment) => {
      return new Date(appointment.datetime).toDateString() === newDate.toDateString();
    });
    setSelectedAppointments(dayAppointments);
  };

  function handleAddAppointment(newAppointment) {
    setAppointments([...appointments, newAppointment]);
  }

  return (
    <div className="appointments-container">
      <Calendar
        value={date}
        onChange={handleDateChange}
        tileContent={({ date, view }) =>
          view === 'month' && appointments.some(appointment =>
            new Date(appointment.datetime).toDateString() === date.toDateString()
          ) ? <span className='dot'></span> : null
        }
      />

      <div className="appointment-list">
        {selectedAppointments.length > 0 ? (
          selectedAppointments.map((appointment) => (
            <div key={appointment.id} className="appointment-item">
              <span>{appointment.patient?.name}</span> - 
              <span>{new Date(appointment.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          ))
        ) : (
          <p>No appointments for this date.</p>
        )}
      </div>
      <NewApt onAddAppointment={handleAddAppointment} />
    </div>
  );
}
export default Appointments;

