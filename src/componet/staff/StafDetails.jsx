import React, { useEffect, useState } from 'react';
import DeletePopup from '../../utils/DeletePopup';
import { makeApi } from '../../api/callApi.tsx';
import { Link } from 'react-router-dom';

const StaffDetails = () => {
    const [staff, setStaff] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [currentStaff, setCurrentStaff] = useState(null);
    const [editedStaff, setEditedStaff] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchStaffList = async () => {
        setLoading(true);
        try {
            const res = await makeApi('/v1/get-all-staff', 'GET');
            setStaff(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaffList();
    }, []);

    const handleEdit = (staffMember) => {
        setCurrentStaff(staffMember);
        setEditedStaff(staffMember);
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
            setShowDeletePopup(false);
        } catch (error) {
            console.log(error);
        }
    };

    const saveEditedStaff = async () => {
        try {
            const res = await makeApi(`/v1/update-staff/${currentStaff._id}`, 'PUT', editedStaff);
            const updatedStaff = staff.map(member =>
                member._id === currentStaff._id ? res.data.data : member
            );
            setStaff(updatedStaff);
            setShowEditPopup(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="manage-industry-chart">
            <table>
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
                            <td>{staffMember.father_name}</td>
                            <td>{staffMember.address}</td>
                            <td>{staffMember.email}</td>
                            <td>{staffMember.mobile}</td>
                            <td>{staffMember.basic_salary}</td>
                            <td>{staffMember.status === "1" ? "Yes" : "No"}</td>
                            <td>
                                <span onClick={() => handleEdit(staffMember)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </span>
                                {/* <span onClick={() => handleDelete(staffMember)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </span> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/management/add-staff" className="create-campaign-button">
                        Add New Staff 
                    </Link>

            <DeletePopup
                isOpen={showDeletePopup}
                onClose={() => setShowDeletePopup(false)}
                onDelete={deleteStaff}
                message="Are you sure you want to delete this staff member?"
            />

            {showEditPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Edit Staff</h2>
                        <input
                            type="text"
                            value={editedStaff.name || ''}
                            onChange={(e) => setEditedStaff({ ...editedStaff, name: e.target.value })}
                            className='form-control'
                        />
                        <input
                            type="text"
                            value={editedStaff.father_name || ''}
                            onChange={(e) => setEditedStaff({ ...editedStaff, father_name: e.target.value })}
                            className='form-control'
                        />
                        <input
                            type="text"
                            value={editedStaff.address || ''}
                            onChange={(e) => setEditedStaff({ ...editedStaff, address: e.target.value })}
                            className='form-control'
                        />
                        <input
                            type="text"
                            value={editedStaff.email || ''}
                            onChange={(e) => setEditedStaff({ ...editedStaff, email: e.target.value })}
                            className='form-control'
                        />
                        <input
                            type="text"
                            value={editedStaff.mobile || ''}
                            onChange={(e) => setEditedStaff({ ...editedStaff, mobile: e.target.value })}
                            className='form-control'
                        />
                        <input
                            type="text"
                            value={editedStaff.basic_salary || ''}
                            onChange={(e) => setEditedStaff({ ...editedStaff, basic_salary: e.target.value })}
                            className='form-control'
                        />
                        <div className='px-3'>
                            <div onClick={saveEditedStaff} className='add-level-button text-center'>Save</div>
                            <div onClick={() => setShowEditPopup(false)} className='add-level-button text-center'>Cancel</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffDetails;
