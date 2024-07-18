import React, { useState } from 'react';
import { makeApi } from '../../api/callApi.tsx';

const AddStaffPopup = () => {
    const [newStaff, setNewStaff] = useState({
        name: '',
        father_name: '',
        address: '',
        email: '',
        mobile: '',
        basic_salary: '',
        status: '0' // default status, you can adjust this as needed
    });

    const addNewStaff = async () => {
        try {
            const res = await makeApi("/v1/add-staff", "POST", newStaff);
            // onAdd(res.data.data);
            // onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        (
            <div className=""  >
                <div className="popup-content" style={{minWidth:"500px" , width:"100%" , }}>
                    <h2>Add New Staff</h2>
                    <div className='d-flex flex-column gap-4 w-75 mt-4' >
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
                        value={newStaff.basic_salary}
                        onChange={(e) => setNewStaff({ ...newStaff, basic_salary: e.target.value })}
                        className='form-control'
                    />
                    </div>
                    <div className='w-75' style={{display:"flex" , justifyContent:"center" }} >

                    <div className='text-center d-flex gap-5'>
                        <div onClick={addNewStaff} className='add-level-button text-center'>Save</div>
                        <div  className='add-level-button text-center'>Cancel</div>
                    </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default AddStaffPopup;
