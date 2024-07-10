import "../../../style/managment/invoice/ProformaInvoices.css";


// import React from 'react';
// import { useParams } from 'react-router-dom';
// // import { jsPDF } from 'jspdf';
// // import html2canvas from 'html2canvas';


// const invoicesData = [
//   {
//     id: 1,
//     invoiceNumber: 'TP10064',
//     invoiceDate: '03-Jul-24',
//     receiver: {
//       name: 'Harry',
//       address: '123 Main St',
//       contact: '9876543210',
//       gst: '12345',
//       stateCode: 'KA'
//     },
//     sender: {
//       name: 'Tixteen Pvt.Ltd.',
//       address: 'SCF-6, BLOCK-F, BHAI RANDHIR SINGH NAGAR, Ludhiana, Punjab, 141001',
//       contact: '83500057380',
//       gst: '03AAJCT2666K1Z9',
//       state: 'Punjab',
//       stateCode: '03'
//     },
//     products: [
//       { name: 'Product A', hsn: '1001', qty: 10, rate: 100, taxableAmount: 1000, cgstRate: 5, cgstAmount: 50, sgstRate: 5, sgstAmount: 50, igstRate: 0, igstAmount: 0 },
//       { name: 'Product B', hsn: '1002', qty: 5, rate: 200, taxableAmount: 1000, cgstRate: 5, cgstAmount: 50, sgstRate: 5, sgstAmount: 50, igstRate: 0, igstAmount: 0 },
//     ],
//     totalAmount: 3658,
//     totalAmountInWords: 'Three Thousand Six Hundred and Fifty Eight Rupees Only'
//   },
//   // Add more dummy invoices here if needed
// ];

// const Invoice = () => {
//   const { id } = 1;
//   const invoice = invoicesData;

//   const downloadInvoice = () => {
//     const input = document.getElementById('invoice');
//     // html2canvas(input).then((canvas) => {
//     //   const imgData = canvas.toDataURL('image/png');
//     //   const pdf = new jsPDF();
//     //   pdf.addImage(imgData, 'JPEG', 0, 0);
//     //   pdf.save(`${invoice.invoiceNumber}.pdf`);
//     // });
//   };

//   return (
//     <div>
//       {invoice ? (
//         <div>
//           <div id="invoice" className="invoice-container">
//             <div className="invoice-header">
//               <h1>Proforma Invoice</h1>
//               <div className="invoice-header-details">
//                 <div>
//                   <strong>Invoice Number:</strong> {invoice.invoiceNumber}
//                 </div>
//                 <div>
//                   <strong>Invoice Date:</strong> {invoice.invoiceDate}
//                 </div>
//               </div>
//             </div>
//             <div className="invoice-section">
//               <h2>Details Of Receiver</h2>
//               <p><strong>Name:</strong> vaibhav</p>
//               <p><strong>Address:</strong>  new delhi 110092 delhi </p>
//               <p><strong>Contact:</strong>  9876543210 </p>
//               <p><strong>GSTIN:</strong> 03AAJCT2666K1Z9 </p>
//               <p><strong>State Code:</strong> 03 </p>
//             </div>
//             <div className="invoice-section">
//               <h2>Details Of Sender</h2>
//               <p><strong>Name:</strong> Saloni </p>
//               <p><strong>Address:</strong>   SCF-6, BLOCK-F, BHAI RANDHIR SINGH NAGAR, Ludhiana, Punjab, 141001 </p>
//               <p><strong>Contact:</strong>  83500057380 </p>
//               <p><strong>GSTIN:</strong> 03AAJCT2666K1Z9 </p>
//               <p><strong>State Code:</strong> 03 </p>
//             </div>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Sno</th>
//                   <th>Name Of Product/Service</th>
//                   <th>HSN ACS</th>
//                   <th>Qty</th>
//                   <th>Rate</th>
//                   <th>Taxable Amount</th>
//                   <th>CGST Rate</th>
//                   <th>CGST Amount</th>
//                   <th>SGST Rate</th>
//                   <th>SGST Amount</th>
//                   <th>IGST Rate</th>
//                   <th>IGST Amount</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* {invoicesData.products.map((product, index) => ( */}
//                   <tr >
//                     {/* <td>{index + 1}</td>
//                     <td>{product.name}</td>
//                     <td>{product.hsn}</td>
//                     <td>{product.qty}</td>
//                     <td>{product.rate}</td>
//                     <td>{product.taxableAmount}</td>
//                     <td>{product.cgstRate}%</td>
//                     <td>{product.cgstAmount}</td>
//                     <td>{product.sgstRate}%</td>
//                     <td>{product.sgstAmount}</td>
//                     <td>{product.igstRate}%</td>
//                     <td>{product.igstAmount}</td>
//                     <td>{product.taxableAmount + product.cgstAmount + product.sgstAmount + product.igstAmount}</td> */}
//                     <td>3</td>
//                     <td>Video service</td>
//                     <td>123</td>
//                     <td>1</td>
//                     <td>1000</td>
//                     <td>1000</td>
//                     <td>0</td>
//                     <td>0</td>
//                     <td>0</td>
//                     <td>0</td>
//                     <td>0</td>
//                     <td>1000</td>
//                     <td>1000</td>
//                   </tr>
//                 {/* ))} */}
//                 <tr>
//                   <td colSpan="12">Total</td>
//                   <td>{invoice.totalAmount}</td>
//                 </tr>
//               </tbody>
//             </table>
//             <div className="invoice-footer">
//               <p><strong>Total Invoice Amount in Words:</strong> {invoice.totalAmountInWords}</p>
//             </div>
//           </div>
//           <button onClick={downloadInvoice}>Download</button>
//         </div>
//       ) : (
//         <p>Invoice not found.</p>
//       )}
//     </div>
//   );
// };

