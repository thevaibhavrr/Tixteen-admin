// import React from 'react'
// import BarChartComponent from '../BarChart';


// const data = [
//     {
//         name: 'Mar 11', data1: 4000,
//     },
//     {
//         name: 'Mar 12', data1: 3000,
//     },
//     {
//         name: 'Mar 13', data1: 2000,
//     },
//     {
//         name: 'Mar 14', data1: 2780,
//     },
//     {
//         name: 'Mar 14', data1: 2780,
//     },
//     {
//         name: 'Mar 14', data1: 2780,
//     },
//     {
//         name: 'Mar 14', data1: 2780,
//     },

// ];
// function RevanuChart() {
//     return (
//         <div>
//             <div>
//                 <h3>Revenue</h3>
//             </div>
//             <BarChartComponent data={data} />
//         </div>
//     )
// }

// export default RevanuChart








import React, { useState } from 'react';
import BarChartComponent from '../BarChart';

const data = [
    { name: 'Mar 11', data1: 4000, year: 2022 },
    { name: 'Mar 12', data1: 3000, year: 2022 },
    { name: 'Mar 13', data1: 2000, year: 2022 },
    { name: 'Mar 14', data1: 2780, year: 2022 },
    { name: 'Mar 11', data1: 4500, year: 2024 },
    { name: 'Mar 12', data1: 3500, year: 2024 },
    { name: 'Mar 13', data1: 2500, year: 2024 },
    { name: 'Mar 14', data1: 3000, year: 2024 },
    { name: 'Mar 11', data1: 5000, year: 2026 },
    { name: 'Mar 12', data1: 4000, year: 2026 },
    { name: 'Mar 13', data1: 3000, year: 2026 },
    { name: 'Mar 14', data1: 3500, year: 2026 },
    // Add more data for other months if needed
];

function RevanuChart() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleYearChange = (e) => {
        const selectedYear = Number(e.target.value);
        setSelectedYear(selectedYear);
        console.log(selectedYear);
    };

    const filteredData = data.filter(item => item.year === selectedYear);

    return (
        <div>
            <div>
                <h3>Revenue</h3>
            </div>
            <div>
                <div className="my-2">
                    <select className='p-2' value={selectedYear} onChange={handleYearChange}>
                        {Array.from({ length: 10 }, (_, i) => {
                            const startYear = 2022 + i * 2;
                            const endYear = startYear + 1;
                            return (
                                <option key={`${startYear}-${endYear}`} value={startYear}>
                                    {`${startYear} - ${endYear}`}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <BarChartComponent data={filteredData} />
        </div>
    );
}

export default RevanuChart;
