
import React, { useState, useEffect } from 'react';
import '../../style/dashboard/AttendanceForm.css';
import { makeApi } from '../../api/callApi.tsx';
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
import { useNavigate } from 'react-router-dom';


const AttendanceForm = () => {
    const navigate = useNavigate();
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
                    setAttendanceTime(convertToIST(`${attendance.hour}:${attendance.minute}`));
                }

                if (shortleave) {
                    setShortLeaveId(shortleave._id);
                    setIsOnShortLeave(true);
                    setShortLeaveTime(convertToIST(shortleave.leave_from.split('T')[1].split('.')[0]));
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

    const convertToIST = (time) => {
        const date = new Date(time);
        const istOffset = 5.5 * 60 * 60 * 1000;
        const istTime = new Date(date.getTime() + istOffset);
        return istTime.toTimeString().split(' ')[0];
    };

    const handleAttendance = async () => { 
        setLoading(true);
        try {
            const now = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000;
            const istDate = new Date(now.getTime() + istOffset);
            const hour = String(istDate.getUTCHours()).padStart(2, '0');
            const minute = String(istDate.getUTCMinutes()).padStart(2, '0');

            await makeApi('/v1/attendance/create', "POST", {
                hour,
                minute,
                date: istDate.toISOString().split('T')[0]
            });
            setMessage('Attendance marked successfully!');
            setIsAttendanceMarked(true);
            setAttendanceTime(`${hour}:${minute}`);
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
            const now = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000;
            const istDate = new Date(now.getTime() + istOffset);
            const shortLeaveTime = istDate.toISOString().split('T')[1].split('.')[0];

            const response = await makeApi('/v1/start-shortleave', "POST", {
                leave_from: istDate.toISOString(),
            });
            setShortLeaveId(response.data.data.shortleave._id);
            setMessage('Short leave started.');
            setIsOnShortLeave(true);
            setShortLeaveTime(shortLeaveTime);
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

    const handleLogout = async () => {
        localStorage.clear();
        navigate('/login');
    };


    return (    
        <>
            {loading && <PrimaryLoader />}
            <div className='d-flex justify-content-between w-100'>
                <div className=" w-50 ">
                    <div className='w-25'>
                        <div>
                            <button onClick={handleLogout} className="mark-attendance-btn btn-danger">
                                Log out
                            </button>
                        </div>

                    </div>
                </div>
                <div className="attendance-container">
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default AttendanceForm;
