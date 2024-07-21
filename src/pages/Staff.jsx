import React from 'react';
import { Route, Routes } from "react-router-dom";
import SafeDetails from '../componet/staff/StafDetails';
import AddStaffPopup from '../componet/staff/AddStaff';


const Staff = () => {
  return (
    <div className="">
       <Routes>
       <Route path="/all-staff" element={<SafeDetails />} />
       <Route path="/add-staff" element={<AddStaffPopup />} />
       </Routes>
      
    </div>
  );
};

export default Staff;
