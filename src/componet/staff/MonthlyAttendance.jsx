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
    const [shortLeavePopup, setShortLeavePopup] = useState(false);
    const [shortLeaveFrom, setShortLeaveFrom] = useState('');
    const [shortLeaveTo, setShortLeaveTo] = useState('');
    const [shortLeaveId, setShortLeaveId] = useState(null);
    const [shortLeaveDate, setShortLeaveDate] = useState('');
    const [isOnShortLeave, setIsOnShortLeave] = useState(false);
    const [shortLeaveTime, setShortLeaveTime] = useState('');
    const [message, setMessage] = useState('');

    const fetchAllAdmins = async () => {
        try {
            const res = await makeApi('/v1/get-all-staff', 'GET');
            setAllAdmins(res.data.data);
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    useEffect(() => {
        fetchAllAdmins();
    }, []);
    const fetchMonthlyData = async () => {
        setLoading(true);
        try {
            const url = selectedStaff 
                ? `/v1/get-monthly-attendance-data/${selectedStaff}?month=${currentMonth}&year=${currentYear}` 
                : `/v1/get-monthly-attendance-data?month=${currentMonth}&year=${currentYear}`;
            const response = await makeApi(url, "GET");
            const data = response.data;

            setIsadmin(data.user);
            setMonthlyData(data.dayDetails);

            setSummaryData({
                salary: data.salary,
                perDaySalary: data.perDaySalary,
                perMinuteSalary: data.perMinuteSalary,
                fullDayCount: data.fullDayCount,
                halfDayCount: data.halfDayCount,
                leaveDayCount: data.leaveDayCount,
                totalShortLeaveMinutes: data.totalShortLeaveMinutes,
                totalDelayMinutes: data.totalDelayMinutes,
                totalSalary: data.totalSalary,
                dailySalary: data.dailySalary,
            });
        } catch (error) {
            console.error('Error fetching monthly data:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        
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
                ? { staff_id: selectedStaff, hour, minute, date, leave: 'present' }
                : { staff_id: selectedStaff, hour: '0', minute: '0', date, leave: 'on leave' };

            const endpoint = '/v1/attendance/create-or-update';

            await makeApi(endpoint, "POST", body);

            // Refresh data after marking attendance or leave
            const url = selectedStaff 
                ? `/v1/get-monthly-attendance-data/${selectedStaff}?month=${currentMonth}&year=${currentYear}`
                : `/v1/get-monthly-attendance-data?month=${currentMonth}&year=${currentYear}`;
            const response = await makeApi(url, "GET");
            const data = response.data;
            setMonthlyData(data.dayDetails);
            setIsadmin(data.user);

            // Recalculate summary data
            setSummaryData({
                salary: data.salary,
                perDaySalary: data.perDaySalary,
                perMinuteSalary: data.perMinuteSalary,
                fullDayCount: data.fullDayCount,
                halfDayCount: data.halfDayCount,
                leaveDayCount: data.leaveDayCount,
                totalShortLeaveMinutes: data.totalShortLeaveMinutes,
                totalDelayMinutes: data.totalDelayMinutes,
                totalSalary: data.totalSalary,
            });
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            closePopup();
        }
    };

    const startShortLeave = async () => {
        setLoading(true);
        try {
            const response = await makeApi('/v1/start-shortleave-with-time', "POST", {
                leave_from: `${shortLeaveDate}T${shortLeaveFrom}:00.000Z`,  
                staff_id: selectedStaff
            });
           await setShortLeaveId(response.data.data.shortleave._id);
           await setMessage('Short leave started.');
           await setIsOnShortLeave(true);
           await setShortLeaveTime(shortLeaveFrom);

        } catch (error) {
            setMessage('Error starting short leave.');
            console.error('Error starting short leave:', error);
        } finally {
            setLoading(false);
        }
    };

    const stopShortLeave = async () => {
        setLoading(true);
        try {
            await makeApi(`/v1/stop-shortleave-with-time/${shortLeaveId}`, "PUT", {
                leave_to: `${shortLeaveDate}T${shortLeaveTo}:00.000Z`,  
            });
            setMessage('Short leave stopped.');
            setIsOnShortLeave(false);
            setShortLeaveId(null);
        } catch (error) {
            setMessage('Error stopping short leave.');
            console.error('Error stopping short leave:', error);
        } finally {
            setLoading(false);
            setShortLeavePopup(false)
            fetchMonthlyData();
        }
    };

    return (
        <>
            {shortLeavePopup &&
             <div 
             className="custom-popup" 
             style={{ 
                 border: '1px solid #ddd', 
                 padding: '20px', 
                 borderRadius: '8px', 
                 backgroundColor: '#ffffff', 
                 width: '600px', 
                 maxWidth: '90vw', // Ensures responsiveness
                 height: 'auto', 
                 maxHeight: '80vh', // Ensures the popup doesn't exceed viewport height
                 overflowY: 'auto', // Allows scrolling if content exceeds max height
                 position: 'fixed', 
                 top: '50%', 
                 left: '50%', 
                 transform: 'translate(-50%, -50%)', 
                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow
                 zIndex: 1000 // Ensures it's on top of other elements
             }}
         >
             <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                     <label htmlFor="shortLeaveFrom" style={{ flex: '1', marginRight: '10px' }}>Short Leave From:</label>
                     <input
                         id="shortLeaveFrom"
                         type="time"
                         value={shortLeaveFrom}
                         onChange={(e) => setShortLeaveFrom(e.target.value)}
                         style={{ flex: '2', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                     />
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                     <label htmlFor="shortLeaveTo" style={{ flex: '1', marginRight: '10px' }}>Short Leave To:</label>
                     <input
                         id="shortLeaveTo"
                         type="time"
                         value={shortLeaveTo}
                         onChange={(e) => setShortLeaveTo(e.target.value)}
                         style={{ flex: '2', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                     />
                 </div>
                 <div style={{ display: 'flex', gap: '10px' }}>
                    {!isOnShortLeave &&
                     <button 
                     onClick={startShortLeave}
                     style={{ 
                         backgroundColor: '#007bff', 
                         color: '#fff', 
                         border: 'none', 
                         borderRadius: '4px', 
                         padding: '10px 20px', 
                         cursor: 'pointer', 
                         fontSize: '16px'
                        }}
                        >
                         Start Short Leave
                     </button>
                    }
                     {isOnShortLeave &&
                     <button 
                     onClick={stopShortLeave}
                     style={{ 
                         backgroundColor: '#007bff', 
                         color: '#fff', 
                         border: 'none', 
                         borderRadius: '4px', 
                         padding: '10px 20px', 
                         cursor: 'pointer', 
                         fontSize: '16px'
                        }}
                        >
                         Stop Short Leave
                     </button>
                    }
                 </div>
                 <button 
                     onClick={() => setShortLeavePopup(false)}
                     style={{ 
                         backgroundColor: '#6c757d', 
                         color: '#fff', 
                         border: 'none', 
                         borderRadius: '4px', 
                         padding: '10px 20px', 
                         cursor: 'pointer', 
                         fontSize: '16px',
                         marginTop: '10px'
                     }}
                 >
                     Close
                 </button>
             </div>
         </div>
            }

            <div className="manage-industry-chart">
                <div className='text-center'>
                    <h5>{Isadmin} Monthly Attendance</h5>
                </div>
                <div className="attendance-legend">
                    <div className="attendance-legend-item">
                        <div className="attendance-legend-color" style={{ backgroundColor: '#979797' }}></div>
                        <div className="attendance-legend-text">Sunday</div>
                    </div>
                    <div className="attendance-legend-item">
                        <div className="attendance-legend-color" style={{ backgroundColor: '#c4bfa8' }}></div>
                        <div className="attendance-legend-text">Half Day</div>
                    </div>
                    <div className="attendance-legend-item">
                        <div className="attendance-legend-color" style={{ backgroundColor: '#dff0d8' }}></div>
                        <div className="attendance-legend-text">Full Day</div>
                    </div>
                </div>
                <div className="date-selection d-flex">
                    {Isadmin === "admin" &&
                        <div className="px-2">
                            <label htmlFor="staff">User: </label>
                            <select id="staff" value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)} className='all-user-search'>
                                <option value="">Select User</option>
                                {allAdmins.map((admin, index) => (
                                    <option key={index} value={admin.username}>
                                        {admin.username}
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
                            {/* <th>Status</th> */}
                            <th>Short Leave (Minutes)</th>
                            <th>Delay (Minutes)</th>
                            <th>Salary Deduction</th>
                            {Isadmin === "admin" &&
                                <>
                                    <th>Mark Attendance</th>
                                    <th>short Leave</th>
                                    <th>mark Leave</th>
                                </>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {monthlyData.map((data, index) => {
                            const isSunday = new Date(data.date).getDay() === 0;
                            const rowClass = data.status === 'half day' ? 'half-day' : data.status === 'full day' ? 'full-day' : '';

                            return (
                                <tr key={index} className={`${isSunday ? 'sunday-row' : ''} ${rowClass}`}>
                                    <td>{data.date}</td>
                                    <td>{data.logintime}</td>
                                    {/* <td>{data.status}</td> */}
                                    <td>{data.shortLeaveMinutes}</td>
                                    <td>{data.delayMinutes}</td>
                                    <td>{data.salaryDeduction}</td>
                                    {Isadmin === "admin" &&
                                        <>
                                            <td>
                                                <button className='btn-warning btn' onClick={() => openPopup(data.date, 'attendance')}>Mark Attendance</button>
                                             </td>
                                          
                                        </>
                                    }
                                    {Isadmin === "admin" &&
                                        <>
                                                                                       <button className='btn-warning btn' onClick={() => { setShortLeaveDate(data.date); setShortLeavePopup(true); }}>Short Leave</button>

                                          
                                        </>
                                    }
                                    {Isadmin === "admin" &&
                                       <td>
                                                <button className='btn btn-danger' onClick={() => openPopup(data.date, 'leave')}>Mark Leave</button>
                                            </td>
                                      }
                                    {/* <th>{data.dailySalary}</th> */}
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



            <div className="summary mt-5 manage-industry-chart">
                <h3>Monthly Summary</h3>
                <table>
                    <tbody >
                        <tr>
                            <td>Salary:</td>
                            <td>{summaryData.salary}</td>
                        </tr>
                        <tr>
                            <td>Per Day Salary:</td>
                            <td>{summaryData.perDaySalary}</td>
                        </tr>
                        <tr>
                            <td>Per Minute Salary:</td>
                            <td>{summaryData.perMinuteSalary}</td>
                        </tr>
                        <tr>
                            <td>Full Day Count:</td>
                            <td>{summaryData.fullDayCount}</td>
                        </tr>
                        <tr>
                            <td>Half Day Count:</td>
                            <td>{summaryData.halfDayCount}</td>
                        </tr>
                        <tr>
                            <td>Leave Day Count:</td>
                            <td>{summaryData.leaveDayCount}</td>
                        </tr>
                        <tr>
                            <td>Total Short Leave Minutes:</td>
                            <td>{summaryData.totalShortLeaveMinutes}</td>
                        </tr>
                        <tr>
                            <td>Total Delay Minutes:</td>
                            <td>{summaryData.totalDelayMinutes}</td>
                        </tr>
                        <tr>
                            <td>Total Salary:</td>
                            <td>{summaryData.totalSalary}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="manage-industry-chart">


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
</div>  

        </>
    );
};

export default MonthlyAttendance;


