// import '../../style/dashboard/CalendarComponent.css';
// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// const Calender = () => {
//     const [date, setDate] = useState(new Date());
//     const months = [
//         { value: 0, label: 'January' },
//         { value: 1, label: 'February' },
//         { value: 2, label: 'March' },
//         { value: 3, label: 'April' },
//         { value: 4, label: 'May' },
//         { value: 5, label: 'June' },
//         { value: 6, label: 'July' },
//         { value: 7, label: 'August' },
//         { value: 8, label: 'September' },
//         { value: 9, label: 'October' },
//         { value: 10, label: 'November' },
//         { value: 11, label: 'December' },
//     ];

//     const years = Array.from({ length: 10 }, (_, i) => {
//         const year = 2024 + i;
//         return { value: year, label: year.toString() };
//     });

//     const handleCalendarChange = (newDate) => {
//         setDate(newDate);
//     };

//     const getMonthName = (monthIndex) => {
//         const months = [
//             'January', 'February', 'March', 'April', 'May', 'June',
//             'July', 'August', 'September', 'October', 'November', 'December'
//         ];
//         return months[monthIndex];
//     };

//     return (
//         <div >
//             <div className='calendar_main_div' >
//                 <h3>{getMonthName(date.getMonth())} {date.getFullYear()}</h3>
//                 <Calendar
//                     value={date}
//                     onChange={handleCalendarChange}
//                     className="custom-calendar"
//                     nextLabel={"Next"}
//                     prevLabel={"Back"}
//                     next2Label={null}
//                     prev2Label={null}
//                     formatDay={(locale, date) => date.getDate().toString()}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Calender;


// import '../../style/dashboard/CalendarComponent.css';
// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// const Calender = () => {
//     const [date, setDate] = useState(new Date());

//     const data = [
//         { day: 'Saturday', week: 1, month: 6, text: 'Hello' },  // July 1st Saturday
//         { day: 'Friday', week: 2, month: 6, text: 'Jai' }       // July 2nd Friday
//     ];

//     const handleCalendarChange = (newDate) => {
//         setDate(newDate);
//     };

//     const getMonthName = (monthIndex) => {
//         const months = [
//             'January', 'February', 'March', 'April', 'May', 'June',
//             'July', 'August', 'September', 'October', 'November', 'December'
//         ];
//         return months[monthIndex];
//     };

//     const getTextForDate = (currentDate) => {
//         const currentMonth = currentDate.getMonth();
//         const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
//         const currentWeek = Math.ceil((currentDate.getDate() - 1) / 7) + 1;

//         const match = data.find(item => item.day === currentDay && item.week === currentWeek && item.month === currentMonth);

//         return match ? match.text : null;
//     };

//     const renderDay = (date) => {
//         const text = getTextForDate(date);
//         return (
//             <div>
//                 {date.getDate()}
//                 {text && <div className="custom-text">{text}</div>}
//             </div>
//         );
//     };

//     return (
//         <div>
//             <div className='calendar_main_div'>
//                 <h3>{getMonthName(date.getMonth())} {date.getFullYear()}</h3>
//                 <Calendar
//                     value={date}
//                     onChange={handleCalendarChange}
//                     className="custom-calendar"
//                     nextLabel={"Next"}
//                     prevLabel={"Back"}
//                     next2Label={null}
//                     prev2Label={null}
//                     formatDay={(locale, date) => renderDay(date)}
//                 />
//             </div>
//         </div>
//     );
// };

// export default Calender;

import '../../style/dashboard/CalendarComponent.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calender = () => {
    const [date, setDate] = useState(new Date());

    const data = [
        { day: 'Saturday', week: 2, month: 6, text: 'Hello', backgroundColor: 'lightblue', textColor: 'black' },  // July 1st Saturday
        { day: 'Friday', week: 2, month: 6, text: 'Jai', backgroundColor: 'lightgreen', textColor: 'blue' },       // July 2nd Friday
        { day: 'Sunday', week: 2, month: 6, text: '42', backgroundColor: 'lightred', textColor: 'blue' }       // July 2nd Friday
    ];

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

    const getTextForDate = (currentDate) => {
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
        const currentWeek = Math.ceil((currentDate.getDate() - 1) / 7) + 1;

        const match = data.find(item => item.day === currentDay && item.week === currentWeek && item.month === currentMonth);

        return match ? match : null;
    };

    const renderDay = (date) => {
        const match = getTextForDate(date);
        const style = match ? { backgroundColor: match.backgroundColor, color: match.textColor, fontWeight: 'bolder' } : {};

        return (
            <div style={style} className="custom-day">
                {date.getDate()}
                {match && <div className="custom-text">{match.text}</div>}
            </div>
        );
    };

    return (
        <div>
            <div className='calendar_main_div'>
                <h3>{getMonthName(date.getMonth())} {date.getFullYear()}</h3>
                <Calendar
                    value={date}
                    onChange={handleCalendarChange}
                    className="custom-calendar"
                    nextLabel={"Next"}
                    prevLabel={"Back"}
                    next2Label={null}
                    prev2Label={null}
                    formatDay={(locale, date) => renderDay(date)}
                />
            </div>
        </div>
    );
};

export default Calender;
