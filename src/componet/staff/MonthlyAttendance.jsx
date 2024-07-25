// import React, { useState, useEffect } from 'react';
// import '../../style/dashboard/MonthlyAttendance.css';
// import { makeApi } from '../../api/callApi.tsx';
// import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
// import CustomPopup from '../../utils/CustomPopup.jsx';

// const MonthlyAttendance = () => {
//     const [loading, setLoading] = useState(true);
//     const [monthlyData, setMonthlyData] = useState([]);
//     const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
//     const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
//     const [allAdmins, setAllAdmins] = useState([]);
//     const [Isadmin, setIsadmin] = useState("");
//     const [selectedStaff, setSelectedStaff] = useState("");
//     const [popupData, setPopupData] = useState({ isOpen: false, date: '', type: '' });

//     const fetchAllAdmins = async () => {
//         try {
//             const response = await makeApi(`/v1/admin/api/get-all-admins`, "GET");
//             setAllAdmins(response.data.data);
//         } catch (error) {
//             console.error('Error fetching admins:', error);
//         }
//     };

//     useEffect(() => {
//         fetchAllAdmins();
//     }, []);

//     useEffect(() => {
//         const fetchMonthlyData = async () => {
//             setLoading(true);
//             try {
//                 const url = selectedStaff ? `/v1/get-monthly-attendance-data/${selectedStaff}?month=${currentMonth}&year=${currentYear}` : `/v1/get-monthly-attendance-data?month=${currentMonth}&year=${currentYear}`;
//                 const response = await makeApi(url, "GET");
//                 setMonthlyData(response.data.data);
//                 setIsadmin(response.data.user);
//             } catch (error) {
//                 console.error('Error fetching monthly data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchMonthlyData();
//     }, [currentMonth, currentYear, selectedStaff]);

//     const handleMonthChange = (e) => {
//         setCurrentMonth(parseInt(e.target.value));
//     };

//     const handleYearChange = (e) => {
//         setCurrentYear(parseInt(e.target.value));
//     };

//     const openPopup = (date, type) => {
//         setPopupData({ isOpen: true, date, type });
//     };

//     const closePopup = () => {
//         setPopupData({ isOpen: false, date: '', type: '' });
//     };

//     const handleSubmit = async ({ hour, minute, date, type }) => {
//         try {
//             const body = type === 'attendance'
//                 ? { staff_id: selectedStaff, hour, minute, date }
//                 : { staff_id: selectedStaff, hour: '0', minute: '0', date };

//             const endpoint = type === 'attendance'
//                 ? '/v1/attendance/create'
//                 : '/v1/leave/create';

//             await makeApi(endpoint, "POST", body);
//             // Refresh data after marking attendance or leave
//             const url = selectedStaff ? `/v1/get-monthly-attendance-data/${selectedStaff}?month=${currentMonth}&year=${currentYear}` : `/v1/get-monthly-attendance-data?month=${currentMonth}&year=${currentYear}`;
//             const response = await makeApi(url, "GET");
//             setMonthlyData(response.data.data);
//         } catch (error) {
//             console.error('Error submitting data:', error);
//         } finally {
//             closePopup();
//         }
//     };

