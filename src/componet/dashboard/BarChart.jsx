import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import "../../style/dashboard/Dashboardchart.css";

const BarChartComponent = ({ data }) => {
    if (!data || data.length === 0) {
        return <p>No data available</p>; 
    }

    const hasData2 = data.some(d => d.hasOwnProperty('data2'));

    return (
        <div className='main_earning_chart_div'>
            {/* chart */}
            <div className="main_data_chart_div_earning">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        height={300}
                        data={data}
                        margin={{
                            top: 20, right: 30, left: 20, bottom: 5,
                        }}
                        borderRadius={5}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="data1" className='bar_chart_first' barSize={24} fill="#90EE90" />
                        {hasData2 && <Bar dataKey="data2" fill="#FF7F7F" barSize={24} />}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default BarChartComponent;
