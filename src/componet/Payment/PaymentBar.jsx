
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// function PaymentBar() {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [filter, setFilter] = useState('');

//     useEffect(() => {
//         const path = location.pathname.split('/').pop().replace('-management', '');
//         const capitalizedPath = path.charAt(0).toUpperCase() + path.slice(1);
//         setFilter(capitalizedPath);
//     }, [location]);

//     const handleFilterClick = (filterName) => {
//         setFilter(filterName);
//         // navigate(`/management/${filterName.toLowerCase()}-management`);
//         navigate(`/payment/payment-schedule`);
//     };

//     return (
//         <div>
//             <div className="campaign-list-topbar p-3">
//                 <div className="campaign-list-filters">
//                     <button onClick={() => handleFilterClick('schedule')} className={filter === 'schedule' ? 'active' : ''}>payment-schedule</button>
//                     {/* payment-schedule-traction */}
//                      <button onClick={() => handleFilterClick('traction')} className={filter === 'traction' ? 'active' : ''}>schedule-traction</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default PaymentBar;
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PaymentBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [filter, setFilter] = useState('');

    useEffect(() => {
        // Extract the filter name from the URL
        const path = location.pathname.split('/').pop().replace('-management', '');
        // Ensure the filter is in the correct format for comparison
        const formattedPath = path.replace('-', '').toLowerCase(); // e.g., 'payment-schedule' becomes 'paymentschedule'
        setFilter(formattedPath);
    }, [location]);

    const handleFilterClick = (filterName) => {
        // Navigate to the selected route
        navigate(`/payment/${filterName}-management`);
    };

    return (
        <div>
            <div className="campaign-list-topbar p-3">
                <div className="campaign-list-filters">
                    <button
                        onClick={() => handleFilterClick('payment-schedule')}
                        className={filter === 'paymentschedule' ? 'active' : ''}
                    >
                        Payment Schedule
                    </button>
                    <button
                        onClick={() => handleFilterClick('schedule-traction')}
                        className={filter === 'scheduletraction' ? 'active' : ''}
                    >
                        Schedule Transaction
                    </button>
                    <button
                        onClick={() => handleFilterClick('payment-history')}
                        className={filter === 'paymenthistory' ? 'active' : ''}
                    >
                        Payment History
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentBar;
