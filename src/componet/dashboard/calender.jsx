


// import React, { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import '../../style/dashboard/CalendarComponent.css';
// import { useNavigate } from 'react-router-dom';

// const localizer = momentLocalizer(moment);

// const CustomCalendar = ({ events }) => {
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
//     const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     const eventPropGetter = (event) => {
//         const backgroundColor = event.backgroundColor || 'lightgray';
//         const color = event.textColor || 'black';
//         const style = {
//             backgroundColor,
//             color,
//             fontWeight: 'bold',
//             cursor: event.id ? 'pointer' : 'default', // Set cursor to pointer if event has an id
//         };
//         return { style };
//     };

//     const handleMonthChange = (e) => {
//         setSelectedMonth(Number(e.target.value));
//         const newDate = new Date(selectedYear, e.target.value, 1);
//         setCurrentDate(newDate);
//     };

//     const handleYearChange = (e) => {
//         setSelectedYear(Number(e.target.value));
//         const newDate = new Date(e.target.value, selectedMonth, 1);
//         setCurrentDate(newDate);
//     };

//     const handleEventClick = (event) => {
//         if (event.id) {
//             const url = `/campaign/campaign-details/${event.id}`;
//             window.open(url, '_blank'); // Open in new tab
//         }
//     };

//     return (
//         <div className="dashboard_calendar_container">
//             <div className="my-2">
//                 <select className='p-2 mx-3' value={selectedMonth} onChange={handleMonthChange}>
//                     {moment.months().map((month, index) => (
//                         <option key={index} value={index}>
//                             {month}
//                         </option>
//                     ))}
//                 </select>
//                 <select className='p-2' value={selectedYear} onChange={handleYearChange}>
//                     {Array.from({ length: 10 }, (_, i) => i + 2018).map((year) => (
//                         <option key={year} value={year}>
//                             {year}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div>
//                 <Calendar
//                     localizer={localizer}
//                     events={events}
//                     date={currentDate}
//                     view="month"
//                     onNavigate={(date) => setCurrentDate(date)}
//                     style={{ height: 500, width: "600px" }}
//                     eventPropGetter={eventPropGetter}
//                     toolbar={false}
//                     onSelectEvent={handleEventClick}
//                 />
//             </div>
//         </div>
//     );
// };

// export default CustomCalendar;

import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../style/dashboard/CalendarComponent.css';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const CustomCalendar = ({ events }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const navigate = useNavigate();

    const eventPropGetter = (event) => {
        const backgroundColor = event.backgroundColor || 'lightgray';
        const color = event.textColor || 'black';
        const style = {
            backgroundColor,
            color,
            fontWeight: 'bold',
            cursor: event.id ? 'pointer' : 'default',
        };
        return { style };
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

    const handleEventClick = (event) => {
        if (event.id) {
            const url = `/campaign/campaign-details/${event.id}`;
            window.open(url, '_blank');
        }
    };

    return (
        <div className="dashboard_calendar_container">
            <div className="my-2">
                <select className='p-2 mx-3' value={selectedMonth} onChange={handleMonthChange}>
                    {moment.months().map((month, index) => (
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
                <select className='p-2' value={selectedYear} onChange={handleYearChange}>
                    {Array.from({ length: 10 }, (_, i) => i + 2018).map((year) => (
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
                    defaultView="month" 
                    onNavigate={(date) => setCurrentDate(date)}
                    style={{ height: 500, width: "600px" }}
                    eventPropGetter={eventPropGetter}
                    toolbar={false}
                    onSelectEvent={handleEventClick}
                />
            </div>
        </div>
    );
};

export default CustomCalendar;
