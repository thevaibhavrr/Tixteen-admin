import "../../../style/managment/invoice/AddProformaInvoice.css";
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import BackIcon from "../../../utils/BackIcon";
import { makeApi } from "../../../api/callApi.tsx";
import PrimaryLoader from "../../../utils/PrimaryLoader.jsx";
import {  useNavigate } from 'react-router-dom';

 
const initialInvoiceDetails = {
    clientName: '',
    address: '',
    contact: '',
    gst: '',
    stateCode: '',
    products: [
        {
            productName: '',
            hsn: '998314',
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
  const navigate = useNavigate();

    const [invoiceDetails, setInvoiceDetails] = useState(initialInvoiceDetails);
    const [alert, setAlert] = useState('');
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState('');
    const [GSTCode,  setGSTCode] = useState('');

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
        if (field === 'gst') {
            const stateCode = value.substring(0, 2);
            setGSTCode(stateCode);
            setInvoiceDetails({
                ...invoiceDetails,
                gst: value,
                stateCode: stateCode
            });
            // Recalculate taxes based on new GST input
            const newProducts = invoiceDetails.products.map(product => 
                calculateTax(product, stateCode) // Use the updated stateCode
            );
            setInvoiceDetails(prevDetails => ({
                ...prevDetails,
                products: newProducts
            }));
        } else {
            const updatedInvoiceDetails = {
                ...invoiceDetails,
                [field]: value
            };
    
            // Recalculate taxes if stateCode is being updated
            if (field === 'stateCode') {
                const newProducts = updatedInvoiceDetails.products.map(product => 
                    calculateTax(product, value) // Use the updated stateCode
                );
                setInvoiceDetails({
                    ...updatedInvoiceDetails,
                    products: newProducts
                });
            } else {
                setInvoiceDetails(updatedInvoiceDetails);
            }
        }
    };
    
    
    
    // const handleInputChange = (field, value) => {
    //     setInvoiceDetails({
    //         ...invoiceDetails,
    //         [field]: value
    //     });
    // };

    // const handleProductChange = (index, field, value) => {
    //     const newProducts = [...invoiceDetails.products];
    //     newProducts[index][field] = value;
    //     setInvoiceDetails({
    //         ...invoiceDetails,
    //         products: newProducts
    //     });
    // };
    const handleProductChange = (index, field, value) => {
        const newProducts = [...invoiceDetails.products];
        newProducts[index][field] = value;
    
        const updatedProduct = calculateTax(newProducts[index], invoiceDetails.stateCode);
        newProducts[index] = { ...newProducts[index], ...updatedProduct };
    
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
                    hsn: '998314',
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
    const calculateTax = (product, stateCode) => {
        const amount = parseFloat(product.qty || 0);
        const price = parseFloat(product.rate || 0);
        const taxable = (amount * price).toFixed(2);
        let cgstAmount = '0.00';
        let sgstAmount = '0.00';
        let igstAmount = '0.00';
        let cgstRate = '0.00';
        let sgstRate = '0.00';
        let igstRate = '0.00';
    
        console.log("stateCode" + stateCode);
        // Check if stateCode is known
        if (stateCode === "03") { // Replace with appropriate state codes as needed
            const gstAmount = ((taxable * 18) / 100).toFixed(2);
            cgstAmount = (gstAmount / 2).toFixed(2);
            sgstAmount = (gstAmount / 2).toFixed(2);
            cgstRate = '9.00';
            sgstRate = '9.00';
        } else {
            igstAmount = ((taxable * 18) / 100).toFixed(2);
            igstRate = '18.00';
        }
    
        return {
            taxableAmount: taxable,
            cgstRate,
            cgstAmount,
            sgstRate,
            sgstAmount,
            igstRate,
            igstAmount
        };
    };
    
    
    const handleSave = async () => {
        const missingFields = [];

        if (!invoiceDetails.clientName) missingFields.push('Client Name');
        if (!invoiceDetails.address) missingFields.push('Address');
        if (!invoiceDetails.contact) missingFields.push('Contact');
        if (!invoiceDetails.stateCode) missingFields.push('State Code');

        invoiceDetails.products.forEach((product, index) => {
            if (!product.productName) missingFields.push(`Product Name at row ${index + 1}`);
            // if (!product.hsn) missingFields.push(`HSN at row ${index + 1}`);
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

            let clientId = selectedClientId;

            // If no client was selected, create a new client
            if (!clientId) {
                const { data: newClientData } = await makeApi("/v1/admin/api/create-client", "POST", {
                    client_name: invoiceDetails.clientName,
                    city: invoiceDetails.address,
                    phone_number: invoiceDetails.contact,
                    gst_no: invoiceDetails.gst,
                    state: invoiceDetails.stateCode
                });

                clientId = newClientData.client_id;
            }

            const { data: myBillData } = await makeApi("/v1/admin/api/create-my-bill", "POST", {
                client_id: clientId,
                client_name: invoiceDetails.clientName,
                address: invoiceDetails.address,
                gst: invoiceDetails.gst,
                contact_no: invoiceDetails.contact,
                state_code: invoiceDetails.stateCode,
                bill_date: new Date(),
                status: 'Performa',
                invoice_status: '',
                invoice_no: 'TP-' + Math.floor(Math.random() * 10000),
                tax_invoice_no: 'TX-' + Math.floor(Math.random() * 10000),
                report: 'Active'
            });

            const billItemsData = invoiceDetails.products.map(product => ({
                Invoice_no: myBillData.mybill.invoice_no,
                product: product.productName,
                hsn: "998314",
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
            setInvoiceDetails(initialInvoiceDetails);
            toast("Invoice created successfully", {
                onClose: () => {
                  navigate("/management/invoices-management");
                }
              });
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
        const stateCode = client.gst_no.substring(0, 2);
            setGSTCode(stateCode);
        setSelectedClientId(client.client_id);
        setSearchTerm('');
        setFilteredClients(clients);
    };
    const removeProduct = (index) => {
        const newProducts = invoiceDetails.products.filter((_, i) => i !== index);
        setInvoiceDetails({
            ...invoiceDetails,
            products: newProducts
        });
    };
    
    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} /> 
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
                                    value={invoiceDetails.clientName || searchTerm}
                                    onChange={(e) => {
                                        const name = e.target.value;
                                        setSearchTerm(name);
                                        if (!clients.some(client => client.client_name.toLowerCase() === name.toLowerCase())) {
                                            setInvoiceDetails({
                                                ...invoiceDetails,
                                                clientName: name,
                                                address: '',
                                                contact: '',
                                                gst: '',
                                                stateCode: '',
                                            });
                                        } else {
                                            setInvoiceDetails({
                                                ...invoiceDetails,
                                                clientName: '',
                                            });
                                        }
                                    }}
                                    placeholder="Search Client or Add New..."
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
        value={invoiceDetails.stateCode} // Use invoiceDetails for correct state code
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
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
    {invoiceDetails.products.map((product, index) => {
        // Calculate the total for the product
        const total = (
            parseFloat(product.taxableAmount || 0) +
            parseFloat(product.cgstAmount || 0) +
            parseFloat(product.sgstAmount || 0) +
            parseFloat(product.igstAmount || 0)
        ).toFixed(2);

        return (
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
                        value={998314} // Static value for HSN
                        onChange={(e) => handleProductChange(index, 'hsn', "998314")}
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
                <td className="" >
                    {total}
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => removeProduct(index)}>Remove</button> 
                </td>
            </tr>
        );
    })}
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






// import "../../../style/managment/invoice/AddProformaInvoice.css";
// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 
// import BackIcon from "../../../utils/BackIcon";
// import { makeApi } from "../../../api/callApi.tsx";
// import PrimaryLoader from "../../../utils/PrimaryLoader.jsx";
// import {  useNavigate } from 'react-router-dom';


// const initialInvoiceDetails = {
//     clientName: '',
//     address: '',
//     contact: '',
//     gst: '',
//     stateCode: '',
//     products: [
//         {
//             productName: '',
//             hsn: '998314',
//             qty: '',
//             rate: '',
//             taxableAmount: '',
//             cgstRate: '',
//             cgstAmount: '',
//             sgstRate: '',
//             sgstAmount: '',
//             igstRate: '',
//             igstAmount: ''
//         }
//     ]
// };

// const AddProformaInvoice = () => {
//   const navigate = useNavigate();

//     const [invoiceDetails, setInvoiceDetails] = useState(initialInvoiceDetails);
//     const [alert, setAlert] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [clients, setClients] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredClients, setFilteredClients] = useState([]);
//     const [selectedClientId, setSelectedClientId] = useState('');
//     const [GSTCode,  setGSTCode] = useState('');

//     useEffect(() => {
//         const fetchClients = async () => {
//             try {
//                 const { data } = await makeApi("/v1/admin/api/get-all-clients", "GET");
//                 if (data.success) {
//                     setClients(data.clientData);
//                     setFilteredClients(data.clientData);
//                 }
//             } catch (error) {
//                 console.error('Error fetching clients:', error);
//                 setAlert('Error fetching client data.');
//             }
//         };
//         fetchClients();
//     }, []);

//     useEffect(() => {
//         if (searchTerm) {
//             const filtered = clients.filter(client =>
//                 client.client_name.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//             setFilteredClients(filtered);
//         } else {
//             setFilteredClients(clients);
//         }
//     }, [searchTerm, clients]);

//     const handleInputChange = (field, value) => {
//         if (field === 'gst') {
//             // Extract the state code from the first 2 digits of the GST number
//             const stateCode = value.substring(0, 2);
//             setGSTCode(stateCode);
//             setInvoiceDetails({
//                 ...invoiceDetails,
//                 gst: value,
//                 stateCode: stateCode
//             });
//             if (field === 'stateCode') {
//                 const newProducts = invoiceDetails.products.map(product => 
//                     calculateTax(product, value)
//                 );
//                 setInvoiceDetails({
//                     ...invoiceDetails,
//                     products: newProducts
//                 });
//             }
//         } else {
//             setInvoiceDetails({
//                 ...invoiceDetails,
//                 [field]: value
//             });
//         }
//     };
    
//     // const handleInputChange = (field, value) => {
//     //     setInvoiceDetails({
//     //         ...invoiceDetails,
//     //         [field]: value
//     //     });
//     // };

//     // const handleProductChange = (index, field, value) => {
//     //     const newProducts = [...invoiceDetails.products];
//     //     newProducts[index][field] = value;
//     //     setInvoiceDetails({
//     //         ...invoiceDetails,
//     //         products: newProducts
//     //     });
//     // };
//     const handleProductChange = (index, field, value) => {
//         const newProducts = [...invoiceDetails.products];
//         newProducts[index][field] = value;
    
//         const updatedProduct = calculateTax(newProducts[index], invoiceDetails.stateCode);
//         newProducts[index] = { ...newProducts[index], ...updatedProduct };
    
//         setInvoiceDetails({
//             ...invoiceDetails,
//             products: newProducts
//         });
//     };
    

//     const addMoreProducts = () => {
//         setInvoiceDetails({
//             ...invoiceDetails,
//             products: [
//                 ...invoiceDetails.products,
//                 {
//                     productName: '',
//                     hsn: '998314',
//                     qty: '',
//                     rate: '',
//                     taxableAmount: '',
//                     cgstRate: '',
//                     cgstAmount: '',
//                     sgstRate: '',
//                     sgstAmount: '',
//                     igstRate: '',
//                     igstAmount: ''
//                 }
//             ]
//         });
//     };
//     const calculateTax = (product, stateCode) => {
//         const amount = parseFloat(product.qty || 0);
//         const price = parseFloat(product.rate || 0);
//         const taxable = (amount * price).toFixed(2);
//         let cgstAmount = '0.00';
//         let sgstAmount = '0.00';
//         let igstAmount = '0.00';
//         let cgstRate = '0.00';
//         let sgstRate = '0.00';
//         let igstRate = '0.00';
    
//         if (GSTCode === "03") {
//             console.log("GSTCode", GSTCode);
//             const gstAmount = ((taxable * 18) / 100).toFixed(2);
//             cgstAmount = (gstAmount / 2).toFixed(2);
//             sgstAmount = (gstAmount / 2).toFixed(2);
//             cgstRate = '9.00';
//             sgstRate = '9.00';
//         } else {
//             igstAmount = ((taxable * 18) / 100).toFixed(2);
//             igstRate = '18.00';
//         }
    
//         return {
//             taxableAmount: taxable,
//             cgstRate,
//             cgstAmount,
//             sgstRate,
//             sgstAmount,
//             igstRate,
//             igstAmount
//         };
//     };
    
//     const handleSave = async () => {
//         const missingFields = [];

//         if (!invoiceDetails.clientName) missingFields.push('Client Name');
//         if (!invoiceDetails.address) missingFields.push('Address');
//         if (!invoiceDetails.contact) missingFields.push('Contact');
//         if (!invoiceDetails.stateCode) missingFields.push('State Code');

//         invoiceDetails.products.forEach((product, index) => {
//             if (!product.productName) missingFields.push(`Product Name at row ${index + 1}`);
//             // if (!product.hsn) missingFields.push(`HSN at row ${index + 1}`);
//             if (!product.qty) missingFields.push(`Quantity at row ${index + 1}`);
//             if (!product.rate) missingFields.push(`Rate at row ${index + 1}`);
//             if (!product.taxableAmount) missingFields.push(`Taxable Amount at row ${index + 1}`);
//         });

//         if (missingFields.length > 0) {
//             toast.error(`Please fill: ${missingFields.join(', ')}`);
//             return;
//         }

//         try {
//             setLoading(true);

//             let clientId = selectedClientId;

//             // If no client was selected, create a new client
//             if (!clientId) {
//                 const { data: newClientData } = await makeApi("/v1/admin/api/create-client", "POST", {
//                     client_name: invoiceDetails.clientName,
//                     city: invoiceDetails.address,
//                     phone_number: invoiceDetails.contact,
//                     gst_no: invoiceDetails.gst,
//                     state: invoiceDetails.stateCode
//                 });

//                 clientId = newClientData.client_id;
//             }

//             const { data: myBillData } = await makeApi("/v1/admin/api/create-my-bill", "POST", {
//                 client_id: clientId,
//                 client_name: invoiceDetails.clientName,
//                 address: invoiceDetails.address,
//                 gst: invoiceDetails.gst,
//                 contact_no: invoiceDetails.contact,
//                 state_code: invoiceDetails.stateCode,
//                 bill_date: new Date(),
//                 status: 'Performa',
//                 invoice_status: '',
//                 invoice_no: 'TP-' + Math.floor(Math.random() * 10000),
//                 tax_invoice_no: 'TX-' + Math.floor(Math.random() * 10000),
//                 report: 'Active'
//             });

//             const billItemsData = invoiceDetails.products.map(product => ({
//                 Invoice_no: myBillData.mybill.invoice_no,
//                 product: product.productName,
//                 hsn: product.hsn,
//                 qty: product.qty,
//                 rate: product.rate,
//                 taxable: product.taxableAmount,
//                 cgst_Rate: product.cgstRate,
//                 cgst_Amount: product.cgstAmount,
//                 sgst_Rate: product.sgstRate,
//                 sgst_Amount: product.sgstAmount,
//                 igst_Rate: product.igstRate,
//                 igst_Amount: product.igstAmount,
//                 tax_invoice_no: myBillData.mybill.tax_invoice_no
//             }));

//             await makeApi("/v1/admin/api/create-bill-items", "POST", billItemsData);

//             setAlert('Invoice saved successfully!');
//             setInvoiceDetails(initialInvoiceDetails);
//             toast("Invoice created successfully", {
//                 onClose: () => {
//                   navigate("/management/invoices-management");
//                 }
//               });
//         } catch (error) {
//             console.error('Error saving invoice:', error);
//             setAlert('Error saving invoice. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleUserSelect = (client) => {
//         setInvoiceDetails({
//             clientName: client.client_name,
//             address: client.city,
//             contact: client.phone_number,
//             gst: client.gst_no,
//             stateCode: client.state,
//             products: initialInvoiceDetails.products
//         });
//         const stateCode = client.gst_no.substring(0, 2);
//             setGSTCode(stateCode);
//         setSelectedClientId(client.client_id);
//         setSearchTerm('');
//         setFilteredClients(clients);
//     };
//     const removeProduct = (index) => {
//         const newProducts = invoiceDetails.products.filter((_, i) => i !== index);
//         setInvoiceDetails({
//             ...invoiceDetails,
//             products: newProducts
//         });
//     };
    
//     return (
//         <>
//             <ToastContainer position="top-center" autoClose={3000} /> 
//             {loading ? (
//                 <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}>
//                     <PrimaryLoader />
//                 </div>
//             ) : (
//                 <div>
//                     <div style={{ position: "relative" }}>
//                         <BackIcon path={"management/invoices-management"} />
//                     </div>
//                     <div className="add-proforma-invoice" style={{ padding: "0px 70px" }}>
//                         <h2>Add Proforma Invoice</h2>
//                         {alert && <div className="alert">{alert}</div>}
//                         <div className="d-flex">
//                             <div className="form-group w-100">
//                                 <label>Client Name:</label>
//                                 <input
//                                     type="text"
//                                     value={invoiceDetails.clientName || searchTerm}
//                                     onChange={(e) => {
//                                         const name = e.target.value;
//                                         setSearchTerm(name);
//                                         if (!clients.some(client => client.client_name.toLowerCase() === name.toLowerCase())) {
//                                             setInvoiceDetails({
//                                                 ...invoiceDetails,
//                                                 clientName: name,
//                                                 address: '',
//                                                 contact: '',
//                                                 gst: '',
//                                                 stateCode: '',
//                                             });
//                                         } else {
//                                             setInvoiceDetails({
//                                                 ...invoiceDetails,
//                                                 clientName: '',
//                                             });
//                                         }
//                                     }}
//                                     placeholder="Search Client or Add New..."
//                                 />
//                                 <div style={{
//                                     maxHeight: '400px',
//                                     overflowY: 'scroll',
//                                     border: '1px solid #ccc',
//                                     position: 'absolute',
//                                     backgroundColor: 'white',
//                                     zIndex: 1,
//                                     right: 30,
//                                     top: 250
//                                 }}>
//                                     {filteredClients.length > 0 && searchTerm && (
//                                         filteredClients.map(client => (
//                                             <div
//                                                 key={client.client_id}
//                                                 onClick={() => handleUserSelect(client)}
//                                                 style={{
//                                                     padding: '8px',
//                                                     cursor: 'pointer',
//                                                     backgroundColor: '#fff',
//                                                     borderBottom: '1px solid #ccc'
//                                                 }}
//                                             >
//                                                 {client.client_name}
//                                             </div>
//                                         ))
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="form-group w-100">
//                                 <select 
//                                     onChange={(e) => {
//                                         const selectedClient = clients.find(client => client.client_id === e.target.value);
//                                         if (selectedClient) handleUserSelect(selectedClient);
//                                     }}
//                                     value={selectedClientId} 
//                                 >
//                                     <option value="">Select Existing User</option>
//                                     {clients.map(client => (
//                                         <option key={client.client_id} value={client.client_id}>{client.client_name}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                         <div className="form-group">
//                             <label>Address:</label>
//                             <input
//                                 type="text"
//                                 value={invoiceDetails.address}
//                                 onChange={(e) => handleInputChange('address', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Contact:</label>
//                             <input
//                                 type="text"
//                                 value={invoiceDetails.contact}
//                                 onChange={(e) => handleInputChange('contact', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>GST:</label>
//                             <input
//                                 type="text"
//                                 value={invoiceDetails.gst}
//                                 onChange={(e) => handleInputChange('gst', e.target.value)}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>State Code:</label>
//                             <input
//                                 type="text"
//                                 // value={invoiceDetails.stateCode}
//                                 value={GSTCode}
//                                 onChange={(e) => handleInputChange('stateCode', e.target.value)}
//                             />
//                         </div>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Name Of Product/Service</th>
//                                     <th>HSN ACS</th>
//                                     <th>Qty</th>
//                                     <th>Rate</th>
//                                     <th>Taxable Amount</th>
//                                     <th>CGST Rate</th>
//                                     <th>CGST Amount</th>
//                                     <th>SGST Rate</th>
//                                     <th>SGST Amount</th>
//                                     <th>IGST Rate</th>
//                                     <th>IGST Amount</th>
//                                     <th>Total</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//     {invoiceDetails.products.map((product, index) => {
//         // Calculate the total for the product
//         const total = (
//             parseFloat(product.taxableAmount || 0) +
//             parseFloat(product.cgstAmount || 0) +
//             parseFloat(product.sgstAmount || 0) +
//             parseFloat(product.igstAmount || 0)
//         ).toFixed(2);

//         return (
//             <tr key={index}>
//                 <td>
//                     <input
//                         type="text"
//                         value={product.productName}
//                         onChange={(e) => handleProductChange(index, 'productName', e.target.value)}
//                     />
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         value={998314} // Static value for HSN
//                         onChange={(e) => handleProductChange(index, 'hsn', "998314")}
//                     />
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         value={product.qty}
//                         onChange={(e) => handleProductChange(index, 'qty', e.target.value)}
//                     />
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         value={product.rate}
//                         onChange={(e) => handleProductChange(index, 'rate', e.target.value)}
//                     />
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         value={product.taxableAmount}
//                         onChange={(e) => handleProductChange(index, 'taxableAmount', e.target.value)}
//                     />
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         value={product.cgstRate}
//                         onChange={(e) => handleProductChange(index, 'cgstRate', e.target.value)}
//                     />
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         value={product.cgstAmount}
//                         onChange={(e) => handleProductChange(index, 'cgstAmount', e.target.value)}
//                     />
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         value={product.sgstRate}
//                         onChange={(e) => handleProductChange(index, 'sgstRate', e.target.value)}
//                     />
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         value={product.sgstAmount}
//                         onChange={(e) => handleProductChange(index, 'sgstAmount', e.target.value)}
//                     />
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         value={product.igstRate}
//                         onChange={(e) => handleProductChange(index, 'igstRate', e.target.value)}
//                     />
//                 </td>
//                 <td>
//                     <input
//                         type="text"
//                         value={product.igstAmount}
//                         onChange={(e) => handleProductChange(index, 'igstAmount', e.target.value)}
//                     />
//                 </td>
//                 <td className="" >
//                     {total}
//                 </td>
//                 <td>
//                     <button className="btn btn-danger" onClick={() => removeProduct(index)}>Remove</button> 
//                 </td>
//             </tr>
//         );
//     })}
// </tbody>

//                         </table>
//                         <button className="add-product-button" onClick={addMoreProducts}>Add More</button>
//                         <button className="save-button" onClick={handleSave}>Save</button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
    
// };

// export default AddProformaInvoice;