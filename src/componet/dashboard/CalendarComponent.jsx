import React, { useState } from 'react';
import '../../style/dashboard/CalendarComponent.css';

const ToggleComponent = ({ onToggleChange }) => {
    const [isMonthlyView, setIsMonthlyView] = useState("Daily");

    const handleToggleChange = () => {
        const newValue = !isMonthlyView;
        setIsMonthlyView(newValue);
        onToggleChange(newValue ? 'monthly' : 'Daily'); 
    };

    return (
        <div className='mt-5'>
            {/* switch */}
            <div className='main_calendar_switch_div'>
                <div>Daily</div>
                <div>
                    <label className="switch">
                        <input type="checkbox" checked={!isMonthlyView} onChange={handleToggleChange} />
                        <span className="slider"></span>
                    </label>
                </div>
                <div>MONTHLY</div>
            </div>
        </div>
    );
};

export default ToggleComponent;
