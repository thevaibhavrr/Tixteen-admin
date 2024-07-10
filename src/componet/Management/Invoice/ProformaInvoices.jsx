// import React, { useState } from 'react';
// import "../../../style/managment/invoice/ProformaInvoices.css";
// import { Link } from 'react-router-dom';

// const initialInvoices = [
//     {
//         id: 1,
//         clientName: 'Harry',
//         address: '123 Main St',
//         contact: '9876543210',
//         gst: '12345',
//         stateCode: 'KA',
//         products: [
//             { name: 'Product A', hsn: '1001', qty: 10, rate: 100, taxableAmount: 1000, cgstRate: 5, cgstAmount: 50, sgstRate: 5, sgstAmount: 50, igstRate: 0, igstAmount: 0 },
//             { name: 'Product B', hsn: '1002', qty: 5, rate: 200, taxableAmount: 1000, cgstRate: 5, cgstAmount: 50, sgstRate: 5, sgstAmount: 50, igstRate: 0, igstAmount: 0 },
//         ]
//     },
//     {
//         id: 2,
//         clientName: 'Jane',
//         address: '456 Elm St',
//         contact: '9876543210',
//         gst: '12345',
//         stateCode: 'KA',
//         products: [
//             { name: 'Product C', hsn: '1003', qty: 15, rate: 300, taxableAmount: 1500, cgstRate: 5, cgstAmount: 75, sgstRate: 5, sgstAmount: 75, igstRate: 0, igstAmount: 0 },
//             { name: 'Product D', hsn: '1004', qty: 20, rate: 400, taxableAmount: 2000, cgstRate: 5, cgstAmount: 100, sgstRate: 5, sgstAmount: 100, igstRate: 0, igstAmount: 0 },
//         ]
//     },
// ];

// const ProformaInvoices = () => {
//     const [invoices, setInvoices] = useState(initialInvoices);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [currentInvoiceIndex, setCurrentInvoiceIndex] = useState(null);
//     const [editInvoice, setEditInvoice] = useState({
//         clientName: '',
//         address: '',
//         contact: '',
//         gst: '',
//         stateCode: '',
//     });

//     const deleteInvoice = () => {
//         const newInvoices = invoices.filter((_, i) => i !== currentInvoiceIndex);
//         setInvoices(newInvoices);
//         setIsDeleteModalOpen(false);
//     };

//     const openDeleteModal = (index) => {
//         setCurrentInvoiceIndex(index);
//         setIsDeleteModalOpen(true);
//     };

//     const openEditModal = (index) => {
//         setCurrentInvoiceIndex(index);
//         setEditInvoice(invoices[index]);
//         setIsEditModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsDeleteModalOpen(false);
//         setIsEditModalOpen(false);
//         setCurrentInvoiceIndex(null);
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));
//     };

//     const saveEdit = () => {
//         const newInvoices = invoices.map((invoice, i) => (i === currentInvoiceIndex ? editInvoice : invoice));
//         setInvoices(newInvoices);
//         setIsEditModalOpen(false);
//     };

//     return (
//         <div className="manage-level-chart">
//             <div>

