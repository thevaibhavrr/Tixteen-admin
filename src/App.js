import React from 'react';
import { Route, Routes } from "react-router-dom";
import Navbar from './componet/Header/Navbar';
import Campaign from './pages/Campaign';
import User from './pages/User';
import Management from './pages/Management';
import MainDasboard from './componet/dashboard/MainDasboard';
import AddProformaInvoice from './componet/Management/Invoice/AddProformaInvoice';
import ProformaInvoices from './componet/Management/Invoice/ProformaInvoices';
import Invoice from './componet/Management/Invoice/profomInvoicedetails';
import EditInvoiceDetails from './componet/Management/Invoice/editInvoicedetails';


const App = () => {
  return (
    <div className="App">
      <Navbar />
       <Routes>
        <Route path="/campaign/*" element={<Campaign />} />
        <Route path='/user/*' element={<User />} />
        <Route path='/management/*' element={<Management />} />
        <Route path='/'element={<MainDasboard/>} />
        <Route path='/y'element={<AddProformaInvoice/>} />
        <Route path='/z/:id'element={<EditInvoiceDetails/>} />

       </Routes>
      
    </div>
  );
};

export default App;
