

import React, { useState, useEffect } from 'react';
import '../../style/dashboard/AttendanceForm.css';
import { makeApi } from '../../api/callApi.tsx';
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';

const AttendanceForm = () => {
    const [message, setMessage] = useState('');
    const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shortLeaveId, setShortLeaveId] = useState(null);
    const [isOnShortLeave, setIsOnShortLeave] = useState(false);
    const [attendanceTime, setAttendanceTime] = useState(null);
    const [shortLeaveTime, setShortLeaveTime] = useState(null);
    const [activeHours, setActiveHours] = useState(null);

    useEffect(() => {
        const fetchAttendanceStatus = async () => {
            try {
                const response = await makeApi('/v1/get-today-attendance', "GET");
                const { attendance, shortleave } = response.data.data;

                if (attendance) {
                    setIsAttendanceMarked(true);
                    setAttendanceTime(`${attendance.hour}:${attendance.minute}`);
                }

                if (shortleave) {
                    setShortLeaveId(shortleave._id);
                    setIsOnShortLeave(true);
                    setShortLeaveTime(shortleave.leave_from.split('T')[1].split('.')[0]);
                }

                if (attendance) {
                    const now = new Date();
                    const attendanceDate = new Date(`${attendance.date}T${attendance.hour}:${attendance.minute}:00`);
                    const diff = Math.abs(now - attendanceDate);
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    setActiveHours(`${hours} hours ${minutes} minutes`);
                }
            } catch (error) {
                console.error('Error checking attendance status:', error);
            }
        };
        fetchAttendanceStatus();
    }, []);

    const handleAttendance = async () => {
        setLoading(true);
        try {
            await makeApi('/v1/create-attendance', "POST");
            setMessage('Attendance marked successfully!');
            setIsAttendanceMarked(true);
            // setAttendanceTime(`${hour}:${minute}`);
        } catch (error) {
            setMessage('Error marking attendance.');
            console.error('Error marking attendance:', error);
        } finally {
            setLoading(false);
        }
    };

    const startShortLeave = async () => {
        setLoading(true);
        try {
            const response = await makeApi('/v1/start-shortleave', "POST");
            setShortLeaveId(response.data.data.shortleave._id);
            setMessage('Short leave started.');
            setIsOnShortLeave(true);
            setShortLeaveTime(new Date().toISOString().split('T')[1].split('.')[0]);
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
            await makeApi(`/v1/stop-shortleave/${shortLeaveId}`, "PUT");
            setMessage('Short leave stopped.');
            setIsOnShortLeave(false);
            setShortLeaveId(null);
        } catch (error) {
            setMessage('Error stopping short leave.');
            console.error('Error stopping short leave:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="attendance-container">
            {loading && <PrimaryLoader />}
            <div className=''>
                <div>
                    {isAttendanceMarked ? (
                        isOnShortLeave ? (
                            <button onClick={stopShortLeave} className="short-leave-btn">
                                Stop Short Leave
                            </button>
                        ) : (
                            <button onClick={startShortLeave} className="short-leave-btn">
                                Start Short Leave
                            </button>
                        )
                    ) : (
                        <button onClick={handleAttendance} className="mark-attendance-btn btn-danger">
                            Mark Attendance
                        </button>
                    )}
                </div>
                {/* <div >
                    <div>

                        {message && <p>{message}</p>}
                    </div>
                    <div>

                        {attendanceTime && <p>Attendance Time: {attendanceTime}</p>}
                    </div>
                    <div>

                        {shortLeaveTime && <p>Short Leave Time: {shortLeaveTime}</p>}
                    </div>
                    {activeHours && <p>Total Active Hours: {activeHours}</p>}
                </div> */}
            </div>
        </div>
    );
};

export default AttendanceForm;