//                 <div>
//                     <h2>Proforma Invoices</h2>
//                 </div>
//             </div>
//             <Link to={"/management/Add-invoices-management"} >
//                 <div className='create-campaign-button' style={{color: 'black'}} >Add New Invoice</div>
//             </Link>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Client Name</th>
//                         <th>Address</th>
//                         <th>Contact</th>
//                         <th>GST</th>
//                         <th>State Code</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {invoices.map((invoice, index) => (
//                         <tr key={invoice.id}>
//                             <td>{invoice.clientName}</td>
//                             <td>{invoice.address}</td>
//                             <td>{invoice.contact}</td>
//                             <td>{invoice.gst}</td>
//                             <td>{invoice.stateCode}</td>
//                             <td>
//                                 <button onClick={() => openDeleteModal(index)}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
//                                         <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
//                                     </svg>
//                                 </button>
//                                 <button onClick={() => openEditModal(index)}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
//                                         <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                                         <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
//                                     </svg>
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {isDeleteModalOpen && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h3>Are you sure you want to delete this invoice?</h3>
//                         <button onClick={deleteInvoice}>Yes</button>
//                         <button onClick={closeModal}>No</button>
//                     </div>
//                 </div>
//             )}

//             {isEditModalOpen && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h3>Edit Invoice</h3>
//                         <form>
//                             <div>
//                                 <label>Client Name</label>
//                                 <input type="text" name="clientName" value={editInvoice.clientName} onChange={handleEditChange} />
//                             </div>
//                             <div>
//                                 <label>Address</label>
//                                 <input type="text" name="address" value={editInvoice.address} onChange={handleEditChange} />
//                             </div>
//                             <div>
//                                 <label>Contact</label>
//                                 <input type="text" name="contact" value={editInvoice.contact} onChange={handleEditChange} />
//                             </div>
//                             <div>
//                                 <label>GST</label>
//                                 <input type="text" name="gst" value={editInvoice.gst} onChange={handleEditChange} />
//                             </div>
//                             <div>
//                                 <label>State Code</label>
//                                 <input type="text" name="stateCode" value={editInvoice.stateCode} onChange={handleEditChange} />
//                             </div>
//                         </form>
//                         <button onClick={saveEdit}>Save</button>
//                         <button onClick={closeModal}>Cancel</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProformaInvoices;

import { makeApi } from '../../../api/callApi.tsx';


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// const ProformaInvoices = () => {
//     const [invoices, setInvoices] = useState([]);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [currentInvoiceIndex, setCurrentInvoiceIndex] = useState(null);
//     const [editInvoice, setEditInvoice] = useState({
//         clientName: '',
//         address: '',
//         contact: '',
//         gst: '',
//         stateCode: '',
//     });

//     useEffect(() => {
//         fetchInvoices();
//     }, []);

//     const fetchInvoices = async () => {
//         try {
//             const response = await makeApi('/v1/admin/api/get-my-bill', 'GET');
//             console.log(response)
//             if (response.data.success) {
//                 setInvoices(response.data.mybill);
//             } else {
//                 console.error('Failed to fetch invoices:', response.data.error);
//             }
//         } catch (error) {
//             console.error('API request failed:', error);
//         }
//     };

//     const deleteInvoice = async () => {
//         try {
//             const response = await makeApi(`/admin/delete-my-bill/${invoices[currentInvoiceIndex]._id}`, 'DELETE');
//             if (response.data.success) {
//                 const newInvoices = invoices.filter((_, i) => i !== currentInvoiceIndex);
//                 setInvoices(newInvoices);
//                 setIsDeleteModalOpen(false);
//             } else {
//                 console.error('Failed to delete invoice:', response.data.error);
//             }
//         } catch (error) {
//             console.error('API request failed:', error);
//         }
//     };

//     const openDeleteModal = (index) => {
//         setCurrentInvoiceIndex(index);
//         setIsDeleteModalOpen(true);
//     };

//     const openEditModal = (index) => {
//         setCurrentInvoiceIndex(index);
//         setEditInvoice(invoices[index]);
//         setIsEditModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsDeleteModalOpen(false);
//         setIsEditModalOpen(false);
//         setCurrentInvoiceIndex(null);
//     };

//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));
//     };

//     const saveEdit = async () => {
//         try {
//             const response = await makeApi(`/admin/update-my-bill/${invoices[currentInvoiceIndex]._id}`, 'PUT', editInvoice);
//             if (response.data.success) {
//                 const newInvoices = invoices.map((invoice, i) => (i === currentInvoiceIndex ? editInvoice : invoice));
//                 setInvoices(newInvoices);
//                 setIsEditModalOpen(false);
//             } else {
//                 console.error('Failed to update invoice:', response.data.error);
//             }
//         } catch (error) {
//             console.error('API request failed:', error);
//         }
//     };

//     return (
//         <div className="manage-level-chart">
//             <div>
//                 <div>
//                     <h2>Proforma Invoices</h2>
//                 </div>
//             </div>
//             <Link to="/management/Add-invoices-management">
//                 <div className='create-campaign-button' style={{ color: 'black' }}>Add New Invoice</div>
//             </Link>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Client Name</th>
//                         <th>Address</th>
//                         <th>Contact</th>
//                         <th>GST</th>
//                         <th>State Code</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {invoices.map((invoice, index) => (
//                         <tr key={invoice._id}>
//                             <td>{invoice.client_name}</td>
//                             <td>{invoice.address}</td>
//                             <td>{invoice.contact_no}</td>
//                             <td>{invoice.gst}</td>
//                             <td>{invoice.state_code}</td>
//                             <td>
//                                 <button onClick={() => openDeleteModal(index)}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
//                                         <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
//                                     </svg>
//                                 </button>
//                                 <button onClick={() => openEditModal(index)}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
//                                         <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                                         <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
//                                     </svg>
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {isDeleteModalOpen && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h3>Are you sure you want to delete this invoice?</h3>
//                         <button onClick={deleteInvoice}>Yes</button>
//                         <button onClick={closeModal}>No</button>
//                     </div>
//                 </div>
//             )}

//             {isEditModalOpen && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h3>Edit Invoice</h3>
//                         <form>
//                             <div>
//                                 <label>Client Name</label>
//                                 <input type="text" name="clientName" value={editInvoice.clientName} onChange={handleEditChange} />
//                             </div>
//                             <div>
//                                 <label>Address</label>
//                                 <input type="text" name="address" value={editInvoice.address} onChange={handleEditChange} />
//                             </div>
//                             <div>
//                                 <label>Contact</label>
//                                 <input type="text" name="contact" value={editInvoice.contact} onChange={handleEditChange} />
//                             </div>
//                             <div>
//                                 <label>GST</label>
//                                 <input type="text" name="gst" value={editInvoice.gst} onChange={handleEditChange} />
//                             </div>
//                             <div>
//                                 <label>State Code</label>
//                                 <input type="text" name="stateCode" value={editInvoice.stateCode} onChange={handleEditChange} />
//                             </div>
//                             <button type="button" onClick={saveEdit}>Save</button>
//                             <button type="button" onClick={closeModal}>Cancel</button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProformaInvoices;



import React, { useState, useEffect } from 'react';
import "../../../style/managment/invoice/ProformaInvoices.css";
import { Link } from 'react-router-dom';

const ProformaInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentInvoiceId, setCurrentInvoiceId] = useState();
    console.log("--",currentInvoiceId);
    const [editInvoice, setEditInvoice] = useState({
        clientName: '',
        address: '',
        contact: '',
        gst: '',
        stateCode: '',
    });

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const response = await makeApi('/v1/admin/api/get-my-bill', 'GET');

            if (response.data.success) {
                setInvoices(response.data.mybill);
            } else {
                console.error('Failed to fetch invoices:', response.data.error);
            }
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    const deleteInvoice = async () => {
        try {
            const response = await makeApi(`/v1/admin/api/delete-my-bill/${currentInvoiceId}`, 'DELETE');
    
            if (response.data.success) {
                const newInvoices = invoices.filter((invoice) => invoice._id !== currentInvoiceId);
                setInvoices(newInvoices);
                setIsDeleteModalOpen(false);
            } else {
                console.error('Failed to delete invoice:', response.data.error);
            }
        } catch (error) {
            console.error('API request failed:', error);
        }
    };
    
    const openDeleteModal = (id) => {
        setCurrentInvoiceId(id);
        setIsDeleteModalOpen(true);
    };

    const openEditModal = async (id) => {
        setCurrentInvoiceId(id);
        try {
            const response = await makeApi(`/v1/admin/api/get-my-bill/${id}`);
            console.log("res ", response.data);
            if (response.data.success) {
                setEditInvoice(response.data.mybill);
                setIsEditModalOpen(true);
            } else {
                console.error('Failed to fetch invoice details for editing:', response.data.error);
            }
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    const closeModal = () => {
        setIsDeleteModalOpen(false);
        setIsEditModalOpen(false);
        setCurrentInvoiceId(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));
    };

    const saveEdit = async () => {
        try {
            const response = await makeApi(`/v1/admin/api/update-my-bill/${currentInvoiceId}`, 'PUT', editInvoice);
            if (response.data.success) {
                const updatedInvoices = invoices.map((invoice) =>
                    invoice._id === currentInvoiceId ? editInvoice : invoice
                );
                setInvoices(updatedInvoices);
                setIsEditModalOpen(false);
            } else {
                console.error('Failed to update invoice:', response.data.error);
            }
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    return (
        <div className="manage-level-chart">
            <div>
                <div>
                    <h2>Proforma Invoices</h2>
                </div>
            </div>
            <Link to={"/management/Add-invoices-management"} >
                <div className='create-campaign-button' style={{color: 'black'}} >Add New Invoice</div>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>GST</th>
                        <th>State Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice._id}>
                            <td>{invoice.client_name}</td>
                            <td>{invoice.address}</td>
                            <td>{invoice.contact_no}</td>
                            <td>{invoice.gst}</td>
                            <td>{invoice.state_code}</td>
                            <td>
                                <button onClick={() => openDeleteModal(invoice._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </button>
                                <button onClick={() => openEditModal(invoice._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isDeleteModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this invoice?</h3>
                        <button onClick={deleteInvoice}>Yes</button>
                        <button onClick={closeModal}>No</button>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Invoice</h3>
                        <label>Client Name</label>
                        <input
                            type="text"
                            name="clientName"
                            value={editInvoice.clientName}
                            onChange={handleEditChange}
                        />
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={editInvoice.address}
                            onChange={handleEditChange}
                        />
                        <label>Contact</label>
                        <input
                            type="text"
                            name="contact"
                            value={editInvoice.contact}
                            onChange={handleEditChange}
                        />
                        <label>GST</label>
                        <input
                            type="text"
                            name="gst"
                            value={editInvoice.gst}
                            onChange={handleEditChange}
                        />
                        <label>State Code</label>
                        <input
                            type="text"
                            name="stateCode"
                            value={editInvoice.stateCode}
                            onChange={handleEditChange}
                        />
                        <button onClick={saveEdit}>Save Changes</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProformaInvoices;
