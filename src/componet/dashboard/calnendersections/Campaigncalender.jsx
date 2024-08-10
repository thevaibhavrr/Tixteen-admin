// import React from 'react'
// import CustomCalendar from '../calender';

// function Campaigncalender () {
//     const events = [
//         { title: 'Magic biscuit', start: new Date(2024, 6, 6), end: new Date(2024, 6, 6), allDay: true, backgroundColor: 'lightgreen', textColor: 'black',id:1 },
//         { title: 'sun glasses', start: new Date(2024, 6, 12), end: new Date(2024, 6, 12), allDay: true, backgroundColor: '#E23F44', textColor: 'black',id:2 },
//     ];
//     return (
//         <div>
//             <div>
//                 <h3> Campaign  </h3>
//             </div>
//             <CustomCalendar events={events} />

//         </div>
//     )
// }

// export default Campaigncalender
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CustomCalendar from '../calender';
// import {makeApi} from "../../../api/callApi.tsx";

// function Campaigncalender() {
//     const [events, setEvents] = useState([]);
//     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//     // const [selectedYear, setSelectedYear] = useState(2023);

//     useEffect(() => {
//         const fetchCampaigns = async () => {
//             try {
//                 const response = await makeApi(`/v1/admin/api/filtered-campaign-summary?month=${selectedMonth}&year=${selectedYear}`,"GET");
//                 console.log("---",response.data.data)
//                 if (response.data.success) {
//                     const campaigns = response.data.data.map(campaign => ({
//                         title: campaign.campaign_name,
//                         start: new Date(campaign.created_date),
//                         end: new Date(campaign.created_date),
//                         allDay: true,
//                         backgroundColor: 'lightgreen', // You can customize this based on your needs
//                         textColor: 'black', // You can customize this based on your needs
//                         id: campaign.id
//                     }));
//                     setEvents(campaigns);
//                 }
//             } catch (error) {
//                 console.error('Error fetching campaigns:', error);
//             }
//         };

//         fetchCampaigns();
//     }, [selectedMonth, selectedYear]);

//     const handleMonthChange = (month) => {
//         setSelectedMonth(month);
//     };

//     const handleYearChange = (year) => {
//         setSelectedYear(year);
//     };

//     return (
//         <div>
//             <div>
//                 <h3> Campaign </h3>
//             </div>
//             <CustomCalendar events={events} onMonthChange={handleMonthChange} onYearChange={handleYearChange} />
//         </div>
//     );
// }

// export default Campaigncalender;


// import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { useNavigate } from 'react-router-dom';
// import { makeApi } from "../../../api/callApi.tsx";

// const localizer = momentLocalizer(moment);

