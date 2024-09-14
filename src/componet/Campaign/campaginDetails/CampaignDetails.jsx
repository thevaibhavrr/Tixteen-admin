

import React, { useEffect, useState } from 'react';
import '../../../style/campaign/campaignDetails.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BackIcon from '../../../utils/BackIcon';
import EditIcon from '../../../utils/EditIcon';
import { makeApi } from '../../../api/callApi.tsx';
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';
import DeletePopup from '../../../utils/DeletePopup.jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function CampaignDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAppliedUsers, setShowAppliedUsers] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [appliedUsersList, setAppliedUsersList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Accepted');
  const [showDenyInput, setShowDenyInput] = useState("");
  const [remark, setRemark] = useState('');
  const [followerrequired, setFollowerrequired] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deliverables, setDeliverables] = useState([]);
  const [viewmoreuserdata, setViewmoreuserdata] = useState([]);
  const [showstatusEditPopup, setShowstatusEditPopup] = useState("");

  const fetchCampaignDetailsWithAppliedUsers = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/v1/apply-campaign-details/campaign/${id}`, 'GET');

      if (response && response.data) {
        setCampaignDetails(response.data.campaign);
        setAppliedUsersList(response.data.applyUsers);
        setFilteredUsers(response.data.applyUsers.filter(user => user.influ_approval === 'Accepted'));
      } else {
        console.error('No data received from API');
      }
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowers = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/v1/required-follower/campaign/${id}`, 'GET');
      setFollowerrequired(response.data.data);
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchCampaignDeliverables = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/campaign_deliverable/${id}`, 'GET');
      const campaignData = response.data.data;
      setDeliverables(campaignData);
    } catch (error) {
      console.error('Error fetching campaign deliverables:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaignDetailsWithAppliedUsers();
    fetchFollowers();
    fetchCampaignDeliverables()
  }, [id]);

  const handleSearch = (query) => {

    // if no query, show all users
    if (!query) {
      setFilteredUsers(appliedUsersList);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = filteredUsers.filter(user =>
      user?.user?.user_name.toLowerCase().includes(lowercasedQuery) ||
      formatPhoneNumber(user?.user?.mobile).includes(lowercasedQuery)
    );
    setFilteredUsers(filtered);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    switch (tab) {
      case 'Pending':
        setFilteredUsers(appliedUsersList.filter(user => user.influ_approval === 'Pending'));
        break;
      case 'Rejected':
        setFilteredUsers(appliedUsersList.filter(user => user.influ_approval === 'Rejected'));
        break;
      case 'Accepted':
        setFilteredUsers(appliedUsersList.filter(user => user.influ_approval === 'Accepted'));
        break;
      default:
        setFilteredUsers(appliedUsersList.filter(user => user.influ_approval === 'Accepted'));
        break;
    }
  };

  const formatPhoneNumber = (number) => {
    if (!number) return '';

    const cleanedNumber = number.replace(/\s+/g, '');

    return cleanedNumber.length > 10 ? `+91${cleanedNumber}` : cleanedNumber;
  };

  const toggleMoreDetails = (userId) => {
    fetchSocialMediaData(userId);
    setShowMoreDetails(showMoreDetails === userId ? null : userId);
    // setViewmoreuserdata

  };
  const fetchSocialMediaData = async (id) => {
    setLoading(true);

    try {
      const response = await makeApi(`/api/get-social-media-by-user-id/${id}`, "GET");
      setViewmoreuserdata(response.data.data);
    }
    catch (error) {
      console.error("Error fetching social media data:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleVerifieruserForcapaign = async (userId, approvalStatus, changes = '') => {
    try {
      setLoading(true);
      const requestBody = {
        content_approved: approvalStatus,
        approval: approvalStatus === 'Approved' ? '1' : '0',
        content_approved_date: new Date().toISOString(),
        change_reason: changes,
      };

      const response = await makeApi(`/v1/influencer/edit-apply-campaign/${userId}/${id}`, "PUT", requestBody);
      fetchCampaignDetailsWithAppliedUsers();
    } catch (error) {
      console.error('Error updating user approval:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifieruserNameForcapaign = async (userId, approvalStatus) => {
    try {
      setLoading(true);
      const requestBody = {
        influ_approval: approvalStatus,
        accept_date: new Date().toISOString(),
      };

      const response = await makeApi(`/v1/influencer/edit-apply-campaign/${userId}/${id}`, "PUT", requestBody);
      fetchCampaignDetailsWithAppliedUsers();
    } catch (error) {
      console.error('Error updating user approval:', error);
    } finally {
      setLoading(false);
      setShowstatusEditPopup("");
    }
  };

  const formatDate = (deadline) => {
    const dateObj = new Date(deadline);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  const getFullLink = (platform, link) => {
    if (!link.startsWith("www.") && !link.startsWith("https://")) {
      switch (platform) {
        case "Instagram":
          return `https://www.instagram.com/${link}`;
        case "Facebook":
          return `https://www.facebook.com/${link}`;
        case "YouTube":
          return `https://www.youtube.com/${link}`;
        default:
          return link;
      }
    }
    return link;
  };

  const handleDelete = () => {
    setShowDeletePopup(true);
  };
  const deleteLanguage = async () => {
    try {
      setLoading(true);

      await makeApi(`/v1/campaign/delete/${id}`, 'DELETE');
      // setLanguages(languages.filter(language => language._id !== currentLanguage._id));
      navigate('/campaign/CampaignList');
      setShowDeletePopup(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      {loading && (
        <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}>
          <PrimaryLoader />
        </div>
      )}
      <div>
        <BackIcon path={"campaign/CampaignList"} />
      </div>
      <div className="text-end me-5 " >
        <div className='btn btn-danger' onClick={() => handleDelete()} >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
          </svg>
        </div>
      </div>
      <div className="campaign-details-unique">
        {/* delete */}
        <EditIcon path={`campaign/update-campaign/${id}`} />
        <img src="https://cdn.shopify.com/s/files/1/1276/5299/files/Filler-mobile-2-power-sunglasses.jpg?v=1685976704?v=1719360000163" alt="Campaign Banner" className="campaign-banner-unique" />
        <div className="campaign-content-unique">
          <h1 className="campaign-title-unique">{campaignDetails?.campaign_name}</h1>
          <p className="campaign-status-unique"><strong>Payout:</strong> {campaignDetails?.price}</p>
          <p className="campaign-status-unique"><strong>product_price:</strong> {campaignDetails?.product_price}</p>
          <p className="campaign-type-unique"><strong>Type:</strong> {campaignDetails?.campaign_type}</p>
          <p className="campaign-product-unique"><strong>Product:</strong> {campaignDetails?.product}</p>
          <p className="campaign-industry-unique"><strong>Target Industry:</strong> {campaignDetails?.industry}</p>
          <p className="campaign-language-unique"><strong>Language:</strong> {campaignDetails?.language}</p>
          <p className="campaign-age-unique"><strong>Influencer Age:</strong> {campaignDetails?.age} - {campaignDetails?.till_age}</p>
          <p className="campaign-gender-unique"><strong>Gender:</strong> {campaignDetails?.gender}</p>
          <p className="campaign-description-unique"><strong>Description:</strong> {campaignDetails?.remark}</p>
          <p className="campaign-deliverables-unique"><strong>Deliverables:</strong> {campaignDetails?.requiredDeliverables?.join(', ') || 'N/A'}</p>
          <div className="campaign-followers-unique">
            <h3><strong>Required Followers</strong></h3>
            {followerrequired.length > 0 ? followerrequired?.map((follower, index) => (
              <div key={index}>
                <p> <strong> {follower?.platforms[0]}:</strong> {follower?.followers}</p>
              </div>
            )) : <p>No followers required</p>}
          </div>
          <p className="campaign-hashtags-unique"><strong>Hashtags:</strong> {campaignDetails?.hash_tag}</p>
          <img src="https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?cs=srgb&dl=pexels-nitin-creative-46710.jpg&fm=jpg" alt="Product" className="campaign-product-image-unique" />
          <p className="campaign-platform-unique"><strong>Platform:</strong> {campaignDetails?.platforms}</p>
          <p className="campaign-link-unique"><strong>Link:</strong> <Link to={campaignDetails?.platform_link} target="_blank" rel="noopener noreferrer">{campaignDetails?.platform_link}</Link></p>
          <p className="campaign-tags-unique"><strong>Profiles to Tag: </strong>{campaignDetails?.profile_tag}</p>
          {/* <p className="campaign-location-unique"><strong>Location:</strong> {campaignDetails?.city}, {campaignDetails?.state}, {campaignDetails?.country}</p> */}
          <p className="campaign-deadline-unique"><strong>Deadline:</strong> {formatDate(campaignDetails?.dead_line)}</p>
          <p className="campaign-todo-unique"><strong>To Do:</strong> {campaignDetails?.to_do}</p>
          <p className="campaign-nottodo-unique"><strong>Not To Do:</strong> {campaignDetails?.not_todo}</p>
          <p className="campaign-deadline-unique"> <strong> Deadline:</strong> {campaignDetails?.dead_line}</p>
          <p className="campaign-deadline-unique" ><strong> Created Date: </strong> {campaignDetails?.created_date}</p>

          <p className="campaign-screenshots-unique"><strong>Screenshots Required:</strong> {campaignDetails?.is_screen_shots_required ? "Yes" : "No"}</p>
          {/* <div className="campaign-location-unique">
            <h3>Location</h3>
            <p>Country: {campaignDetails?.country}</p>
            <p>State: {campaignDetails?.state}</p>
            <p>City: {campaignDetails?.city}</p>
          </div> */}
          <div className="deliverables-container w-25">
            <strong>Deliverables -</strong>
            {deliverables.map((item) => (
              <div key={item._id} className="deliverable-row">
                <input
                  type="text"
                  value={item.deliverable}
                  onChange={(e) => {
                    const updatedDeliverables = deliverables.map((deliverable) =>
                      deliverable._id === item._id ? { ...deliverable, deliverable: e.target.value } : deliverable
                    );
                  }}
                  className="deliverable-input"
                />

              </div>
            ))}


          </div>
        </div>
        <button
          onClick={() => {
            setShowAppliedUsers(!showAppliedUsers);
          }}
          className="view-applied-users-button">
          Applied Users Details
        </button>
      </div>

      <div className="container">
        {showAppliedUsers && (
          <>
            <div className="all-user-top-bar">
              <div className="all-user-tabs">
                {['Pending', 'Rejected', 'Accepted'].map(tab => (
                  <button
                    key={tab}
                    className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab}
                  </button>
                ))}
                <input
                  className="form-control search-box"
                  type="text"
                  placeholder="Search by name or number..."
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{ width: '300px' }}
                />
              </div>
            </div>
            <div className="all-user-top-bar">

              <div className="applied-users-list">
                {filteredUsers.length === 0 && (
                  <div className="no-users-message">No users available</div>
                )}
                {filteredUsers.map((user) => (
                  <div
                    className={`applied-user-card-unique ${user?.influ_approval === "Accepted"
                      ? "accepted"
                      : user?.influ_approval === "Rejected"
                        ? "denied"
                        : ""
                      }`}
                    key={user._id}
                  >
                    <div className="applied-user-content-unique">
                      <div className="d-flex flex-column gap-4 align-items-center">
                        <div>
                          {/* <img
                            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&s"
                            src={
                              user?.user?.profile_img && user?.user?.profile_img.includes('http://res.cloudinary.com')
                                ? user?.user?.profile_img
                                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&s"
                            }
                            alt={user?.user?.user_name}
                            className="user-image-unique"
                          /> */}
                                                  <LazyLoadImage effect="blur"
                            src={
                                user?.user?.profile_img && user?.user?.profile_img.includes('http://res.cloudinary.com')
                                    ? user?.user?.profile_img
                                    : `https://storage.tixteen.com/assets/${user?.user?.profile_img}`
                            }
                            alt={user?.user?.user_name}
                            className="user-image-unique"
                            loading='lazy'
                        />
                        </div>
                        <Link to={`/user/user-details/${user?.user?._id}`} target="_blank">
                          <div className="btn btn-warning">View Profile</div>
                        </Link>
                      </div>
                      <div className="user-details-unique">
                        <p>Apply Date: {formatDate(user?.opt_date)}</p>
                        <p>Name: <strong> {user?.user?.user_name}</strong>, <br />  City: <strong> {user?.user?.ship_city}</strong>, <br />  Contact: <strong> {formatPhoneNumber(user?.user?.mobile)}</strong></p>
                        <p>Level: {user?.user?.level}</p>

                        <div style={{ cursor: 'pointer', color: '#25D366' }} >
                          <span className='me-2' >
                            WhatsApp :
                          </span>
                          <Link style={{ textDecoration: 'none', color: '#25D366' }} to={`https://wa.me/${formatPhoneNumber(user?.user?.mobile)}`} target={'_blank'} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                            </svg>
                          </Link>
                        </div>
                        <div className='my-3' >
                          <Link
                            style={{ textDecoration: 'none', color: '#25D366' }}
                            to={`tel:${formatPhoneNumber(user.mobile)}`}
                          // to={`tel:9501987577`}
                          >
                            call :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-telephone ms-3" viewBox="0 0 16 16">
                              <path d="M1.884 1.884a2 2 0 0 1 2.83 0l1.66 1.66a2 2 0 0 1 0 2.83l-1.66 1.66a2 2 0 0 1-2.83 0l-1.66-1.66a2 2 0 0 1 0-2.83l1.66-1.66zM4.568 2.728a1 1 0 0 0-1.414 0l-1.66 1.66a1 1 0 0 0 0 1.414l1.66 1.66a1 1 0 0 0 1.414 0l1.66-1.66a1 1 0 0 0 0-1.414l-1.66-1.66zM13.707 13.707a2 2 0 0 1-2.83 0l-1.66-1.66a2 2 0 0 1 0-2.83l1.66 1.66a2 2 0 0 1 0 2.83l-1.66 1.66zM11.577 11.577l1.66-1.66a1 1 0 0 0 0-1.414l-1.66-1.66a1 1 0 0 0-1.414 0l-1.66 1.66a1 1 0 0 0 0 1.414l1.66 1.66a1 1 0 0 0 1.414 0z" />
                            </svg>
                          </Link>
                        </div>
                        {/* <p>Link: <a href={user?.user?.link} target="_blank" rel="noopener noreferrer">{user?.user?.socialMedia}</a></p> */}
                        <div className='d-flex gap-3' >
                          <div>
                            Social :
                          </div>
                          <div>
                            {user?.user?.socialMedia?.platform === "Instagram" && (
                              <div className='d-flex gap-3' >
                                <div>
                                  <Link to={getFullLink("Instagram", user?.user?.socialMedia?.link)} target="_blank" className='text-black' style={{ textDecoration: 'none', color: 'black' }} rel="noopener noreferrer" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.372 1.942.372.853.038 1.125.048 3.297.048 2.173 0 2.444-.01 3.297-.048.851-.04 1.432-.174 1.941-.372a3.9 3.9 0 0 0 1.417-.923 3.9 3.9 0 0 0 .923-1.417c.198-.51.372-1.09.372-1.942.038-.853.048-1.125.048-3.297 0-2.174-.01-2.445-.048-3.297-.04-.852-.174-1.433-.372-1.942a3.9 3.9 0 0 0-.923-1.417 3.9 3.9 0 0 0-1.417-.923c-.51-.198-1.09-.372-1.942-.372C10.445.01 10.173 0 8 0ZM8 1.46c2.13 0 2.384.01 3.226.047.78.035 1.204.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.281.24.705.276 1.485.037.842.046 1.096.046 3.227 0 2.13-.01 2.384-.046 3.226-.035.78-.166 1.204-.276 1.485a2.45 2.45 0 0 1-.598.92 2.45 2.45 0 0 1-.92.598c-.281.11-.705.24-1.485.276-.842.037-1.096.047-3.226.047-2.131 0-2.385-.01-3.227-.047-.78-.035-1.204-.166-1.485-.276a2.45 2.45 0 0 1-.92-.598 2.45 2.45 0 0 1-.598-.92c-.11-.281-.24-.705-.276-1.485-.037-.842-.047-1.096-.047-3.226 0-2.131.01-2.385.047-3.227.035-.78.166-1.204.276-1.485a2.45 2.45 0 0 1 .598-.92 2.45 2.45 0 0 1 .92-.598c.281-.11.705-.24 1.485-.276.842-.037 1.096-.046 3.227-.046ZM8 3.892A4.108 4.108 0 1 0 8 12.108 4.108 4.108 0 0 0 8 3.892Zm0 1.455a2.653 2.653 0 1 1 0 5.306 2.653 2.653 0 0 1 0-5.306ZM12.733 3.534a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92Z" />
                                    </svg>
                                  </Link>
                                </div>

                                <div> {user?.user?.socialMedia?.follower} </div>

                              </div>
                            )}
                            {user?.user?.socialMedia?.platform === "Facebook" && (
                              <Link to={user?.user?.socialMedia?.link} target="_blank" className='' style={{ textDecoration: 'none' }} rel="noopener noreferrer" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                </svg>
                              </Link>
                            )}

                            {user?.user?.socialMedia?.platform === "YouTube" && (
                              <Link to={user?.socialMedia?.link} target="_blank" className='text-black' style={{ textDecoration: 'none', color: 'red' }} rel="noopener noreferrer" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                                </svg>
                              </Link>
                            )}
                          </div>
                        </div>
                        <p> Status: {user?.influ_approval} </p>
                        <div>

                          <button className='btn ' onClick={() => setShowstatusEditPopup(user.influ_id)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                          </button>
                        </div>



                        {(user?.influ_approval === 'Rejected' || user?.influ_approval === 'rejected') && <p className='text-danger' > This user has been Rejected </p>}
                        {(user.influ_approval === 'Accepted' || user.influ_approval === 'accepted') &&
                          <div>
                            <p className='text-success' > This user has been Accepted </p>
                            <div>
                              {user.content ? (
                                <>
                                  <div className='d-flex gap-5' >
                                    <div className=' w-25' >

                                      {user.content.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                                        <img src={user.content} alt="providedContent" className="w-100" style={{ maxWidth: "300px" }} />
                                      ) : user.content.match(/\.(mp4|webm|ogg)$/i) ? (
                                        <video controls className="w-100" style={{ maxWidth: "300px" }}>
                                          <source src={user.content} type="video/mp4" />
                                          Your browser does not support the video tag.
                                        </video>
                                      ) : (
                                        <p className='text-danger'>Unsupported content format</p>
                                      )}
                                      {/* <img src={user.content} alt="providedContet" className="w-100" style={{ maxWidth: "300px" }} /> */}
                                      <div className='text-danger' > Status : <span> {user.content_approved}</span></div>
                                    </div>
                                    {user.post_link &&
                                      <Link to={user.post_link} target="_blank" className='btn btn-success' >View
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                          <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                          <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                        </svg>
                                      </Link>
                                    }
                                    {(user.approval === "Pending" || user.approval === "pending") && (user.content_approved === "" || user.content_approved === " ") && user.content ? (
                                      <>
                                        <div className='d-flex flex-column justify-content-center gap-3' >
                                          {user.content_approved === "" &&
                                            <>
                                              <button className='btn btn-success' onClick={() => handleVerifieruserForcapaign(user.user.id, 'Accepted')}>Accept  </button>
                                              <button className='btn btn-danger' onClick={() => setShowDenyInput(user.user.id)}>Correction</button>
                                            </>

                                          }
                                          {user.content_approved === " " &&
                                            <>
                                              <button className='btn btn-success' onClick={() => handleVerifieruserForcapaign(user.user.id, 'Accepted')}> Accept  </button>
                                              <button className='btn btn-danger' onClick={() => setShowDenyInput(user.user.id)}>Correction</button>
                                            </>
                                          }
                                          <button className='btn btn-primary' onClick={() => handleVerifieruserForcapaign(user.user.id, 'Rejected')}>Rejected</button>
                                        </div>

                                      </>
                                    ) : (
                                      <p className='text-danger' >{user.approval}</p>
                                    )
                                    }
                                  </div>

                                  {showDenyInput === user?.user?.id && (
                                    <div className="deny-reason-input mt-5">
                                      <small>{user.user.id}</small>
                                      <textarea
                                        value={remark}
                                        onChange={(e) => setRemark(e.target.value)}
                                        placeholder="Enter reason for denial..."
                                      />
                                      <button className='btn btn-success' onClick={() => handleVerifieruserForcapaign(user.user.id, 'correction', remark)}>Submit</button>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <p className='text-danger' >No Content Provided</p>
                              )
                              }
                            </div>
                          </div>
                        }
                        {(user.influ_approval === "Pending" || user.influ_approval === "pending") ? (
                          <div className="user-actions-unique">
                            <button className="accept-button-unique" onClick={() => handleVerifieruserNameForcapaign(user.influ_id, "Accepted")}>Accept</button>
                            <button className="deny-button-unique" onClick={() => handleVerifieruserNameForcapaign(user.influ_id, "Rejected")} >Reject</button>
                          </div>
                        ) :
                          null
                        }
                        <button className="view-more-button-unique" onClick={() => toggleMoreDetails(user.user.influ_soc_link)}>View More</button>
                        {showMoreDetails === user.user.influ_soc_link && (
                          <div className="more-details-unique">
                            <div>
                              {viewmoreuserdata?.map((data) => {
                                return <div style={{ borderBottom: "1px solid black", padding: "10px", backgroundColor: "lightgray" }} >
                                  <p>
                                    platform : {data.platform}
                                  </p>
                                  <p>

                                    Link : <Link to={data.link} target="_blank" rel="noopener noreferrer">Open</Link>
                                  </p>
                                  <p>

                                    follower : {data.follower}
                                  </p>
                                </div>
                              })
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>


            </div>
          </>
        )}
      </div>
      <DeletePopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onDelete={deleteLanguage}
        message="Are you sure you want to delete this campaign?"
      />

      {showstatusEditPopup != "" &&
        <div style={{ position: "relative" }} >

          <div className='popup_for_edit_user'   >
            <div className="popup-inner_for_edit_user" style={{ maxWidth: "500px" }} >

              <div className="user-actions-unique">
                <button className="accept-button-unique" onClick={() => handleVerifieruserNameForcapaign(showstatusEditPopup, "Accepted")}>Accept</button>
                <button className="deny-button-unique" onClick={() => handleVerifieruserNameForcapaign(showstatusEditPopup, "Rejected")} >Reject</button>
                <button className="deny-button-unique" onClick={() => handleVerifieruserNameForcapaign(showstatusEditPopup, "Pending")} >Pending </button>
                <button className=" deny-button-unique btn btn-warning " style={{ position: "absolute", top: "10px", right: "10px" }} onClick={() => setShowstatusEditPopup("")}>close</button>
              </div>
            </div>
          </div>
        </div>
      }

    </>
  );
}

export default CampaignDetails;
