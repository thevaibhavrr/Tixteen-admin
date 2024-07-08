
import "../../style/managment/ManageLevelChart.css";
import React, { useState } from 'react';

const initialLevels = [
    { level: 'Level 1', follower: '5k', broadcastPriceMin: 'Rs 100', broadcastPriceMax: 'Rs 200', creationCostMin: 'Rs 200', creationCostMax: 'Rs 300', creationCostVideoMin: 'Rs 300', creationCostVideoMax: 'Rs 400' },
    { level: 'Level 2', follower: '7k', broadcastPriceMin: 'Rs 150', broadcastPriceMax: 'Rs 250', creationCostMin: 'Rs 250', creationCostMax: 'Rs 350', creationCostVideoMin: 'Rs 350', creationCostVideoMax: 'Rs 450' },
    { level: 'Level 3', follower: '15k', broadcastPriceMin: 'Rs 200', broadcastPriceMax: 'Rs 300', creationCostMin: 'Rs 300', creationCostMax: 'Rs 400', creationCostVideoMin: 'Rs 400', creationCostVideoMax: 'Rs 500' },
];

const ManageLevelChart = () => {
    const [levels, setLevels] = useState(initialLevels);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentLevelIndex, setCurrentLevelIndex] = useState(null);

    const addNewLevel = () => {
        const newLevel = {
            level: `Level ${levels.length + 1}`,
            follower: '',
            broadcastPriceMin: '',
            broadcastPriceMax: '',
            creationCostMin: '',
            creationCostMax: '',
            creationCostVideoMin: '',
            creationCostVideoMax: '',
        };
        setLevels([...levels, newLevel]);
    };

    const handleInputChange = (index, field, value) => {
        const newLevels = [...levels];
        newLevels[index][field] = value;
        setLevels(newLevels);
    };

    const deleteLevel = () => {
        const newLevels = levels.filter((_, i) => i !== currentLevelIndex);
        setLevels(newLevels);
        setIsDeleteModalOpen(false);
    };

    const openDeleteModal = (index) => {
        setCurrentLevelIndex(index);
        setIsDeleteModalOpen(true);
    };

    const openEditModal = (index) => {
        setCurrentLevelIndex(index);
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsDeleteModalOpen(false);
        setIsEditModalOpen(false);
        setCurrentLevelIndex(null);
    };

    return (
        <>
        <div className="manage-level-chart">
            <h2>Manage Level Chart</h2>
            <table>
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Follower</th>
                        <th>Broadcast Price</th>
                        <th>Creation Cost</th>
                        <th>Creation Cost (Video)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {levels.map((level, index) => (
                        <tr key={index}>
                            <td>{level.level}</td>
                            <td>
                                <input
                                    type="text"
                                    value={level.follower}
                                    onChange={(e) => handleInputChange(index, 'follower', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={level.broadcastPriceMin}
                                    placeholder="Min Price"
                                    onChange={(e) => handleInputChange(index, 'broadcastPriceMin', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={level.broadcastPriceMax}
                                    placeholder="Max Price"
                                    onChange={(e) => handleInputChange(index, 'broadcastPriceMax', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={level.creationCostMin}
                                    placeholder="Min Price"
                                    onChange={(e) => handleInputChange(index, 'creationCostMin', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={level.creationCostMax}
                                    placeholder="Max Price"
                                    onChange={(e) => handleInputChange(index, 'creationCostMax', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={level.creationCostVideoMin}
                                    placeholder="Min Price"
                                    onChange={(e) => handleInputChange(index, 'creationCostVideoMin', e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={level.creationCostVideoMax}
                                    placeholder="Max Price"
                                    onChange={(e) => handleInputChange(index, 'creationCostVideoMax', e.target.value)}
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
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
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
                        <label>Follower:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].follower}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'follower', e.target.value)}
                        />
                        <label>Broadcast Price Min:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].broadcastPriceMin}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'broadcastPriceMin', e.target.value)}
                        />
                        <label>Broadcast Price Max:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].broadcastPriceMax}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'broadcastPriceMax', e.target.value)}
                        />
                        <label>Creation Cost Min:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].creationCostMin}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'creationCostMin', e.target.value)}
                        />
                        <label>Creation Cost Max:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].creationCostMax}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'creationCostMax', e.target.value)}
                        />
                        <label>Creation Cost Video Min:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].creationCostVideoMin}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'creationCostVideoMin', e.target.value)}
                        />
                        <label>Creation Cost Video Max:</label>
                        <input
                            type="text"
                            value={levels[currentLevelIndex].creationCostVideoMax}
                            onChange={(e) => handleInputChange(currentLevelIndex, 'creationCostVideoMax', e.target.value)}
                        />
                        <button onClick={closeModal}>Save</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default ManageLevelChart;
