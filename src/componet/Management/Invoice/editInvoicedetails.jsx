
import "../../../style/managment/invoice/AddProformaInvoice.css";
import React, { useState, useEffect } from 'react';
import BackIcon from "../../../utils/BackIcon";
import { useParams } from 'react-router-dom';
import { makeApi } from "../../../api/callApi.tsx";
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';


const EditInvoiceDetails = () => {
    const { id } = useParams();
    const [invoiceDetails, setInvoiceDetails] = useState({
        clientName: '',
        address: '',
        contact: '',
        gst: '',
        stateCode: ''
    });
    const [products, setProducts] = useState([]);
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                setLoading(true);

                const response = await makeApi(`/v1/admin/api/get-my-bill/${id}`, "GET");
                const bill = response.data.mybill;
                const products = response.data.mybillwithproduct.map(product => ({
                    id: product._id,
                    productName: product.product,
                    hsn: product.hsn,
                    qty: product.qty,
                    rate: product.rate,
                    taxableAmount: product.taxable,
                    cgstRate: product.cgst_Rate,
                    cgstAmount: product.cgst_Amount,
                    sgstRate: product.sgst_Rate,
                    sgstAmount: product.sgst_Amount,
                    igstRate: product.igst_Rate,
                    igstAmount: product.igst_Amount
                }));
                console.log("Products:", products);
                setInvoiceDetails({
                    clientName: bill.client_name,
                    address: bill.address,
                    contact: bill.contact_no,
                    gst: bill.gst,
                    stateCode: bill.state_code
                });
                setProducts(products.length ? products : [{
                    productName: '',
                    hsn: '',
                    qty: '',
                    rate: '',
                    taxableAmount: '',
                    cgstRate: '',
                    cgstAmount: '',
                    sgstRate: '',
                    sgstAmount: '',
                    igstRate: '',
                    igstAmount: ''
                }]);
            } catch (error) {
                console.error("Error fetching invoice data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoiceData();
    }, [id]);



    useEffect(() => {
        console.log('Updated Products:', products);
    }, [products]);

    const handleInputChange = (field, value) => {
        setInvoiceDetails({
            ...invoiceDetails,
            [field]: value
        });
    };

    const handleProductChange = (index, field, value) => {
        const newProducts = [...products];
        newProducts[index][field] = value;
        setProducts(newProducts);
    };

    const addMoreProducts = () => {
        setProducts([
            ...products,
            {
                productName: '',
                hsn: '',
                qty: '',
                rate: '',
                taxableAmount: '',
                cgstRate: '',
                cgstAmount: '',
                sgstRate: '',
                sgstAmount: '',
                igstRate: '',
                igstAmount: ''
            }
        ]);
    };

    const handleSave = async () => {
        try {
            setLoading(true);

            const updatedInvoice = {
                client_name: invoiceDetails.clientName,
                address: invoiceDetails.address,
                gst: invoiceDetails.gst,
                contact_no: invoiceDetails.contact,
                state_code: invoiceDetails.stateCode,
                bill_date: new Date(),
                status: 'Performa', // example status
                invoice_status: 'Active', // example status
            };

            const invoiceResponse = await makeApi(`/v1/admin/api/update-my-bill/${id}`, "PUT", updatedInvoice);

            const billItemsData = products.map(product => ({
                _id: product.id,
                Invoice_no: invoiceResponse.data.mybill.invoice_no,
                product: product.productName,
                hsn: product.hsn,
                qty: product.qty,
                rate: product.rate,
                taxable: product.taxableAmount,
                cgst_Rate: product.cgstRate,
                cgst_Amount: product.cgstAmount,
                sgst_Rate: product.sgstRate,
                sgst_Amount: product.sgstAmount,
                igst_Rate: product.igstRate,
                igst_Amount: product.igstAmount,
                tax_invoice_no: invoiceResponse.data.mybill.tax_invoice_no
            }));

            await makeApi(`/v1/admin/api/update-bill-items`, "PUT", billItemsData);

            setAlert('Invoice saved successfully!');
        } catch (error) {
            console.error('Error saving invoice:', error);
            setAlert('Error saving invoice. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}> <PrimaryLoader /> </div> : (
                <>
                    <div style={{ position: "relative" }}>
                        <BackIcon path={"management/invoices-management"} />
                    </div>
                    <div className="add-proforma-invoice" style={{ padding: "0px 70px" }}>
                        <h2>Edit Proforma Invoice</h2>
                        {alert && <div className="alert">{alert}</div>}
                        <div className="form-group">
                            <label>Client Name:</label>
                            <input
                                type="text"
                                value={invoiceDetails.clientName}
                                onChange={(e) => handleInputChange('clientName', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                value={invoiceDetails.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact:</label>
                            <input
                                type="text"
                                value={invoiceDetails.contact}
                                onChange={(e) => handleInputChange('contact', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>GST:</label>
                            <input
                                type="text"
                                value={invoiceDetails.gst}
                                onChange={(e) => handleInputChange('gst', e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>State Code:</label>
                            <input
                                type="text"
                                value={invoiceDetails.stateCode}
                                onChange={(e) => handleInputChange('stateCode', e.target.value)}
                            />
                        </div>
                        <table>
                            <thead>
                                <tr>
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
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.productName}
                                                onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.hsn}
                                                onChange={(e) => handleProductChange(index, 'hsn', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.qty}
                                                onChange={(e) => handleProductChange(index, 'qty', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.rate}
                                                onChange={(e) => handleProductChange(index, 'rate', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.taxableAmount}
                                                onChange={(e) => handleProductChange(index, 'taxableAmount', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.cgstRate}
                                                onChange={(e) => handleProductChange(index, 'cgstRate', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.cgstAmount}
                                                onChange={(e) => handleProductChange(index, 'cgstAmount', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.sgstRate}
                                                onChange={(e) => handleProductChange(index, 'sgstRate', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.sgstAmount}
                                                onChange={(e) => handleProductChange(index, 'sgstAmount', e.target.value)}
                                            />

                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.igstRate}
                                                onChange={(e) => handleProductChange(index, 'igstRate', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={product.igstAmount}
                                                onChange={(e) => handleProductChange(index, 'igstAmount', e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={addMoreProducts}>Add More Products</button>
                        <button onClick={handleSave}>Save Invoice</button>
                    </div>
                </>
            )}
        </>
    );
};

export default EditInvoiceDetails;
