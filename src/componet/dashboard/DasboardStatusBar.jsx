import "../../style/dashboard/DasboardStatusBar.css"
import React, { useState } from 'react'

function DasboardStatusBar() {
    const [statusCounts] = useState([80, 60, 30]);
    return (
        <div className="main_status_bar_div">
            <div className=""style={{ width: `${statusCounts[0]}%` }} >
                <div className="status_bar_status_bar on-time-status-bar"  >
                </div>
                <div className="status_bar_status_bar_text">on time</div>
            </div>
            <div className="" style={{ width: `${statusCounts[1]}%` }}>

                <div className="status_bar_status_bar delay-status-bar"  >
                </div>
                <div className="status_bar_status_bar_text"> delay </div>
            </div>
            <div className="" style={{ width: `${statusCounts[2]}%` }}>

                <div className="status_bar_status_bar over-delay-status-bar"  >
                </div>
                <div className="status_bar_status_bar_text"> over delay </div>
            </div>
        </div>
    );
};


export default DasboardStatusBar