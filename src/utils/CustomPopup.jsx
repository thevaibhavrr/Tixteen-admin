import React, { useState } from 'react';
import '../style/utils/CustomPopup.css';

const CustomPopup = ({ isOpen, onClose, onSubmit, date, type }) => {
    const [hour, setHour] = useState('00');
    const [minute, setMinute] = useState('00');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ hour, minute, date, type });
    };

    if (!isOpen) return null;

    return (
        <div className="custom-popup">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>{type === 'attendance' ? 'Mark Attendance' : 'Mark Leave'}</h2>
                <form onSubmit={handleSubmit}>
                    {type === 'attendance' && (
                        <div className='d-flex p-5 gap-5'>
                        <div >
                            <label>
                                Hour:
                                <select value={hour} onChange={(e) => setHour(e.target.value)} className='all-user-search' required>
                                    {[...Array(24).keys()].map(h => (
                                        <option key={h} value={String(h).padStart(2, '0')}>
                                            {String(h).padStart(2, '0')}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            </div>
                            <div>
                            <label>
                                Minute:
                                <select value={minute} onChange={(e) => setMinute(e.target.value)} className='all-user-search' required>
                                    {[...Array(60).keys()].map(m => (
                                        <option key={m} value={String(m).padStart(2, '0')}>
                                            {String(m).padStart(2, '0')}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            </div>
                        </div>
                    )}
                    <div className='text-center mt-5 mb-3' >
                    <button type="submit" className='btn btn-success' >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomPopup;
