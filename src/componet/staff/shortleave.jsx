// ShoetLeaverPopup.jsx

import React, { useState } from 'react';

const ShoetLeaverPopup = ({ isOpen, onClose, onSubmit, date, type }) => {
    const [hour, setHour] = useState(''); // New state for short leave hours
    const [minute, setMinute] = useState(''); // New state for short leave minutes
    const [shortLeaveStart, setShortLeaveStart] = useState(''); // New state for short leave start time
    const [shortLeaveEnd, setShortLeaveEnd] = useState(''); // New state for short leave end time

    const handleSubmit = () => {
        if (type === 'shortLeave') {
            onSubmit({ hour: shortLeaveStart.split(':')[0], minute: shortLeaveStart.split(':')[1], date, type: 'shortLeaveStart' });
            onSubmit({ hour: shortLeaveEnd.split(':')[0], minute: shortLeaveEnd.split(':')[1], date, type: 'shortLeaveEnd' });
        } else {
            onSubmit({ hour, minute, date, type });
        }
    };

    return (
        isOpen ? (
            <div className="popup">
                <div className="popup-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>{type === 'shortLeave' ? 'Short Leave' : 'Attendance/Leave'}</h2>
                    <div>
                        <label htmlFor="hour">Hour:</label>
                        <input type="number" id="hour" value={hour} onChange={(e) => setHour(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="minute">Minute:</label>
                        <input type="number" id="minute" value={minute} onChange={(e) => setMinute(e.target.value)} />
                    </div>
                    {type === 'shortLeave' && (
                        <>
                            <div>
                                <label htmlFor="shortLeaveStart">Short Leave Start Time:</label>
                                <input type="time" id="shortLeaveStart" value={shortLeaveStart} onChange={(e) => setShortLeaveStart(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="shortLeaveEnd">Short Leave End Time:</label>
                                <input type="time" id="shortLeaveEnd" value={shortLeaveEnd} onChange={(e) => setShortLeaveEnd(e.target.value)} />
                            </div>
                        </>
                    )}
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        ) : null
    );
};

export default ShoetLeaverPopup;
