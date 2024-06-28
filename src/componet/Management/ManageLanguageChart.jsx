
import React, { useState } from 'react';
import DeletePopup from '../../utils/DeletePopup';

const initialLanguages = [
    { id: 1, name: "English" },
    { id: 2, name: "Spanish" },
    { id: 3, name: "French" },
];

const ManageLanguageChart = () => {
    const [languages, setLanguages] = useState(initialLanguages);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(null);
    const [editedLanguageName, setEditedLanguageName] = useState('');

    const handleEdit = (language) => {
        setCurrentLanguage(language);
        setEditedLanguageName(language.name); // Initialize the edit popup with current language name
        setShowEditPopup(true);
    };

    const handleDelete = (language) => {
        setCurrentLanguage(language);
        setShowDeletePopup(true);
    };

    const addNewLanguage = () => {
        setLanguages([...languages, { id: languages.length + 1, name: "" }]);
    };

    const deleteLanguage = () => {
        setLanguages(languages.filter(language => language.id !== currentLanguage.id));
        setShowDeletePopup(false);
    };

    const saveEditedLanguage = () => {
        // Update the language name in the languages state
        const updatedLanguages = languages.map(language =>
            language.id === currentLanguage.id ? { ...language, name: editedLanguageName } : language
        );
        setLanguages(updatedLanguages);
        setShowEditPopup(false);
    };

    return (
        <div className="manage-industry-chart">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Language</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {languages.map((language, index) => (
                        <tr key={index}>
                            <td>{language.id}</td>
                            <td>
                                <input
                                    type="text"
                                    value={language.name}
                                    onChange={(e) => {
                                        const newLanguages = [...languages];
                                        newLanguages[index].name = e.target.value;
                                        setLanguages(newLanguages);
                                    }}
                                    className='form-control w-75'
                                />
                            </td>
                            <td>
                                <span onClick={() => handleEdit(language)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                </span>
                                <span onClick={() => handleDelete(language)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-level-button" onClick={addNewLanguage}>Add More Language</button>

            <DeletePopup
                isOpen={showDeletePopup}
                onClose={() => setShowDeletePopup(false)}
                onDelete={deleteLanguage}
                message="Are you sure you want to delete this language?"
            />

            {showEditPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Edit Language</h2>
                        <input
                            type="text"
                            value={editedLanguageName}
                            onChange={(e) => setEditedLanguageName(e.target.value)}
                            className='form-control'
                        />
                        <div className='px-3'>
                            <div onClick={saveEditedLanguage} className='add-level-button text-center'>Save</div>
                            <div onClick={() => setShowEditPopup(false)} className='add-level-button text-center'>Cancel</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageLanguageChart;
