import React from 'react'
import { Route, Routes } from "react-router-dom";
import MonthlyAttendance from '../componet/staff/MonthlyAttendance';
// import Profilebar from '../componet/profile/Profilebar';
import Profilebarr from '../componet/profile/Profilebarr';

 
function Profile() {
  return (
    <div>
        <Profilebarr/>
        <Routes>
        <Route path="/attendance-details" element={<MonthlyAttendance />} />
       



        </Routes>
    </div>
  )
}

export default Profile

