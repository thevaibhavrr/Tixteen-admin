import "../../style/user/userDetails.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from "../../utils/EditIcon";
import BackIcon from "../../utils/BackIcon";
const UserDetails = () => {
    const [followersCount, setFollowersCount] = useState(null);

    const user = {
        primary_platforms: [],
        _id: "6666ea2c122dd58cb0178f47",
        id: "35",
        user_name: "Manish Singh",
        gender: "Male",
        dob: "18-05-2002",
        age: "30",
        profile_img: "https://dwpdigital.blog.gov.uk/wp-content/uploads/sites/197/2017/07/jude-1-620x556.jpg",
        intro_video: "https://res.cloudinary.com/dyl3gzm7d/video/upload/v1715863302/exaqwk3k1lqa2xhklsha.mp4",
        language: "English, Hindi",
        level: "L2",
        mobile: "9717467030",
        mobile_2: "9919848294",
        email: "manishurajput6@gmail.com",
        industry: "Business & Finance, Entertainment, Photography, Sports & fitness, Technology",
        content_type: "video, post",
        visit: "0",
        regs_date: "17-Feb-22 23:38:49",
        influ_soc_link: "9331",
        primary_platform: "instagram",
        shipping_address: "default address",
        ship_country: "india",
        ship_state: "madhya pradesh",
        ship_city: "indore",
        ship_pin_code: "545421",
        working_area: "",
        reject_mark: "",
        verification: "Rejected",
        approved_by: "",
        action_date: "0000-00-00",
        refrence: "",
        prime_content: "blank",
        whatsapp_connect: "0",
        featured: "0",
        rating: "0",
        sleep_mode: "0",
        suspend: "0",
        status: "1",
        intro_video_link: ""
    };

    const fetchInstagramFollowers = async () => {
        try {
            const response = await axios.get(
                `https://graph.facebook.com/17841401994416697`,
                {
                    params: {
                        fields: `business_discovery.username(runaas_way){followers_count,media_count}`,
                        access_token: 'EAAHHE4tDdh0BO0Ei8lzP4Cy45nZAInDwKfZBhHdlbWLGDmY1A8Pec3hXH5fTCjDHyISBHM7eKcbk7JJMx5gUgHx78Og5ML0JpYwwtRAvWt8meZAd00sImxdTfZBxzPKsyTqyxWcoIeiHWZAZCfQVwqtxAx1nkZAMOVJMg9STg21ZB1zgpw5bup8ZA1vMjtzO8Yv8ZD'
                    }
                }
            );
            setFollowersCount(response.data.business_discovery.followers_count);
        } catch (error) {
            console.error('Error fetching Instagram followers', error);
        }
    };

    useEffect(() => {
        fetchInstagramFollowers();
    }, []);


    return (
        <>
                <BackIcon path={`user/all-users`} />

        <div className="user-details-container">
            <div className="user-card">
            <EditIcon path={`user/update-user-details/${user.id}`}/>
                <div className="user-header">
                    <img src={user.profile_img} alt={user.user_name} className="user-profile-img" />
                    <div className="user-info">
                        <h1>{user.user_name}</h1>
                        <p>{user.gender}, {user.age}</p>
                        <p>{user.language}</p>
                        <p>Level: {user.level}</p>
                        <p>Rating: {user.rating}</p>
                    </div>
                </div>
                <div className="user-body">
                    <div className="user-section">
                        <h2>Contact Information</h2>
                        <p>Mobile: {user.mobile}</p>
                        <p>Alternate Mobile: {user.mobile_2}</p>
                        <p>Email: {user.email}</p>
                    </div>
                        {followersCount !== null && (
                            <div className="user-section">
                                <h2>Instagram Followers</h2>
                                <p>{followersCount} followers</p>
                            </div>
                        )}
                    <div className="user-section">
                        <h2>Industry</h2>
                        <p>{user.industry}</p>
                    </div>
                    <div className="user-section">
                        <h2>Content Type</h2>
                        <p>{user.content_type}</p>
                    </div>
                    <div className="user-section">
                        <h2>Social Links</h2>
                        <p>Instagram: {user.primary_platform}</p>
                        <p>Influence Social Link: {user.influ_soc_link}</p>
                    </div>
                    <div className="user-section">
                        <h2>Shipping Address</h2>
                        <p>{user.shipping_address}</p>
                        <p>{user.ship_city}, {user.ship_state}, {user.ship_country}</p>
                        <p>Pin Code: {user.ship_pin_code}</p>
                    </div>
                </div>
                <div className="user-section ps-2">
                    <h2>Introduction Video</h2>

                    <video width="100%" controls>
                        <source src={user.intro_video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="user-footer">
                    <h2>Additional Information</h2>
                    <p>Registration Date: {user.regs_date}</p>
                    <p>Verification Status: {user.verification}</p>
                    <p>Reference: {user.refrence}</p>
                    <p>Prime Content: {user.prime_content}</p>
                </div>

            </div>
        </div>
        </>
    );
};

export default UserDetails;

