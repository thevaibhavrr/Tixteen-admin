import React from 'react'
import DashbordSummaryHeading from './DashbordSummaryHeading'
import DasbordBottomGraph from './DasbordBottomGraph'
import LeadLifeSpan from './LeadLife'
import ClosureMeter from './ClosureMeter'
import FirstsectionDashboard from './FirstsectionDashboard'
import SecondSectionDashboard from './SecondSectionDashboard'
import AttendanceForm from './AttendanceForm'

function MainDasboard() {
  return (
    <div className='d-flex flex-column gap-5 px-5 ' >
      <div>
      </div>
      <div className='d-flex flex-column align-items-end ' >

        <div className='w-100 pb-3' style={{ backgroundColor: "white" }} >
          <AttendanceForm />
        </div>
        <DashbordSummaryHeading />
      </div>
      <div>


        <FirstsectionDashboard />
      </div>
      <div>

        <SecondSectionDashboard />
      </div>
      <div>

        <DasbordBottomGraph />
      </div>
      <div>

        <LeadLifeSpan />
      </div>
      <div>

        <ClosureMeter />
      </div>
    </div>
  )
}

export default MainDasboard