//     return (
//         <div className="manage-industry-chart">
//             <div className='text-center'>
//                 <h5 >{Isadmin} Monthly Attendance</h5>
//             </div>
//             <div className="date-selection d-flex">
//                 {Isadmin === "admin" &&
//                     <div className="px-2">
//                         <label htmlFor="staff">User: </label>
//                         <select id="staff" value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)} className='all-user-search'>
//                             <option value="">Select User</option>
//                             {allAdmins.map((admin, index) => (
//                                 <option key={index} value={admin.user}>
//                                     {admin.user}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 }
//                 <div className="px-2">
//                     <label htmlFor="month">Month: </label>
//                     <select id="month" value={currentMonth} onChange={handleMonthChange} className='all-user-search'>
//                         {[...Array(12).keys()].map(month => (
//                             <option key={month + 1} value={month + 1}>
//                                 {new Date(0, month).toLocaleString('default', { month: 'long' })}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="px-2">
//                     <label htmlFor="year">Year: </label>
//                     <select id="year" value={currentYear} onChange={handleYearChange} className='all-user-search'>
//                         {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
//                             <option key={year} value={year}>
//                                 {year}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//             {loading && <PrimaryLoader />}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Login Time</th>
//                         {/* <th>Status</th> */}
//                         <th>Short Leave (Minutes)</th>
//                         <th>Total Active Hours</th>
//                         {Isadmin === "admin" &&
//                             <>
//                                 <th>Mark Attendance</th>
//                                 <th>Mark Leave</th>
//                             </>
//                         }
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {monthlyData.map((data, index) => {
//                         const activeHours = `${Math.floor(data.totalActiveMinutes / 60)} hours ${Math.floor(data.totalActiveMinutes % 60)} minutes`;
//                         const isSunday = new Date(data.date).getDay() === 0;
//                         const rowClass = data.status === 'half day' ? 'half-day' : data.status === 'full day' ? 'full-day' : '';

//                         return (
//                             <tr key={index} className={`${isSunday ? 'sunday-row' : ''} ${rowClass}`}>
//                                 <td>{data.date}</td>
//                                 <td>{data.loginTime}</td>
//                                 {/* <td>{data.status}</td> */}
//                                 <td>{data.shortLeaveMinutes}</td>
//                                 <td>{activeHours}</td>
//                                 {Isadmin === "admin" &&
//                                     <>
//                                         <td>
//                                             <button className='btn-warning btn' onClick={() => openPopup(data.date, 'attendance')}>Mark Attendance</button>
//                                         </td>
//                                         <td>
//                                             <button className='btn btn-danger' onClick={() => openPopup(data.date, 'leave')}>Mark Leave</button>
//                                         </td>
//                                     </>
//                                 }
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//             <CustomPopup
//                 isOpen={popupData.isOpen}
//                 onClose={closePopup}
//                 onSubmit={handleSubmit}
//                 date={popupData.date}
//                 type={popupData.type}
//             />
//         </div>
//     );
// };

// export default MonthlyAttendance;






// import React, { useState, useEffect } from 'react';
// import '../../style/dashboard/MonthlyAttendance.css';
// import { makeApi } from '../../api/callApi.tsx';
// import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
// import CustomPopup from '../../utils/CustomPopup.jsx';

// const MonthlyAttendance = () => {
//     const [loading, setLoading] = useState(true);
//     const [monthlyData, setMonthlyData] = useState([]);
//     const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
//     const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
//     const [allAdmins, setAllAdmins] = useState([]);
//     const [Isadmin, setIsadmin] = useState("");
//     const [selectedStaff, setSelectedStaff] = useState("");
//     const [popupData, setPopupData] = useState({ isOpen: false, date: '', type: '' });
//     const [summaryData, setSummaryData] = useState({});  // Add state for summary data

//     const fetchAllAdmins = async () => {
//         try {
//             const response = await makeApi(`/v1/admin/api/get-all-admins`, "GET");
//             setAllAdmins(response.data.data);
//         } catch (error) {
//             console.error('Error fetching admins:', error);
//         }
//     };

//     useEffect(() => {
//         fetchAllAdmins();
//     }, []);

//     useEffect(() => {
//         const fetchMonthlyData = async () => {
//             setLoading(true);
//             try {
//                 const url = selectedStaff ? `/v1/get-monthly-attendance-data/${selectedStaff}?month=${currentMonth}&year=${currentYear}` : `/v1/get-monthly-attendance-data?month=${currentMonth}&year=${currentYear}`;
//                 const response = await makeApi(url, "GET");
//                 const data = response.data.data;
//                 setMonthlyData(data);
//                 setIsadmin(response.data.user);

//                 // Calculate the required data for the summary
//                 const salary = 60000;
//                 const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
//                 const perDaySalary = salary / daysInMonth;
//                 const perMinuteSalary = perDaySalary / (9 * 60); // Assuming 9 working hours per day
//                 const totalHalfDays = data.filter(day => day.status === 'half day').length;
//                 const totalFullDays = data.filter(day => day.status === 'full day').length;
//                 const totalLeaves = data.filter(day => day.status === 'on leave').length;
//                 const totalShortLeaveMinutes = data.reduce((total, day) => total + day.shortLeaveMinutes, 0);
//                 const totalActiveMinutes = data.reduce((total, day) => total + day.totalActiveMinutes, 0);
//                 const totalSalary = perMinuteSalary * totalActiveMinutes;

//                 setSummaryData({
//                     salary,
//                     perDaySalary,
//                     perMinuteSalary,
//                     totalHalfDays,
//                     totalFullDays,
//                     totalLeaves,
//                     totalShortLeaveMinutes,
//                     totalActiveMinutes,
//                     totalSalary,
//                 });
//             } catch (error) {
//                 console.error('Error fetching monthly data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchMonthlyData();
//     }, [currentMonth, currentYear, selectedStaff]);

//     const handleMonthChange = (e) => {
//         setCurrentMonth(parseInt(e.target.value));
//     };

//     const handleYearChange = (e) => {
//         setCurrentYear(parseInt(e.target.value));
//     };

//     const openPopup = (date, type) => {
//         setPopupData({ isOpen: true, date, type });
//     };

//     const closePopup = () => {
//         setPopupData({ isOpen: false, date: '', type: '' });
//     };

//     const handleSubmit = async ({ hour, minute, date, type }) => {
//         try {
//             const body = type === 'attendance'
//                 ? { staff_id: selectedStaff, hour, minute, date }
//                 : { staff_id: selectedStaff, hour: '0', minute: '0', date };

//             const endpoint = type === 'attendance'
//                 ? '/v1/attendance/create'
//                 : '/v1/leave/create';

//             await makeApi(endpoint, "POST", body);
//             // Refresh data after marking attendance or leave
//             const url = selectedStaff ? `/v1/get-monthly-attendance-data/${selectedStaff}?month=${currentMonth}&year=${currentYear}` : `/v1/get-monthly-attendance-data?month=${currentMonth}&year=${currentYear}`;
//             const response = await makeApi(url, "GET");
//             setMonthlyData(response.data.data);
//         } catch (error) {
//             console.error('Error submitting data:', error);
//         } finally {
//             closePopup();
//         }
//     };

//     return (
//         <div className="manage-industry-chart">
//             <div className='text-center'>
//                 <h5>{Isadmin} Monthly Attendance</h5>
//             </div>
//             <div className="date-selection d-flex">
//                 {Isadmin === "admin" &&
//                     <div className="px-2">
//                         <label htmlFor="staff">User: </label>
//                         <select id="staff" value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)} className='all-user-search'>
//                             <option value="">Select User</option>
//                             {allAdmins.map((admin, index) => (
//                                 <option key={index} value={admin.user}>
//                                     {admin.user}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 }
//                 <div className="px-2">
//                     <label htmlFor="month">Month: </label>
//                     <select id="month" value={currentMonth} onChange={handleMonthChange} className='all-user-search'>
//                         {[...Array(12).keys()].map(month => (
//                             <option key={month + 1} value={month + 1}>
//                                 {new Date(0, month).toLocaleString('default', { month: 'long' })}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="px-2">
//                     <label htmlFor="year">Year: </label>
//                     <select id="year" value={currentYear} onChange={handleYearChange} className='all-user-search'>
//                         {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
//                             <option key={year} value={year}>
//                                 {year}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//             {loading && <PrimaryLoader />}
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Date</th>
//                         <th>Login Time</th>
//                         {/* <th>Status</th> */}
//                         <th>Short Leave (Minutes)</th>
//                         <th>Total Active Hours</th>
//                         {Isadmin === "admin" &&
//                             <>
//                                 <th>Mark Attendance</th>
//                                 <th>Mark Leave</th>
//                             </>
//                         }
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {monthlyData.map((data, index) => {
//                         const activeHours = `${Math.floor(data.totalActiveMinutes / 60)} hours ${Math.floor(data.totalActiveMinutes % 60)} minutes`;
//                         const isSunday = new Date(data.date).getDay() === 0;
//                         const rowClass = data.status === 'half day' ? 'half-day' : data.status === 'full day' ? 'full day' : '';

//                         return (
//                             <tr key={index} className={`${isSunday ? 'sunday-row' : ''} ${rowClass}`}>
//                                 <td>{data.date}</td>
//                                 <td>{data.loginTime}</td>
//                                 {/* <td>{data.status}</td> */}
//                                 <td>{data.shortLeaveMinutes}</td>
//                                 <td>{activeHours}</td>
//                                 {Isadmin === "admin" &&
//                                     <>
//                                         <td>
//                                             <button className='btn-warning btn' onClick={() => openPopup(data.date, 'attendance')}>Mark Attendance</button>
//                                         </td>
//                                         <td>
//                                             <button className='btn btn-danger' onClick={() => openPopup(data.date, 'leave')}>Mark Leave</button>
//                                         </td>
//                                     </>
//                                 }
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//             {/* Summary Table */}
//             <div className="summary-table">
//                 <h4>Summary</h4>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <td><strong>Salary:</strong></td>
//                             <td>{summaryData.salary}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Per Day Salary:</strong></td>
//                             <td>{summaryData.perDaySalary?.toFixed(2)}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Per Minute Salary:</strong></td>
//                             <td>{summaryData.perMinuteSalary?.toFixed(2)}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Total Half Days:</strong></td>
//                             <td>{summaryData.totalHalfDays}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Total Full Days:</strong></td>
//                             <td>{summaryData.totalFullDays}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Total Leaves:</strong></td>
//                             <td>{summaryData.totalLeaves}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Total Short Leave Minutes:</strong></td>
//                             <td>{summaryData.totalShortLeaveMinutes}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Total Active Minutes:</strong></td>
//                             <td>{summaryData.totalActiveMinutes}</td>
//                         </tr>
//                         <tr>
//                             <td><strong>Total Salary:</strong></td>
//                             <td>{summaryData.totalSalary?.toFixed(2)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//             <CustomPopup
//                 isOpen={popupData.isOpen}
//                 onClose={closePopup}
//                 onSubmit={handleSubmit}
//                 date={popupData.date}
//                 type={popupData.type}
//             />
//         </div>
//     );
// };

// export default MonthlyAttendance;








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
    const [summaryData, setSummaryData] = useState({});

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
                const data = response.data.data;
                setMonthlyData(data);
                setIsadmin(response.data.user);

                // Calculate the required data for the summary
                const salary = 60000;
                const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
                const perDaySalary = salary / daysInMonth;
                const perMinuteSalary = perDaySalary / (9 * 60); // Assuming 9 working hours per day
                const { totalHalfDays, totalFullDays, totalLeaves, totalShortLeaveMinutes, totalActiveMinutes } = response.data;
                const totalSalary = perMinuteSalary * totalActiveMinutes;

                setSummaryData({
                    salary,
                    perDaySalary,
                    perMinuteSalary,
                    totalHalfDays,
                    totalFullDays,
                    totalLeaves: daysInMonth - totalHalfDays - totalFullDays, // Calculate leaves as total days minus half and full days
                    totalShortLeaveMinutes,
                    totalActiveMinutes,
                    totalSalary,
                });
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
            const data = response.data.data;
            setMonthlyData(data);
            setIsadmin(response.data.user);

            // Calculate the required data for the summary
            const salary = 60000;
            const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
            const perDaySalary = salary / daysInMonth;
            const perMinuteSalary = perDaySalary / (9 * 60); // Assuming 9 working hours per day
            const { totalHalfDays, totalFullDays, totalLeaves, totalShortLeaveMinutes, totalActiveMinutes } = response.data;
            const totalSalary = perMinuteSalary * totalActiveMinutes;

            setSummaryData({
                salary,
                perDaySalary,
                perMinuteSalary,
                totalHalfDays,
                totalFullDays,
                totalLeaves: daysInMonth - totalHalfDays - totalFullDays, // Calculate leaves as total days minus half and full days
                totalShortLeaveMinutes,
                totalActiveMinutes,
                totalSalary,
            });
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            closePopup();
        }
    };

    return (
        <>
            <div className="manage-industry-chart">
                <div className='text-center'>
                    <h5>{Isadmin} Monthly Attendance</h5>
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
                                    <th>Mark Attendance</th>
                                    <th>Mark Leave</th>
                                </>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyData.map((data, index) => {
                            const activeHours = `${Math.floor(data.totalActiveMinutes / 60)} hours ${Math.floor(data.totalActiveMinutes % 60)} minutes`;
                            const isSunday = new Date(data.date).getDay() === 0;
                            const rowClass = data.status === 'half day' ? 'half-day' : data.status === 'full day' ? 'full-day' : '';

                            return (
                                <tr key={index} className={`${isSunday ? 'sunday-row' : ''} ${rowClass}`}>
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
                {/* {Isadmin === "admin" && !loading && (
                <div className="summary-box">
                    <h4>Summary</h4>
                    <p>Salary: {summaryData.salary}</p>
                    <p>Per Day Salary: {summaryData.perDaySalary.toFixed(2)}</p>
                    <p>Per Minute Salary: {summaryData.perMinuteSalary.toFixed(2)}</p>
                    <p>Total Half Days: {summaryData.totalHalfDays}</p>
                    <p>Total Full Days: {summaryData.totalFullDays}</p>
                    <p>Total Leaves: {summaryData.totalLeaves}</p>
                    <p>Total Short Leave Minutes: {summaryData.totalShortLeaveMinutes}</p>
                    <p>Total Active Minutes: {summaryData.totalActiveMinutes}</p>
                    <p>Total Salary: {summaryData.totalSalary.toFixed(2)}</p>
                </div>
            )} */}
                <CustomPopup
                    isOpen={popupData.isOpen}
                    onClose={closePopup}
                    onSubmit={handleSubmit}
                    date={popupData.date}
                    type={popupData.type}
                />
            </div>

            <div className="manage-industry-chart">


                {loading && <PrimaryLoader />}
                <table>
                    <thead>
                        <tr>
                            <th>Salary</th>
                            <th>Day Salary:</th>
                            <th>Minute Salary:</th>
                            <th>Total Full Days:</th>
                            <th>Total Half Days:</th>
                            <th>Total Leaves:</th>
                            <th>Total Short Leave Minutes:</th>
                            <th>Total Active Minutes:</th>
                            <th>Total Salary:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>{summaryData.salary}</td>
                            <td>{summaryData.perDaySalary}</td>
                            <td>{summaryData.perMinuteSalary}</td>
                            <td>{summaryData.totalFullDays}</td>
                            <td>{summaryData.totalHalfDays}</td>
                            <td>{summaryData.totalLeaves}</td>
                            <td>{summaryData.totalShortLeaveMinutes}</td>
                            <td>{summaryData.totalActiveMinutes}</td>
                            <td>{summaryData.totalSalary}</td>
                          
                        </tr>
                    </tbody>
                </table>
                {/* {Isadmin === "admin" && !loading && (
                <div className="summary-box">
                    <h4>Summary</h4>
                    <p>Salary: {summaryData.salary}</p>
                    <p>Per Day Salary: {summaryData.perDaySalary.toFixed(2)}</p>
                    <p>Per Minute Salary: {summaryData.perMinuteSalary.toFixed(2)}</p>
                    <p>Total Half Days: {summaryData.totalHalfDays}</p>
                    <p>Total Full Days: {summaryData.totalFullDays}</p>
                    <p>Total Leaves: {summaryData.totalLeaves}</p>
                    <p>Total Short Leave Minutes: {summaryData.totalShortLeaveMinutes}</p>
                    <p>Total Active Minutes: {summaryData.totalActiveMinutes}</p>
                    <p>Total Salary: {summaryData.totalSalary.toFixed(2)}</p>
                </div>
            )} */}
                <CustomPopup
                    isOpen={popupData.isOpen}
                    onClose={closePopup}
                    onSubmit={handleSubmit}
                    date={popupData.date}
                    type={popupData.type}
                />
            </div>
        </>
    );
};

export default MonthlyAttendance;
