import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    fetch('/api/appointments')
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error('Error fetching appointments', error));
  }, []);

  const renderContent = (date) => {
    const dayAppointments = appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.datetime).toDateString();
      const calendarDate = date.toDateString();
      console.log("Appointment Date:", appointmentDate); // Debugging line
      console.log("Calendar Date:", calendarDate);       // Debugging line
      return appointmentDate === calendarDate;
    });

    if (dayAppointments.length > 0) {
      return (
        <div className="appointment-details">
          <span className="dot"></span>
          <div className="appointment-info">
            {dayAppointments.map((appointment) => (
              <div key={appointment.id}>
                <span>{appointment.patient?.name}</span> {/* Ensure patient name is available */}
                <span>{new Date(appointment.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="appointments-container">
      <Calendar
        value={date}
        onChange={setDate}
        tileContent={({ date, view }) =>
          view === 'month' && renderContent(date)
        }
      />
    </div>
  );
}

export default Appointments;

