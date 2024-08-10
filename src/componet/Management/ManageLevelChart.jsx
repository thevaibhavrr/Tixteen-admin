

import "../../style/managment/ManageLevelChart.css";
import React, { useState, useEffect } from 'react';
import { makeApi } from '../../api/callApi.tsx';
import PrimaryLoader from "../../utils/PrimaryLoader.jsx";

const ManageLevelChart = () => {
    const [levels, setLevels] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentLevelIndex, setCurrentLevelIndex] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const [newLevel, setNewLevel] = useState({
        level: '',
        followers: '',
        avrg_followers: '',
        broad_cast_influencer: '',
        image_influencer: '',
        video_influencer: '',
        client_broad_cast: '',
        client_video: '',
        client_image: '',
    });

    const fetchLevels = async () => {
        try {
            setLoading (true);
            const response = await makeApi('/v1/get-all-levels',"GET");
            setLevels(response.data.data);
        } catch (error) {
            console.error("Failed to fetch levels:", error);
        } finally {
            setLoading (false);
        }
    };
    
    useEffect(() => {
        fetchLevels();
    }, []);

    const handleInputChange = (index, field, value) => {
        const newLevels = [...levels];
        newLevels[index][field] = value;
        setLevels(newLevels);
    };

    const handleNewLevelChange = (field, value) => {
        setNewLevel(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const addNewLevel = () => {
        setIsAddModalOpen(true); 
    };

    const saveNewLevel = async () => {
        try {
            setLoading(true);
            const response = await makeApi('/v1/create-level',"POST", newLevel);
            setLevels([...levels, response.data.data]);
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Failed to add level:", error);
        }finally {
            setLoading(false);
        }
    };

    const deleteLevel = async () => {
        try {
            setLoading(true);

            await makeApi(`/v1/delete-level/${levels[currentLevelIndex]._id}`,"DELETE");
            const newLevels = levels.filter((_, i) => i !== currentLevelIndex);
            setLevels(newLevels);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Failed to delete level:", error);
        }finally {
            setLoading(false);
        }
    };

    const openDeleteModal = (index) => {
        setCurrentLevelIndex(index);
        setIsDeleteModalOpen(true);
    };

    const openEditModal = (index) => {
        setCurrentLevelIndex(index);
        setIsEditModalOpen(true);
    };

    const saveEditedLevel = async () => {
        try {
            setLoading(true);
            await makeApi(`/v1/update-level/${levels[currentLevelIndex]._id}`, "PUT",levels[currentLevelIndex]);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Failed to save level:", error);
        }finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setIsDeleteModalOpen(false);
        setIsEditModalOpen(false);
        setIsAddModalOpen(false); // Close the add modal
        setCurrentLevelIndex(null);
    };

    return (
        <>
     {loading && <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}> <PrimaryLoader /> </div>}

        <div className="manage-level-chart">
            <h2>Manage Level Chart</h2>
            <table>
                <thead>
                    <tr> 
                        <th>Level</th>
                        <th>Followers</th>
                        <th>Avg Followers</th>
                        <th>Broadcast Influencer</th>
                        <th>Image Influencer</th>
                        <th>Video Influencer</th>
                        <th>Client Broadcast</th>
                        <th>Client Video</th>
                        <th>Client Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {levels.map((level, index) => (
                        <tr key={index}>
                            <td>{level.level}</td>
                            <td>
                                <input
                                disabled 
                                    type="text"
                                    value={level.followers}
                                    onChange={(e) => handleInputChange(index, 'followers', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                disabled
                                    type="text"
                                    value={level.avrg_followers}
                                    onChange={(e) => handleInputChange(index, 'avrg_followers', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                disabled
                                    type="text"
                                    value={level.broad_cast_influencer}
                                    onChange={(e) => handleInputChange(index, 'broad_cast_influencer', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                disabled
                                    type="text"
                                    value={level.image_influencer}
                                    onChange={(e) => handleInputChange(index, 'image_influencer', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                disabled
                                    type="text"
                                    value={level.video_influencer}
                                    onChange={(e) => handleInputChange(index, 'video_influencer', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                disabled
                                    type="text"
                                    value={level.client_broad_cast}
                                    onChange={(e) => handleInputChange(index, 'client_broad_cast', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                disabled
                                    type="text"
                                    value={level.client_video}
                                    onChange={(e) => handleInputChange(index, 'client_video', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                disabled
                                    type="text"
                                    value={level.client_image}
                                    onChange={(e) => handleInputChange(index, 'client_image', e.target.value)}
                                />
                            </td>
                            <td>
                                <button onClick={() => openDeleteModal(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                    </svg>
                                </button>
                                <button onClick={() => openEditModal(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-level-button" onClick={addNewLevel}>Add More Level</button>

            {isDeleteModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Are you sure you want to delete this level?</h3>
                        <button onClick={deleteLevel}>Yes</button>
                        <button onClick={closeModal}>No</button>
                    </div>
                </div>
            )}

            {isEditModalOpen && currentLevelIndex !== null && (
                <div className="modal">
                    <div className="modal-content edit-modal">
                        <h3>Edit Level</h3>
                        <label>level:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].level}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'level', e.target.value)}
                            />
                            <label>Followers:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].followers}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'followers', e.target.value)}
                        />
                        <label>Avg Followers:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].avrg_followers}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'avrg_followers', e.target.value)}
                        />
                        <label>Broadcast Influencer:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].broad_cast_influencer}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'broad_cast_influencer', e.target.value)}
                        />
                        <label>Image Influencer:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].image_influencer}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'image_influencer', e.target.value)}
                        />
                        <label>Video Influencer:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].video_influencer}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'video_influencer', e.target.value)}
                        />
                        <label>Client Broadcast:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].client_broad_cast}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'client_broad_cast', e.target.value)}
                        />
                        <label>Client Video:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].client_video}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'client_video', e.target.value)}
                        />
                        <label>Client Image:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].client_image}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'client_image', e.target.value)}
                        />
                        <button onClick={saveEditedLevel}>Save</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}

