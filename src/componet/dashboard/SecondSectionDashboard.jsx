import React from 'react'
import Campaigncalender from './calnendersections/Campaigncalender'
import CampaignEarningChart from './chartsections/CampaignEarningChart'

function SecondSectionDashboard() {
  return (
    <div className='d-flex justify-content-between' >
        <Campaigncalender/>
        <CampaignEarningChart/>
    </div>
  )
}

export default SecondSectionDashboard