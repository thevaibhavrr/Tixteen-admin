// import React, { useState, useEffect } from 'react';
// import "../../../style/campaign/campaignRequirement.css";
// import { makeApi } from '../../../api/callApi.tsx';

// function CampaignRequirement({ totalSum, setFormData, setInfluencerData }) {
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [levels, setLevels] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [influencers, setInfluencers] = useState([]);
//     const [prices, setPrices] = useState([]);

//     const fetchLevels = async () => {
//         try {
//             setLoading(true);
//             const response = await makeApi('/v1/get-all-levels', "GET");
//             const sortedLevels = response.data.data.sort((a, b) => parseInt(a.level) - parseInt(b.level));
//             setLevels(sortedLevels);
//             setInfluencers(Array(sortedLevels.length).fill(0));
//             setPrices(sortedLevels.map(level => {
//                 if (selectedCategory === 'Broadcast') return level.client_broad_cast;
//                 if (selectedCategory === 'Images') return level.client_image;
//                 return level.client_video;
//             }));
//         } catch (error) {
//             console.error("Failed to fetch levels:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchLevels();
//     }, []);

//     useEffect(() => {
//         const totalSumValue = influencers.reduce((sum, numInfluencers, index) => sum + numInfluencers * prices[index], 0);
//         if (typeof totalSum === 'function') {
//             totalSum(totalSumValue);
//         } else {
//             console.error('totalSum is not a function');
//         }

//         // Filter influencerData to include only entries where noof_influencer is greater than 0
//         const influencerData = influencers
//             .map((numInfluencers, index) => ({
//                 level: levels[index].level,
//                 noof_influencer: numInfluencers
//             }))
//             .filter(influencer => influencer.noof_influencer > 0);

//         setInfluencerData(influencerData);

//     }, [influencers, totalSum]);

//     const handleInputChange = (index, value) => {
//         // Ensure the value is a positive number or zero
//         const newValue = Math.max(0, parseInt(value) || 0);
//         const newInfluencers = [...influencers];
//         newInfluencers[index] = newValue;
//         setInfluencers(newInfluencers);
//     };

//     const handleCategoryChange = (e) => {
//         const category = e.target.value;
//         setSelectedCategory(category);
//         setFormData(prevData => ({
//             ...prevData,
//             job_type: category === 'Broadcast' ? '1' : category === 'Images' ? '2' : '3'
//         }));
//         setPrices(levels.map(level => {
//             if (category === 'Broadcast') return level.client_broad_cast;
//             if (category === 'Images') return level.client_image;
//             return level.client_video;
//         }));
//     };

//     return (
//         <div className='main_create_campaign_requirement'>
//             <div className='create_campaign_select_category_header'>
//                 CATEGORY
//             </div>
//             <div className='create_campaign_select_category_section'>
//                 <div>SELECT CATEGORY</div>
//                 <div className="create_campaign_select_input">
//                     <div>
//                         <input type="radio" name="category" value="Broadcast" onChange={handleCategoryChange} />
//                         <label htmlFor="Broadcast">Broadcast</label>
//                     </div>
//                     <div>
//                         <input type="radio" name="category" value="Images" onChange={handleCategoryChange} />
//                         <label htmlFor="Images">Images</label>
//                     </div>
//                     <div>
//                         <input type="radio" name="category" value="Videos" onChange={handleCategoryChange} />
//                         <label htmlFor="Videos">Videos</label>
//                     </div>
//                 </div>
//             </div>

//             {selectedCategory && (
//                 <div className="accordion">
//                     <div className="accordion-header">
//                         SELECT INFLUENCER
//                     </div>
//                     <div className="accordion-body">
//                         <table className="influencer-table">
//                             <thead>
//                                 <tr>
//                                     <th className="influencer-table-header">Level</th>
//                                     <th className="influencer-table-header">No Of Influencer</th>
//                                     <th className="influencer-table-header">Client Price</th>
//                                     <th className="influencer-table-header">Total</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {levels.map((level, index) => (
//                                     <tr key={level._id} className="influencer-table-row">
//                                         <td className="influencer-table-cell">{level.level}</td>
//                                         <td className="influencer-table-cell">
//                                             <input
//                                                 type="text"  // Changed input type to text
//                                                 value={influencers[index]}
//                                                 onChange={(e) => handleInputChange(index, e.target.value)}
//                                                 pattern="\d*"  // Accept only digits
//                                                 inputMode="numeric"  // On mobile, show numeric keyboard
//                                             />
//                                         </td>
//                                         <td className="influencer-table-cell">{prices[index]}</td>
//                                         <td className="influencer-table-cell">{influencers[index] * prices[index]}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default CampaignRequirement;



