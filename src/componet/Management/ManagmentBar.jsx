
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeApi } from "../../api/callApi.tsx"

function ManagementBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [filter, setFilter] = useState('');
    const [user, setUser] = useState("")

    const fetchUser = async () => {
        const response = await makeApi(`/v1/admin/api/get-admin-details`, "GET")
        setUser(response.data.data)
    }
    useEffect(() => {
        fetchUser()
    }, [])

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
                    {user && user.user === "admin" &&
                        <button onClick={() => handleFilterClick('Level')} className={filter === 'Level' ? 'active' : ''}>Level</button>
                    }
                    {user && user.user === "admin" &&
                        <button onClick={() => handleFilterClick('Industry')} className={filter === 'Industry' ? 'active' : ''}>Industry</button>
                    }
                    {user && user.user === "admin" &&
                        <button onClick={() => handleFilterClick('Language')} className={filter === 'Language' ? 'active' : ''}>Language</button>
                    }
                    {user && user.user === "admin" &&
                        <button onClick={() => handleFilterClick('Checklist')} className={filter === 'Checklist' ? 'active' : ''}>Checklist</button>
                    }
                    <button onClick={() => handleFilterClick('Send-message')} className={filter === 'Send-message' ? 'active' : ''}>Send Message</button>
                    {user && user.user === "admin" &&
                        <button onClick={() => handleFilterClick('Invoices')} className={filter === 'Invoices' ? 'active' : ''}>Invoices</button>
                    }
                    {user && user.user === "admin" &&
                        <button onClick={() => handleFilterClick('Staff')} className={filter === 'Staff' ? 'active' : ''}>Staff</button>
                    }
                    <button onClick={() => handleFilterClick('Attendance')} className={filter === 'Attendance' ? 'active' : ''}>Attendance</button>
                    {user && user.user === "admin" &&
                        <button onClick={() => handleFilterClick('Client')} className={filter === 'Client' ? 'active' : ''}>Client</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default ManagementBar;

{/* <button onClick={() => handleFilterClick('Platform')} className={filter === 'Platform' ? 'active' : ''}>Platform</button> */ }
{/* <button onClick={() => handleFilterClick('Notice')} className={filter === 'Notice' ? 'active' : ''}>Notice</button> */ }