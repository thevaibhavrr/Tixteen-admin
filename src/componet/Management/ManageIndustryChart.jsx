
// import React, { useEffect, useState } from 'react';
// import "../../style/managment/manageIndustryChart.css";
// import DeletePopup from '../../utils/DeletePopup';
// import { makeApi } from '../../api/callApi.tsx';

// const ManageIndustryChart = () => {
//     const [showEditPopup, setShowEditPopup] = useState(false);
//     const [showDeletePopup, setShowDeletePopup] = useState(false);
//     const [currentIndustry, setCurrentIndustry] = useState(null);
//   const [industries, setIndustries] = useState([]);
//     const [loading, setLoading] = useState(false);

//   const FetchIndustryList = async () => {
//     setLoading(true);
//     try {
//       const res = await makeApi('/v1/get-all-industries', 'GET');
//       setIndustries(res.data.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     FetchIndustryList();
//   }, []);

//     const handleEdit = (industry) => {
//         setCurrentIndustry(industry); 
//         setShowEditPopup(true);
//     };

//     const handleDelete = (industry) => {
//         setCurrentIndustry(industry);
//         setShowDeletePopup(true);
//     };

//     const addNewIndustry = () => {
//         // setIndustries([...industries, { id: industries.length + 1, name: "" }]);
//     };

//     const deleteIndustry = () => {
//         // setIndustries(industries.filter(industry => industry.id !== currentIndustry.id));
//         setShowDeletePopup(false);
//     };

//     return (
//         <div className="manage-industry-chart">
//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Industry Name</th>
//                         <th>Action</th> 
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {industries.map((industry, index) => (
//                         <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>
//                                 <input
//                                     type="text"
//                                     value={industry.name}
//                                     onChange={(e) => {
//                                         const newIndustries = [...industries];
//                                         newIndustries[index].name = e.target.value;
//                                         setIndustries(newIndustries);
//                                     }}
//                                     className='form-control w-75'
//                                 />
//                             </td>
//                             <td>
//                                 <span onClick={() => handleEdit(industry)}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
//                                         <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
//                                         <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
//                                     </svg>
//                                 </span>
//                                 <span onClick={() => handleDelete(industry)}>
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
//                                         <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
//                                     </svg>
//                                 </span>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <button className="add-level-button" onClick={addNewIndustry}>Add More Industry</button>

//             <DeletePopup
//                 isOpen={showDeletePopup}
//                 onClose={() => setShowDeletePopup(false)}
//                 onDelete={deleteIndustry}
//                 message="Are you sure you want to delete this industry?"
//             />
//             {showEditPopup && (
//                 <div className="popup">
//                     <div className="popup-content">
//                         <h2>Edit Industry</h2>
//                         <input
//                             type="text"
//                             value={currentIndustry.name}
//                             onChange={(e) => setCurrentIndustry({ ...currentIndustry, name: e.target.value })}
//                             className='form-control'
//                         />
//                         <div className='px-3' >
//                             <div onClick={() => setShowEditPopup(false)} className='add-level-button text-center' >Save</div>
//                             <div onClick={() => setShowEditPopup(false)} className='add-level-button text-center' >Cancel</div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ManageIndustryChart;
import React, { useEffect, useState } from 'react';
import "../../style/managment/manageIndustryChart.css";
import DeletePopup from '../../utils/DeletePopup';
import { makeApi } from '../../api/callApi.tsx';

const ManageIndustryChart = () => {
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [currentIndustry, setCurrentIndustry] = useState(null);
    const [newIndustry, setNewIndustry] = useState({ name: '' });
    const [industries, setIndustries] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchIndustryList = async () => {
        setLoading(true);
        try {
            const res = await makeApi('/v1/get-all-industries', 'GET');
            setIndustries(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchIndustryList();
    }, []);

    const handleEdit = (industry) => {
        setCurrentIndustry(industry);
        setShowEditPopup(true);
    };

    const handleDelete = (industry) => {
        setCurrentIndustry(industry);
        setShowDeletePopup(true);
    };

    const handleAddNewIndustry = () => {
        setShowAddPopup(true);
    };

    const addNewIndustry = async () => {
        try {
            const res = await makeApi('/v1/create-industries', 'POST', newIndustry);
            setIndustries([...industries, res.data.data]);
            setShowAddPopup(false);
            setNewIndustry({ name: '' });
        } catch (error) {
            console.log(error);
        }
    };

    const updateIndustry = async () => {
        try {
            const res = await makeApi(`/v1/update-industries/${currentIndustry._id}`, 'PUT', currentIndustry);
            setIndustries(industries.map(ind => ind._id === currentIndustry._id ? res.data.data : ind));
            setShowEditPopup(false);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteIndustry = async () => {
        try {
            await makeApi(`/v1/delete-industries/${currentIndustry._id}`, 'DELETE');
            setIndustries(industries.filter(industry => industry._id !== currentIndustry._id));
            setShowDeletePopup(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="manage-industry-chart">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Industry Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {industries.map((industry, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <input
                                    type="text"
                                    value={industry.name}
                                    onChange={(e) => {
                                        const newIndustries = [...industries];
                                        newIndustries[index].name = e.target.value;
                                        setIndustries(newIndustries);
                                    }}
                                    className='form-control w-75'
                                />
                            </td>
                            <td>
                                <span onClick={() => handleEdit(industry)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </span>
                                <span onClick={() => handleDelete(industry)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-level-button" onClick={handleAddNewIndustry}>Add More Industry</button>

            <DeletePopup
                isOpen={showDeletePopup}
                onClose={() => setShowDeletePopup(false)}
                onDelete={deleteIndustry}
                message="Are you sure you want to delete this industry?"
            />

            {showAddPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Add New Industry</h2>
                        <input
                            type="text"
                            value={newIndustry.name}
                            onChange={(e) => setNewIndustry({ ...newIndustry, name: e.target.value })}
                            className='form-control'
                        />
                        <div className='px-3'>
                            <div onClick={addNewIndustry} className='add-level-button text-center'>Save</div>
                            <div onClick={() => setShowAddPopup(false)} className='add-level-button text-center'>Cancel</div>
                        </div>
                    </div>
                </div>
            )}

            {showEditPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Edit Industry</h2>
                        <input
                            type="text"
                            value={currentIndustry.name}
                            onChange={(e) => setCurrentIndustry({ ...currentIndustry, name: e.target.value })}
                            className='form-control'
                        />
                        <div className='px-3'>
                            <div onClick={updateIndustry} className='add-level-button text-center'>Save</div>
                            <div onClick={() => setShowEditPopup(false)} className='add-level-button text-center'>Cancel</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageIndustryChart;
