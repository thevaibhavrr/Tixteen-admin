import React from 'react'
import DashbordSummaryHeading from './DashbordSummaryHeading'
import CalendarComponent from './CalendarComponent'
import EarningsBarChart from './Dashboardchart'
import DasbordBottomGraph from './DasbordBottomGraph'
import LeadLifeSpan from './LeadLife'
import ClosureMeter from './ClosureMeter'
import FirstsectionDashboard from './FirstsectionDashboard'

function MainDasboard() {
  return (
    <div style={{padding:" 100px"}} >
        <DashbordSummaryHeading/>
      <FirstsectionDashboard/>
        {/* <CalendarComponent/> */}
        <EarningsBarChart/>
        <DasbordBottomGraph/>
        <LeadLifeSpan/>
        <ClosureMeter/>
    </div>
  )
}

export default MainDasboard