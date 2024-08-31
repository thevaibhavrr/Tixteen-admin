// import React, { useState, useEffect } from 'react';
// import DeletePopup from '../../utils/DeletePopup';
// import { makeApi } from '../../api/callApi.tsx';
// import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
// import { Link } from 'react-router-dom';

// const ManageClients = () => {
//     const [clients, setClients] = useState([]);
//     const [showEditPopup, setShowEditPopup] = useState(false);
//     const [showDeletePopup, setShowDeletePopup] = useState(false);
//     const [showDetailsPopup, setShowDetailsPopup] = useState(false);
//     const [currentClient, setCurrentClient] = useState(null);
//     const [editedClientData, setEditedClientData] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         fetchClients();
//     }, []);

//     const fetchClients = async () => {
//         setLoading(true);
//         try {
//             const res = await makeApi('/v1/admin/api/get-all-clients', 'GET');
//             setClients(res.data.clientData);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const filteredClients = clients.filter(client =>
//         client.client_name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleEdit = (client) => {
//         setCurrentClient(client);
//         setEditedClientData(client);
//         setShowEditPopup(true);
//     };

//     const handleDelete = (client) => {
//         setCurrentClient(client);
//         setShowDeletePopup(true);
//     };

//     const deleteClient = async () => {
//         try {
//             setLoading(true);
//             await makeApi(`/v1/admin/api/delete-client/${currentClient._id}`, 'DELETE');
//             setClients(clients.filter(client => client._id !== currentClient._id));
//             setShowDeletePopup(false);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const saveEditedClient = async () => {
//         try {
//             setLoading(true);
//             const res = await makeApi(`/v1/admin/api/update-client/${currentClient._id}`, 'PUT', editedClientData);
//             setClients(clients.map(client => client._id === currentClient._id ? res.data.data : client));
//             setShowEditPopup(false);
//         } catch (error) {
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditedClientData({
//             ...editedClientData,
//             [name]: value
//         });
//     };

//     const handleViewMore = (client) => {
//         setCurrentClient(client);
//         setShowDetailsPopup(true);
//     };

//     return (
//         <>
//             {loading && (
//                 <div style={{
//                     height: "100%",
//                     width: "100%",
//                     top: "0",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     zIndex: "9999",
//                     position: "fixed",
//                     backgroundColor: "rgba(0,0,0,0.3)"
//                 }}>
//                     <PrimaryLoader />
//                 </div>
//             )}
//             <div className="manage-industry-chart" style={{ marginBottom: "100px" }}>
//                 <div className='text-end'>
//                     <input
//                         type="text"
//                         placeholder="Search by Client Name"
//                         value={searchTerm}
//                         className='tab-button'
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//                 <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                     <thead>
//                         <tr>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Client Name</th>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email ID</th>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone Number</th>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>City</th>
//                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>State</th>
//                             <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredClients.map((client, index) => (
//                             <tr key={client._id}>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.client_name}</td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.email_id}</td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.phone_number}</td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.city}</td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.state}</td>
//                                 <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
//                                     <span onClick={() => handleEdit(client)} style={{ cursor: 'pointer', marginRight: '8px' }}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
//                                             <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                                             <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
//                                         </svg>
//                                     </span>
//                                     <span onClick={() => handleDelete(client)} style={{ cursor: 'pointer', marginRight: '8px' }}>
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
//                                             <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
//                                         </svg>
//                                     </span>
//                                     <span onClick={() => handleViewMore(client)} className='btn btn-warning' style={{ cursor: 'pointer' }}>
//                                         View More
//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <Link to="/management/add-client" className="create-campaign-button" style={{ display: 'inline-block', marginTop: '16px' }}>
//                     Add New Client 
//                 </Link>

//                 {showEditPopup && (
//                     <div className="popup">
//                         <div className="popup-content d-flex flex-column gap-2">
//                             <h2>Edit Client</h2>
//                             <input
//                                 type="text"
//                                 name="client_name"
//                                 value={editedClientData.client_name}
//                                 onChange={handleInputChange}
//                                 className='form-control'
//                             />
//                             <input
//                                 type="email"
//                                 name="email_id"
//                                 value={editedClientData.email_id}
//                                 onChange={handleInputChange}
//                                 className='form-control'
//                             />
//                             <input
//                                 type="tel"
//                                 name="phone_number"
//                                 value={editedClientData.phone_number}
//                                 onChange={handleInputChange}
//                                 className='form-control'
//                             />
//                             <input
//                                 type="text"
//                                 name="city"
//                                 value={editedClientData.city}
//                                 onChange={handleInputChange}
//                                 className='form-control'
//                             />
//                             <input
//                                 type="text"
//                                 name="state"
//                                 value={editedClientData.state}
//                                 onChange={handleInputChange}
//                                 className='form-control'
//                             />
//                             <button onClick={saveEditedClient} className="btn btn-success">Save</button>
//                             <button onClick={() => setShowEditPopup(false)} className="btn btn-danger">Cancel</button>
//                         </div>
//                     </div>
//                 )}

//                 {showDeletePopup && (
//                     <DeletePopup
//                         title="Delete Client"
//                         description="Are you sure you want to delete this client?"
//                         onCancel={() => setShowDeletePopup(false)}
//                         onConfirm={deleteClient}
//                     />
//                 )}

//                 {showDetailsPopup && (
//                     <div className="popup" style={{ fontFamily: "sans-serif" }}>
//                         <div className="popup-content">
//                             <button className="close-button btn btn-warning" style={{ position: "absolute", top: "10px", right: "10px" }} onClick={() => setShowDetailsPopup(false)}>×</button>
//                             <p><strong>Client Name:</strong> {currentClient.client_name}</p>
//                             <p><strong>Email ID:</strong> {currentClient.email_id}</p>
//                             <p><strong>Phone Number:</strong> {currentClient.phone_number}</p>
//                             <p><strong>City:</strong> {currentClient.city}</p>
//                             <p><strong>State:</strong> {currentClient.state}</p>
//                             <p><strong>Address:</strong> {currentClient.address}</p>
//                             <p><strong>Website:</strong> {currentClient.website}</p>
//                             <p><strong>Registration Date:</strong> {currentClient.registration_date}</p>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default ManageClients;

import React, { useState, useEffect } from 'react';
import DeletePopup from '../../utils/DeletePopup';
import { makeApi } from '../../api/callApi.tsx';
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
import { Link } from 'react-router-dom';

const ManageClients = () => {
    const [clients, setClients] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const [currentClient, setCurrentClient] = useState(null);
    const [editedClientData, setEditedClientData] = useState({});
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const res = await makeApi('/v1/admin/api/get-all-clients', 'GET');
            setClients(res.data.clientData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (client) => {
        setCurrentClient(client);
        setEditedClientData(client);
        setShowEditPopup(true);
    };

    const handleDelete = (client) => {
        setCurrentClient(client);
        setShowDeletePopup(true);
    };

    const deleteClient = async () => {
        if (!currentClient) return;
        setLoading(true);
        try {
            await makeApi(`/v1/admin/api/delete-client/${currentClient._id}`, 'DELETE');
            setClients(clients.filter(client => client._id !== currentClient._id));
            setShowDeletePopup(false);
            setCurrentClient(null);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const saveEditedClient = async () => {
        try {
            setLoading(true);
            const res = await makeApi(`/v1/admin/api/update-client/${currentClient._id}`, 'PUT', editedClientData);
            setClients(clients.map(client => client._id === currentClient._id ? res.data.data : client));
            setShowEditPopup(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedClientData({
            ...editedClientData,
            [name]: value
        });
    };

    const handleViewMore = (client) => {
        setCurrentClient(client);
        setShowDetailsPopup(true);
    };

    const filteredClients = clients.filter((client) =>
        client.client_name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div className="manage-industry-chart" style={{ marginBottom: "100px" }}>
                <div className='text-end'>
                    <input
                        type="text"
                        placeholder="Search by Client Name"
                        value={searchTerm}
                        className='tab-button'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Client Name</th>
                            <th>Email ID</th>
                            <th>Phone Number</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map((client, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{client.client_name}</td>
                                <td>{client.email_id}</td>
                                <td>{client.phone_number}</td>
                                <td>{client.city}</td>
                                <td>{client.state}</td>
                                <td>
                                    <span onClick={() => handleEdit(client)} style={{ cursor: 'pointer' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </span>
                                    <span onClick={() => handleDelete(client)} style={{ cursor: 'pointer' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                        </svg>
                                    </span>
                                    <span onClick={() => handleViewMore(client)} className='btn btn-warning' style={{ cursor: 'pointer' }}>
                                        View More
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/management/add-client" className="create-campaign-button" style={{ display: 'inline-block', marginTop: '16px' }}>
                    Add New Client
                </Link>

                {showEditPopup && (
                    <div className="popup">
                        <div className="popup-content d-flex flex-column gap-2">
                            <h2>Edit Client</h2>
                            <input
                                type="text"
                                name="client_name"
                                value={editedClientData.client_name}
                                onChange={handleInputChange}
                                className='form-control'
                            />
                            <input
                                type="email"
                                name="email_id"
                                value={editedClientData.email_id}
                                onChange={handleInputChange}
                                className='form-control'
                            />
                            <input
                                type="tel"
                                name="phone_number"
                                value={editedClientData.phone_number}
                                onChange={handleInputChange}
                                className='form-control'
                            />
                            <input
                                type="text"
                                name="city"
                                value={editedClientData.city}
                                onChange={handleInputChange}
                                className='form-control'
                            />
                            <input
                                type="text"
                                name="state"
                                value={editedClientData.state}
                                onChange={handleInputChange}
                                className='form-control'
                            />
                            <button onClick={saveEditedClient} className="btn btn-success">Save</button>
                            <button onClick={() => setShowEditPopup(false)} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                )}

                {showDeletePopup && (
                    <DeletePopup
                        title="Delete Client"
                        description="Are you sure you want to delete this client?"
                        onCancel={() => setShowDeletePopup(false)}
                        onConfirm={deleteClient}
                    />
                )}

                {showDetailsPopup && (
                    <div className="popup" style={{ fontFamily: "sans-serif" }}>
                        <div className="popup-content">
                            <button className="close-button btn btn-warning" style={{ position: "absolute", top: "10px", right: "10px" }} onClick={() => setShowDetailsPopup(false)}>×</button>
                            <p><strong>Client Name:</strong> {currentClient.client_name}</p>
                            <p><strong>Email ID:</strong> {currentClient.email_id}</p>
                            <p><strong>Phone Number:</strong> {currentClient.phone_number}</p>
                            <p><strong>City:</strong> {currentClient.city}</p>
                            <p><strong>State:</strong> {currentClient.state}</p>
                            <p><strong>Address:</strong> {currentClient.address}</p>
                            <p><strong>Website:</strong> {currentClient.website}</p>
                            <p><strong>Registration Date:</strong> {currentClient.registration_date}</p>
                            {/* Add more details here as needed */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ManageClients;
