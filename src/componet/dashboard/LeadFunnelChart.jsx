import React from 'react';
import {
  FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { value: 60, name: 'Leads', fill: '#f56565' },
  { value: 50, name: 'Interested', fill: '#f6ad55' },
  { value: 45, name: 'Hot F-Ups', fill: '#68d391' },
  { value: 40, name: 'Bin', fill: '#4fd1c5' },
  { value: 35, name: 'Close', fill: '#48bb78' },
];

const LeadFunnelChart = () => (
  <div style={{ width: '70%', height: 400 }}>
    <ResponsiveContainer>
      <FunnelChart>
        <Tooltip />
        <Funnel
          dataKey="value"
          data={data}
          isAnimationActive
          label
          shape="square"
          spacing={100} // Adjust spacing here for gaps
        >
          <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  </div>
);

export default LeadFunnelChart;