// export default Invoice;

// // Invoice.js
// import React from 'react';

// const Invoice = () => {
//   return (
//     <div className="invoice-container">
//       <div className="header">
//         <h1>Tixtteen</h1>
//         <h2>PROFORMA INVOICE</h2>
//         <div className="invoice-info">
//           <div>
//             <strong>Invoice Number:</strong> TP10064
//           </div>
//           <div>
//             <strong>Invoice Date:</strong> 03-Jul-24
//           </div>
//         </div>
//       </div>

//       <div className="details-section">
//         <div className="details">
//           <h3>Details Of Receiver</h3>
//           <p><strong>Name:</strong> Hshs</p>
//           <p><strong>Address:</strong> test</p>
//           <p><strong>Contact:</strong> 69696969</p>
//           <p><strong>GSTIN:</strong> 7766777</p>
//           <p><strong>State Code:</strong> 04</p>
//         </div>
//         <div className="details">
//           <h3>Details Of Sender</h3>
//           <p><strong>Name:</strong> Tixtteen Pvt.Ltd.</p>
//           <p><strong>Address:</strong> SCF-61,BLOCK-F,BHAI RANDHIR SINGH NAGAR, LUDHIANA, Punjab, 141001</p>
//           <p><strong>Contact:</strong> 83600 57380</p>
//           <p><strong>GSTIN:</strong> 03AAJCT2066K1Z9</p>
//           <p><strong>State:</strong> Punjab</p>
//           <p><strong>State Code:</strong> 03</p>
//         </div>
//       </div>

//       <table className="invoice-table">
//         <thead>
//           <tr>
//             <th>Sno</th>
//             <th>Name Of Product/Service</th>
//             <th>HSN ACS</th>
//             <th>Qty</th>
//             <th>Rate</th>
//             <th>Taxable Amount</th>
//             <th>CGST Rate</th>
//             <th>CGST Amount</th>
//             <th>SGST Rate</th>
//             <th>SGST Amount</th>
//             <th>IGST Rate</th>
//             <th>IGST Amount</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>test</td>
//             <td>998314</td>
//             <td>3</td>
//             <td>500</td>
//             <td>1500</td>
//             <td>0%</td>
//             <td>0</td>
//             <td>0%</td>
//             <td>0</td>
//             <td>18%</td>
//             <td>270</td>
//             <td>1770</td>
//           </tr>
//           <tr>
//             <td>2</td>
//             <td>test2</td>
//             <td>998314</td>
//             <td>8</td>
//             <td>200</td>
//             <td>1600</td>
//             <td>0%</td>
//             <td>0</td>
//             <td>0%</td>
//             <td>0</td>
//             <td>18%</td>
//             <td>288</td>
//             <td>1888</td>
//           </tr>
//           <tr>
//             <td colSpan="11">TOTAL</td>
//             <td>3100</td>
//             <td>558</td>
//             <td>3658</td>
//           </tr>
//         </tbody>
//       </table>

