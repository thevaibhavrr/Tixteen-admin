// ClosureMeter.js
import React from 'react';
import "../../style/dashboard/ClosureMeter.css";

const ClosureMeter = () => {
  const data = [
    { duration: 'UNDER 7 DAYS', closure: 2, percentage: '73%', change: '1.5%' },
    { duration: '15 DAYS', closure: 1, percentage: '73%', change: '1.5%' },
    { duration: '30 DAYS', closure: 3, percentage: '73%', change: '1.5%' },
    { duration: '60 DAYS', closure: 5, percentage: '73%', change: '1.5%' },
    { duration: 'ABOVE', closure: 4, percentage: '73%', change: '1.5%' },
  ];

  return (
    <div className="ClosureMeter-container mt-4">
      <h2 className="ClosureMeter-title">CLOSURE METER</h2>

      <table className="LeadLifeSpan-table table">
        <thead>
          <tr>
            <th>DURATION</th>
            <th>CLOSURE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.duration}</td>
              <td>{item.closure} {item.percentage} <span className="LeadLifeSpan-success">{item.change} ↑</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
};

export default ClosureMeter;
