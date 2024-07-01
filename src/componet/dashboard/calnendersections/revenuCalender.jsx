import React from 'react'
import CustomCalendar from '../calender'

function RevenuCalender() {
  const events = [
    { title: '500', start: new Date(2024, 6, 6), end: new Date(2024, 6, 6), allDay: true, backgroundColor: 'lightgreen', textColor: 'black' },
    { title: '1000', start: new Date(2024, 6, 12), end: new Date(2024, 6, 12), allDay: true, backgroundColor: 'lightgreen', textColor: 'blue' },
  ];

  return (
    <div>
      <div>
        <h3>Revenue</h3>
      </div>
      <CustomCalendar events={events} />
    </div>
  )
}

export default RevenuCalender