//       <div className="total-amount">
//         <p><strong>Total Invoice Amount in Words:</strong> Three Thousand Six Hundred and Fifty Eight Rupees Only</p>
//         <p><strong>Total Amount Before Tax:</strong> 3100</p>
//         <p><strong>CGST:</strong> 0</p>
//         <p><strong>SGST:</strong> 0</p>
//         <p><strong>IGST:</strong> 558</p>
//         <p><strong>Total GST:</strong> 558</p>
//         <p><strong>Total Amount After Tax:</strong> 3658</p>
//         <p><strong>Final Amount:</strong> 3658</p>
//       </div>

//       <div className="terms-conditions">
//         <h3>Terms and Conditions</h3>
//         <ul>
//           <li>All disputes are subject to Ludhiana jurisdiction.</li>
//           <li>In case of Goods, our responsibility ceases once goods either delivered or handed over for transportation, save as otherwise mutually decided.</li>
//           <li>Interest will be automatically charged @ 36% on per annum basis, if the payment is not made within the 30 Days.</li>
//           <li>In case of any clarification or discrepancy, kindly let us know within 15 days of receipt of invoice, in case of no communication invoice shall be considered in order and accepted.</li>
//         </ul>
//       </div>

//       <div className="bank-details">
//         <h3>BANK DETAILS</h3>
//         <p><strong>BANK NAME:</strong> ICICI BANK</p>
//         <p><strong>ACCOUNT NAME:</strong> TIXTEEN PRIVATE LIMITED</p>
//         <p><strong>ACCOUNT NUMBER:</strong> 064205001254</p>
//         <p><strong>IFSC CODE:</strong> ICIC0006452</p>
//       </div>

//       <div className="certificate">
//         <p>Certified that the particulars given above are true and correct, and the amount indicated represents the price, the receiver has actually charged and that there is no flow of additional consideration directly or indirectly in relation to goods or services.</p>
//         <p><strong>Authorized Signatory</strong></p>
//         <p>Ritesh Mahni</p>
//       </div>

//       <div className="footer">
//         <p>This is a system generated Invoice, Hence doesn't require physical signature or stamp</p>
//       </div>
//     </div>
//   );
// };

// export default Invoice;

import React from 'react';

