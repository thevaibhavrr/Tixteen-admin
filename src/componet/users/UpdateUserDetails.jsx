
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../../style/user/updateUserDetails.css";
import BackIcon from '../../utils/BackIcon';
import { makeApi } from '../../api/callApi.tsx';
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';

function UpdateUserDetails() {
    const { id } = useParams();

    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await makeApi('/V1/influencers', 'POST', { _id: id });
                // if (response.success) {
                    setUserData(response.data.data);
                // }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await makeApi(`/V1/influencers/${userData._id}`, 'PUT', userData);
            const response = await makeApi(`/api/update-user/${userData._id}`, 'PUT', userData);

            console.log('User data updated:', response);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    if (!userData) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} >
            <PrimaryLoader/>
        </div>;
    }

    return (
        <>
            <BackIcon path={`user/user-details/${userData._id}`} />
            <div className="update-user-details-page">
                <h2>Update User Details</h2>
                <form className="update-user-details-form" onSubmit={handleSubmit}>
                    <div className="update-user-details-field">
                        <label htmlFor="user_name">User Name</label>
                        <input type="text" id="user_name" name="user_name" value={userData.user_name} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="gender">Gender</label>
                        <input type="text" id="gender" name="gender" value={userData.gender} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="text" id="dob" name="dob" value={userData.dob} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="age">Age</label>
                        <input type="text" id="age" name="age" value={userData.age} onChange={handleInputChange} />
                    </div>
                    <div className='d-flex justify-content-around' >
                        <div className="update-user-details-field">
                            <label htmlFor="profile_img">Profile Image URL</label>
                            <img src={userData.profile_img} alt="Profile Image" width={100} />
                        </div>
                        <div className="update-user-details-field">
                            <label htmlFor="intro_video">Intro Video URL</label>
                            <video src={userData.intro_video} controls width={200} />
                        </div>
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="language">Language</label>
                        <input type="text" id="language" name="language" value={userData.language} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="level">Level</label>
                        <input type="text" id="level" name="level" value={userData.level} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" id="mobile" name="mobile" value={userData.mobile} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="mobile_2">Secondary Mobile</label>
                        <input type="text" id="mobile_2" name="mobile_2" value={userData.mobile_2} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="industry">Industry</label>
                        <input type="text" id="industry" name="industry" value={userData.industry} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="content_type">Content Type</label>
                        <input type="text" id="content_type" name="content_type" value={userData.content_type} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="regs_date">Registration Date</label>
                        <input type="text" id="regs_date" name="regs_date" value={userData.regs_date} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="primary_platform">Primary Platform</label>
                        <input type="text" id="primary_platform" name="primary_platform" value={userData.primary_platform} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="shipping_address">Shipping Address</label>
                        <input type="text" id="shipping_address" name="shipping_address" value={userData.shipping_address} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="ship_country">Country</label>
                        <input type="text" id="ship_country" name="ship_country" value={userData.ship_country} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="ship_state">State</label>
                        <input type="text" id="ship_state" name="ship_state" value={userData.ship_state} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="ship_city">City</label>
                        <input type="text" id="ship_city" name="ship_city" value={userData.ship_city} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="ship_pin_code">Pin Code</label>
                        <input type="text" id="ship_pin_code" name="ship_pin_code" value={userData.ship_pin_code} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="working_area">Working Area</label>
                        <input type="text" id="working_area" name="working_area" value={userData.working_area} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="reject_mark">Reject Mark</label>
                        <input type="text" id="reject_mark" name="reject_mark" value={userData.reject_mark} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="verification">Verification</label>
                        <input type="text" id="verification" disabled name="verification" value={userData.verification} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="approved_by">Approved By</label>
                        <input type="text" id="approved_by" disabled name="approved_by" value={userData.approved_by} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="action_date">Action Date</label>
                        <input type="text" id="action_date" name="action_date" value={userData.action_date} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="refrence">Reference</label>
                        <input type="text" id="refrence" name="refrence" value={userData.refrence} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="prime_content">Prime Content</label>
                        <input type="text" id="prime_content" name="prime_content" value={userData.prime_content} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="whatsapp_connect">WhatsApp Connect</label>
                        <input type="text" id="whatsapp_connect" name="whatsapp_connect" value={userData.whatsapp_connect} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="featured">Featured</label>
                        <input type="text" id="featured" name="featured" value={userData.featured} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="rating">Rating</label>
                        <input type="text" id="rating" name="rating" value={userData.rating} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="sleep_mode">Sleep Mode</label>
                        <input type="text" id="sleep_mode" name="sleep_mode" value={userData.sleep_mode} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="suspend">Suspend</label>
                        <input type="text" id="suspend" name="suspend" value={userData.suspend} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="status">Status</label>
                        <input type="text" id="status" name="status" value={userData.status} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="intro_video_link">Intro Video Link</label>
                        <input type="text" id="intro_video_link" name="intro_video_link" value={userData.intro_video_link} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="update-user-details-submit">Update</button>
                </form>
            </div>
        </>
    );
}

export default UpdateUserDetails;
