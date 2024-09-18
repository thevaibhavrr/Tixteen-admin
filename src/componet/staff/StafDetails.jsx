
// import React, { useEffect, useState } from 'react';
// import DeletePopup from '../../utils/DeletePopup';
// import { makeApi } from '../../api/callApi.tsx';
// import { Link } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const StaffDetails = () => { 
//     const [staff, setStaff] = useState([]);
//     const [showEditPopup, setShowEditPopup] = useState(false);
//     const [showDeletePopup, setShowDeletePopup] = useState(false);
//     const [currentStaff, setCurrentStaff] = useState(null);
//     const [editedStaff, setEditedStaff] = useState({});
//     const [loading, setLoading] = useState(false);

//     const fetchStaffList = async () => {
//         setLoading(true);
//         try {
//             const res = await makeApi('/v1/get-all-staff?status=1', 'GET');
//             setStaff(res.data.data);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchStaffList();
//     }, []);

//     const handleEdit = (staffMember) => {
//         setCurrentStaff(staffMember);
//         setEditedStaff({ ...staffMember });
//         setShowEditPopup(true);
//     };

//     const handleDelete = (staffMember) => {
//         setCurrentStaff(staffMember);
//         setShowDeletePopup(true);
//     };

//     const deleteStaff = async () => {
//         try {
//             await makeApi(`/v1/delete-staff/${currentStaff._id}`, 'DELETE');
//             setStaff(staff.filter(member => member._id !== currentStaff._id));
//             setShowDeletePopup(false);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const saveEditedStaff = async () => {
//         setLoading(true);
//         try {
//             // Validate inputs
//             if (!editedStaff.name || !editedStaff.email || !editedStaff.mobile) {
//                 toast.error('Please fill in all required fields.');
//                 return;
//             }
//             if (!validateEmail(editedStaff.email)) {
//                 toast.error('Please enter a valid email address.');
//                 return;
//             }
//             if (editedStaff.mobile.length !== 10) {
//                 toast.error('Mobile number must be 10 digits.');
//                 return;
//             }

//             const res = await makeApi(`/v1/update-staff/${currentStaff._id}`, 'PUT', editedStaff);
//             const updatedStaff = staff.map(member =>
//                 member._id === currentStaff._id ? res.data.data : member
//             );
//             setStaff(updatedStaff);
//             setShowEditPopup(false);
//             toast.success('Staff member updated successfully.');
//         } catch (error) {
//             console.log(error);
//             toast.error('Failed to update staff member. Please try again later.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const validateEmail = (email) => {
//         // Basic email validation regex
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return regex.test(email);
//     };

//     return (
//         <div className="manage-industry-chart mb-5 pb-5">
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>S No</th>
//                         <th>Name</th>
//                         <th>Father Name</th>
//                         <th>Address</th>
//                         <th>Email</th>
//                         <th>Contact</th>
//                         <th>Basic Salary</th>
//                         <th>Deactivate</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {staff.map((staffMember, index) => (
//                         <tr key={staffMember._id}>
//                             <td>{index + 1}</td>
//                             <td>{staffMember.name}</td>
//                             <td>{staffMember.fathername}</td>
//                             <td>{staffMember.address}</td>
//                             <td>{staffMember.email}</td>
//                             <td>{staffMember.mobile}</td>
//                             <td>{staffMember.basicsalary}</td>
//                             <td>{staffMember.status === "1" ? "Yes" : "No"}</td>
//                             <td>
//                                 <span onClick={() => handleEdit(staffMember)} style={{ cursor: 'pointer' }}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
//                                         <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                                         <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
//                                     </svg>
//                                 </span>
//                                 {/* Uncomment this part to enable delete functionality */}
//                                 {/* <span onClick={() => handleDelete(staffMember)} style={{ cursor: 'pointer' }}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
//                                         <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
//                                     </svg>
//                                 </span> */}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <Link to="/management/add-staff" className="create-campaign-button">
//                         Add New Staff 
//                     </Link>

//             <DeletePopup
//                 isOpen={showDeletePopup}
//                 onClose={() => setShowDeletePopup(false)}
//                 onDelete={deleteStaff}
//                 message="Are you sure you want to delete this staff member?"
//             />

