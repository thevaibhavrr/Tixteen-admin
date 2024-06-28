import React, { useState } from 'react';
import "../../style/user/updateUserDetails.css";
import BackIcon from '../../utils/BackIcon';


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

function UpdateUserDetails() {
    const [userData, setUserData] = useState(user);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('User data updated:', userData);
    };

    return (
        <>
        <BackIcon path={`user/user-details/${userData.id}`} />
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
                    {/* <input type="text" id="profile_img" name="profile_img" value={userData.profile_img} onChange={handleInputChange} /> */}
                    <img src={userData.profile_img} alt="Profile Image" width={100} />
                </div>
                <div className="update-user-details-field">
                    <label htmlFor="intro_video">Intro Video URL</label>
                    {/* <input type="text" id="intro_video" name="intro_video" value={userData.intro_video} onChange={handleInputChange} /> */}
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
                    <input type="text" id="verification" name="verification" value={userData.verification} onChange={handleInputChange} />
                </div>
                <div className="update-user-details-field">
                    <label htmlFor="approved_by">Approved By</label>
                    <input type="text" id="approved_by" name="approved_by" value={userData.approved_by} onChange={handleInputChange} />
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