{isAddModalOpen && (
    <div className="popup_for_edit_user">
        <div className="popup-inner_for_edit_user">
            <h3>Add New Level</h3>
            <label>Level:</label>
            <input
                type="text"
                value={newLevel.level}
                onChange={(e) => handleNewLevelChange('level', e.target.value)}
            />
            <label>Followers:</label>
            <input
                type="text"
                value={newLevel.followers}
                onChange={(e) => handleNewLevelChange('followers', e.target.value)}
            />
            <label>Avg Followers:</label>
            <input
                type="text"
                value={newLevel.avrg_followers}
                onChange={(e) => handleNewLevelChange('avrg_followers', e.target.value)}
            />
            <label>Broadcast Influencer:</label>
            <input
                type="text"
                value={newLevel.broad_cast_influencer}
                onChange={(e) => handleNewLevelChange('broad_cast_influencer', e.target.value)}
            />
            <label>Image Influencer:</label>
            <input
                type="text"
                value={newLevel.image_influencer}
                onChange={(e) => handleNewLevelChange('image_influencer', e.target.value)}
            />
            <label>Video Influencer:</label>
            <input
                type="text"
                value={newLevel.video_influencer}
                onChange={(e) => handleNewLevelChange('video_influencer', e.target.value)}
            />
            <label>Client Broadcast:</label>
            <input
                type="text"
                value={newLevel.client_broad_cast}
                onChange={(e) => handleNewLevelChange('client_broad_cast', e.target.value)}
            />
            <label>Client Video:</label>
            <input
                type="text"
                value={newLevel.client_video}
                onChange={(e) => handleNewLevelChange('client_video', e.target.value)}
            />
            <label>Client Image:</label>
            <input
                type="text"
                value={newLevel.client_image}
                onChange={(e) => handleNewLevelChange('client_image', e.target.value)}
            />
            <div className="d-flex gap-5 justify-content-center">
            <button className="btn btn-warning"  onClick={saveNewLevel}>Save</button>
            <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    </div>
)}

        </div>
        </>
    );
};

export default ManageLevelChart;
