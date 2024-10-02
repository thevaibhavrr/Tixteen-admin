
// import React, { useState, useEffect } from 'react';
// import "../../style/payment/paymentSchedule.css";
// import * as XLSX from 'xlsx';
// import { makeApi } from '../../api/callApi.tsx';
// import PrimaryLoader from '../../utils/PrimaryLoader.jsx';

// const PaymentHistory = () => {
//     const [payments, setPayments] = useState([]);
//     const [filteredPayments, setFilteredPayments] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [campaignName, setCampaignName] = useState("");
//     const [paymentYearMonth, setPaymentYearMonth] = useState("");

//     // Set the default value for paymentYearMonth to the current year and month
//     useEffect(() => {
//         const currentYearMonth = new Date().toISOString().slice(0, 7);
//         setPaymentYearMonth(currentYearMonth);
//     }, []);
 
//     // Fetch all data when the component mounts
//     useEffect(() => {
//         const fetchData = async () => { 
//             setLoading(true);
//             try {
//                 const res = await makeApi(`/v1/admin/api/get-all-pending-payments?all=traction`, 'GET');
                
//                 if (res.data.apply.length > 0) {
//                     const mappedPayments = res.data.apply.map((payment, index) => {
//                         const parseDate = (dateString) => {
//                             if (!dateString) return '';
//                             const date = new Date(dateString);
//                             return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
//                         };

//                         const campaignDetails = payment.campaignDetails || {};

//                         return {
//                             sno: index + 1,
//                             submitted: parseDate(payment.content_upload_date),
//                             campaign: campaignDetails.campaign_name || 'N/A',
//                             campaignID: payment.campaign_no,
//                             influencerEmail: payment.influ_id,
//                             postLink: payment.post_link,
//                             productRs: campaignDetails.product_price || 'N/A',
//                             infAmount: payment.amount,
//                             reward: payment.rewards || 0,
//                             total: ( parseFloat(payment.amount) + parseFloat(payment.rewards || 0)).toFixed(2),
//                             transactionID: payment.transaction_id,
//                             paymentDate: parseDate(payment.pay_scedule_date),
//                         };
//                     });
//                     setPayments(mappedPayments);
//                     setFilteredPayments(mappedPayments); // Initialize filtered payments
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     // Apply filtering based on campaign name and payment date/month
//     useEffect(() => {
//         const filterPayments = () => {
//             const filtered = payments.filter(payment => {
//                 const isCampaignMatch = payment.campaign.toLowerCase().includes(campaignName.toLowerCase());
//                 const isDateMatch = payment.paymentDate.startsWith(paymentYearMonth);
//                 return isCampaignMatch && isDateMatch;
//             });
//             setFilteredPayments(filtered);
//         };

//         filterPayments();
//     }, [campaignName, paymentYearMonth, payments]);

//     const downloadExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(filteredPayments);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Payment History");
//         XLSX.writeFile(workbook, "PaymentHistory.xlsx");
//     };

//     const handleCampaignNameChange = (e) => {
//         setCampaignName(e.target.value);
//     };

//     const handleYearMonthChange = (e) => {
//         setPaymentYearMonth(e.target.value);
//     };

//     return (
//         <>
//             {loading &&
//                 <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}>
//                     <PrimaryLoader />
//                 </div>
//             }
//             <div className="payment-schedule">
//                 <div className="all-user-top-bar">
//                     <div className='d-flex gap-4'>
//                         <div>
//                             <input
//                                 type="text"
//                                 placeholder="Search by Campaign Name..."
//                                 className="tab-button all-user-search"
//                                 style={{ cursor: 'text' }}
//                                 value={campaignName}
//                                 onChange={handleCampaignNameChange}
//                             />
//                         </div>
//                         <div style={{ cursor: 'pointer' }}  >
//                             <input
//                                 type="month"
//                                 placeholder="Search by Payment Date/Month..."
//                                 className="tab-button all-user-search"
//                                 style={{ cursor: 'text' }}
//                                 value={paymentYearMonth}
//                                 onChange={handleYearMonthChange}
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>SNo.</th>
//                             <th>Submitted</th>
//                             <th>Campaign</th>
//                             <th>Campaign ID</th>
//                             <th>Influencer Email</th>
//                             <th>Post Link</th>
//                             <th>Product (Rs.)</th>
//                             <th>Inf Amount</th>
//                             <th>Reward (amount)</th>
//                             <th>Total</th>
//                             <th>Transaction ID</th>
//                             <th>Payment Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredPayments.map((payment, index) => (
//                             <tr key={index}>
//                                 <td>{payment.sno}</td>
//                                 <td>{payment.submitted}</td>
//                                 <td>{payment.campaign}</td>
//                                 <td>{payment.campaignID}</td>
//                                 <td>{payment.influencerEmail}</td>
//                                 <td><a href={payment.postLink} target="_blank" rel="noopener noreferrer">Link</a></td>
//                                 <td>{payment.productRs}</td>
//                                 <td>{payment.infAmount}</td>
//                                 <td>{payment.reward}</td>
//                                 <td>{payment.total}</td>
//                                 <td>{payment.transactionID}</td>
//                                 <td>{payment.paymentDate}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <button className="download-button" onClick={downloadExcel}>
//                     Download to Excel
//                 </button>
//             </div>
//         </>
//     );
// };

