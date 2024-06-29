// import React from 'react'

// function Calender() {
//   return (
//     <div>Calender</div>
//   )
// }

// export default Calender
import '../../style/dashboard/CalendarComponent.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calender = () => {
    const [date, setDate] = useState(new Date());
    const months = [
        { value: 0, label: 'January' },
        { value: 1, label: 'February' },
        { value: 2, label: 'March' },
        { value: 3, label: 'April' },
        { value: 4, label: 'May' },
        { value: 5, label: 'June' },
        { value: 6, label: 'July' },
        { value: 7, label: 'August' },
        { value: 8, label: 'September' },
        { value: 9, label: 'October' },
        { value: 10, label: 'November' },
        { value: 11, label: 'December' },
    ];

    const years = Array.from({ length: 10 }, (_, i) => {
        const year = 2024 + i;
        return { value: year, label: year.toString() };
    });

    const handleCalendarChange = (newDate) => {
        setDate(newDate);
    };

    const getMonthName = (monthIndex) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[monthIndex];
    };

    return (
        <div >
            <div className='calendar_main_div' >
                <h3>{getMonthName(date.getMonth())} {date.getFullYear()}</h3>
                <Calendar
                    value={date}
                    onChange={handleCalendarChange}
                    className="custom-calendar"
                    nextLabel={"Next"}
                    prevLabel={"Back"}
                    next2Label={null}
                    prev2Label={null}
                    formatDay={(locale, date) => date.getDate().toString()}
                />
            </div>
        </div>
    );
};

export default Calender;

