import "../../../style/managment/invoice/AddProformaInvoice.css";

import React, { useState } from 'react';
import BackIcon from "../../../utils/BackIcon";

const dummyUsers = [
    { id: 1, clientName: 'John Doe', address: '123 Main St', contact: '1234567890', gst: '123456', stateCode: 'CA' },
    { id: 2, clientName: 'Jane Smith', address: '456 Elm St', contact: '9876543210', gst: '654321', stateCode: 'NY' }
];

const initialInvoiceDetails = {
    clientName: '',
    address: '',
    contact: '',
    gst: '',
    stateCode: '',
    products: [{
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
    }]
};

const AddProformaInvoice = () => {
    const [invoiceDetails, setInvoiceDetails] = useState(initialInvoiceDetails);

    const handleInputChange = (field, value) => {
        setInvoiceDetails({
            ...invoiceDetails,
            [field]: value
        });
    };

    const handleProductChange = (index, field, value) => {
        const newProducts = [...invoiceDetails.products];
        newProducts[index][field] = value;
        setInvoiceDetails({
            ...invoiceDetails,
            products: newProducts
        });
    };

    const addMoreProducts = () => {
        setInvoiceDetails({
            ...invoiceDetails,
            products: [
                ...invoiceDetails.products,
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
            ]
        });
    };

    const handleSave = () => {
        console.log('Invoice Details:', invoiceDetails);
        // API call to save the invoice details can be added here
    };

    const handleUserSelect = (event) => {
        const userId = event.target.value;
        if (userId) {
            const selectedUser = dummyUsers.find(user => user.id === parseInt(userId));
            if (selectedUser) {
                setInvoiceDetails({
                    ...invoiceDetails,
                    clientName: selectedUser.clientName,
                    address: selectedUser.address,
                    contact: selectedUser.contact,
                    gst: selectedUser.gst,
                    stateCode: selectedUser.stateCode
                });
            }
        } else {
            setInvoiceDetails(initialInvoiceDetails);
        }
    };

    return (
        <>
        <div style={{position:"relative" }}>
            <BackIcon path={"management/invoices-management"} /> 
        </div>
        <div className="add-proforma-invoice"style={{padding:"0px 70px"}}   >

            <h2>Add Proforma Invoice</h2>
            <div className="form-group">
                <label>Client Name:</label>
                <input
                    type="text"
                    value={invoiceDetails.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                />
                <select onChange={handleUserSelect}>
                    <option value="">Select Existing User</option>
                    {dummyUsers.map(user => (
                        <option key={user.id} value={user.id}>{user.clientName}</option>
                    ))}
                </select>
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
                    {invoiceDetails.products.map((product, index) => (
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
            <button className="add-product-button" onClick={addMoreProducts}>Add More</button>
            <button className="save-button" onClick={handleSave}>Save</button>
        </div>
        </>

    );
};

export default AddProformaInvoice;
