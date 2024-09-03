// import React, { useState } from 'react';
// import '../style/utils/CustomPopup.css';

// const CustomPopup = ({ isOpen, onClose, onSubmit, date, type }) => {
//     const [hour, setHour] = useState('00');
//     const [minute, setMinute] = useState('00');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit({ hour, minute, date, type });
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="custom-popup">
//             <div className="popup-content">
//                 <span className="close-btn" onClick={onClose}>&times;</span>
//                 <h2>{type === 'attendance' ? 'Mark Attendance' : 'Mark Leave'}</h2>
//                 <form onSubmit={handleSubmit}>
//                     {type === 'attendance' && (
//                         <div className='d-flex p-5 gap-5'>
//                         <div >
//                             <label>
//                                 Hour:
//                                 <select value={hour} onChange={(e) => setHour(e.target.value)} className='all-user-search' required>
//                                     {[...Array(24).keys()].map(h => (
//                                         <option key={h} value={String(h).padStart(2, '0')}>
//                                             {String(h).padStart(2, '0')}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </label>
//                             </div>
//                             <div>
//                             <label>
//                                 Minute:
//                                 <select value={minute} onChange={(e) => setMinute(e.target.value)} className='all-user-search' required>
//                                     {[...Array(60).keys()].map(m => (
//                                         <option key={m} value={String(m).padStart(2, '0')}>
//                                             {String(m).padStart(2, '0')}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </label>
//                             </div>
//                         </div>
//                     )}
//                     <div className='text-center mt-5 mb-3' >
//                     <button type="submit" className='btn btn-success' >Submit</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default CustomPopup;

// import React, { useState } from 'react';
// // import '../../style/dashboard/MonthlyAttendance.css';
// import '../style/utils/CustomPopup.css';


// const CustomPopup = ({ isOpen, date, type, onSubmit, onClose }) => {
//     const [hour, setHour] = useState('');
//     const [minute, setMinute] = useState('');
//     const [shortLeaveFrom, setShortLeaveFrom] = useState('');
//     const [shortLeaveTo, setShortLeaveTo] = useState('');

//     const handleSubmit = () => {
//         onSubmit({ hour, minute, date, type, shortLeaveFrom, shortLeaveTo });
//         setHour('');
//         setMinute('');
//         setShortLeaveFrom('');
//         setShortLeaveTo('');
//     };

//     if (!isOpen) {
//         return null;
//     }

//     return (
//         <div className="custom-popup">
//             <div className="custom-popup">
//                 <h3>{type === 'attendance' ? 'Mark Attendance' : 'Mark Leave'} for {date}</h3>
//                 {type === 'attendance' && (
//                     <>
//                         <div>
//                             <label>Hour:</label>
//                             <input
//                                 type="number"
//                                 value={hour}
//                                 onChange={(e) => setHour(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label>Minute:</label>
//                             <input
//                                 type="number"
//                                 value={minute}
//                                 onChange={(e) => setMinute(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label>Short Leave From:</label>
//                             <input
//                                 type="time"
//                                 value={shortLeaveFrom}
//                                 onChange={(e) => setShortLeaveFrom(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label>Short Leave To:</label>
//                             <input
//                                 type="time"
//                                 value={shortLeaveTo}
//                                 onChange={(e) => setShortLeaveTo(e.target.value)}
//                             />
//                         </div>
//                     </>
//                 )}
//                 <button onClick={handleSubmit}>
//                     {type === 'attendance' ? 'Mark Attendance' : 'Mark Leave'}
//                 </button>
//                 <button onClick={onClose}>Close</button>
//             </div>
//         </div>
//     );
// };

// export default CustomPopup;

import React, { useState } from 'react';
import '../style/utils/CustomPopup.css';

const CustomPopup = ({ isOpen, onClose, onSubmit, date, type }) => {
    const [hour, setHour] = useState('00');
    const [minute, setMinute] = useState('00');
    const [shortLeaveFrom, setShortLeaveFrom] = useState('');
    const [shortLeaveTo, setShortLeaveTo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ hour, minute, date, type, shortLeaveFrom, shortLeaveTo });
    };

    if (!isOpen) return null;

    return (
        <div className="custom-popup">
            <div className="popup-content">
                <span className="close-btn" onClick={onClose}>&times;</span>
                <h2>
                    {type === 'attendance' ? 'Mark Attendance' : 'Mark Leave'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {type === 'attendance' && (
                        <div className='d-flex p-5 gap-5'>
                            <div>
                                <label>
                                    Hour:
                                    <select
                                        value={hour}
                                        onChange={(e) => setHour(e.target.value)}
                                        className='all-user-search'
                                        required
                                    >
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
                                    <select
                                        value={minute}
                                        onChange={(e) => setMinute(e.target.value)}
                                        className='all-user-search'
                                        required
                                    >
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
                    {type === 'leave' && (
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
                    )}
                    <div className='text-center mt-5 mb-3'>
                        <button type="submit" className='btn btn-success'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomPopup;
