
import "../../../style/managment/invoice/ProformaInvoices.css";
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Icon from "../../../assets/header/tixteen_icon.png";
import { makeApi } from "../../../api/callApi.tsx";
import Sign from "../../../assets/Sign/Stamp and Sign.png"
import html2pdf from "html2pdf.js";
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';
import numberToWords from 'number-to-words';


const TaxInvoiceDetails = () => {
    const { id } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);
    const invoiceRef = useRef();
    const [loading, setLoading] = useState(false);
    const [grandtotall, setGrandTotal] = useState(0);
const [totalInWords, setTotalInWords] = useState('');
console.log("totalInWords: ", totalInWords);

useEffect(() => {
    if (invoiceData) {
        const { totalTaxable, totalCGST, totalSGST, totalIGST, grandTotal } = calculateTotal();
        setGrandTotal(grandTotal);
        setTotalInWords(numberToWords.toWords(grandTotal));
    }
}, [invoiceData]);


    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                setLoading(true);

                const response = await makeApi(`/v1/admin/api/get-my-bill/${id}`, "GET");
                if (response.data.success) {
                    setInvoiceData(response.data);
                } else {
                    console.error("Failed to fetch invoice data:", response.data.message);
                }
            } catch (error) {
                console.error("Error fetching invoice data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoiceData();
    }, [id]);

    if (!invoiceData) {
        return <div><div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}> <PrimaryLoader /> </div></div>;
    }

    const { mybill, mybillwithproduct } = invoiceData;

    const calculateTotal = () => {
        let totalTaxable = 0;
        let totalCGST = 0;
        let totalSGST = 0;
        let totalIGST = 0;
        let grandTotal = 0;

        mybillwithproduct.forEach(item => {
            const taxable = parseFloat(item.taxable);
            const cgst_Amount = parseFloat(item.cgst_Amount);
            const sgst_Amount = parseFloat(item.sgst_Amount);
            const igst_Amount = parseFloat(item.igst_Amount);

            totalTaxable += taxable;
            totalCGST += cgst_Amount;
            totalSGST += sgst_Amount;
            totalIGST += igst_Amount;
            grandTotal += taxable + cgst_Amount + sgst_Amount + igst_Amount;
        });

        return {
            totalTaxable,
            totalCGST,
            totalSGST,
            totalIGST,
            grandTotal
        };
    };

    const { totalTaxable, totalCGST, totalSGST, totalIGST, grandTotal } = calculateTotal();
   
    // print and download invoice
    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        try {
            setLoading(true);

            const element = invoiceRef.current;
            const opt = {
                margin: 0.2,
                filename: `invoice_${mybill.invoice_no}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().from(element).set(opt).save();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <>
            {loading ? <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}> <PrimaryLoader /> </div> : (

                <>
                    <div className="button-section  p-1">
                        <button onClick={handlePrint}>Print Invoice</button>
                        <button onClick={handleDownload}>Download PDF</button>
                    </div>
                    <div className="invoice-container" ref={invoiceRef}>
                        <div className="invoice-header">
                            <div className="logo">
                                <img src={Icon} alt="Logo" />
                            </div>
                            <div className="invoice_page_border">
                                {/* <h3>PROFORMA INVOICE</h3> */}
                                <h3>TAX INVOICE</h3>
                            </div>
                            <div className="invoice-info">
                                <div className="d-flex justify-content-around w-75">
                                    <div>Invoice Number:</div>
                                    <div><strong>{mybill.tax_invoice_no}</strong></div>
                                    {/* <div><strong>TXT242520</strong></div> */}
                                </div>
                                <div className="d-flex justify-content-around w-75">
                                    <div className="">Invoice Date:</div>
                                    {/* <div><strong>{new Date(mybill.bill_date).toLocaleDateString()}</strong></div> */}
                                    <div><strong>30-8-2024</strong></div>
                                </div>
                            </div>
                        </div>

                        <div className="invoice-details invoice_page_border p-1">
                            <div className="details-section invoice_page_border p-1">
                                <h6 className="invoice_page_border">Details Of Receiver</h6>
                                <div className="table_data_invoice">
                                    <div>Name:</div>
                                    <div>{mybill.client_name}</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>Address:</div>
                                    <div>{mybill.address}</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>Contact:</div>
                                    <div>{mybill.contact_no}</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>GSTIN:</div>
                                    <div>{mybill.gst}</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>State Code:</div>
                                    <div>{mybill.state_code}</div>
                                </div>
                            </div>
                            <div className="details-section invoice_page_border p-1">
                                <h6 className="invoice_page_border">Details Of Sender</h6>
                                <div className="table_data_invoice">
                                    <div>Name</div>
                                    <div>Tixteen Pvt.Ltd.</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>Address</div>
                                    <div>SCF-61, BLOCK-F, BHAI RANDHIR SINGH NAGAR, Ludhiana, Punjab 141001</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>Contact</div>
                                    <div>8360057380</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>GSTIN</div>
                                    <div>03AAJCT2066K1Z9</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>State</div>
                                    <div>Punjab</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>State Code</div>
                                    <div>03</div>
                                </div>
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
                                    {mybillwithproduct.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.product}</td>
                                            <td>{item.hsn}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.rate}</td>
                                            <td>{item.taxable}</td>
                                            <td>{item.cgst_Rate}%</td>
                                            <td>{item.cgst_Amount}</td>
                                            <td>{item.sgst_Rate}%</td>
                                            <td>{item.sgst_Amount}</td>
                                            <td>{item.igst_Rate}%</td>
                                            <td>{item.igst_Amount}</td>
                                            <td>{parseFloat(item.taxable) + parseFloat(item.cgst_Amount) + parseFloat(item.sgst_Amount) + parseFloat(item.igst_Amount)}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="12">TOTAL</td>
                                        <td>{grandTotal}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="invoice-summary invoice_page_border p-1">
                            <div className="total-amount invoice_page_border text-center">
                                <p className="pt-2" >Total Invoice Amount in Words: <strong></strong></p>
                                {/* <p style={{ fontSize: '17px' , textTransform: 'uppercase', fontWeight: 'bold' }} >{totalInWords}</p> */}
                                <p style={{ fontSize: '17px' , textTransform: 'uppercase', fontWeight: 'bold' }} >{totalInWords} Rupees Only</p>


                            </div>
                            <div className="amount-summary invoice_page_border">
                                <div className="table_data_invoice">
                                    <div>Total Amount Before Tax:</div>
                                    <div>{totalTaxable}</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>CGST:</div>
                                    <div>{totalCGST}</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>SGST:</div>
                                    <div>{totalSGST}</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>IGST:</div>
                                    <div>{totalIGST}</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>Total GST:</div>
                                    <div>{totalCGST + totalSGST + totalIGST}</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>Final Amount:</div>
                                    <div>{grandTotal}</div>
                                </div>
                            </div>
                        </div>

                        <div className="terms-and-bank invoice_page_border p-1">
                            <div className="terms invoice_page_border">
                                <h6>Terms and Conditions</h6>
                                <p>1. All disputes are subject to Ludhiana jurisdiction.</p>
                                <p>2. In case of Goods, our responsibility ceases once goods either delivered or handed over for transportation, saves otherwise mutually decided.</p>
                                <p>3. Interest will be automatically charged @36% on per annum basis, if the payment is not made within the 30 Days.</p>
                                <p>4. In case of any clarification or discrepancy, kindly let us know within 15 days of receipt of invoice, in case of no communication invoice shall be considered in order and accepted.</p>
                            </div>
                            <div className="bank-details invoice_page_border">
                                <h6>Bank Details</h6>
                                <div className="table_data_invoice">
                                    <div>BANK NAME:</div>
                                    <div>ICICI BANK</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>ACCOUNT NAME:</div>
                                    <div>TIXTEEN PRIVATE LIMITED</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>ACCOUNT NUMBER:</div>
                                    <div>064205001254</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>BRANCH:</div>
                                    <div>BRS NAGAR</div>
                                </div>
                                <div className="table_data_invoice">
                                    <div>IFSC:</div>
                                    <div>ICIC0000642</div>
                                </div>
                            </div>
                        </div>

                        <div className="signature-section invoice_page_border p-1">
                            <div className="text-center invoice_page_border p-1 w-100">
                                <h6>Certificate</h6>
                            </div>
                            <div>
                                Certified that the particulars given above are true and correct, and, the amount indicated represents the price, the receiver has actually charged and that there is no flow of additional consideration directly or indirectly in relation to goods or services.
                            </div>
                            <div className="signature-line text-end pt-5">
                                <img src={Sign} alt="signature" width={200} />
                                <div className="signature-text">Authorized Signatory</div>
                                <div>This is system generated Invoice, Hence doesn't require physical signature or stamp</div>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </>

    );
};

export default TaxInvoiceDetails;
