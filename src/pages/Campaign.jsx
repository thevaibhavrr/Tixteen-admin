import React from 'react';
import { Route, Routes } from "react-router-dom";
import MainCreateCampagin from '../componet/Campaign/MainCreateCampagin';
import CampaignList from '../componet/Campaign/campaginDetails/CampaignList';
import CampaignDetails from '../componet/Campaign/campaginDetails/CampaignDetails';
import CampaignUpdate from '../componet/Campaign/campaginUpdate/CampaignUpdate';


const Campaign = () => {
  return (
    <div className="">
       <Routes>
       <Route path="/create-campaign" element={<MainCreateCampagin />} />
       <Route path="/CampaignList" element={<CampaignList />} />
       <Route path="/campaign-details/:id" element={<CampaignDetails />} />
       <Route path='/update-campaign/:id' element={<CampaignUpdate />} />

       </Routes>
      
    </div>
  );
};

export default Campaign;
