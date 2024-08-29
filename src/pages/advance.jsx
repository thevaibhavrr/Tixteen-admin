import React from 'react';
import { Route, Routes } from "react-router-dom";
import ApplyCampaignForm from '../componet/advance/ApplyCampaignForm';


const Advance = () => {
  return (
    <div className="">
       <Routes>
       <Route path="/apply-custom-campaign" element={<ApplyCampaignForm />} />
       </Routes>
      
    </div>
  );
};

export default Advance;