//             {showEditPopup && (
//                 <div className="modal d-block" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
//                     <div className="modal-dialog" role="document">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title">Edit Staff</h5>
//                                 <button type="button" className="close" aria-label="Close" onClick={() => setShowEditPopup(false)}>
//                                     <span aria-hidden="true">&times;</span>
//                                 </button>
//                             </div>
//                             <div className="modal-body">
//                                 <div className="form-group">
//                                     <label htmlFor="editName">Name</label>

                                    
//                                     <input
//                                         type="text"
//                                         id="editName"
//                                         value={editedStaff.name || ''}
//                                         onChange={(e) => setEditedStaff({ ...editedStaff, name: e.target.value })}
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="editName">username</label>
//                                     <input
//                                         type="text"
//                                         id="editName"
//                                         value={editedStaff.username || ''}
//                                         onChange={(e) => setEditedStaff({ ...editedStaff, username: e.target.value })}
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="editFatherName">Father Name</label>
//                                     <input
//                                         type="text"
//                                         id="editFatherName"
//                                         value={editedStaff.fathername || ''}
//                                         onChange={(e) => setEditedStaff({ ...editedStaff, fathername: e.target.value })}
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="editAddress">Address</label>
//                                     <input
//                                         type="text"
//                                         id="editAddress"
//                                         value={editedStaff.address || ''}
//                                         onChange={(e) => setEditedStaff({ ...editedStaff, address: e.target.value })}
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="editEmail">Email</label>
//                                     <input
//                                         type="text"
//                                         id="editEmail"
//                                         value={editedStaff.email || ''}
//                                         onChange={(e) => setEditedStaff({ ...editedStaff, email: e.target.value })}
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="editMobile">Mobile</label>
//                                     <input
//                                         type="text"
//                                         id="editMobile"
//                                         value={editedStaff.mobile || ''}
//                                         onChange={(e) => setEditedStaff({ ...editedStaff, mobile: e.target.value })}
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="editBasicSalary">Basic Salary</label>
//                                     <input
//                                         type="text"
//                                         id="editBasicSalary"
//                                         value={editedStaff.basicsalary || ''}
//                                         onChange={(e) => setEditedStaff({ ...editedStaff, basicsalary: e.target.value })}
//                                         className="form-control"
//                                     />
//                                 </div>
//                                 <div className="form-group">
//     <label htmlFor="editStatus">Status</label>
//     <select
//         id="editStatus"
//         value={editedStaff.status || '1'}
//         onChange={(e) => setEditedStaff({ ...editedStaff, status: e.target.value })}
//         className=""
//     >
//         <option value="1">Active</option>
//         <option value="0">Inactive</option>
//     </select>
// </div>

//                             </div>
//                             <div className="modal-footer">
//                                 {loading ? (
//                                     <button type="button" className="btn btn-primary" disabled>
//                                         <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//                                         Updating...
//                                     </button>
//                                 ) : (
//                                     <>
//                                         <button type="button" className="btn btn-primary" onClick={saveEditedStaff}>Save</button>
//                                         <button type="button" className="btn btn-secondary" onClick={() => setShowEditPopup(false)}>Cancel</button>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <ToastContainer />

//         </div>
//     );
// };

// export default StaffDetails;

