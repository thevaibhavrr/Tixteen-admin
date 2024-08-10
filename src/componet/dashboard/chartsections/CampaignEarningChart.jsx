import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { makeApi } from "../../../api/callApi.tsx";
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';

const CampaignEarningChart = () => {
    const [selectedYear, setSelectedYear] = useState(2023);
    const [apiData, setApiData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await makeApi(`/v1/admin/api/get-monthly-campaign-counts?year=${selectedYear}`, 'GET');
                setApiData(response.data.data);
            } catch (error) {
                console.error('Error fetching API data:', error);
                setError('An error occurred while fetching data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedYear]);

    const handleYearChange = (e) => {
        setSelectedYear(Number(e.target.value));
    };

    const renderChart = () => {
        if (isLoading) {
            return <div><PrimaryLoader /></div>;
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

        if (!apiData) {
            return <p>No data available for the selected year.</p>;
        }

        const { monthlyCounts } = apiData;
        const chartData = Object.entries(monthlyCounts).map(([month, count]) => ({
            name: month,
            value: count,
            year: selectedYear,
        }));

        return (
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis   />
                    <Tooltip />
                    <Bar dataKey="value" barSize={24} fill="#90EE90" />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    return (
        <div>
            <h3>Campaign</h3>
            <div className="my-2 d-flex justify-content-center align-items-center gap-5">
                <select className='p-2' value={selectedYear} onChange={handleYearChange}>
                    {Array.from({ length: 10 }, (_, i) => i + 2020).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="main_earning_chart_div">
                <div className="main_data_chart_div_earning">{renderChart()}</div>
                <div className='text-center bg-warning'> Total: {apiData?.total}</div>
            </div>
        </div>
    );
};

export default CampaignEarningChart;
