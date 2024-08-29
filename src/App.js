import React, { useEffect } from 'react';
import { Route, Routes, useNavigate,useLocation } from "react-router-dom";
import Navbar from './componet/Header/Navbar';
import Campaign from './pages/Campaign';
import User from './pages/User';
import Management from './pages/Management';
import MainDasboard from './componet/dashboard/MainDasboard';
import EditInvoiceDetails from './componet/Management/Invoice/editInvoicedetails';
import Staff from './pages/Staff';
import Login from './componet/Auth/login';
import MonthlyAttendance from './componet/staff/MonthlyAttendance';
import Profile from './pages/Profile';
import PaymentSchedule from './componet/Payment/PaymentSchedule';
import Payment from './pages/Payment';
import Advance from './pages/advance';

const App = () => {
  const location = useLocation();
  const history = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');

    // If token is not found, redirect to login page
    if (!token && location.pathname !== '/login') {
      history('/login');
    }
  }, [location.pathname, history]);

  // Determine if the current location is '/login'
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="App">
      {/* Conditionally render Navbar */}
      {!isLoginPage && <Navbar />}
      
      <Routes>
        <Route path="/campaign/*" element={<Campaign />} />
        <Route path='/user/*' element={<User />} />
        <Route path='/management/*' element={<Management />} />
        <Route path='/staff/*' element={<Staff />} />
        <Route path='/me/*' element={<Profile />} />
        <Route path='/' element={<MainDasboard />} />
        <Route path='/z/:id' element={<EditInvoiceDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/payment/*' element={<Payment />} />
        <Route path='/advance/*' element={<Advance />} />
      </Routes>
    </div>
  );
};

export default App;
