import React from 'react'
import CustomCalendar from '../calender';

function Campaigncalender () {
    const events = [
        { title: 'Magic biscuit', start: new Date(2024, 6, 6), end: new Date(2024, 6, 6), allDay: true, backgroundColor: 'lightgreen', textColor: 'black',id:1 },
        { title: 'sun glasses', start: new Date(2024, 6, 12), end: new Date(2024, 6, 12), allDay: true, backgroundColor: '#E23F44', textColor: 'black',id:2 },
    ];
    return (
        <div>
            <div>
                <h3> Campaign  </h3>
            </div>
            <CustomCalendar events={events} />

        </div>
    )
}

export default Campaigncalender