// function Campaigncalender() {
//     const [events, setEvents] = useState([]);
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     useEffect(() => {
//         const fetchCampaigns = async () => {
//             try {
//                 const response = await makeApi(`/v1/admin/api/filtered-campaign-summary?month=${selectedMonth + 1}&year=${selectedYear}`, "GET");
//                 console.log("---", response.data.data);
//                 if (response.data.success) {
//                     const campaigns = response.data.data.map(campaign => ({
//                         title: campaign.campaign_name,
//                         start: new Date(campaign.created_date),
//                         end: new Date(campaign.created_date),
//                         allDay: true,
//                         backgroundColor: 'lightgreen', // You can customize this based on your needs
//                         textColor: 'black', // You can customize this based on your needs
//                         id: campaign.id
//                     }));
//                     setEvents(campaigns);
//                 }
//             } catch (error) {
//                 console.error('Error fetching campaigns:', error);
//             }
//         };

//         fetchCampaigns();
//     }, [selectedMonth, selectedYear]);

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
//         const month = Number(e.target.value);
//         setSelectedMonth(month);
//         const newDate = new Date(selectedYear, month, 1);
//         setCurrentDate(newDate);
//     };

//     const handleYearChange = (e) => {
//         const year = Number(e.target.value);
//         setSelectedYear(year);
//         const newDate = new Date(year, selectedMonth, 1);
//         setCurrentDate(newDate);
//     };

//     const handleEventClick = (event) => {
//         if (event.id) {
//             const url = `/campaign/campaign-details/${event.id}`;
//             window.open(url, '_blank'); // Open in new tab
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <h3> Campaign </h3>
//             </div>
//             <div className="dashboard_calendar_container">
//                 <div className="my-2">
//                     <select className='p-2 mx-3' value={selectedMonth} onChange={handleMonthChange}>
//                         {moment.months().map((month, index) => (
//                             <option key={index} value={index}>
//                                 {month}
//                             </option>
//                         ))}
//                     </select>
//                     <select className='p-2' value={selectedYear} onChange={handleYearChange}>
//                         {Array.from({ length: 10 }, (_, i) => i + 2018).map((year) => (
//                             <option key={year} value={year}>
//                                 {year}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <Calendar
//                         localizer={localizer}
//                         events={events}
//                         date={currentDate}
//                         view="month"
//                         onNavigate={(date) => setCurrentDate(date)}
//                         style={{ height: 500, width: "600px" }}
//                         eventPropGetter={eventPropGetter}
//                         toolbar={false}
//                         onSelectEvent={handleEventClick}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Campaigncalender;

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../../style/dashboard/CalendarComponent.css';
import { useNavigate } from 'react-router-dom';
import { makeApi } from "../../../api/callApi.tsx";

const localizer = momentLocalizer(moment);

function Campaigncalender() {
    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [showModal, setShowModal] = useState(false);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await makeApi(`/v1/admin/api/filtered-campaign-summary?month=${selectedMonth + 1}&year=${selectedYear}`, "GET");
                if (response.data.success) {
                    const campaigns = response.data.data.map(campaign => ({
                        title: campaign.campaign_name,
                        start: new Date(campaign.created_date),
                        end: new Date(campaign.created_date),
                        allDay: true,
                        backgroundColor: 'lightgreen', // You can customize this based on your needs
                        textColor: 'black', // You can customize this based on your needs
                        id: campaign.id,
                        campaign_no : campaign.campaign_no
                    }));
                    setEvents(campaigns);
                }
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchCampaigns();
    }, [selectedMonth, selectedYear]);

    const eventPropGetter = (event) => {
        const backgroundColor = event.backgroundColor || 'lightgray';
        const color = event.textColor || 'black';
        const style = {
            backgroundColor,
            color,
            fontWeight: 'bold',
            cursor: event.id ? 'pointer' : 'default', // Set cursor to pointer if event has an id
        };
        return { style };
    };

    const handleMonthChange = (e) => {
        const month = Number(e.target.value);
        setSelectedMonth(month);
        const newDate = new Date(selectedYear, month, 1);
        setCurrentDate(newDate);
    };

    const handleYearChange = (e) => {
        const year = Number(e.target.value);
        setSelectedYear(year);
        const newDate = new Date(year, selectedMonth, 1);
        setCurrentDate(newDate);
    };

    const handleEventClick = (event) => {
        console.log(event);
        if (event.campaign_no) {
            const url = `/campaign/campaign-details/${event.campaign_no}`;
            window.open(url, '_blank'); 
        }
    };

    const handleMoreClick = (events) => {
        setSelectedDateEvents(events);
        setShowModal(true);
    };

    const renderEvent = ({ event }) => {
        const eventsForDate = events.filter(e => moment(e.start).isSame(event.start, 'day'));
        if (eventsForDate.length > 2) {
            return (
                <div onClick={(e) => { e.stopPropagation(); handleMoreClick(eventsForDate); }}>
                    +{eventsForDate.length - 1} more
                </div>
            );
        } else {
            return (
                <div onClick={() => handleEventClick(event)}>
                    {event.title}
                </div>
            );
        }
    };

    const closeModal = () => setShowModal(false);

    return (
        <div>
            <div>
                <h3> Campaign </h3>
            </div>
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
                        {Array.from({ length: 10 }, (_, i) => i + 2020).map((year) => (
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
                        components={{
                            event: renderEvent
                        }}
                    />
                </div>
            </div>
            {showModal && (
                <div className="custom-modal">
                    <div className="custom-modal-content">
                        <h2>Events on this day</h2>
                        <ul>
                            {selectedDateEvents.map((event, index) => (
                                <li key={index} onClick={() => handleEventClick(event)}>
                                    {event.title}
                                </li>
                            ))}
                        </ul>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Campaigncalender;
