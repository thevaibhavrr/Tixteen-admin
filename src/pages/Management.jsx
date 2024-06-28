import React from 'react'
import { Route, Routes } from "react-router-dom";
import ManageLevelChart from '../componet/Management/ManageLevelChart';
import ManagementBar from '../componet/Management/ManagmentBar';
import ManageIndustryChart from '../componet/Management/ManageIndustryChart';
import ManageLanguageChart from '../componet/Management/ManageLanguageChart';
import ManagePlatform from '../componet/Management/ManagePlatform';
import ManageCheckList from '../componet/Management/ManageCheckList';


function Management() {
  return (
    <div>
      <ManagementBar/>
        <Routes>
        <Route path="/level-management" element={<ManageLevelChart />} />
        <Route path="/industry-management" element={<ManageIndustryChart />} />
        <Route path="/language-management" element={<ManageLanguageChart />} />
        <Route path='/platform-management' element={<ManagePlatform/>} />
        <Route path="/checklist-management" element={<ManageCheckList />} />
        </Routes>
    </div>
  )
}

export default Management

