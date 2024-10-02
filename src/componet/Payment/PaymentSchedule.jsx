
import React, { useState, useEffect } from 'react';
import "../../style/payment/paymentSchedule.css";
import * as XLSX from 'xlsx';
import { makeApi } from '../../api/callApi.tsx';
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
import { Link } from 'react-router-dom';

const PaymentSchedule = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [data, setdata] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await makeApi('/v1/admin/api/get-all-pending-payments?all=yes', 'GET');
            setdata(res?.data?.apply);
            const mappedPayments = res?.data?.apply.map(payment => ({
                submitted: payment?.content_upload_date,
                campaign: payment?.campaignDetails.campaign_name,
                campaignType: payment?.campaignDetails.campaign_type,
                influencerEmail: payment?.influencerDetails?.email,
                influencerName: payment?.influencerDetails?.user_name,
                postLink: payment?.post_link,
                productRs: payment?.campaignDetails.product_price,
                infAmount: payment?.amount,
                reward: payment?.rewards || 0,
                total: (parseFloat(payment?.amount) + parseFloat(payment?.rewards || 0)).toFixed(2),
                actionDate: payment?.pay_scedule_date,
                campaign_no: payment?.campaign_no,
                influ_id: payment?.influ_id,
                infuID: payment?.influencerDetails?._id
            }));
            setPayments(mappedPayments);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const handleDateChange = (e, index) => {
        const updatedPayments = [...payments];
        updatedPayments[index].actionDate = e.target.value;
        setPayments(updatedPayments);
    };

    const handleInputChange = (e, index, field) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
        const updatedPayments = [...payments];
        updatedPayments[index][field] = value;
        const total = parseFloat(updatedPayments[index].productRs) + parseFloat(updatedPayments[index].infAmount) + parseFloat(updatedPayments[index].reward);
        updatedPayments[index].total = total.toFixed(2);
        setPayments(updatedPayments);
    };

    const updatePayment = async (index) => {
        setLoading(true);
        const payment = payments[index];
        console.log("payment: ", payment);
        const { campaign_no, influ_id, postLink, reward } = payment;

        try {
            const res = await makeApi(`/v1/influencer/edit-apply-campaign/${influ_id}/${campaign_no}`, 'PUT', {
                post_link: postLink,
                rewards: reward,
                pay_scedule_date: payment.actionDate,
            });

            if (res.success) {
                console.log("Updated payment: ", payment);
            } else {
                console.error('Update failed:', res.message);
            }
        } catch (error) {
            console.error('Error updating payment:', error);
        } finally {
            setLoading(false);
        }
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(payments);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Payment Schedule");
        XLSX.writeFile(workbook, "PaymentSchedule.xlsx");
    };

    return (
        <>
            {loading &&
                <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <PrimaryLoader />
                </div>
            }
            <div className="payment-schedule">
                <div className="header">
                    <button className="download-button" onClick={downloadExcel}>
                        Download to Excel
                    </button>
                </div>
                <thead>
                    <tr>
                        <th>Submitted</th>
                        <th>Campaign</th>
                        <th>Campaign Type</th>
                        <th>Influencer Email</th>
                        <th>Influencer Name</th> 
                        <th>Post Link</th>
                        <th>Product (Rs.)</th>
                        <th>Inf Amount</th>
                        <th>Reward (amount)</th>
                        <th>Total</th>
                        <th>Action</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => (
                        <tr key={index}>
                            <td>{payment.submitted}</td>
                            <td>{payment.campaign}</td>
                            <td>{payment.campaignType}</td>
                            <td style={{ maxWidth: '120px', overflowX: 'scroll' }} >{payment.influencerEmail}</td>
                            <Link to={`/user/user-details/${payment.infuID}`} target='_blank' >
                                <td>{payment.influencerName}</td> {/* New Data */}
                            </Link>
                            <td><Link to={payment.postLink} target="_blank" >Link</Link></td>
                            <td>
                                    <input
                                        type="text"
                                        value={payment.productRs}
                                        onChange={(e) => handleInputChange(e, index, 'productRs')}
                                        className='form-control w-75'
                                        readOnly
                                    />
                                </td>
                            {/* <td>{payment.infAmount}</td> */}
                            <td>
                                    <input
                                        type="text"
                                        value={payment.infAmount}
                                        onChange={(e) => handleInputChange(e, index, 'infAmount')}
                                        className='form-control w-75'
                                    />
                                </td>
                            {/* <td>{payment.reward}</td> */}
                            <td>
                                    <input
                                        type="text"
                                        value={payment.reward}
                                        onChange={(e) => handleInputChange(e, index, 'reward')}
                                        className='form-control w-75'
                                    />
                                </td>
                            <td>{payment.total}</td>
                            <td>
                                <input
                                    type="date"
                                    value={payment.actionDate || ''}
                                    onChange={(e) => handleDateChange(e, index)}
                                />
                            </td>
                            {/* <td>
                                <button onClick={() => updatePayment(index)}>Update</button>
                            </td> */}
                            <td>
                                     <button onClick={() => updatePayment(index)} className="update-button">
                                         Update
                                     </button>
                                 </td>
                        </tr>
                    ))}
                </tbody>

            </div>
        </>

    );
};