// export default PaymentHistory;

import React, { useState, useEffect } from 'react';
import "../../style/payment/paymentSchedule.css";
import * as XLSX from 'xlsx';
import { makeApi } from '../../api/callApi.tsx';
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
import { Link } from 'react-router-dom';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [campaignName, setCampaignName] = useState("");
    const [paymentYearMonth, setPaymentYearMonth] = useState("");

    // Set the default value for paymentYearMonth to the current year and month
    useEffect(() => {
        const currentYearMonth = new Date().toISOString().slice(0, 7);
        setPaymentYearMonth(currentYearMonth);
    }, []);
 
    // Fetch all data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await makeApi(`/v1/admin/api/get-all-pending-payments?all=traction`, 'GET');
                
                if (res.data.apply.length > 0) {
                    const mappedPayments = res.data.apply.map((payment, index) => {
                        const parseDate = (dateString) => {
                            if (!dateString) return '';
                            const date = new Date(dateString);
                            return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
                        };

                        const campaignDetails = payment.campaignDetails || {};
                        const influencerDetails = payment.influencerDetails || {};

                        return {
                            sno: index + 1,
                            submitted: parseDate(payment.content_upload_date),
                            campaign: campaignDetails.campaign_name || 'N/A',
                            campaignID: payment.campaign_no,
                            influencerEmail: influencerDetails.email || 'N/A',
                            influencerName: influencerDetails.user_name || 'N/A', // New field for influencer name
                            influencerID: influencerDetails._id, // New field for influencer ID
                            postLink: payment.post_link,
                            productRs: campaignDetails.product_price || 'N/A',
                            infAmount: payment.amount,
                            reward: payment.rewards || 0,
                            total: ( parseFloat(payment.amount) + parseFloat(payment.rewards || 0)).toFixed(2),
                            transactionID: payment.transaction_id,
                            paymentDate: parseDate(payment.pay_scedule_date),
                        };
                    });
                    setPayments(mappedPayments);
                    setFilteredPayments(mappedPayments); // Initialize filtered payments
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Apply filtering based on campaign name and payment date/month
    useEffect(() => {
        const filterPayments = () => {
            const filtered = payments.filter(payment => {
                const isCampaignMatch = payment.campaign.toLowerCase().includes(campaignName.toLowerCase());
                const isDateMatch = payment.paymentDate.startsWith(paymentYearMonth);
                return isCampaignMatch && isDateMatch;
            });
            setFilteredPayments(filtered);
        };

        filterPayments();
    }, [campaignName, paymentYearMonth, payments]);

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredPayments);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Payment History");
        XLSX.writeFile(workbook, "PaymentHistory.xlsx");
    };

    const handleCampaignNameChange = (e) => {
        setCampaignName(e.target.value);
    };

    const handleYearMonthChange = (e) => {
        setPaymentYearMonth(e.target.value);
    };

    return (
        <>
            {loading &&
                <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <PrimaryLoader />
                </div>
            }
            <div className="payment-schedule">
                <div className="all-user-top-bar">
                    <div className='d-flex gap-4'>
                        <div>
                            <input
                                type="text"
                                placeholder="Search by Campaign Name..."
                                className="tab-button all-user-search"
                                style={{ cursor: 'text' }}
                                value={campaignName}
                                onChange={handleCampaignNameChange}
                            />
                        </div>
                        <div style={{ cursor: 'pointer' }}  >
                            <input
                                type="month"
                                placeholder="Search by Payment Date/Month..."
                                className="tab-button all-user-search"
                                style={{ cursor: 'text' }}
                                value={paymentYearMonth}
                                onChange={handleYearMonthChange}
                            />
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>SNo.</th>
                            <th>Submitted</th>
                            <th>Campaign</th>
                            <th>Campaign ID</th>
                            <th>Influencer Email</th>
                            <th>Influencer Name</th> {/* New Column */}
                            <th>Post Link</th>
                            <th>Product (Rs.)</th>
                            <th>Inf Amount</th>
                            <th>Reward (amount)</th>
                            <th>Total</th>
                            <th>Transaction ID</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.sno}</td>
                                <td>{payment.submitted}</td>
                                <td>{payment.campaign}</td>
                                <td>{payment.campaignID}</td>
                                <td>{payment.influencerEmail}</td>
                                <td>
                                    <Link to={`/user/user-details/${payment.influencerID}`} target='_blank' >
                                        {payment.influencerName}
                                    </Link>
                                </td> {/* New Data */}
                                <td><a href={payment.postLink} target="_blank" rel="noopener noreferrer">Link</a></td>
                                <td>{payment.productRs}</td>
                                <td>{payment.infAmount}</td>
                                <td>{payment.reward}</td>
                                <td>{payment.total}</td>
                                <td>{payment.transactionID}</td>
                                <td>{payment.paymentDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="download-button" onClick={downloadExcel}>
                    Download to Excel
                </button>
            </div>
        </>
    );
};

export default PaymentHistory;
