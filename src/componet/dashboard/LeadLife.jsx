// LeadLifeSpan.js
import React from 'react';
import "../../style/dashboard/LeadLife.css"; // Ensure correct path to your CSS file

const LeadLifeSpan = () => {
  const data = [
    { step: 'WELCOME CALL', followUp: 277, unreachable: 277, bin: 277, closure: 277, change: '1.5%' },
    { step: 'FOLLOW UP 1', followUp: 277, unreachable: 277, bin: 277, closure: 277, change: '1.5%' },
    { step: 'FOLLOW UP 2', followUp: 277, unreachable: 277, bin: 277, closure: 277, change: '1.5%' },
    { step: 'FOLLOW UP 3', followUp: 277, unreachable: 277, bin: 277, closure: 277, change: '1.5%' },
    { step: 'FOLLOW UP 4', followUp: 277, unreachable: 277, bin: 277, closure: 277, change: '1.5%' },
  ];

  return (
    <div className="LeadLifeSpan-container mt-4">
      <h2 className="LeadLifeSpan-title">LEAD LIFE SPAN</h2>
      <div className="LeadLifeSpan-filters">
        <span>1D</span>
        <span>7D</span>
        <span>1M</span>
        <span>3M</span>
        <span>6M</span>
        <span>1Y</span>
        <span>MAX</span>
      </div>
      <div className="LeadLifeSpan-born">BORN - 400</div>
      <table className="LeadLifeSpan-table table">
        <thead>
          <tr>
            <th>STEPS</th>
            <th>FOLLOW UP</th>
            <th>UNREACHABLE</th>
            <th>BIN</th>
            <th>CLOSURE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.step}</td>
              <td>{item.followUp} <span className="LeadLifeSpan-success">{item.change} ↑</span></td>
              <td>{item.unreachable} <span className="LeadLifeSpan-success">{item.change} ↑</span></td>
              <td>{item.bin} <span className="LeadLifeSpan-success">{item.change} ↑</span></td>
              <td>{item.closure} <span className="LeadLifeSpan-danger">{item.change} ↓</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadLifeSpan;