export default PaymentSchedule;




// import React, { useState, useEffect } from 'react';
// import "../../style/payment/paymentSchedule.css";
// import * as XLSX from 'xlsx';
// import { makeApi } from '../../api/callApi.tsx';
// import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
// import { Link } from 'react-router-dom';

// const PaymentSchedule = () => {
//     const [payments, setPayments] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [data, setdata] = useState([]);

//     // States for popup and form values
//     const [showPopup, setShowPopup] = useState(false);
//     const [selectedPayment, setSelectedPayment] = useState(null);

//     // Popup form states
//     const [productRs, setProductRs] = useState(0);
//     const [infAmount, setInfAmount] = useState(0);
//     const [reward, setReward] = useState(0);
//     const [total, setTotal] = useState(0);
//     const [userName, setUserName] = useState('');

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const res = await makeApi('/v1/admin/api/get-all-pending-payments?all=yes', 'GET');
//             setdata(res?.data?.apply);
//             const mappedPayments = res?.data?.apply.map(payment => ({
//                 submitted: payment?.content_upload_date,
//                 campaign: payment?.campaignDetails.campaign_name,
//                 campaignType: payment?.campaignDetails.campaign_type,
//                 influencerEmail: payment?.influencerDetails?.email,
//                 influencerName: payment?.influencerDetails?.user_name,
//                 postLink: payment?.post_link,
//                 productRs: payment?.campaignDetails.product_price,
//                 infAmount: payment?.amount,
//                 reward: payment?.rewards || 0,
//                 total: (parseFloat(payment?.amount) + parseFloat(payment?.rewards || 0)).toFixed(2),
//                 actionDate: payment?.pay_scedule_date,
//                 campaign_no: payment?.campaign_no,
//                 influ_id: payment?.influ_id,
//                 infuID: payment?.influencerDetails?._id
//             }));
//             setPayments(mappedPayments);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleInputChange = (e, field) => {
//         const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
//         if (field === 'productRs') setProductRs(value);
//         else if (field === 'infAmount') setInfAmount(value);
//         else if (field === 'reward') setReward(value);

//         const updatedTotal = parseFloat(productRs) + parseFloat(infAmount) + parseFloat(reward);
//         setTotal(updatedTotal.toFixed(2));
//     };

//     const openPopup = (payment) => {
//         // Set initial form values with selected payment details
//         setProductRs(payment.productRs);
//         setInfAmount(payment.infAmount);
//         setReward(payment.reward);
//         setTotal(payment.total);

//         setSelectedPayment(payment);
//         setShowPopup(true);
//     };

//     const closePopup = () => {
//         setShowPopup(false);
//         setSelectedPayment(null);
//     };

//     const updatePayment = async () => {
//         setLoading(true);
//         try {
//             const updatedPayment = {
//                 ...selectedPayment,
//                 productRs,
//                 infAmount,
//                 reward,
//                 total
//             };

//             const res = await makeApi(`/v1/influencer/edit-apply-campaign/${updatedPayment.influ_id}/${updatedPayment.campaign_no}`, 'PUT', {
//                 post_link: updatedPayment.postLink,
//                 rewards: updatedPayment.reward,
//                 pay_scedule_date: updatedPayment.actionDate,
//                 product_price: updatedPayment.productRs,
//                 amount: updatedPayment.infAmount
//             });

//             if (res.success) {
//                 console.log("Updated payment: ", updatedPayment);
//                 closePopup();
//                 fetchData(); // Refresh data after update
//             } else {
//                 console.error('Update failed:', res.message);
//             }
//         } catch (error) {
//             console.error('Error updating payment:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const downloadExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(payments);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Payment Schedule");
//         XLSX.writeFile(workbook, "PaymentSchedule.xlsx");
//     };

