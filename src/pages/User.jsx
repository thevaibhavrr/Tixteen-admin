import React from 'react'
import { Route, Routes } from "react-router-dom";
import UserDetails from '../componet/users/UserDetails';
import AllUser from '../componet/users/allUsers';
import UpdateUserDetails from '../componet/users/UpdateUserDetails';


function User() {
  return (
    <div>
        <Routes>

        <Route path="/user-details/:id" element={<UserDetails />} />
       <Route path='/all-users' element={<AllUser />} />
       <Route path="/update-user-details/:id" element={<UpdateUserDetails />} />
        </Routes>
    </div>
  )
}

export default User