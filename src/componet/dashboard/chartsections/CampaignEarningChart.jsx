import React, { useState } from 'react'
import BarChartComponent from '../BarChart';

const data = [
    { name: 'Jan', data1: 1, year: 2022 },
    { name: 'Feb', data1: 4, year: 2022 },
    { name: 'Mar', data1: 0, year: 2022 },
    { name: 'Apr', data1: 11, year: 2022 },
    { name: 'Jul', data1: 2, year: 2024 },
    { name: 'Aug', data1: 13, year: 2024 },
    { name: 'Sep', data1: 3, year: 2024 },
    { name: 'Oct', data1: 6, year: 2024 },
    { name: 'Nov', data1: 2, year: 2024 },
]
function CampaignEarningChart() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const handleYearChange = (e) => {
        const selectedYear = Number(e.target.value);
        setSelectedYear(selectedYear);
        console.log(selectedYear);
    };

    const filteredData = data.filter(item => item.year === selectedYear)


    return (<div>
        <div>
            <h3>Campaign</h3>
        </div>
        <div>
            <div>
                <div className="my-2 d-flex justify-content-center align-items-center gap-5">
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
            </div>
            <div>
                <BarChartComponent data={filteredData} />
            </div>
        </div>
    </div>
    )
}

export default CampaignEarningChart