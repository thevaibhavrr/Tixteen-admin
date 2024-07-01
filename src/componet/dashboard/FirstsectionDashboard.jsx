import React, { useState } from 'react';
import RevenuCalender from './calnendersections/revenuCalender';
import Influencercalender from './calnendersections/Influencercalender';
import ToggleComponent from './CalendarComponent'; 
import RevanuChart from './chartsections/RevanuChart';
import Influencerchart from './chartsections/Influencerchart';

function FirstsectionDashboard() {
    const [isMonthlyView, setIsMonthlyView] = useState('monthly'); 

    const handleToggleChange = (newValue) => {
        setIsMonthlyView(newValue); 
    };

    return (
        <>
        <div>
            <ToggleComponent onToggleChange={handleToggleChange} />
        </div>
        
        <div className='d-flex w-100 justify-content-between'>
            { isMonthlyView === 'monthly' ? <RevenuCalender /> : <RevanuChart /> }
            { isMonthlyView === 'monthly' ? <Influencercalender /> : <Influencerchart /> }
        </div>
        </>
    );
}

export default FirstsectionDashboard;
