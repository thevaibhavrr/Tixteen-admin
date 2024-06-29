import React from 'react';
import DasboardStatusBar from './DasboardStatusBar';
import LeadFunnelChart from './LeadFunnelChart';
function DasbordBottomGraph() {
  return (
    <div className='d-flex' style={{marginBottom:"50px" , marginTop:"50px"}} >
        <div className='w-100' > 

        <LeadFunnelChart/>
        </div>
        <div className='w-100'>

        <DasboardStatusBar/>
        </div>
    </div>
  )
}

export default DasbordBottomGraph