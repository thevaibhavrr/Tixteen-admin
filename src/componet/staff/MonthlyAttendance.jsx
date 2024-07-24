
import React, { useState, useEffect } from 'react';
import '../../style/dashboard/MonthlyAttendance.css';
import { makeApi } from '../../api/callApi.tsx';
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
import CustomPopup from '../../utils/CustomPopup.jsx';

const MonthlyAttendance = () => {
    const [loading, setLoading] = useState(true);
    const [monthlyData, setMonthlyData] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [allAdmins, setAllAdmins] = useState([]);
    const [Isadmin, setIsadmin] = useState("");
    const [selectedStaff, setSelectedStaff] = useState("");
    const [popupData, setPopupData] = useState({ isOpen: false, date: '', type: '' });

    const fetchAllAdmins = async () => {
        try {
            const response = await makeApi(`/v1/admin/api/get-all-admins`, "GET");
            setAllAdmins(response.data.data);
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    useEffect(() => {
        fetchAllAdmins();
    }, []);

    useEffect(() => {
        const fetchMonthlyData = async () => {
            setLoading(true);
            try {
                const url = selectedStaff ? `/v1/get-monthly-attendance-data/${selectedStaff}?month=${currentMonth}&year=${currentYear}` : `/v1/get-monthly-attendance-data?month=${currentMonth}&year=${currentYear}`;
                const response = await makeApi(url, "GET");
                setMonthlyData(response.data.data);
                setIsadmin(response.data.user);
            } catch (error) {
                console.error('Error fetching monthly data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMonthlyData();
    }, [currentMonth, currentYear, selectedStaff]);

    const handleMonthChange = (e) => {
        setCurrentMonth(parseInt(e.target.value));
    };

    const handleYearChange = (e) => {
        setCurrentYear(parseInt(e.target.value));
    };

    const openPopup = (date, type) => {
        setPopupData({ isOpen: true, date, type });
    };

    const closePopup = () => {
        setPopupData({ isOpen: false, date: '', type: '' });
    };

    const handleSubmit = async ({ hour, minute, date, type }) => {
        try {
            const body = type === 'attendance'
                ? { staff_id: selectedStaff, hour, minute, date }
                : { staff_id: selectedStaff, hour: '0', minute: '0', date };

            const endpoint = type === 'attendance'
                ? '/v1/attendance/create'
                : '/v1/leave/create';

            await makeApi(endpoint, "POST", body);
            // Refresh data after marking attendance or leave
            const url = selectedStaff ? `/v1/get-monthly-attendance-data/${selectedStaff}?month=${currentMonth}&year=${currentYear}` : `/v1/get-monthly-attendance-data?month=${currentMonth}&year=${currentYear}`;
            const response = await makeApi(url, "GET");
            setMonthlyData(response.data.data);
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            closePopup();
        }
    };

    return (
        <div className="manage-industry-chart">
            <div className='text-center'>
                <h5 >{Isadmin} Monthly Attendance</h5>
            </div>
            <div className="date-selection d-flex">
                {Isadmin === "admin" &&
                    <div className="px-2">
                        <label htmlFor="staff">User: </label>
                        <select id="staff" value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)} className='all-user-search'>
                            <option value="">Select User</option>
                            {allAdmins.map((admin, index) => (
                                <option key={index} value={admin.user}>
                                    {admin.user}
                                </option>
                            ))}
                        </select>
                    </div>
                }
                <div className="px-2">
                    <label htmlFor="month">Month: </label>
                    <select id="month" value={currentMonth} onChange={handleMonthChange} className='all-user-search'>
                        {[...Array(12).keys()].map(month => (
                            <option key={month + 1} value={month + 1}>
                                {new Date(0, month).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="px-2">
                    <label htmlFor="year">Year: </label>
                    <select id="year" value={currentYear} onChange={handleYearChange} className='all-user-search'>
                        {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {loading && <PrimaryLoader />}
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Login Time</th>
                        <th>Short Leave (Minutes)</th>
                        <th>Total Active Hours</th>

                        {Isadmin === "admin" &&
                            <>
                                <th>Mark Attendance </th>
                                <th>Mark Leave</th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody>
                    {monthlyData.map((data, index) => {
                        const activeHours = `${Math.floor(data.totalActiveMinutes / 60)} hours ${Math.floor(data.totalActiveMinutes % 60)} minutes`;
                        const isSunday = new Date(data.date).getDay() === 0;

                        return (
                            <tr key={index} className={isSunday ? 'sunday-row' : ''}>
                                <td>{data.date}</td>
                                <td>{data.loginTime}</td>
                                <td>{data.shortLeaveMinutes}</td>
                                <td>{activeHours}</td>
                                {Isadmin === "admin" &&
                                    <>
                                        <td>
                                            <button className='btn-warning btn' onClick={() => openPopup(data.date, 'attendance')}>Mark Attendance</button>

                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => openPopup(data.date, 'leave')}>Mark Leave</button>
                                        </td>
                                        </>
                                    }
                                    </tr>
                                );
                    })}
                            </tbody>
            </table>
            <CustomPopup
                isOpen={popupData.isOpen}
                onClose={closePopup}
                onSubmit={handleSubmit}
                date={popupData.date}
                type={popupData.type}
            />
        </div>
    );
};

export default MonthlyAttendance;
