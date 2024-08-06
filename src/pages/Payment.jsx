// import React from 'react'
// import PaymentBar from '../componet/Payment/PaymentBar'
// import { Route, Routes } from "react-router-dom";
// import PaymentSchedule from '../componet/Payment/PaymentSchedule';
// import PaymentScheduleTraction from '../componet/Payment/PaymentTragection';


// function Payment() {
//   return (
//     <div>
//         <PaymentBar/>
//         <Routes>
//        <Route path="/payment-schedule" element={<PaymentSchedule />} />
//         <Route path="/payment-schedule-traction" element={<PaymentScheduleTraction />} />



//         </Routes>
//     </div>
//   )
// } 

// export default Payment


import React from 'react'
import PaymentBar from '../componet/Payment/PaymentBar'
import { Route, Routes } from "react-router-dom";
import PaymentSchedule from '../componet/Payment/PaymentSchedule';
import PaymentScheduleTraction from '../componet/Payment/PaymentTragection';
import PaymentHistory from '../componet/Payment/PaymentHistory';


function Payment() {
  return (
    <div>
      <PaymentBar />
      <Routes>
        {/* <Route path="/payment-schedule-management" element={<PaymentSchedule />} /> */}
        {/* <Route path="/schedule-traction-management" element={<PaymentScheduleTraction />} /> */}
        <Route path="/payment-schedule-management" element={<PaymentSchedule />} />
        <Route path="/schedule-traction-management" element={<PaymentScheduleTraction />} />
        {/* PaymentHistory */}
        <Route path="/payment-history-management" element={<PaymentHistory />} />
      
      </Routes>
    </div>
  );
}

export default Payment;
