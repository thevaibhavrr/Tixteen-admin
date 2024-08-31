
import React, { useState, useEffect } from 'react';
import "../../../style/managment/invoice/ProformaInvoices.css";
import { Link } from 'react-router-dom';
import { makeApi } from '../../../api/callApi.tsx';
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';

const TaxInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentInvoiceId, setCurrentInvoiceId] = useState();
    const [editInvoice, setEditInvoice] = useState({
        clientName: '',
        address: '',
        contact: '',
        gst: '',
        stateCode: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchInvoices(); 
    }, []);

    const fetchInvoices = async () => {
        try {
            setLoading(true);

            const response = await makeApi('/v1/admin/api/get-my-bill?invoice_status=Tax', 'GET');
 
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
                const newInvoices = invoices.filter((invoice) => invoice._id !== currentInvoiceId);
                setInvoices(newInvoices);
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
            setLoading(true);
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
        } finally {
            setLoading(false);
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
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    // Function to filter invoices based on search term
    const filteredInvoices = invoices.filter((invoice) => {
        return invoice.client_name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
            {loading && <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}> <PrimaryLoader /> </div>}

            <div>
                <div className="ms-4">
                    <div className="campaign-list-filters">
                        <Link to={"/management/invoices-management"}>
                            <button className='Level' >Proposal</button>
                        </Link>
                        <button className='active' >Tax</button>
                    </div>
                </div>
            </div>

            <div className="manage-level-chart pb-5 mb-5">
                <div>
                    <div>
                        <h2>Tax Invoices</h2>
                        {/* Search input */}
                        <div className='text-end' >

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
                <Link to={"/management/Add-invoices-management"} >
                    <div className='create-campaign-button' style={{ color: 'black' }} >Add New Invoice</div>
                </Link>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Client Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>GST</th>
                            <th>State Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((invoice, index) => (
                            <tr key={invoice._id}>
                                <td>{index + 1}</td>
                                <td>{invoice.client_name}</td>
                                <td>{invoice.address}</td>
                                <td>{invoice.contact_no}</td>
                                <Link to={`/management/tax-invoice/details/${invoice._id}`} target='_blank' >
                                    <td>{invoice.gst}</td>
                                </Link>
                                <td>{invoice.state_code}</td>

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
        </>

    );
};

export default TaxInvoices;
