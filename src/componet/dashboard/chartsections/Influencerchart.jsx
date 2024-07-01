
import React, { useState } from 'react';
import BarChartComponent from '../BarChart';

const data = [
    { name: 'Jan', data1: 1, data2: 2, year: 2022 },
    { name: 'Feb', data1: 4, data2: 3, year: 2022 },
    { name: 'Mar', data1: 0, data2: 1, year: 2022 },
    { name: 'Apr', data1: 11, data2: 5, year: 2022 },
    { name: 'May', data1: 2, data2: 3, year: 2022 },
    { name: 'Jun', data1: 5, data2: 4, year: 2022 },
    { name: 'Jul', data1: 1, data2: 2, year: 2022 },
    { name: 'Aug', data1: 12, data2: 6, year: 2022 },
    { name: 'Sep', data1: 3, data2: 4, year: 2022 },
    { name: 'Oct', data1: 6, data2: 5, year: 2022 },
    { name: 'Nov', data1: 2, data2: 3, year: 2022 },
    { name: 'Dec', data1: 13, data2: 7, year: 2022 },
    { name: 'Jan', data1: 2, data2: 3, year: 2024 },
    { name: 'Feb', data1: 5, data2: 4, year: 2024 },
    { name: 'Mar', data1: 1, data2: 2, year: 2024 },
    { name: 'Apr', data1: 12, data2: 6, year: 2024 },
    { name: 'May', data1: 3, data2: 4, year: 2024 },
    { name: 'Jun', data1: 6, data2: 5, year: 2024 },
    { name: 'Jul', data1: 2, data2: 3, year: 2024 },
    { name: 'Aug', data1: 13, data2: 7, year: 2024 },
    { name: 'Sep', data1: 3, data2: 4, year: 2024 },
    { name: 'Oct', data1: 6, data2: 5, year: 2024 },
    { name: 'Nov', data1: 2, data2: 3, year: 2024 },
    { name: 'Dec', data1: 13, data2: 7, year: 2024 },
    { name: 'Jan', data1: 3, data2: 4, year: 2026 },
    { name: 'Feb', data1: 6, data2: 5, year: 2026 },
    { name: 'Mar', data1: 2, data2: 3, year: 2026 },
    { name: 'Apr', data1: 13, data2: 7, year: 2026 },
    { name: 'May', data1: 4, data2: 5, year: 2026 },
    { name: 'Jun', data1: 7, data2: 6, year: 2026 },
    { name: 'Jul', data1: 3, data2: 4, year: 2026 },
    { name: 'Aug', data1: 14, data2: 8, year: 2026 },
    { name: 'Sep', data1: 4, data2: 5, year: 2026 },
    { name: 'Oct', data1: 7, data2: 6, year: 2026 },
    { name: 'Nov', data1: 3, data2: 4, year: 2026 },
    { name: 'Dec', data1: 14, data2: 8, year: 2026 },
];

function Influencerchart() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [includeData1, setIncludeData1] = useState(true);
    const [includeData2, setIncludeData2] = useState(true);

    const handleYearChange = (e) => {
        const selectedYear = Number(e.target.value);
        setSelectedYear(selectedYear);
        console.log(selectedYear);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'data1') {
            setIncludeData1(checked);
        } else if (name === 'data2') {
            setIncludeData2(checked);
        }
    };

    const filteredData = data
        .filter(item => item.year === selectedYear)
        .map(item => ({
            name: item.name,
            ...(includeData1 && { data1: item.data1 }),
            ...(includeData2 && { data2: item.data2 })
        }));

    return (
        <div>
            <div>
                <h3>Influencer</h3>
            </div>
            <div>
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
                    <div className="my-2 d-flex justify-content-center gap-5">
                        <label>
                            <input
                                type="checkbox"
                                name="data1"
                                checked={includeData1}
                                onChange={handleCheckboxChange}
                            />
                            Register
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="data2"
                                checked={includeData2}
                                onChange={handleCheckboxChange}
                            />
                            Rejected
                        </label>
                    </div>
                </div>
                <div>
                    <BarChartComponent data={filteredData} />
                </div>
            </div>
        </div>
    )
}

export default Influencerchart;
