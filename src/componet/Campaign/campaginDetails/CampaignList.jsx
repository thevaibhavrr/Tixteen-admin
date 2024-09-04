
// import React, { useEffect, useState } from 'react';
// import "../../../style/campaign/campaignList.css";
// import { Link } from 'react-router-dom';
// import { makeApi } from '../../../api/callApi.tsx';
// import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';

// const CampaignList = () => {
//     const [filter, setFilter] = useState('All');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [campaignList, setCampaignList] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const banner = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGDLn6BTUQ4ww_OdggaZkgDLbLn0kuFHQVg&s'

//     useEffect(() => {
//         const fetchAllCampaigns = async () => {
//             try {
//                 setLoading(true);
//                 const response = await makeApi('/v1/all-campaigns-for-admin', 'GET');
//                 // const response = await makeApi('/api/products', 'GET');

//                 setCampaignList(response?.data.data || []);
//             } catch (error) {
//                 console.error('Error fetching campaigns:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchAllCampaigns();
//     }, []);

//     // Function to format deadline date to DD/MM/YY
//     const formatDate = (deadline) => {
//         const dateObj = new Date(deadline);
//         const day = dateObj.getDate().toString().padStart(2, '0');
//         const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed
//         const year = dateObj.getFullYear().toString().slice(-2); // Extract last two digits of the year
//         return `${day}/${month}/${year}`;
//     };

//     const filteredCampaigns = campaignList.filter(campaign => {
//         return (filter === 'All' || campaign.status === filter) &&
//             (searchTerm === '' || campaign.campaign_name.toLowerCase().includes(searchTerm.toLowerCase()));
//     });

//     return (
//         <>
//             {loading ? <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}> <PrimaryLoader /> </div> : (
//                 <div className="campaign-list-container">
//                     <div className="campaign-list-topbar">
//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             className="campaign-list-search"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <div className="campaign-list-filters">
//                             <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>All</button>
//                             <button onClick={() => setFilter('Completed')} className={filter === 'Completed' ? 'active' : ''}>Complete</button>
//                             <button onClick={() => setFilter('Verified')} className={filter === 'Verified' ? 'active' : ''}>Verified</button>
//                             <button onClick={() => setFilter('Rejected')} className={filter === 'Rejected' ? 'active' : ''}>Rejected</button>
//                         </div>
//                     </div>
//                     <div className="campaign-list-content">
//                         {filteredCampaigns.map(campaign => (
//                             <div key={campaign._id}
//                             //  className="campaign-item"
//                             className={`campaign-item ${isPastDeadline(campaign.dead_line) ? 'past-deadline' : ''}`}
//                             >
//                                 {campaign.NewApplyRequest ?
//                                     <div className='new_user_on_campaign_badge border  '>{campaign.NewApplyRequest}</div>
//                                     : null

//                                 }
//                                 {/* <img src={campaign.banner} alt={campaign.campaign_name} className="campaign-banner" /> */}
//                                 <img src={banner} alt={campaign.campaign_name} className="campaign-banner" />
//                                 <div className="campaign-details">
//                                     <h3>{campaign.campaign_name}</h3>
//                                     {/* <p>ID: {campaign.id}</p> */}
//                                     <p>Status: {campaign.status}</p>
//                                     <p>Deadline: {formatDate(campaign.dead_line)}</p>
//                                     {/* <p>Deadline: {campaign.dead_line}</p> */}


//                                     <Link to={`/campaign/campaign-details/${campaign.campaign_no}`}>
//                                         <button className="view-more-button">View More</button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <Link to="/campaign/create-campaign" className="create-campaign-button">
//                         Create New Campaign
//                     </Link>
//                 </div>
//             )}
//         </>
//     );
// };

// export default CampaignList;


import React, { useEffect, useState } from 'react';
import "../../../style/campaign/campaignList.css";
import { Link } from 'react-router-dom';
import { makeApi } from '../../../api/callApi.tsx';
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';

const CampaignList = () => {
    const [filter, setFilter] = useState('New');
    const [searchTerm, setSearchTerm] = useState('');
    const [campaignList, setCampaignList] = useState([]);
    const [loading, setLoading] = useState(false);
    const banner = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGDLn6BTUQ4ww_OdggaZkgDLbLn0kuFHQVg&s';

    useEffect(() => {
        const fetchAllCampaigns = async () => {
            try {
                setLoading(true);
                const response = await makeApi('/v1/all-campaigns-for-admin', 'GET');
                setCampaignList(response?.data.data || []);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllCampaigns();
    }, []);

    const formatDate = (deadline) => {
        const dateObj = new Date(deadline);
        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    const isPastDeadline = (deadline) => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        return now > deadlineDate;
    };

    const isNewCampaign = (campaign) => {
        return !isPastDeadline(campaign.dead_line) && campaign.NewApplyRequest;
    };

    const filteredCampaigns = campaignList.filter(campaign => {
        if (filter === 'All') return true;

        switch (filter) {
            case 'Running':
                return !isPastDeadline(campaign.dead_line);
            case 'Completed':
                return isPastDeadline(campaign.dead_line);
            case 'New':
                return isNewCampaign(campaign);
            default:
                return campaign.status === filter;
        }
    }).filter(campaign => 
        searchTerm === '' || campaign.campaign_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {loading ? (
                <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <PrimaryLoader />
                </div>
            ) : (
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
                            <button onClick={() => setFilter('Running')} className={filter === 'Running' ? 'active' : ''}>Running</button>
                            <button onClick={() => setFilter('New')} className={filter === 'New' ? 'active' : ''}>New-user</button>
                            <button onClick={() => setFilter('Completed')} className={filter === 'Completed' ? 'active' : ''}>Completed</button>
                            <button onClick={() => setFilter('All')} className={filter === 'All' ? 'active' : ''}>All</button>
                        </div>
                    </div>
                    <div className="campaign-list-content">
                        {filteredCampaigns.map(campaign => (
                            <div
                                key={campaign._id}
                                className={`campaign-item ${isPastDeadline(campaign.dead_line) ? 'past-deadline' : ''}`}
                            >
                                {campaign.NewApplyRequest ?
                                    <div className='new_user_on_campaign_badge border'>{campaign.NewApplyRequest}</div>
                                    : null
                                }
                                <img src={banner} alt={campaign.campaign_name} className="campaign-banner" />
                                <div className="campaign-details">
                                    <h3>{campaign.campaign_name}</h3>
                                    <p>Deadline: {formatDate(campaign.dead_line)}</p>
                                    <Link to={`/campaign/campaign-details/${campaign.campaign_no}`}>
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
            )}
        </>
    );
};

export default CampaignList;