import Icon from "../../../assets/header/tixteen_icon.png"
const Invoice = () => {
    return (
        <div className="invoice-container">
            <div className="invoice-header">
                <div className="logo">
                    <img src={Icon} alt="Logo" />
                </div>
                <div className="invoice_page_border" >
                    <h1>PROFORMA INVOICE</h1>
                </div>
                <div className="invoice-info">
                    <div className="d-flex justify-content-between w-75" >

                        <div>
                            Invoice Number:
                        </div>
                        <div>
                            <strong>TPI0064</strong>

                        </div>
                    </div>
                    <div className="d-flex justify-content-between w-100" >

                        <div className="d-flex gap-5" >
                            <div>|</div>
                            Invoice Date:
                        </div>
                        <div>
                            <strong>03-Jul-24</strong>

                        </div>
                    </div>
                </div>
            </div>

            <div className="invoice-details invoice_page_border p-2">
                <div className="details-section invoice_page_border p-2">
                    <h2 className="invoice_page_border" >Details Of Receiver</h2>
                    <div className="table_data_invoice" >
                        <div>Name:
                        </div>
                        <div>Hshs</div>
                    </div>
                    <div className="table_data_invoice">
                        <div>Address:
                        </div>
                        <div>test</div>
                    </div>
                    <div className="table_data_invoice">
                        <div>Contact:
                        </div>
                        <div>69696969</div>
                    </div>
                    <div className="table_data_invoice">

                        <div>GSTIN:
                        </div>
                        <div>7766777</div>
                    </div>
                    <div className="table_data_invoice">

                        <div>State Code:
                        </div>
                        <div>04</div>
                    </div>
                </div>
                <div className="details-section invoice_page_border p-2">
                    <h2 className="invoice_page_border" >Details Of Sender</h2>
                    <p>Name: <strong>Txtteen Pvt.Ltd.</strong></p>
                    <p>Address: <strong>SCF-61, BLOCK-F, BHAI RANDHIR SINGH NAGAR, Ludhiana, Punjab 141001</strong></p>
                    <p>Contact: <strong>8360057380</strong></p>
                    <p>GSTIN: <strong>03AAJACT2066K1Z9</strong></p>
                    <p>State: <strong>Punjab</strong></p>
                    <p>State Code: <strong>03</strong></p>
                </div>
            </div>

            <div className="invoice-table">
                <table>
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Name Of Product/Service</th>
                            <th>HSN ACS</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Taxable Amount</th>
                            <th>CGST Rate</th>
                            <th>CGST Amount</th>
                            <th>SGST Rate</th>
                            <th>SGST Amount</th>
                            <th>IGST Rate</th>
                            <th>IGST Amount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>test</td>
                            <td>998314</td>
                            <td>3</td>
                            <td>500</td>
                            <td>1500</td>
                            <td>0%</td>
                            <td>0</td>
                            <td>0%</td>
                            <td>0</td>
                            <td>18%</td>
                            <td>270</td>
                            <td>1770</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>test2</td>
                            <td>998314</td>
                            <td>8</td>
                            <td>200</td>
                            <td>1600</td>
                            <td>0%</td>
                            <td>0</td>
                            <td>0%</td>
                            <td>0</td>
                            <td>18%</td>
                            <td>288</td>
                            <td>1888</td>
                        </tr>
                        <tr>
                            <td colSpan="12">TOTAL</td>
                            <td>3658</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="invoice-summary invoice_page_border p-2">
                <div className="total-amount invoice_page_border">
                    <p>Total Invoice Amount in Words: <strong>Three Thousand Six Hundred and Fifty Eight Rupees Only</strong></p>
                </div>
                <div className="amount-summary invoice_page_border">
                    <p>Total Amount Before Tax: <strong>3100</strong></p>
                    <p>CGST: <strong>0</strong></p>
                    <p>SGST: <strong>0</strong></p>
                    <p>IGST: <strong>558</strong></p>
                    <p>Total GST: <strong>558</strong></p>
                    <p>Total Amount After Tax: <strong>3658</strong></p>
                    <p>Final Amount: <strong>3658</strong></p>
                </div>
            </div>

            <div className="terms-and-bank invoice_page_border p-2">
                <div className="terms invoice_page_border">
                    <h2>Terms and Conditions</h2>
                    <p>1. All disputes are subject to Ludhiana jurisdiction.</p>
                    <p>2. In case of Goods, our responsibility ceases once goods either delivered or handed over for transportation, saves otherwise mutually decided.</p>
                    <p>3. Interest will be automatically charged @36% on per annum basis, if the payment is not made within the 30 Days.</p>
                    <p>4. In case of any clarification or discrepancy, kindly let us know within 15 days of receipt of invoice, in case of no communication invoice shall be considered in order and accepted.</p>
                </div>
                <div className="bank-details invoice_page_border">
                    <h2>Bank Details</h2>
                    <p>BANK NAME: ICICI BANK</p>
                    <p>ACCOUNT NAME: TXTTEEN PRIVATE LIMITED</p>
                    <p>ACCOUNT NUMBER: 064205001254</p>
                    <p>IFSC CODE: ICIC0000642</p>
                </div>
            </div>

            <div className="certificate invoice_page_border p-2">
                <h2 className="invoice_page_border p-2">Certificate</h2>
                <p>Certified that the particulars given above are true and correct, and, the amount indicated represents the price, the receiver has actually charged and that there is no flow of additional consideration directly or indirectly in relation to goods or services.</p>
                <div className="signature">
                    <p>Ritoz Maini</p>
                    <p>Authorized Signatory</p>
                </div>
                <p>This is system generated Invoice, Hence doesn't require physical signature or stamp</p>
            </div>
        </div>
    );
};

export default Invoice;
