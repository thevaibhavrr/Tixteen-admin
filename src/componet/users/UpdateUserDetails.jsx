import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../../style/user/updateUserDetails.css";
import BackIcon from '../../utils/BackIcon';
import { makeApi } from '../../api/callApi.tsx';
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
import { toast } from 'react-toastify';
function UpdateUserDetails() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [industryList, setIndustryList] = useState([]);
    const [filterIndustry, setFilterIndustry] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [socialMediaData, setSocialMediaData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newSocialMedia, setNewSocialMedia] = useState({
        platform: '',
        link: '',
        follower: ''
    });

    const fetchUserData = async () => {
        try {
            const response = await makeApi('/V1/influencers', 'POST', { _id: id });

            await setUserData(response.data.data);
            await setFilterIndustry(response.data.data.industry || '');

            fetchSocialMediaData(response.data.data.influ_soc_link);

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const fetchSocialMediaData = async (id) => {
        console.log('Fetching social media data for user:', id);
        setLoading(true);
        try {
            const response = await makeApi(`/api/get-social-media-by-user-id/${id}`, "GET");
            console.log('Social media data:', response.data.data);
            setSocialMediaData(response.data.data);
        } catch (error) {
            console.error('Error fetching social media data:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleAddNewSocialMedia = async () => {
        const { platform, link, follower } = newSocialMedia;
        if (!platform || !link || !follower) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const response = await makeApi('/api/add-social-media', 'POST', {
                ...newSocialMedia,
                influ_soc_link: userData.influ_soc_link,
                id: userData.influ_soc_link
            });
            setSocialMediaData([...socialMediaData, response.data.data]);
            setNewSocialMedia({ platform: '', link: '', follower: '' });
        } catch (error) {
            console.error('Error adding new social media link:', error);
        }
    };

    const handleUpdate = async (id, updatedLink, updatedFollower) => {
        try {
            const response = await makeApi(`/api/update-social-media/${id}`, 'PUT', { link: updatedLink, follower: updatedFollower });
            const data = await response.json();
            setSocialMediaData((prevData) =>
                prevData.map((item) => (item._id === id ? data.data : item))
            );
        } catch (error) {
            console.error('Error updating social media link:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await makeApi(`/api/delete-social-media/${id}`, 'DELETE');
            setSocialMediaData((prevData) => prevData.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error deleting social media link:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [id]);



    useEffect(() => {
        const fetchIndustryList = async () => {
            setLoading(true);
            try {
                const res = await makeApi('/v1/get-all-industries', 'GET');
                setIndustryList(res.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchIndustryList();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUserData = { ...userData, industry: filterIndustry };
            const response = await makeApi(`/v1/influencers/${id}`, 'PUT', updatedUserData);
            console.log('User data updated:', response);

        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const toggleIndustry = (industryName) => {
        let updatedFilterIndustry;
        const selectedIndustries = filterIndustry ? filterIndustry.split(',') : [];

        if (selectedIndustries.includes(industryName)) {
            updatedFilterIndustry = selectedIndustries.filter(name => name !== industryName).join(',');
        } else {
            if (selectedIndustries.length >= 5) {
                toast.error('You cannot select more than 5 industries');
                return;
            }
            updatedFilterIndustry = [...selectedIndustries, industryName].join(',');
        }
        setFilterIndustry(updatedFilterIndustry);
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    if (!userData) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <PrimaryLoader />
            </div>
        );
    }

    return (
        <div style={{marginBottom:"100px"}}  >
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
                        <input type="date" id="dob" name="dob" value={userData.dob} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="age">Age</label>
                        <input type="text" id="age" name="age" value={userData.age} onChange={handleInputChange} />
                    </div>
                    <div className='d-flex justify-content-around'>
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
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} />
                    </div>
                    <div className='main_influencer_items  '>
                        <div className='influncer_item_first_div'>Industry</div>
                        <div className="accordion-container influncer_item_second_div">
                            <div className="">
                                <div className='industy_accordion btn ' style={{ maxWidth: "75%", backgroundColor: "lightgray" }}>
                                    <div className='industy_accordion-header align-items-center' style={{ cursor: "pointer", padding: "2px", gap: "15px", width: "100%" }} onClick={handleToggle}>
                                        <div>Industry Filter</div>
                                        <div className={`industy_accordion-icon ${isOpen ? 'open' : ''}`}>
                                            {isOpen ? '-' : '+'}
                                        </div>
                                    </div>
                                    {isOpen && (
                                        <div className='industy_filter_checkbox_parent_div'>
                                            {industryList.map((industry) => (
                                                <div key={industry.name} className='d-flex align-items-center industy_dropdown_checkbox_items'>
                                                    <div className='w-25'>
                                                        <input
                                                            type="checkbox"
                                                            id={industry.name}
                                                            value={industry.name}
                                                            checked={filterIndustry.split(',').includes(industry.name)}
                                                            onChange={() => toggleIndustry(industry.name)}
                                                            style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                                        />
                                                    </div>
                                                    <div className='w-100'>
                                                        <label htmlFor={industry.name}>{industry.name}</label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
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
                        <label htmlFor="verification">Verification</label>
                        <input type="text" id="verification" name="verification" value={userData.verification} onChange={handleInputChange} />
                    </div>
                    <div className="update-user-details-field">
                        <label htmlFor="action_date">Action Date</label>
                        <input type="date" id="action_date" name="action_date" value={userData.action_date} onChange={handleInputChange} />
                    </div>
                    {/* <div className="update-user-details-field">
                        <label htmlFor="status">Status</label>
                        <input type="text" id="status" name="status" value={userData.status} onChange={handleInputChange} />
                    </div> */}
                    {/* <div className="update-user-details-field">
                        <label htmlFor="intro_video_link">Intro Video Link</label>
                        <input type="text" id="intro_video_link" name="intro_video_link" value={userData.intro_video_link} onChange={handleInputChange} />
                    </div> */}
                    <button type="submit" className="update-user-details-submit">Update</button>
                </form>
            </div>
        <div className='w-100 d-flex justify-content-center ' >
            <div className="deliverables-container w-75">
            <h4>Social Media Manager</h4>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Platform</th>
                            <th>Link</th>
                            <th>Follower</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {socialMediaData.map((item) => (
                            <tr key={item._id}>
                                <td>{item.platform}</td>
                                <td className='deliverable-row' >
                                    <input
                                        type="text"
                                        value={item.link}
                                        onChange={(e) =>
                                            setSocialMediaData((prevData) =>
                                                prevData.map((i) =>
                                                    i._id === item._id ? { ...i, link: e.target.value } : i
                                                )
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={item.follower}
                                        onChange={(e) =>
                                            setSocialMediaData((prevData) =>
                                                prevData.map((i) =>
                                                    i._id === item._id ? { ...i, follower: e.target.value } : i
                                                )
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <button className='btn btn-primary' onClick={() => handleUpdate(item._id, item.link, item.follower)}>
                                        Update
                                    </button>
                                    <button className='btn btn-danger'  onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Platform"
                                    value={newSocialMedia.platform}
                                    onChange={(e) =>
                                        setNewSocialMedia({ ...newSocialMedia, platform: e.target.value })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Link"
                                    value={newSocialMedia.link}
                                    onChange={(e) =>
                                        setNewSocialMedia({ ...newSocialMedia, link: e.target.value })
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Follower"
                                    value={newSocialMedia.follower}
                                    onChange={(e) =>
                                        setNewSocialMedia({ ...newSocialMedia, follower: e.target.value })
                                    }
                                />
                            </td>
                            <td>
                                <button className='btn btn-primary' onClick={handleAddNewSocialMedia}>Add</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
        </div>

        </div>
    );
}

export default UpdateUserDetails;
