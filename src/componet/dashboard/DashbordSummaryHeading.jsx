import React from 'react'
import "../../style/dashboard/DashbordSummaryHeading.css"
function DashbordSummaryHeading() {
    return (
        <div className='main_dashboard_summary' >
            {/* 1 */}
            <div className='dashboard_summary_box' >
                <div className='dashboard_summary_box_heading' > INFUENCERS </div>
                <div className=' dashboard_summary_box_content   ' >
                    <div className='dashboard_summary_box_content_box dashboard_summary_box_content_box_for_border ' > <div> NEW</div> <div className='bold_text' >10</div>  </div>
                    <div className='dashboard_summary_box_content_box dashboard_summary_box_content_box_for_border' > <div>SUSPENDED </div > <div className='bold_text'>40  </div> </div>
                    <div className='dashboard_summary_box_content_box' > <div>VERIFIED </div><div className='bold_text'> 5000 </div></div> 
                </div>
            </div>
            {/* 2 */}
            <div className='dashboard_summary_box' >
                <div className='dashboard_summary_box_heading' > PROJECT </div>
                <div className=' dashboard_summary_box_content   '>
                    <div className='dashboard_summary_box_content_box dashboard_summary_box_content_box_for_border'> <div> NEW</div> <div className='bold_text'>10</div>  </div>
                    <div className='dashboard_summary_box_content_box dashboard_summary_box_content_box_for_border'> <div>ON GOING </div>  <div className='bold_text'>40</div>  </div>
                    <div className='dashboard_summary_box_content_box'> <div>DELAYED </div>  <div className='bold_text'> 5000  </div></div>
                </div>
            </div>
            {/* 3 */}
            <div className='dashboard_summary_box' >
                <div className='dashboard_summary_box_heading' > PAYOUTS </div>
                <div className=' dashboard_summary_box_content   '>
                    <div className='dashboard_summary_box_content_box dashboard_summary_box_content_box_for_border'> <div> UPCOMING </div> <div className='bold_text'>3540</div>  </div>
                    <div className='dashboard_summary_box_content_box'> <div>NEXT </div><div className='bold_text'>  5000 </div></div>
                </div>
            </div>
        </div>
    )
}

export default DashbordSummaryHeading