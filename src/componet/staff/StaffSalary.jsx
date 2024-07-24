import React, { useState, useEffect } from 'react';
import { makeApi } from '../../api/callApi.tsx';
import '../../style/dashboard/MonthlyAttendance.css';


const MonthlySummary = ({ selectedStaff, currentMonth, currentYear }) => {
    const [loading, setLoading] = useState(false);
    const [monthlyData, setMonthlyData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [summaryData, setSummaryData] = useState({
        salary: 0,
        perDaySalary: 0,
        perMinuteSalary: 0,
        totalHalfDays: 0,
        totalFullDays: 0,
        totalLeaves: 0,
        totalShortLeaveMinutes: 0,
        totalActiveMinutes: 0,
        totalSalary: 0,
    });

    useEffect(() => {
        const fetchMonthlyData = async () => {
            setLoading(true);
            try {
                const url = selectedStaff
                    ? `/v1/get-monthly-attendance-data/${selectedStaff}?month=${currentMonth}&year=${currentYear}`
                    : `/v1/get-monthly-attendance-data?month=${currentMonth}&year=${currentYear}`;
                const response = await makeApi(url, 'GET');
                const data = response.data.data;
                setMonthlyData(data);
                setIsAdmin(response.data.user);

                // Calculate the required data for the summary
                const salary = 60000;
                const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
                const perDaySalary = salary / daysInMonth;
                const perMinuteSalary = perDaySalary / (9 * 60); // Assuming 9 working hours per day
                const totalHalfDays = data.filter(day => day.status === 'half day').length;
                const totalFullDays = data.filter(day => day.status === 'full day').length;
                const totalLeaves = data.filter(day => day.status === 'on leave').length;
                const totalShortLeaveMinutes = data.reduce((total, day) => total + day.shortLeaveMinutes, 0);
                const totalActiveMinutes = data.reduce((total, day) => total + day.totalActiveMinutes, 0);
                const totalSalary = perMinuteSalary * totalActiveMinutes;

                setSummaryData({
                    salary,
                    perDaySalary,
                    perMinuteSalary,
                    totalHalfDays,
                    totalFullDays,
                    totalLeaves,
                    totalShortLeaveMinutes,
                    totalActiveMinutes,
                    totalSalary,
                });
            } catch (error) {
                console.error('Error fetching monthly data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMonthlyData();
    }, [selectedStaff, currentMonth, currentYear]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="summary-box">
                        <h4>Summary</h4>
                        <div className="summary-item"><strong>Salary:</strong> {summaryData.salary}</div>
                        <div className="summary-item"><strong>Per Day Salary:</strong> {summaryData.perDaySalary.toFixed(2)}</div>
                        <div className="summary-item"><strong>Per Minute Salary:</strong> {summaryData.perMinuteSalary.toFixed(2)}</div>
                        <div className="summary-item"><strong>Total Half Days:</strong> {summaryData.totalHalfDays}</div>
                        <div className="summary-item"><strong>Total Full Days:</strong> {summaryData.totalFullDays}</div>
                        <div className="summary-item"><strong>Total Leaves:</strong> {summaryData.totalLeaves}</div>
                        <div className="summary-item"><strong>Total Short Leave Minutes:</strong> {summaryData.totalShortLeaveMinutes}</div>
                        <div className="summary-item"><strong>Total Active Minutes:</strong> {summaryData.totalActiveMinutes}</div>
                        <div className="summary-item"><strong>Total Salary:</strong> {summaryData.totalSalary.toFixed(2)}</div>
                    </div>
                    {/* Render other components based on monthly data */}
                </>
            )}
        </div>
    );
};

export default MonthlySummary;
