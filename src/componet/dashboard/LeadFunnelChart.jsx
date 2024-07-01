
import React from 'react';
import {
  FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer
} from 'recharts';
import "../../style/dashboard/LeadFunnelChart.css";

const data = [
  { value: 60, name: 'Leads', fill: '#f56565' },
  { value: 50, name: 'Interested', fill: '#f6ad55' },
  { value: 45, name: 'Hot F-Ups', fill: '#68d391' },
  { value: 40, name: 'Bin', fill: '#4fd1c5' },
  { value: 35, name: 'Close', fill: '#48bb78' },
];

const LeadFunnelChart = () => (
  <div className="Main_leadFunnel_container">
    <h2 className="ClosureMeter-title">LEAD FUNNEL</h2>
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <FunnelChart>
          <Tooltip />
          <Funnel
            dataKey="value"
            data={data}
            isAnimationActive
            label
            labelLine
            labelStyle={{ fill: '#000' }}
            labelPosition="right"

          >

            <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default LeadFunnelChart;





