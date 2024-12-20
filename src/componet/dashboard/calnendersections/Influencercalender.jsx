import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeApi } from '../../../api/callApi.tsx';
import "../../../style/dashboard/influencerCalender.css";
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const localizer = momentLocalizer(moment);

const Influencercalender = () => {
    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [loading, setLoading] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState(null);

    const fetchEvents = async (month, year) => {
        setLoading(true);
        try {
            const response = await makeApi(`/v1/admin/api/get-user-counts-by-date?month=${month}&year=${year}`, "GET");
            const processedEvents = response.data.data.map(event => {
                const users = event.users || [];
                return {
                    ...event,
                    title: users.length <= 2
                        ? users.map(user => `<img src="${user.profile_img && user.profile_img.includes('http://res.cloudinary.com')
                            ? user.profile_img
                            : `https://storage.tixteen.com/assets/${user.profile_img}`
                            }" alt="${user.user_name}" class="small-user-image" />`).join(" ")
                        : `${users.length} ${event.title.split(' ')[1]}`,
                    users,
                };
            });

            setEvents(processedEvents);
        } catch (error) {
            console.error('Error fetching events', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear]);

    const handleMonthChange = (e) => {
        const newMonth = Number(e.target.value);
        setSelectedMonth(newMonth);
        const newDate = new Date(selectedYear, newMonth, 1);
        setCurrentDate(newDate);
        fetchEvents(newMonth, selectedYear);
    };

    const handleYearChange = (e) => {
        const newYear = Number(e.target.value);
        setSelectedYear(newYear);
        const newDate = new Date(newYear, selectedMonth, 1);
        setCurrentDate(newDate);
        fetchEvents(selectedMonth, newYear);
    };

    const eventPropGetter = (event) => {
        const style = {
            backgroundColor: event.backgroundColor || 'lightgray',
            color: event.textColor || 'black',
            fontWeight: 'bold',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            margin: '2px 0',
        };
        return { className: 'custom-event', style };
    };

    const handleEventClick = (event) => {
        setSelectedUsers(event.users);
    };

    return (
        <div className='w-50'>
            <div>
                <h3>Influencer</h3>
            </div>
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
            {loading ? (
                <div>
                    <PrimaryLoader />
                </div>
            ) : (
                <div className='dashboard_calendar_container'>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        date={currentDate}
                        defaultView="month"
                        onNavigate={(date) => setCurrentDate(date)}
                        style={{ height: "100%", width: "100%", minHeight: "500px" }}
                        eventPropGetter={eventPropGetter}
                        toolbar={false}
                        className="influencer-calendar"
                        onSelectEvent={handleEventClick}
                        components={{
                            event: CustomEvent,
                        }}
                    />
                </div>
            )}
            {selectedUsers && (
                <UserSummaryPopup
                    users={selectedUsers}
                    onClose={() => setSelectedUsers(null)}
                />
            )}
        </div>
    );
};

const CustomEvent = ({ event }) => {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: event.title }}
            className="event-content"
        ></div>
    );
};

const UserSummaryPopup = ({ users, onClose }) => {
    return (
        <div className="user-summary-popup">
            <div className="user-summary-header">
                <h2>User Summary</h2>
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
            <div className="user-summary-content">
                {users.map((user, index) => (
                    <div key={index} className="user-details">
                        <LazyLoadImage
                            effect="blur"
                            src={
                                user.profile_img && user.profile_img.includes('http://res.cloudinary.com')
                                    ? user.profile_img
                                    : `https://storage.tixteen.com/assets/${user.profile_img}`
                            }
                            loading='lazy'
                            alt={user.user_name}
                            className="all-user-user-image"
                        />
                        <div className="user-info">
                            <h3>{user.user_name}</h3>
                            <p><strong>Industry:</strong> {user.industry}</p>
                            <p><strong>Verification:</strong> {user.verification}</p>
                        </div>
                        <Link to={`/user/user-details/${user._id}`} target='_blank' className="view-profile">View Profile</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Influencercalender;
