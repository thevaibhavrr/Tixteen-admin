
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import "../../style/dashboard/Dashboardchart.css"
import Calender from './calender';
import DasboardBarChart from './BarChart';


const EarningsBarChart = () => {
    return (
        <div className='d-flex justify-content-around mt-5 align-items-center' >
            <div>
                <Calender/>
            </div>

        <div className='main_earning_chart_div'>
            {/* chart */}
           <DasboardBarChart/>
        </div>
        </div>

    );
}

export default EarningsBarChart;
