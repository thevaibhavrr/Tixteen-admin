
import React, { useEffect, useState } from 'react';
import "../../style/user/userDetails.css";
import EditIcon from "../../utils/EditIcon";
import BackIcon from "../../utils/BackIcon";
import { makeApi } from "../../api/callApi.tsx";
import { useParams } from "react-router-dom";
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [followersCount, setFollowersCount] = useState(null);

    const fetchData = async () => {
        try {
            const response = await makeApi('/V1/influencers', 'POST', { _id: id });
            setUser(response.data.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!user) {
        return  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
        <PrimaryLoader/>
    </div>;
    }

    return (
        <>
            <BackIcon path={`user/all-users`} />
            <div className="user-details-container">
                <div className="user-card">
                    <EditIcon path={`user/update-user-details/${user._id}`} />
                    <div className="user-header">
                        {/* <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt={user.user_name} className="user-profile-img" /> */}
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
                        {followersCount !== null && (
                            <div className="user-section">
                                <h2>Instagram Followers</h2>
                                <p>{followersCount} followers</p>
                            </div>
                        )}
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
                                {/* <source src={user.intro_video_link} type="video/mp4" /> */}
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
            </div>
        </>
    );
};

export default UserDetails;
