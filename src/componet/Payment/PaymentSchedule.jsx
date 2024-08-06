
import React, { useState, useEffect } from 'react';
import "../../style/payment/paymentSchedule.css";
import * as XLSX from 'xlsx';
import { makeApi } from '../../api/callApi.tsx';
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';

const PaymentSchedule = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await makeApi('/v1/admin/api/get-all-pending-payments?all=yes', 'GET');
            console.log(res.data.apply)
            // if (res.success && res.apply.length > 0) {
                const mappedPayments = res.data.apply.map(payment => ({
                    submitted: new Date(payment.content_upload_date).toISOString().split('T')[0],
                    campaign: payment.campaignDetails.campaign_name,
                    campaignType: payment.campaignDetails.campaign_type,
                    influencerEmail: payment.influ_id,
                    postLink: payment.post_link,
                    productRs: payment.campaignDetails.product_price,
                    infAmount: payment.amount,
                    reward: payment.rewards || 0,
                    total: (parseFloat(payment.campaignDetails.product_price) + parseFloat(payment.amount) + parseFloat(payment.rewards || 0)).toFixed(2),
                    actionDate: payment.pay_scedule_date || new Date().toISOString().split('T')[0],
                    campaign_no: payment.campaign_no,
                    influ_id: payment.influ_id,
                }));
                console.log("mappedPayments",mappedPayments )
                setPayments(mappedPayments);
            // }
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
        <div style={{ height: "100vh", width: "100%", top: "0", position: "fixed" }}>
          <PrimaryLoader />
        </div>
      }
        <div className="payment-schedule">
            <div className="header">
                <button className="download-button" onClick={downloadExcel}>
                    Download to Excel
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Submitted</th>
                        <th>Campaign</th>
                        <th>Campaign Type</th>
                        <th>Influencer Email</th>
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
                            <td>{payment.influencerEmail}</td>
                            <td><a href={payment.postLink} target="_blank" rel="noopener noreferrer">Link</a></td>
                            <td>
                                <input
                                    type="text"
                                    value={payment.productRs}
                                    onChange={(e) => handleInputChange(e, index, 'productRs')}
                                    className='form-control w-75'
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={payment.infAmount}
                                    onChange={(e) => handleInputChange(e, index, 'infAmount')}
                                    className='form-control w-75'
                                />
                            </td>
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
                                    value={payment.actionDate}
                                    onChange={(e) => handleDateChange(e, index)}
                                    className="form-control"
                                />
                            </td>
                            <td>
                                <button onClick={() => updatePayment(index)} className="update-button">
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>

    );
};

export default PaymentSchedule;