import React from 'react';
import MainCreateCampagin from './componet/Campaign/MainCreateCampagin';
import CampaignList from './componet/Campaign/campaginDetails/CampaignList';
import { Route, Routes } from "react-router-dom";
import CampaignDetails from './componet/Campaign/campaginDetails/CampaignDetails';
import CampaignUpdate from './componet/Campaign/campaginUpdate/CampaignUpdate';
import UserDetails from './componet/users/UserDetails';
import AllUser from './componet/users/allUsers';
import Navbar from './componet/Header/Navbar';
import UpdateUserDetails from './componet/users/UpdateUserDetails';
import Campaign from './pages/Campaign';
import User from './pages/User';
import ManageLevelChart from './componet/Management/ManageLevelChart';
import Management from './pages/Management';


const App = () => {
  return (
    <div className="App">
      <Navbar />
       <Routes>
        <Route path="/campaign/*" element={<Campaign />} />
        <Route path='/user/*' element={<User />} />
        <Route path='/management/*' element={<Management />} />
        <Route path='/'element={<CampaignList/>} />
       </Routes>
      
    </div>
  );
};

export default App;
