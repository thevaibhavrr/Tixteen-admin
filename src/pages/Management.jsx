import React from 'react'
import { Route, Routes } from "react-router-dom";
import ManageLevelChart from '../componet/Management/ManageLevelChart';
import ManagementBar from '../componet/Management/ManagmentBar';
import ManageIndustryChart from '../componet/Management/ManageIndustryChart';
import ManageLanguageChart from '../componet/Management/ManageLanguageChart';
import ManagePlatform from '../componet/Management/ManagePlatform';
import ManageCheckList from '../componet/Management/ManageCheckList';
import SendMessageForCamp from '../componet/Management/SendMessage';
import ProformaInvoices from '../componet/Management/Invoice/ProformaInvoices';
import AddProformaInvoice from '../componet/Management/Invoice/AddProformaInvoice';
import Invoice from '../componet/Management/Invoice/profomInvoicedetails';
import TaxInvoices from '../componet/Management/Invoice/Taxinvoice';
import StaffDetails from '../componet/staff/StafDetails';
import AddStaffPopup from '../componet/staff/AddStaff';
import MonthlyAttendance from '../componet/staff/MonthlyAttendance';
import Createregister from '../componet/client/Clinetregister';
import ManageClients from '../componet/client/ManageClients';
import TaxInvoiceDetails from '../componet/Management/Invoice/TaxInvoicedetails';
import EditInvoiceDetails from '../componet/Management/Invoice/editInvoicedetails';

 
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
        <Route path="/send-message-management" element={<SendMessageForCamp />} />

        {/* invoice */}
        <Route path='/invoices-management' element={<ProformaInvoices />} />
        <Route path='/Add-invoices-management' element={<AddProformaInvoice />} />
        <Route path='/invoice/details/:id'element={<Invoice/>} />
        <Route path='/tax-invoice/details/:id'element={<TaxInvoiceDetails/>} />
        <Route path='/tax-invoices-management' element={<TaxInvoices />} />
        <Route path="/invoice-edit/:id" element={<EditInvoiceDetails/>} />

        {/* staff */}
       <Route path="/staff-management" element={<StaffDetails />} />
       <Route path="/add-staff" element={<AddStaffPopup />} />

        <Route path="/attendance-management" element={<MonthlyAttendance />} />
       {/* Createregister */}
       <Route path="/client-management" element={<ManageClients />} />
       <Route path="/add-client" element={<Createregister />} />



        </Routes>
    </div>
  )
}

export default Management

