
import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import "../../style/dashboard/Dashboardchart.css"
import Calender from './calender';


const data = [
    {
        name: 'Mar 11', totalEarning: 4000, yourEarning: 2400,
    },
    {
        name: 'Mar 12', totalEarning: 3000, yourEarning: 1398,
    },
    {
        name: 'Mar 13', totalEarning: 2000, yourEarning: 4800,
    },
    {
        name: 'Mar 14', totalEarning: 2780, yourEarning: 3908,
    },
    {
        name: 'Mar 14', totalEarning: 2780, yourEarning: 3908,
    },
    {
        name: 'Mar 14', totalEarning: 2780, yourEarning: 3908,
    },
    {
        name: 'Mar 14', totalEarning: 2780, yourEarning: 3908,
    },

];

const EarningsBarChart = () => {
    return (
        <div className='d-flex justify-content-around mt-5' >
                <Calender/>

        <div className='main_earning_chart_div'>
            {/* chart */}
            <div className="main_data_chart_div_earning"  >
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        // width={600}
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
                        {/* <Legend /> */}
                        <Bar dataKey="yourEarning" className='bar_cart_first' barSize={24} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        </div>

    );
}

export default EarningsBarChart;
