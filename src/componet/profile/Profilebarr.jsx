
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Profilebarr() {
    const navigate = useNavigate();
    const location = useLocation();
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const path = location.pathname.split('/').pop().replace('-details', '');
        const capitalizedPath = path.charAt(0).toUpperCase() + path.slice(1);
        setFilter(capitalizedPath);
    }, [location]);

    const handleFilterClick = (filterName) => {
        setFilter(filterName);
        navigate(`/me/${filterName.toLowerCase()}-details`);
    };

    return (
        <div>
            <div className="campaign-list-topbar p-3">
                <div className="campaign-list-filters">
                    <button
                        onClick={() => handleFilterClick('Attendance')}
                        className={filter === 'Attendance' ? 'active' : ''}
                    >
                        Attendance
                    </button>
                    {/* Add more buttons for other filters as needed */}
                </div>
            </div>
        </div>
    );
}

export default Profilebarr;
