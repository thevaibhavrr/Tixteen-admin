// campaginrequiemnt.jsx
import React, { useState, useEffect } from 'react';
import "../../../style/campaign/campaignRequirement.css";

function CampaignRequirement({ totalSum }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [influencers, setInfluencers] = useState(Array(11).fill(0));
    const prices = [1300, 1800, 4200, 8200, 10000, 12000, 15000, 18000, 20000, 22000, 25000];

    useEffect(() => {
        const totalSumValue = influencers.reduce((sum, numInfluencers, index) => sum + numInfluencers * prices[index], 0);
        if (typeof totalSum === 'function') {
            totalSum(totalSumValue);
        } else {
            console.error('totalSum is not a function');
        }
    }, [influencers, totalSum]);

    const handleInputChange = (index, value) => {
        const newInfluencers = [...influencers];
        newInfluencers[index] = value;
        setInfluencers(newInfluencers);
    };

    return (
        <div className='main_create_campaign_requirement'>
            <div className='create_campaign_select_category_header'>
                CATEGORY
            </div>
            <div className='create_campaign_select_category_section'>
                <div>SELECT CATEGORY</div>
                <div className="create_campaign_select_input ">
                    <div className=' ' >
                        <input type="radio" name="category" value="Broadcast" onChange={(e) => setSelectedCategory(e.target.value)} />
                        <label htmlFor="Broadcast">Broadcast</label>
                    </div>
                    <div>
                        <input type="radio" name="category" value="Images" onChange={(e) => setSelectedCategory(e.target.value)} />
                        <label htmlFor="Images">Images</label>
                    </div>
                    <div>
                        <input type="radio" name="category" value="Videos" onChange={(e) => setSelectedCategory(e.target.value)} />
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
                                {Array.from({ length: 11 }, (_, index) => (
                                    <tr key={index} className="influencer-table-row">
                                        <td className="influencer-table-cell">{index + 1}</td>
                                        <td className="influencer-table-cell">
                                            <input
                                                type="number"
                                                value={influencers[index]}
                                                onChange={(e) => handleInputChange(index, parseInt(e.target.value))}
                                            />
                                        </td>
                                        <td className="influencer-table-cell">{prices[index]}</td>
                                        <td className="influencer-table-cell">{influencers[index] * prices[index]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CampaignRequirement;
