// import React, { useState } from 'react';
// import { makeApi } from '../../api/callApi.tsx';
// import BackIcon from '../../utils/BackIcon.jsx';

// const AddStaffPopup = () => {
//     const [newStaff, setNewStaff] = useState({
//         name: '',
//         father_name: '',
//         address: '',
//         email: '',
//         mobile: '',
//         basicsalary: '',
//         status: '0',// default status, you can adjust this as needed
//         password: '',
//     });

//     const addNewStaff = async () => {
//         try {
//             const res = await makeApi("/v1/add-staf", "POST", newStaff);
//             // onAdd(res.data.data);
//             // onClose();
//         } catch (error) {
//             console.log(error);
//         } 
//     };

//     return (
//         (
//             <div className=" " style={{ position: "relative" }}  >
//                 <BackIcon path={`management/staff-management`} />

//                 <div className="popup-content text-center " style={{ minWidth: "500px", width: "100%", }}>
//                     <h2>Add New Staff</h2>
//                     <div className='  d-flex justify-content-center ' >
//                         <div className='d-flex flex-column  gap-4 w-75 mt-4' >
//                             <input
//                                 type="text"
//                                 placeholder="Name"
//                                 value={newStaff.name}
//                                 onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
//                                 className='form-control'
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Father Name"
//                                 value={newStaff.father_name}
//                                 onChange={(e) => setNewStaff({ ...newStaff, father_name: e.target.value })}
//                                 className='form-control'
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Address"
//                                 value={newStaff.address}
//                                 onChange={(e) => setNewStaff({ ...newStaff, address: e.target.value })}
//                                 className='form-control'
//                             />
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 value={newStaff.email}
//                                 onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
//                                 className='form-control'
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Mobile"
//                                 value={newStaff.mobile}
//                                 onChange={(e) => setNewStaff({ ...newStaff, mobile: e.target.value })}
//                                 className='form-control'
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Basic Salary"
//                                 value={newStaff.basicsalary}
//                                 onChange={(e) => setNewStaff({ ...newStaff, basicsalary: e.target.value })}
//                                 className='form-control'
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Password"
//                                 value={newStaff.password}
//                                 onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
//                                 className='form-control'
//                             />
//                         </div>
//                     </div>
//                     <div className='w-75' style={{ display: "flex", justifyContent: "center" }} >
//                         <div className='text-center d-flex  justify-content-center w-100 bg-black'>
//                             <div className='add-level-button text-center'>Cancel</div>
//                             <div onClick={addNewStaff} className='add-level-button text-center'>Save</div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     );
// };

// export default AddStaffPopup;


import React, { useState } from 'react';
import { makeApi } from '../../api/callApi.tsx';
import BackIcon from '../../utils/BackIcon.jsx';
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddStaffPopup = () => {
    const navigate = useNavigate();

    const [newStaff, setNewStaff] = useState({
        name: '',
        father_name: '',
        address: '',
        email: '',
        mobile: '',
        basicsalary: '',
        status: '0', // default status, adjust as needed
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        // Validate mobile number length
        if (newStaff.mobile.length !== 10) {
            toast.error('Mobile number should be 10 digits');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newStaff.email)) {
            toast.error('Invalid email address');
            return false;
        }

        // Check if any required fields are empty
        if (
            !newStaff.name ||
            !newStaff.father_name ||
            !newStaff.address ||
            !newStaff.email ||
            !newStaff.mobile ||
            !newStaff.basicsalary ||
            !newStaff.password
        ) {
            toast.error('Please fill in all fields');
            return false;
        }

        return true;
    };

    const addNewStaff = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const res = await makeApi('/v1/add-staf', 'POST', newStaff);
            toast.success('Staff added successfully', {
                onClose: () => {
                    navigate("/management/staff-management");
                }
            });
        } catch (error) {
            console.error('Error adding new staff:', error);
            toast.error('Failed to add staff. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading &&  <div style={{position:"fixed",height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",zIndex:"9999",backgroundColor:"rgba(0,0,0,0.3)"}} ><PrimaryLoader /></div>} {/* Show loader when loading state is true */}

        <div className=" " style={{ position: "relative" }}  >
            <BackIcon path={`management/staff-management`} />

            <div className="popup-content text-center " style={{ minWidth: "500px", width: "100%", }}>
                <h2>Add New Staff</h2>
                <div className='  d-flex justify-content-center ' >
                    <div className='d-flex flex-column  gap-4 w-75 mt-4' >
                        <input
                            type="text"
                            placeholder="Name"
                            value={newStaff.name}
                            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                            className='form-control'
                        />
                        <input
                            type="text"
                            placeholder="Father Name"
                            value={newStaff.father_name}
                            onChange={(e) => setNewStaff({ ...newStaff, father_name: e.target.value })}
                            className='form-control'
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            value={newStaff.address}
                            onChange={(e) => setNewStaff({ ...newStaff, address: e.target.value })}
                            className='form-control'
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={newStaff.email}
                            onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                            className='form-control'
                        />
                        <input
                            type="text"
                            placeholder="Mobile"
                            value={newStaff.mobile}
                            onChange={(e) => setNewStaff({ ...newStaff, mobile: e.target.value })}
                            className='form-control'
                        />
                        <input
                            type="text"
                            placeholder="Basic Salary"
                            value={newStaff.basicsalary}
                            onChange={(e) => setNewStaff({ ...newStaff, basicsalary: e.target.value })}
                            className='form-control'
                        />
                        <input
                            type="text"
                            placeholder="Password"
                            value={newStaff.password}
                            onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                            className='form-control'
                        />
                    </div>
                </div>
                <div className='w-75' style={{ display: "flex", justifyContent: "center" }} >
                    <div className='text-center d-flex  justify-content-center w-100 bg-black'>
                        <div className='add-level-button text-center'>Cancel</div>
                        <div onClick={addNewStaff} className='add-level-button text-center'>Save</div>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Container for displaying toast messages */}
        </div>
        </>

    );
};

export default AddStaffPopup;
