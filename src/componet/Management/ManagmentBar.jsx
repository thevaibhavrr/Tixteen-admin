
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ManagementBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const path = location.pathname.split('/').pop().replace('-management', '');
        const capitalizedPath = path.charAt(0).toUpperCase() + path.slice(1);
        setFilter(capitalizedPath);
    }, [location]);

    const handleFilterClick = (filterName) => {
        setFilter(filterName);
        navigate(`/management/${filterName.toLowerCase()}-management`);
    };

    return (
        <div>
            <div className="campaign-list-topbar p-3">
                <div className="campaign-list-filters">
                    <button onClick={() => handleFilterClick('Level')} className={filter === 'Level' ? 'active' : ''}>Level</button>
                    <button onClick={() => handleFilterClick('Industry')} className={filter === 'Industry' ? 'active' : ''}>Industry</button>
                    <button onClick={() => handleFilterClick('Language')} className={filter === 'Language' ? 'active' : ''}>Language</button>
                    <button onClick={() => handleFilterClick('Platform')} className={filter === 'Platform' ? 'active' : ''}>Platform</button>
                    <button onClick={() => handleFilterClick('Checklist')} className={filter === 'Checklist' ? 'active' : ''}>Checklist</button>
                    <button onClick={() => handleFilterClick('Notice')} className={filter === 'Notice' ? 'active' : ''}>Notice</button>
                    <button onClick={() => handleFilterClick('Send-message')} className={filter === 'Send-Message' ? 'active' : ''}>Send Message</button>
                    <button onClick={() => handleFilterClick('Invoices')} className={filter === 'Invoices' ? 'active' : ''}>Invoices</button>
                    <button onClick={() => handleFilterClick('Staff')} className={filter === 'Staff' ? 'active' : ''}>Staff</button>
                </div>
            </div>
        </div>
    );
}

export default ManagementBar;
