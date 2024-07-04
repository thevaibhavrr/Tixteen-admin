
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { makeApi } from '../../../api/callApi.tsx';
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';

function Influencerchart() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [includeData1, setIncludeData1] = useState(true);
    const [includeData2, setIncludeData2] = useState(true);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async (year) => {
        setLoading(true);
        try {
            const response = await makeApi(`/v1/admin/api/get-monthly-user-counts?year=${year}&rejected=true&verified=true`,"GET");
            const { rejectedMonthlyCounts, verifiedMonthlyCounts } = response.data.data;

            const mergedData = rejectedMonthlyCounts.map((item, index) => ({
                name: item.month,
                data1: verifiedMonthlyCounts[index].count,
                data2: item.count,
                year
            }));

            setData(mergedData);
        } catch (error) {
            console.error('Error fetching data', error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(selectedYear);
    }, [selectedYear]);

    const handleYearChange = (e) => {
        const selectedYear = Number(e.target.value);
        setSelectedYear(selectedYear);
        fetchData(selectedYear);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === 'data1') {
            setIncludeData1(checked);
        } else if (name === 'data2') {
            setIncludeData2(checked);
        }
    };

    const filteredData = data.map(item => ({
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
                    <div className="my-2 d-flex justify-content-center align-items-center gap-5">
                        <div className="my-2">
                            <select className='p-2' value={selectedYear} onChange={handleYearChange}>
                                {Array.from({ length: 10 }, (_, i) => i + 2020).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <label>
                            <input
                                type="checkbox"
                                name="data1"
                                checked={includeData1}
                                onChange={handleCheckboxChange}
                            />
                            Verified
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
                <div className='main_earning_chart_div'>
                    {loading ? (
                         <div>
                         <PrimaryLoader />
                     </div>
                    ):(

                    <div className="main_data_chart_div_earning">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                height={300}
                                data={filteredData}
                                margin={{
                                    top: 20, right: 30, left: 20, bottom: 5,
                                }}
                                borderRadius={5}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                {includeData1 && <Bar dataKey="data1" className='bar_chart_first' barSize={24} fill="#90EE90" />}
                                {includeData2 && <Bar dataKey="data2" fill="#FF7F7F" barSize={24} />}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    )}

                    
                </div>
            </div>
        </div>
    )
}

export default Influencerchart;
