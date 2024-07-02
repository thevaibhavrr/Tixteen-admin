import React from 'react'
import DashbordSummaryHeading from './DashbordSummaryHeading'
import DasbordBottomGraph from './DasbordBottomGraph'
import LeadLifeSpan from './LeadLife'
import ClosureMeter from './ClosureMeter'
import FirstsectionDashboard from './FirstsectionDashboard'
import SecondSectionDashboard from './SecondSectionDashboard'

function MainDasboard() {
  return (
    <div style={{ padding: " 100px" }} >
      <DashbordSummaryHeading />
      <FirstsectionDashboard />
      <SecondSectionDashboard />
      <DasbordBottomGraph />
      <LeadLifeSpan />
      <ClosureMeter />
    </div>
  )
}

export default MainDasboard