import React from 'react'


function Appointments() {
  
  return (
    <div className="appointments-container">
      <button></button>
      <h1 className='month-year'></h1>
      <button></button>
      <table className="appointment">
        <thead>
          <tr>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Hi Appointment</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Appointments;