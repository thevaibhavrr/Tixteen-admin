import React from 'react';
import MainCreateCampagin from './componet/Campaign/MainCreateCampagin';
import CampaignList from './componet/Campaign/campaginDetails/CampaignList';
import { Route, Routes } from "react-router-dom";
import CampaignDetails from './componet/Campaign/campaginDetails/CampaignDetails';
import CampaignUpdate from './componet/Campaign/campaginUpdate/CampaignUpdate';
import UserDetails from './componet/Campaign/UserDetails';


const App = () => {
  return (
    <div className="App">
       <Routes>
       <Route path="/" element={<MainCreateCampagin />} />
       <Route path="/CampaignList" element={<CampaignList />} />
       <Route path="/campaign-details/:id" element={<CampaignDetails />} />
       <Route path='/update-campaign/:id' element={<CampaignUpdate />} />

       {/* user */}
       <Route path="/user-details/:id" element={<UserDetails />} />
       </Routes>
      
    </div>
  );
};

export default App;
