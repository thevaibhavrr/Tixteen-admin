
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../style/dashboard/CalendarComponent.css';

const localizer = momentLocalizer(moment);

const events = [
    { title: 'Hello', start: new Date(2024, 6, 6), end: new Date(2024, 6, 6), allDay: true, backgroundColor: 'lightblue', textColor: 'black' },
    { title: 'Jai', start: new Date(2024, 6, 12), end: new Date(2024, 6, 12), allDay: true, backgroundColor: 'lightgreen', textColor: 'blue' },
];

const CustomCalendar = ({events}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

    const eventPropGetter = (event) => {
        const backgroundColor = event.backgroundColor || 'lightgray';
        const color = event.textColor || 'black';
        return { style: { backgroundColor, color, fontWeight: 'bold' } };
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(Number(e.target.value));
        const newDate = new Date(selectedYear, e.target.value, 1);
        setCurrentDate(newDate);
    };

    const handleYearChange = (e) => {
        setSelectedYear(Number(e.target.value));
        const newDate = new Date(e.target.value, selectedMonth, 1);
        setCurrentDate(newDate);
    };

    return (
        <div className="dashboard_calendar_container  ">
            <div className=" my-2 ">
                <select className=' p-2 mx-3 '  value={selectedMonth} onChange={handleMonthChange}>
                    {moment.months().map((month, index) => (
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
                <select  className=' p-2' value={selectedYear} onChange={handleYearChange}>
                    {Array.from({ length: 10 }, (_, i) => i + 2024).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div>

                <Calendar
                    localizer={localizer}
                    events={events}
                    date={currentDate}
                    view="month"
                    onNavigate={(date) => setCurrentDate(date)}
                    style={{ height: 500, width: "600px" }}
                    eventPropGetter={eventPropGetter}
                    toolbar={false}
                />
            </div>
        </div>
    );
};

export default CustomCalendar;
