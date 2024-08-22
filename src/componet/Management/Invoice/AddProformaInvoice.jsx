import "../../../style/managment/invoice/AddProformaInvoice.css";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import BackIcon from "../../../utils/BackIcon";
import { makeApi } from "../../../api/callApi.tsx";
import PrimaryLoader from "../../../utils/PrimaryLoader.jsx";

const initialInvoiceDetails = {
    clientName: '',
    address: '',
    contact: '',
    gst: '',
    stateCode: '',
    products: [
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
};

const AddProformaInvoice = () => {
    const [invoiceDetails, setInvoiceDetails] = useState(initialInvoiceDetails);
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState('');

    // Fetch client data on component mount
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const { data } = await makeApi("/v1/admin/api/get-all-clients", "GET");
                if (data.success) {
                    setClients(data.clientData);
                    setFilteredClients(data.clientData);
                }
            } catch (error) {
                console.error('Error fetching clients:', error);
                setAlert('Error fetching client data.');
            }
        };
        fetchClients();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = clients.filter(client =>
                client.client_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredClients(filtered);
        } else {
            setFilteredClients(clients);
        }
    }, [searchTerm, clients]);

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

    const handleSave = async () => {
        // Validation checks
        const missingFields = [];

        if (!invoiceDetails.clientName) missingFields.push('Client Name');
        if (!invoiceDetails.address) missingFields.push('Address');
        if (!invoiceDetails.contact) missingFields.push('Contact');
        // if (!invoiceDetails.gst) missingFields.push('GST');
        if (!invoiceDetails.stateCode) missingFields.push('State Code');

        invoiceDetails.products.forEach((product, index) => {
            if (!product.productName) missingFields.push(`Product Name at row ${index + 1}`);
            if (!product.hsn) missingFields.push(`HSN at row ${index + 1}`);
            if (!product.qty) missingFields.push(`Quantity at row ${index + 1}`);
            if (!product.rate) missingFields.push(`Rate at row ${index + 1}`);
            if (!product.taxableAmount) missingFields.push(`Taxable Amount at row ${index + 1}`);
        });

        if (missingFields.length > 0) {
            toast.error(`Please fill: ${missingFields.join(', ')}`);
            return;
        }

        try {
            setLoading(true);
            const { data: myBillData } = await makeApi("/v1/admin/api/create-my-bill", "POST", {
                client_name: invoiceDetails.clientName,
                address: invoiceDetails.address,
                gst: invoiceDetails.gst,
                contact_no: invoiceDetails.contact,
                state_code: invoiceDetails.stateCode,
                bill_date: new Date(),
                status: 'Performa',
                invoice_status: '',
                invoice_no: 'INV-' + Math.floor(Math.random() * 10000),
                tax_invoice_no: 'TX-' + Math.floor(Math.random() * 10000),
                report: 'Active'
            });

            const billItemsData = invoiceDetails.products.map(product => ({
                Invoice_no: myBillData.mybill.invoice_no,
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
                tax_invoice_no: myBillData.mybill.tax_invoice_no
            }));

            await makeApi("/v1/admin/api/create-bill-items", "POST", billItemsData);

            setAlert('Invoice saved successfully!');
            setInvoiceDetails(initialInvoiceDetails); // Reset form
        } catch (error) {
            console.error('Error saving invoice:', error);
            setAlert('Error saving invoice. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleUserSelect = (client) => {
        setInvoiceDetails({
            clientName: client.client_name,
            address: client.city,
            contact: client.phone_number,
            gst: client.gst_no,
            stateCode: client.state,
            products: initialInvoiceDetails.products
        });
        setSelectedClientId(client.client_id);
        setSearchTerm('');
        setFilteredClients(clients);
    };

    return (
        <>
            <ToastContainer /> {/* Add ToastContainer to render toasts */}
            {loading ? (
                <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <PrimaryLoader />
                </div>
            ) : (
                <div>
                    <div style={{ position: "relative" }}>
                        <BackIcon path={"management/invoices-management"} />
                    </div>
                    <div className="add-proforma-invoice" style={{ padding: "0px 70px" }}>
                        <h2>Add Proforma Invoice</h2>
                        {alert && <div className="alert">{alert}</div>}
                        <div className="d-flex">
                            <div className="form-group w-100">
                                <label>Client Name:</label>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search Client..."
                                />
                                <div style={{
                                    maxHeight: '400px',
                                    overflowY: 'scroll',
                                    border: '1px solid #ccc',
                                    position: 'absolute',
                                    backgroundColor: 'white',
                                    zIndex: 1,
                                    right: 30,
                                    top: 250
                                }}>
                                    {filteredClients.length > 0 && searchTerm && (
                                        filteredClients.map(client => (
                                            <div
                                                key={client.client_id}
                                                onClick={() => handleUserSelect(client)}
                                                style={{
                                                    padding: '8px',
                                                    cursor: 'pointer',
                                                    backgroundColor: '#fff',
                                                    borderBottom: '1px solid #ccc'
                                                }}
                                            >
                                                {client.client_name}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="form-group w-100">
                                <select 
                                    onChange={(e) => {
                                        const selectedClient = clients.find(client => client.client_id === e.target.value);
                                        if (selectedClient) handleUserSelect(selectedClient);
                                    }}
                                    value={selectedClientId} 
                                >
                                    <option value="">Select Existing User</option>
                                    {clients.map(client => (
                                        <option key={client.client_id} value={client.client_id}>{client.client_name}</option>
                                    ))}
                                </select>
                            </div>
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
                </div>
            )}
        </>
    );
};

export default AddProformaInvoice;