//     return (
//         <>
//             {loading &&
//                 <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}>
//                     <PrimaryLoader />
//                 </div>
//             }
//             <div className="payment-schedule">
//                 <div className="header">
//                     <button className="download-button" onClick={downloadExcel}>
//                         Download to Excel
//                     </button>
//                 </div>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Submitted</th>
//                             <th>Campaign</th>
//                             <th>Campaign Type</th>
//                             <th>Influencer Email</th>
//                             <th>Influencer Name</th> 
//                             <th>Post Link</th>
//                             <th>Product (Rs.)</th>
//                             <th>Inf Amount</th>
//                             <th>Reward (amount)</th>
//                             <th>Total</th>
//                             <th>Action</th>
//                             <th>Update</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {payments.map((payment, index) => (
//                             <tr key={index}>
//                                 <td>{payment.submitted}</td>
//                                 <td>{payment.campaign}</td>
//                                 <td>{payment.campaignType}</td>
//                                 <td style={{ maxWidth: '120px', overflowX: 'scroll' }} >{payment.influencerEmail}</td>
//                                 <Link to={`/user/user-details/${payment.infuID}`} target='_blank' >
//                                     <td>{payment.influencerName}</td>
//                                 </Link>
//                                 <td><Link to={payment.postLink} target="_blank" >Link</Link></td>
//                                 <td onClick={() => openPopup(payment)}>{payment.productRs}</td>
//                                 <td onClick={() => openPopup(payment)}>{payment.infAmount}</td>
//                                 <td onClick={() => openPopup(payment)}>{payment.reward}</td>
//                                 <td>{payment.total}</td>
//                                 <td>
//                                     <input
//                                         type="date"
//                                         value={payment.actionDate || ''}
//                                         onChange={(e) => handleInputChange(e, 'actionDate')}
//                                     />
//                                 </td>
//                                 <td>
//                                     <button onClick={() => updatePayment(index)} className="update-button">
//                                         Update
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {showPopup && (
//                 <div className="update_popup_payment">
//                     <div className="update_popup_payment_content">
//                         <span className="update_popup_payment_close" onClick={closePopup}>&times;</span>
//                         <h3>Edit Payment Details</h3>
//                         {/* email */}
//                         <div>
//                             <label>Post Link: </label>
//                             <input type="text" value={postLink} onChange={(e) => handleInputChange(e, 'postLink')} />
//                         </div>
//                         <div>
//                             <label>Product (Rs.): </label>
//                             <input type="text" value={productRs} onChange={(e) => handleInputChange(e, 'productRs')} />
//                         </div>
//                         <div>
//                             <label>Inf Amount: </label>
//                             <input type="text" value={infAmount} onChange={(e) => handleInputChange(e, 'infAmount')} />
//                         </div>
//                         <div>
//                             <label>Reward: </label>
//                             <input type="text" value={reward} onChange={(e) => handleInputChange(e, 'reward')} />
//                         </div>
//                         <div>
//                             <label>Total: </label>
//                             <input type="text" value={total} readOnly />
//                         </div>
//                         <button onClick={updatePayment}>Confirm</button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default PaymentSchedule;

// import React, { useState, useEffect } from 'react';
// import "../../style/payment/paymentSchedule.css";
// import * as XLSX from 'xlsx';
// import { makeApi } from '../../api/callApi.tsx';
// import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
// import { Link } from 'react-router-dom';

// const PaymentSchedule = () => {
//     const [payments, setPayments] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const res = await makeApi('/v1/admin/api/get-all-pending-payments?all=yes', 'GET');
//             setData(res?.data?.apply);
//             const mappedPayments = res?.data?.apply.map(payment => ({
//                 submitted: payment?.content_upload_date,
//                 campaign: payment?.campaignDetails?.campaign_name,
//                 campaignType: payment?.campaignDetails?.campaign_type,
//                 influencerEmail: payment?.influencerDetails?.email,
//                 influencerName: payment?.influencerDetails?.user_name,
//                 postLink: payment?.post_link,
//                 productRs: payment?.campaignDetails?.product_price || 0,
//                 infAmount: payment?.amount || 0,
//                 reward: payment?.rewards || 0,
//                 total: (parseFloat(payment?.amount) + parseFloat(payment?.rewards || 0)).toFixed(2),
//                 actionDate: payment?.pay_scedule_date,
//                 campaign_no: payment?.campaign_no,
//                 influ_id: payment?.influ_id,
//                 infuID: payment?.influencerDetails?._id
//             }));
//             setPayments(mappedPayments);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const handleDateChange = (e, index) => {
//         const updatedPayments = [...payments];
//         updatedPayments[index].actionDate = e.target.value;
//         setPayments(updatedPayments);
//     };

//     const handleInputChange = (e, index, field) => {
//         const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
//         const updatedPayments = [...payments];
//         updatedPayments[index][field] = value;
//         const total = (parseFloat(updatedPayments[index].productRs || 0) + parseFloat(updatedPayments[index].infAmount || 0) + parseFloat(updatedPayments[index].reward || 0)).toFixed(2);
//         updatedPayments[index].total = total;
//         setPayments(updatedPayments);
//     };

//     const updatePayment = async (index) => {
//         setLoading(true);
//         const payment = payments[index];
//         console.log("payment: ", payment);
//         const { campaign_no, influ_id, postLink, reward, productRs, infAmount, total } = payment;
//         try {
//             const res = await makeApi(`/v1/influencer/edit-apply-campaign/${influ_id}/${campaign_no}`, 'PUT', {
//                     post_link: postLink,
//                     rewards: reward,
//                     product_price: productRs,
//                     inf_amount: infAmount,
//                     total_amount: total,
//                     pay_scedule_date: payment.actionDate,
//                 });
//                 console.log("Updated payment: ", campaign_no, influ_id, postLink, reward, productRs, infAmount, total,payment.actionDate);


//             // if (res.success) {
//             //     console.log("Updated payment: ", payment);
//             // } else {
//             //     console.error('Update failed:', res.message);
//             // }
//         } catch (error) {
//             console.error('Error updating payment:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const downloadExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(payments);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Payment Schedule");
//         XLSX.writeFile(workbook, "PaymentSchedule.xlsx");
//     };

//     return (
//         <>
//             {loading &&
//                 <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}>
//                     <PrimaryLoader />
//                 </div>
//             }
//             <div className="payment-schedule">
//                 <div className="header">
//                     <button className="download-button" onClick={downloadExcel}>
//                         Download to Excel
//                     </button>
//                 </div>
//                 <thead>
//                     <tr>
//                         <th>Submitted</th>
//                         <th>Campaign</th>
//                         <th>Campaign Type</th>
//                         <th>Influencer Email</th>
//                         <th>Influencer Name</th> 
//                         <th>Post Link</th>
//                         <th>Product (Rs.)</th>
//                         <th>Inf Amount</th>
//                         <th>Reward (amount)</th>
//                         <th>Total</th>
//                         <th>Action</th>
//                         <th>Update</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {payments.map((payment, index) => (
//                         <tr key={index}>
//                             <td>{payment.submitted}</td>
//                             <td>{payment.campaign}</td>
//                             <td>{payment.campaignType}</td>
//                             <td style={{ maxWidth: '120px', overflowX: 'scroll' }} >{payment.influencerEmail}</td>
//                             <Link to={`/user/user-details/${payment.infuID}`} target='_blank' >
//                                 <td>{payment.influencerName}</td> {/* New Data */}
//                             </Link>
//                             <td><Link to={payment.postLink} target="_blank" >Link</Link></td>
//                             <td>
//                                 <input
//                                     type="text"
//                                     value={payment.productRs}
//                                     onChange={(e) => handleInputChange(e, index, 'productRs')}
//                                     className='form-control w-75'
//                                 />
//                             </td>
//                             <td>
//                                 <input
//                                     type="text"
//                                     value={payment.infAmount}
//                                     onChange={(e) => handleInputChange(e, index, 'infAmount')}
//                                     className='form-control w-75'
//                                 />
//                             </td>
//                             <td>
//                                 <input
//                                     type="text"
//                                     value={payment.reward}
//                                     onChange={(e) => handleInputChange(e, index, 'reward')}
//                                     className='form-control w-75'
//                                 />
//                             </td>
//                             <td>{payment.total}</td>
//                             <td>
//                                 <input
//                                     type="date"
//                                     value={payment.actionDate || ''}
//                                     onChange={(e) => handleDateChange(e, index)}
//                                 />
//                             </td>
//                             <td>
//                                 <button onClick={() => updatePayment(index)} className="update-button">
//                                     Update
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </div>
//         </>
//     );
// };

// export default PaymentSchedule;
