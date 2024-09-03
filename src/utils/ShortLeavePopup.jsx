import React, { useState } from 'react';
import '../style/utils/CustomPopup.css';

const ShortLeavePopup = ({ isOpen, onClose, onSubmit, date }) => {
    const [shortLeaveFrom, setShortLeaveFrom] = useState('');
    const [shortLeaveTo, setShortLeaveTo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ date, type: 'leave', shortLeaveFrom, shortLeaveTo });
    };

    if (!isOpen) return null;

    return (
        <div className="custom-popup">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>Mark Short Leave</h2>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex p-5 gap-5'>
                        <div>
                            <label>Short Leave From:</label>
                            <input
                                type="time"
                                value={shortLeaveFrom}
                                onChange={(e) => setShortLeaveFrom(e.target.value)}
                                className='all-user-search'
                            />
                        </div>
                        <div>
                            <label>Short Leave To:</label>
                            <input
                                type="time"
                                value={shortLeaveTo}
                                onChange={(e) => setShortLeaveTo(e.target.value)}
                                className='all-user-search'
                            />
                        </div>
                    </div>
                    <div className='text-center mt-5 mb-3'>
                        <button type="submit" className='btn btn-success'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShortLeavePopup;