import React, { useState, useEffect } from 'react';
import "../../../style/campaign/campaignRequirement.css";
import { makeApi } from '../../../api/callApi.tsx';

function CampaignRequirement({ totalSum, setFormData, setInfluencerData }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [influencers, setInfluencers] = useState([]);
    const [prices, setPrices] = useState([]);

    // Fetch levels from the API
    const fetchLevels = async () => {
        try {
            setLoading(true);
            const response = await makeApi('/v1/get-all-levels', "GET");
            const sortedLevels = response.data.data.sort((a, b) => parseInt(a.level) - parseInt(b.level));
            setLevels(sortedLevels);
            setInfluencers(Array(sortedLevels.length).fill(0));
        } catch (error) {
            console.error("Failed to fetch levels:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch levels on component mount
    useEffect(() => {
        fetchLevels();
    }, []);

    // Update prices when selectedCategory or levels change
    useEffect(() => {
        if (selectedCategory && levels.length > 0) {
            const updatedPrices = levels.map(level => {
                if (selectedCategory === 'Broadcast') return level.client_broad_cast;
                if (selectedCategory === 'Images') return level.client_image;
                return level.client_video;
            });
            setPrices(updatedPrices);
        }
    }, [selectedCategory, levels]);

    // Handle input changes for number of influencers
    const handleInputChange = (index, value) => {
        const newValue = Math.max(0, parseInt(value) || 0);
        const newInfluencers = [...influencers];
        newInfluencers[index] = newValue;
        setInfluencers(newInfluencers);
    };

    // Handle category change
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setFormData(prevData => ({
            ...prevData,
            job_type: category === 'Broadcast' ? '1' : category === 'Images' ? '2' : '3'
        }));
    };

    // Handle submit button click
    const handleSubmit = () => {
        const totalSumValue = influencers.reduce((sum, numInfluencers, index) => sum + numInfluencers * prices[index], 0);

        const influencerData = influencers
            .map((numInfluencers, index) => ({
                level: levels[index]?.level,
                noof_influencer: numInfluencers
            }))
            .filter(influencer => influencer.noof_influencer > 0);

        if (typeof totalSum === 'function') {
            totalSum(totalSumValue);
        }

        setInfluencerData(influencerData);
    };

    return (
        <div className='main_create_campaign_requirement'>
            <div className='create_campaign_select_category_header'>
                CATEGORY
            </div>
            <div className='create_campaign_select_category_section'>
                <div>SELECT CATEGORY</div>
                <div className="create_campaign_select_input">
                    <div>
                        <input type="radio" name="category" value="Broadcast" onChange={handleCategoryChange} />
                        <label htmlFor="Broadcast">Broadcast</label>
                    </div>
                    <div>
                        <input type="radio" name="category" value="Images" onChange={handleCategoryChange} />
                        <label htmlFor="Images">Images</label>
                    </div>
                    <div>
                        <input type="radio" name="category" value="Videos" onChange={handleCategoryChange} />
                        <label htmlFor="Videos">Videos</label>
                    </div>
                </div>
            </div>

            {selectedCategory && (
                <div className="accordion">
                    <div className="accordion-header">
                        SELECT INFLUENCER
                    </div>
                    <div className="accordion-body">
                        <table className="influencer-table">
                            <thead>
                                <tr>
                                    <th className="influencer-table-header">Level</th>
                                    <th className="influencer-table-header">No Of Influencer</th>
                                    <th className="influencer-table-header">Client Price</th>
                                    <th className="influencer-table-header">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {levels.map((level, index) => (
                                    <tr key={level._id} className="influencer-table-row">
                                        <td className="influencer-table-cell">{level.level}</td>
                                        <td className="influencer-table-cell">
                                            <input
                                                type="text"
                                                value={influencers[index] || 0}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                                pattern="\d*"
                                                inputMode="numeric"
                                            />
                                        </td>
                                        <td className="influencer-table-cell">{prices[index] || 0}</td>
                                        <td className="influencer-table-cell">{(influencers[index] || 0) * (prices[index] || 0)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Button to trigger data submission */}
            <button onClick={handleSubmit} className="btn btn-dark">
                Add influencer
            </button>
        </div>
    );
}

export default CampaignRequirement;
