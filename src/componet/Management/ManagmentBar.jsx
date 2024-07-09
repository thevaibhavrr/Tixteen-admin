
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ManagementBar() {
    const [filter, setFilter] = useState('Level');
    const navigate = useNavigate();

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
                    {/* send message */}
                    <button onClick={() => handleFilterClick('Send-message')} className={filter === 'Send Message' ? 'active' : ''}>Send Message</button>
                </div>
            </div>
        </div>
    );
}

export default ManagementBar;
