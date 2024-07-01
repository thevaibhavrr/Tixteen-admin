import React from 'react'
import CustomCalendar from '../calender';

function Influencercalender() {
    const events = [
        { title: '1', start: new Date(2024, 6, 6), end: new Date(2024, 6, 6), allDay: true, backgroundColor: 'lightgreen', textColor: 'black' },
        { title: '10', start: new Date(2024, 6, 12), end: new Date(2024, 6, 12), allDay: true, backgroundColor: '#E23F44', textColor: 'black' },
    ];
    return (
        <div>
            <div>
                <h3> Influencer </h3>
            </div>
            <CustomCalendar events={events} />

        </div>
    )
}

export default Influencercalender