import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/header/tixteen_icon.png'; 
import '../../style/header/navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/">
        <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/user/all-users">All Users</Link>
        <Link to="/campaign/CampaignList">Campaign List</Link>
        <Link to="/management/level-management">Management</Link>
        <Link to="/payment/payment-schedule-management"> Payment </Link>
      </div>
    </div>
  );
}

export default Navbar;
