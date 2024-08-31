
import React, { useState, useEffect } from 'react';
import "../../../style/managment/invoice/ProformaInvoices.css";
import { Link } from 'react-router-dom';
import { makeApi } from '../../../api/callApi.tsx';
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';

const ProformaInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);
    const [currentInvoiceId, setCurrentInvoiceId] = useState(null);
    const [viewMoreInvoice, setViewMoreInvoice] = useState(null);
    const [editInvoice, setEditInvoice] = useState({
        clientName: '',
        address: '',
        contact: '',
        gst: '',
        stateCode: '',
        invoice_status: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            setLoading(true);
            const response = await makeApi('/v1/admin/api/get-my-bill?invoice_status=', 'GET');
            if (response.data.success) {
                setInvoices(response.data.mybill);
            } else {
                console.error('Failed to fetch invoices:', response.data.error);
            }
        } catch (error) {
            console.error('API request failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteInvoice = async () => {
        try {
            setLoading(true);
            const response = await makeApi(`/v1/admin/api/delete-my-bill/${currentInvoiceId}`, 'DELETE');
            if (response.data.success) {
                setInvoices((prevInvoices) =>
                    prevInvoices.filter((invoice) => invoice._id !== currentInvoiceId)
                );
                setIsDeleteModalOpen(false);
            } else {
                console.error('Failed to delete invoice:', response.data.error);
            }
        } catch (error) {
            console.error('API request failed:', error);
        } finally {
            setLoading(false);
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

    const openViewMoreModal = (invoice) => {
        setViewMoreInvoice(invoice);
        setIsViewMoreModalOpen(true);
    };

    const closeModal = () => {
        setIsDeleteModalOpen(false);
        setIsEditModalOpen(false);
        setIsViewMoreModalOpen(false);  // Close "View More" modal
        setCurrentInvoiceId(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));
    };

    const saveEdit = async () => {
        if (!currentInvoiceId) {
            console.error('No current invoice ID set. Cannot save changes.');
            return;
        }

        try {
            setLoading(true);
            const response = await makeApi(`/v1/admin/api/update-my-bill/${currentInvoiceId}`, 'PUT', editInvoice);
            if (response.data.success) {
                setInvoices((prevInvoices) =>
                    prevInvoices.map((invoice) =>
                        invoice._id === currentInvoiceId ? { ...invoice, ...editInvoice } : invoice
                    )
                );
                setIsEditModalOpen(false);
            } else {
                console.error('Failed to update invoice:', response.data.error);
            }
        } catch (error) {
            console.error('API request failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredInvoices = invoices.filter((invoice) =>
        invoice.client_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {loading && (
                <div style={{
                    height: "100%",
                    width: "100%",
                    top: "0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: "9999",
                    position: "fixed",
                    backgroundColor: "rgba(0,0,0,0.3)"
                }}>
                    <PrimaryLoader />
                </div>
            )}

            <div>
                <div className="ms-4">
                    <div className="campaign-list-filters d-flex justify-content-between me-5">
                        <div className='d-flex gap-3' >
                            <button className='active'>Proposal</button>
                            <Link to={"/management/tax-invoices-management"}>
                                <button className='Level'>Tax</button>
                            </Link>
                        </div>
                        <div>

                            <Link to={"/management/Add-invoices-management"}>
                                <div className='btn btn-warning' style={{ color: 'black' }}>Add New Invoice</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="manage-level-chart pb-5 mb-5">
                <div>
                    <div>
                        <h2>Proposal Invoices</h2>
                        <div className='text-end'>
                            <input
                                type="text"
                                placeholder="Search by Client Name"
                                value={searchTerm}
                                className='tab-button'
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Client Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>GST</th>
                            <th>State Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((invoice, index) => (
                            <tr key={invoice._id}>
                                <td>{index + 1}</td>
                                <td>{invoice.client_name}</td>
                                <td style={{ wordWrap: 'break-word' , maxWidth: '500px' }} >{invoice.address}</td>
                                <td>{invoice.contact_no}</td>
                                <Link to={`/management/invoice/details/${invoice._id}`} target='_blank'>
                                    <td>{invoice.gst}</td>
                                </Link>
                                <td>{invoice.state_code}</td>
                                <td className=''>
                                    <button className='me-2' onClick={() => openDeleteModal(invoice._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 0 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM4.118 2.5h7.764v-1a.5.5 0 0 0-.5-.5h-6.764a.5.5 0 0 0-.5.5v1Z" />
                                        </svg>
                                    </button>
                                    {/* <button onClick={() => openEditModal(invoice._id)}> */}
                                    <Link to={`/management/invoice-edit/${invoice._id}`} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </Link>
                                    <button className='btn mt-1 btn-warning w-75' onClick={() => openViewMoreModal(invoice)}>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Modal */}
            {isDeleteModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Are you sure you want to delete this invoice?</h4>
                        <button className="btn btn-danger" onClick={deleteInvoice}>Delete</button>
                        <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Edit Invoice</h4>
                        <form>
                            <label>Client Name</label>
                            <input
                                type="text"
                                name="client_name"
                                value={editInvoice.clientName}
                                onChange={handleEditChange}
                            />
                            {/* Other fields for editing */}
                        </form>
                        <button className="btn btn-primary" onClick={saveEdit}>Save</button>
                        <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}

            {/* View More Modal */}
            {isViewMoreModalOpen && viewMoreInvoice && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Invoice Details</h4>
                        <p><strong>Client Name:</strong> {viewMoreInvoice.client_name}</p>
                        <p><strong>Address:</strong> {viewMoreInvoice.address}</p>
                        <p><strong>Contact:</strong> {viewMoreInvoice.contact_no}</p>
                        <p><strong>GST:</strong> {viewMoreInvoice.gst}</p>
                        <p><strong>State Code:</strong> {viewMoreInvoice.state_code}</p>
                        {/* Add more fields here */}
                        <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProformaInvoices;
