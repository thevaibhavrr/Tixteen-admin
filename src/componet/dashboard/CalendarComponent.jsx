import '../../style/dashboard/CalendarComponent.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Select from 'react-select';
import 'react-calendar/dist/Calendar.css';
import Calender from './calender';

const CalendarComponent = () => {
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
        <div className='mt-5' >
            {/* switch */}
            <div className='main_calendar_switch_div ' >
                <div>DAILY</div>
                <div>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
                <div>MONTHLY</div>

            </div>
            {/* calendar */}

            <div className="calendar-container">
                {/* 1 */}
                <Calender/>
                <Calender/>
                {/* 2 */}
              
            </div>
        </div>
    );
};

export default CalendarComponent;

