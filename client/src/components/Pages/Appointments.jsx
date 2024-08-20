// import React from 'react'
import React, {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'


function Appointments() {

  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    fetch('/api/appointments')
      .then((response) => response.json())
      .then((data) => setAppointments(data))
      .catch((error) => console.error('Error fetching appointments', error));

  }, []);
  
  return (
    <div className='appointments-container'>
      <Calendar
        onChange={setDate}
        value={date}
      />
      <div className='appointment-details'>
        {appointments
          .filter(appointment => new Date(appointment.datetime).toDateString() === date.toDateString())
          .map((appointment, index) => (
            <div key={index}>
              <p><strong>{appointment.patient.name}</strong></p>
              <p><strong>{new Date(appointment.datetime).toLocaleTimeString()}</strong></p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Appointments;