import React, { useEffect, useState } from 'react';
import DeletePopup from '../../utils/DeletePopup';
import { makeApi } from '../../api/callApi.tsx';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StaffDetails = () => { 
    const [staff, setStaff] = useState([]);
    const [inactiveStaff, setInactiveStaff] = useState([]); 
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);
    const [editedStaff, setEditedStaff] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchStaffList = async () => {
        setLoading(true);
        try {
            const res = await makeApi('/v1/get-all-staff?status=1', 'GET');
            setStaff(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchInactiveStaff = async () => {
        setLoading(true);
        try {
            const res = await makeApi('/v1/get-all-staff?status=0', 'GET');
            setInactiveStaff(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaffList();
        fetchInactiveStaff();
    }, []);

    const handleEdit = (staffMember) => {
        setCurrentStaff(staffMember);
        setEditedStaff({ ...staffMember });
        setShowEditPopup(true);
    };

    const handleDelete = (staffMember) => {
        setCurrentStaff(staffMember);
        setShowDeletePopup(true);
    };

    const deleteStaff = async () => {
        try {
            await makeApi(`/v1/delete-staff/${currentStaff._id}`, 'DELETE');
            setStaff(staff.filter(member => member._id !== currentStaff._id));
            setInactiveStaff(inactiveStaff.filter(member => member._id !== currentStaff._id)); // Update inactive list
            setShowDeletePopup(false);
        } catch (error) {
            console.log(error);
        }
    };

    const saveEditedStaff = async () => {
        setLoading(true);
        try {
            // Validate inputs
            if (!editedStaff.name || !editedStaff.email || !editedStaff.mobile) {
                toast.error('Please fill in all required fields.');
                return;
            }
            if (!validateEmail(editedStaff.email)) {
                toast.error('Please enter a valid email address.');
                return;
            }
            if (editedStaff.mobile.length !== 10) {
                toast.error('Mobile number must be 10 digits.');
                return;
            }

            const res = await makeApi(`/v1/update-staff/${currentStaff._id}`, 'PUT', editedStaff);
            const updatedStaffList = staff.map(member =>
                member._id === currentStaff._id ? res.data.data : member
            );
            const updatedInactiveStaffList = inactiveStaff.map(member =>
                member._id === currentStaff._id ? res.data.data : member
            );

            setStaff(updatedStaffList);
            setInactiveStaff(updatedInactiveStaffList);
            setShowEditPopup(false);
            toast.success('Staff member updated successfully.');
            fetchStaffList()
        } catch (error) {
            console.log(error);
            toast.error('Failed to update staff member. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (email) => {
        // Basic email validation regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className="manage-industry-chart mb-5 pb-5">
            {/* Active staff table */}
            <h3>Active Staff Members</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Basic Salary</th>
                        <th>Deactivate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map((staffMember, index) => (
                        <tr key={staffMember._id}>
                            <td>{index + 1}</td>
                            <td>{staffMember.name}</td>
                            <td>{staffMember.fathername}</td>
                            <td>{staffMember.address}</td>
                            <td>{staffMember.email}</td>
                            <td>{staffMember.mobile}</td>
                            <td>{staffMember.basicsalary}</td>
                            <td>{staffMember.status === "1" ? "Yes" : "No"}</td>
                            <td>
                                <span onClick={() => handleEdit(staffMember)} style={{ cursor: 'pointer' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Inactive staff table */}
            <h3>Inactive Staff Members</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>Name</th>
                        <th>Father Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Basic Salary</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inactiveStaff.map((staffMember, index) => (
                        <tr key={staffMember._id} style={{backgroundColor: '#6a352530'}} >
                            <td>{index + 1}</td>
                            <td>{staffMember.name}</td>
                            <td>{staffMember.fathername}</td>
                            <td>{staffMember.address}</td>
                            <td>{staffMember.email}</td>
                            <td>{staffMember.mobile}</td>
                            <td>{staffMember.basicsalary}</td>
                            <td>{staffMember.status === "0" ? "Inactive" : "Active"}</td>
                            <td>
                                <span onClick={() => handleEdit(staffMember)} style={{ cursor: 'pointer' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Popup */}
            {showEditPopup && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Staff</h5>
                                <button type="button" className="close" onClick={() => setShowEditPopup(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        value={editedStaff.name || ''}
                                        onChange={(e) => setEditedStaff({ ...editedStaff, name: e.target.value })}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        value={editedStaff.email || ''}
                                        onChange={(e) => setEditedStaff({ ...editedStaff, email: e.target.value })}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Contact</label>
                                    <input
                                        type="text"
                                        value={editedStaff.mobile || ''}
                                        onChange={(e) => setEditedStaff({ ...editedStaff, mobile: e.target.value })}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        value={editedStaff.status || ''}
                                        onChange={(e) => setEditedStaff({ ...editedStaff, status: e.target.value })}
                                        className=""
                                    >
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowEditPopup(false)}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={saveEditedStaff}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default StaffDetails;
