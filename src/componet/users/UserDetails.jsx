import React, { useEffect, useState } from 'react';
import "../../style/user/userDetails.css";
import EditIcon from "../../utils/EditIcon";
import BackIcon from "../../utils/BackIcon";
import { makeApi } from "../../api/callApi.tsx";
import { useParams } from "react-router-dom";
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
import { Link } from "react-router-dom"

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [activeTab, setActiveTab] = useState('Pending');

    const fetchData = async () => {
        try {
            const response = await makeApi('/V1/influencers', 'POST', { _id: id });
            setUser(response.data.data);
            setApplications(response.data.apply);
            filterApplications('Pending', response.data.apply); // Initial filter
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const filterApplications = (status, apps) => {
        let filtered;
        switch (status) {
            case 'Pending':
                filtered = apps.filter(app => app.influ_approval === 'Pending');
                break;
            case 'Completed':
                filtered = apps.filter(app => app.submition === 'Completed');
                break;
            case 'Rejected':
                filtered = apps.filter(app => app.influ_approval === 'Rejected');
                break;
            case 'Ongoing':
                filtered = apps.filter(app =>
                    app.influ_approval !== 'Pending' &&
                    app.influ_approval !== 'Rejected' &&
                    app.submition !== 'Completed'
                );
                break;
            default:
                filtered = apps;
                break;
        }
        setFilteredApplications(filtered);
        setActiveTab(status);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!user) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <PrimaryLoader />
            </div>
        );
    }

    return (
        <div>
            <BackIcon path={`user/all-users`} />
            <div className="user-details-container" style={{ paddingBottom: "300px" }}>
                <div className="user-card">
                    <EditIcon path={`user/update-user-details/${user._id}`} />
                    <div className="user-header">
                        <img src={user.profile_img} alt={user.user_name} className="user-profile-img" />
                        <div className="user-info">
                            <h1>{user.user_name}</h1>
                            <p>{user.gender ? `${user.gender}, Age: ${user.age}` : 'Gender: Not Provided'}</p>
                            <p>{user.language ? user.language : 'Language: Not Provided'}</p>
                            <p>{user.level ? `Level: ${user.level}` : 'Level: Not Provided'}</p>
                            <p>{user.rating ? `Rating: ${user.rating}` : 'Rating: Not Provided'}</p>
                        </div>
                    </div>
                    <div className="user-body">
                        <div className="user-section">
                            <h2>Contact Information</h2>
                            <p>{user.mobile ? `Mobile: ${user.mobile}` : 'Mobile: Not Provided'}</p>
                            <p>{user.mobile_2 ? `Alternate Mobile: ${user.mobile_2}` : 'Alternate Mobile: Not Provided'}</p>
                            <p>{user.email ? `Email: ${user.email}` : 'Email: Not Provided'}</p>
                        </div>

                        <div className="user-section">
                            <h2>Industry</h2>
                            <p>{user.industry ? user.industry : 'Industry: Not Provided'}</p>
                        </div>
                        <div className="user-section">
                            <h2>Content Type</h2>
                            <p>{user.content_type ? user.content_type : 'Content Type: Not Provided'}</p>
                        </div>
                        <div className="user-section">
                            <h2>Social Links</h2>
                            <p>{user.primary_platform ? `Instagram: ${user.primary_platform}` : 'Instagram: Not Provided'}</p>
                            <p>{user.influ_soc_link ? `Influence Social Link: ${user.influ_soc_link}` : 'Influence Social Link: Not Provided'}</p>
                        </div>
                        <div className="user-section">
                            <h2>Shipping Address</h2>
                            <p>{user.shipping_address ? user.shipping_address : 'Shipping Address: Not Provided'}</p>
                            <p>{user.ship_city && user.ship_state && user.ship_country ? `${user.ship_city}, ${user.ship_state}, ${user.ship_country}` : 'Location: Not Provided'}</p>
                            <p>{user.ship_pin_code ? `Pin Code: ${user.ship_pin_code}` : 'Pin Code: Not Provided'}</p>
                        </div>
                    </div>
                    <div className="user-section ps-2">
                        <h2>Introduction Video</h2>
                        {!user.intro_video ? (
                            <video width="100%" controls>
                                <source src="https://res.cloudinary.com/dyl3gzm7d/video/upload/v1715863302/exaqwk3k1lqa2xhklsha.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <p>Introduction Video: Not Provided</p>
                        )}
                    </div>
                    <div className="user-footer">
                        <h2>Additional Information</h2>
                        <p>{user.regs_date ? `Registration Date: ${user.regs_date}` : 'Registration Date: Not Provided'}</p>
                        <p>{user.verification ? `Verification Status: ${user.verification}` : 'Verification Status: Not Provided'}</p>
                        <p>{user.refrence ? `Reference: ${user.refrence}` : 'Reference: Not Provided'}</p>
                        <p>{user.prime_content ? `Prime Content: ${user.prime_content}` : 'Prime Content: Not Provided'}</p>
                    </div>
                </div>
                <div className="user-section px-5">
                    <div className="user-tabs">
                        {['Pending', 'Ongoing', 'Completed', 'Rejected'].map(tab => (
                            <button
                                key={tab}
                                className={`user-tab ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => filterApplications(tab, applications)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="applications-list">
                        {filteredApplications.length > 0 ? (
                            filteredApplications.map(app => (
                                <div key={app._id} className="application-item">
                                    <p><strong>Campaign Name:</strong> {app.campaignDetails.campaign_name}
                                        <Link style={{ textDecoration: 'none' }} to={`/campaign/campaign-details/${app.campaign_no}`} target="_blank" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ fontWeight: 'bold' }} className="bi bi-box-arrow-up-right ms-2" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                            </svg>
                                        </Link>
                                    </p>
                                    <p><strong>Status:</strong> {app.influ_approval}</p>
                                    <p><strong>Submission:</strong> {app.submition}</p>
                                    <p><strong>Product:</strong> {app.campaignDetails.product}</p>
                                    <p><strong>Industry:</strong> {app.campaignDetails.industry}</p>
                                    <p><strong>Platform:</strong> {app.campaignDetails.platforms}
                                    {app.campaignDetails.platform_link &&
                                        <Link to={app.campaignDetails.platform_link} target="_blank" rel="noopener noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ fontWeight: 'bold' }} className="bi bi-box-arrow-up-right ms-2" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                            </svg>
                                        </Link>
                                    }
                                    </p>

                                    <p><strong>Price:</strong> {app.campaignDetails.price}</p>
                                    <p><strong>Deadline:</strong> {app.campaignDetails.dead_line}</p>
                                    <p> <strong>Applied On:</strong> {app.opt_date} </p>
                                    {app.content && (
                                        <>
                                            <strong>Content: </strong>
                                            <Link to={app.content} target="_blank" rel="noopener noreferrer">
                                            View
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ fontWeight: 'bold' }} className="bi bi-box-arrow-up-right ms-2" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                                </svg>
                                            </Link>
                                                </>
                                    ) }
                                    {app.post_link && (
                                        <>
                                            <strong>View Post:</strong>
                                            <Link to={app.post_link} target="_blank" rel="noopener noreferrer">
                                                <strong  > View Post   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ fontWeight: 'bold' }} className="bi bi-box-arrow-up-right ms-2" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                                </svg></strong>
                                            </Link>
                                        </>
                                    )}
                                    
                                </div>
                            ))
                        ) : (
                            <p>No applications found for this status.</p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
