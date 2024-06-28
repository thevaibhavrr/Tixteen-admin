
import React, { useState } from 'react';
import "../../../style/campaign/campaignList.css";
import { Link } from 'react-router-dom';

const campaigns = [
    { id: '1', status: 'Complete', name: 'Campaign 1', banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGDLn6BTUQ4ww_OdggaZkgDLbLn0kuFHQVg&s', deadline: '2024-07-01' },
    { id: '2', status: 'Verified', name: 'Campaign 2', banner: 'https://c8.alamy.com/comp/2C7M8WF/abstract-banner-design-green-web-banner-template-ad-banner-design-using-green-color-2C7M8WF.jpg', deadline: '2024-07-02' },
    { id: '3', status: 'Rejected', name: 'Campaign 3', banner: 'https://static.vecteezy.com/system/resources/previews/005/253/595/original/business-banner-social-media-cover-template-free-vector.jpg', deadline: '2024-07-03' },
    { id: '4', status: 'Complete', name: 'Campaign 4', banner: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-banner-template-design-f4b281ca556e3d500e78fc6260273284_screen.jpg?ts=1561497794', deadline: '2024-07-04' },
    { id: '5', status: 'Verified', name: 'Campaign 5', banner: 'https://static.vecteezy.com/system/resources/thumbnails/006/872/124/small/holiday-travel-social-media-banner-template-web-banner-template-free-vector.jpg', deadline: '2024-07-05' },
    { id: '6', status: 'Complete', name: 'Campaign 6', banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAHnUL95UGoB9TYlCXVl-y-61iXwgsCVV0Fw&s', deadline: '2024-07-06' },
];

const CampaignList = () => {
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCampaigns = campaigns.filter(campaign => {
        return (filter === 'All' || campaign.status === filter) &&
            (searchTerm === '' || campaign.name.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    return (
        <div className="campaign-list-container">
            <div className="campaign-list-topbar">
                <input
                    type="text"
                    placeholder="Search..."
                    className="campaign-list-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="campaign-list-filters">
                    <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>All</button>
                    <button onClick={() => setFilter('Complete')} className={filter === 'Complete' ? 'active' : ''}>Complete</button>
                    <button onClick={() => setFilter('Verified')} className={filter === 'Verified' ? 'active' : ''}>Verified</button>
                    <button onClick={() => setFilter('Rejected')} className={filter === 'Rejected' ? 'active' : ''}>Rejected</button>
                </div>
            </div>
            <div className="campaign-list-content">
                {filteredCampaigns.map(campaign => (
                    <div key={campaign.id} className="campaign-item">
                        <img src={campaign.banner} alt={campaign.name} className="campaign-banner" />
                        <div className="campaign-details">
                            <h3>{campaign.name}</h3>
                            <p>ID: {campaign.id}</p>
                            <p>Status: {campaign.status}</p>
                            <p>Deadline: {campaign.deadline}</p>
                            <Link to={`/campaign/campaign-details/${campaign.id}`} >
                                <button className="view-more-button">View More</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/campaign/create-campaign" className="create-campaign-button">
                Create New Campaign
            </Link>
        </div>
    );
};

export default CampaignList;
