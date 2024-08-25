import React, { useEffect, useState } from 'react';
import '../../../style/campaign/campaignDetails.css';
import { Link, useParams } from 'react-router-dom';
import BackIcon from '../../../utils/BackIcon';
import EditIcon from '../../../utils/EditIcon';
import { makeApi } from '../../../api/callApi.tsx';
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';

function CampaignDetails() {
  const { id } = useParams();
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
  const [searchQuery, setSearchQuery] = useState('');



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



  useEffect(() => {
    fetchCampaignDetailsWithAppliedUsers();
    fetchFollowers()
  }, [id]);

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = filteredUsers.filter(user =>
      user?.user?.user_name.toLowerCase().includes(lowercasedQuery) ||
      formatPhoneNumber(user?.user?.mobile).includes(lowercasedQuery)
    );
    setFilteredUsers(filtered);
  };
useEffect(() => {
  fetchCampaignDetailsWithAppliedUsers();
  fetchFollowers();
}, [id]);

useEffect(() => {
  handleTabChange(selectedTab); // Reapply filter when appliedUsersList changes
}, [appliedUsersList]);


  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSearchQuery('');
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

    // Remove spaces from the phone number
    const cleanedNumber = number.replace(/\s+/g, '');

    // Conditionally add +91 if the number length is more than 10
    return cleanedNumber.length > 10 ? `+91${cleanedNumber}` : cleanedNumber;
  };
  const toggleMoreDetails = (userId) => {
    setShowMoreDetails(showMoreDetails === userId ? null : userId);
  };

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
      // Update the local state after the API call
      fetchCampaignDetailsWithAppliedUsers();

    } catch (error) {
      console.error('Error updating user approval:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleVerifieruserNameForcapaign = async (userId, approvalStatus,) => {
    try {
      setLoading(true);
      const requestBody = {
        influ_approval: approvalStatus,
        accept_date: new Date().toISOString(),
      };

      const response = await makeApi(`/v1/influencer/edit-apply-campaign/${userId}/${id}`, "PUT", requestBody);
      // Update the local state after the API call
      fetchCampaignDetailsWithAppliedUsers();

    } catch (error) {
      console.error('Error updating user approval:', error);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (deadline) => {
    const dateObj = new Date(deadline);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed
    const year = dateObj.getFullYear().toString().slice(-2); // Extract last two digits of the year
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

  

  return (
    <>
      {loading && <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}> <PrimaryLoader /> </div>}
      <div>
        <BackIcon path={"campaign/CampaignList"} />
      </div>
      <div className="campaign-details-unique">
        <EditIcon path={`campaign/update-campaign/${id}`} />
        <img src="https://cdn.shopify.com/s/files/1/1276/5299/files/Filler-mobile-2-power-sunglasses.jpg?v=1685976704?v=1719360000163" alt="Campaign Banner" className="campaign-banner-unique" />
        <div className="campaign-content-unique">
          <h1 className="campaign-title-unique">{campaignDetails?.campaign_name}</h1>
          <p className="campaign-status-unique"><strong>Status:</strong> {campaignDetails?.status}</p>
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
          <p className="campaign-tags-unique"><strong>Profiles to Tag: </strong> {campaignDetails?.profile_tag}</p>
          <p className="campaign-do-unique"> <strong> Do: </strong> {campaignDetails?.to_do ? campaignDetails?.to_do : "N/A"}</p>
          <p className="campaign-dont-unique"> <strong> Don't: </strong> {campaignDetails?.not_todo ? campaignDetails?.not_todo : "N/A"}</p>
          <p className="campaign-price-unique"> <strong> Price: </strong> {campaignDetails?.price ? campaignDetails?.price : "N/A"}</p>
          <p className="campaign-deadline-unique"> <strong> Deadline:</strong> {campaignDetails?.dead_line}</p>
          <p className="campaign-deadline-unique" ><strong> Created Date: </strong> {campaignDetails?.created_date}</p>

          <p className="campaign-screenshots-unique"><strong>Screenshots Required:</strong> {campaignDetails?.is_screen_shots_required ? "Yes" : "No"}</p>

          <div className="campaign-location-unique">
            <h3>Location</h3>
            <p>Country: {campaignDetails?.country}</p>
            <p>State: {campaignDetails?.state}</p>
            <p>City: {campaignDetails?.city}</p>
          </div>
        </div>
        <button onClick={() => setShowAppliedUsers(!showAppliedUsers)} className="view-applied-users-button">
          View Applied Users
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.225 3.16-1.272zM4 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4M1 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0" />
          </svg>
        </button>
      </div>
      <div className='container' >

        {showAppliedUsers && (
          <div className="applied-users-list-unique">
            <>
              <div>
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
                  </div>
                  {/* <input
                className="search-box"
                type="text"
                placeholder="Search by name or number..."
                onChange={(e) => handleSearch(e.target.value)}
              /> */}



                </div>
              </div>
              <div>
                {filteredUsers.length === 0 ? <p className='text-center'>No Users Found</p> : (<>

                  {filteredUsers?.map((user, index) => (

                    <div key={user?.user?.id} className={`applied-user-card-unique ${user?.user?.status === 'accepted' ? 'accepted' : user?.user?.status === 'denied' ? 'denied' : ''}`}>
                      <div className="applied-user-content-unique">
                        <div className='d-flex flex-column gap-4 align-items-center'>
                          <div>
                            {/* <img src={user.image} alt={user.name} className="user-image-unique" /> */}
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&s" alt={user.name} className="user-image-unique" />
                          </div>
                          <Link to={`/user/user-details/${user?.user?._id}`} target='_blank' >
                            <div className='btn btn-warning'>View Profile</div>
                          </Link>
                        </div>
                        <div className="user-details-unique">
                          <p>Apply Date: {formatDate(user?.opt_date)}</p>
                          <p>Name: <strong> {user?.user?.user_name}</strong>, <br />  City: <strong> {user?.user?.ship_city}</strong>, <br/>  Contact: <strong> {formatPhoneNumber(user?.user?.mobile)}</strong></p>
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
                          <p>Level: {user?.user?.level}</p>
                          {/* <p>Link: <a href={user?.user?.link} target="_blank" rel="noopener noreferrer">{user?.user?.socialMedia}</a></p> */}
                          <div className='d-flex gap-3' >
                            {console.log(user?.user?.socialMedia?.link)}
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
                          {(user?.influ_approval === 'Rejected' || user?.influ_approval === 'rejected' ) && <p className='text-danger' > This user has been Rejected </p>}
                          {(user.influ_approval === 'Accepted' || user.influ_approval === 'accepted' )&&
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
                                      {(user.approval === "Pending" || user.approval === "pending" ) && (user.content_approved === "" || user.content_approved === " ") && user.content ? (
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
                          {(user.influ_approval === "Pending" || user.influ_approval === "pending" ) ? (
                            <div className="user-actions-unique">
                              <button className="accept-button-unique" onClick={() => handleVerifieruserNameForcapaign(user.influ_id, "Accepted")}>Accept</button>
                              <button className="deny-button-unique" onClick={() => handleVerifieruserNameForcapaign(user.influ_id, "Rejected")} >Reject</button>
                            </div>
                          ) :
                            null
                          }
                          <button className="view-more-button-unique" onClick={() => toggleMoreDetails(user.id)}>View More</button>
                          {showMoreDetails === user.id && (
                            <div className="more-details-unique">
                              <p>Instagram Followers: {user?.user?.instagramFollowers}</p>
                              <p>YouTube Subscribers: {user?.user?.youtubeSubscribers}</p>
                              <p>Facebook Followers: {user?.user?.facebookFollowers}</p>
                              <p>Engagement Rate: {user?.user?.engagementRate}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  ))}
                </>)}

              </div>
            </>
          </div>
        )}
      </div>
      <div style={{ height: "30vh" }} ></div>
    </>
  );
};

export default CampaignDetails;

// import React, { useEffect, useState } from 'react';
// import '../../../style/campaign/campaignDetails.css';
// import { Link, useParams } from 'react-router-dom';
// import BackIcon from '../../../utils/BackIcon';
// import EditIcon from '../../../utils/EditIcon';
// import { makeApi } from '../../../api/callApi.tsx';
// import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';

// function CampaignDetails() {
//   const { id } = useParams();
//   const [showAppliedUsers, setShowAppliedUsers] = useState(false);
//   const [showMoreDetails, setShowMoreDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [campaignDetails, setCampaignDetails] = useState(null);
//   const [appliedUsersList, setAppliedUsersList] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('Accepted');
//   const [showDenyInput, setShowDenyInput] = useState("");
//   const [remark, setRemark] = useState('');
//   const [followerrequired, setFollowerrequired] = useState([]);

//   const fetchCampaignDetailsWithAppliedUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/v1/apply-campaign-details/campaign/${id}`, 'GET');

//       if (response && response.data) {
//         setCampaignDetails(response.data.campaign);
//         setAppliedUsersList(response.data.applyUsers);
//         setFilteredUsers(response.data.applyUsers.filter(user => user.influ_approval === 'Accepted'));
//       } else {
//         console.error('No data received from API');
//       }
//     } catch (error) {
//       console.error('Error fetching campaign details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchFollowers = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/v1/required-follower/campaign/${id}`, 'GET');
//       setFollowerrequired(response.data.data);
//     } catch (error) {
//       console.error('Error fetching campaign details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCampaignDetailsWithAppliedUsers();
//     fetchFollowers();
//   }, [id]);

  // const handleSearch = (query) => {
  //   const lowercasedQuery = query.toLowerCase();
  //   const filtered = filteredUsers.filter(user =>
  //     user?.user?.user_name.toLowerCase().includes(lowercasedQuery) ||
  //     formatPhoneNumber(user?.user?.mobile).includes(lowercasedQuery)
  //   );
  //   setFilteredUsers(filtered);
  // };

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//     switch (tab) {
//       case 'Pending':
//         setFilteredUsers(appliedUsersList.filter(user => user.influ_approval === 'Pending'));
//         break;
//       case 'Rejected':
//         setFilteredUsers(appliedUsersList.filter(user => user.influ_approval === 'Rejected'));
//         break;
//       case 'Accepted':
//         setFilteredUsers(appliedUsersList.filter(user => user.influ_approval === 'Accepted'));
//         break;
//       default:
//         setFilteredUsers(appliedUsersList.filter(user => user.influ_approval === 'Accepted'));
//         break;
//     }
//   };

//   const formatPhoneNumber = (number) => {
//     if (!number) return '';

//     const cleanedNumber = number.replace(/\s+/g, '');

//     return cleanedNumber.length > 10 ? `+91${cleanedNumber}` : cleanedNumber;
//   };

//   const toggleMoreDetails = (userId) => {
//     setShowMoreDetails(showMoreDetails === userId ? null : userId);
//   };

//   const handleVerifieruserForcapaign = async (userId, approvalStatus, changes = '') => {
//     try {
//       setLoading(true);
//       const requestBody = {
//         content_approved: approvalStatus,
//         approval: approvalStatus === 'Approved' ? '1' : '0',
//         content_approved_date: new Date().toISOString(),
//         change_reason: changes,
//       };

//       const response = await makeApi(`/v1/influencer/edit-apply-campaign/${userId}/${id}`, "PUT", requestBody);
//       fetchCampaignDetailsWithAppliedUsers();
//     } catch (error) {
//       console.error('Error updating user approval:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifieruserNameForcapaign = async (userId, approvalStatus) => {
//     try {
//       setLoading(true);
//       const requestBody = {
//         influ_approval: approvalStatus,
//         accept_date: new Date().toISOString(),
//       };

//       const response = await makeApi(`/v1/influencer/edit-apply-campaign/${userId}/${id}`, "PUT", requestBody);
//       fetchCampaignDetailsWithAppliedUsers();
//     } catch (error) {
//       console.error('Error updating user approval:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (deadline) => {
//     const dateObj = new Date(deadline);
//     const day = dateObj.getDate().toString().padStart(2, '0');
//     const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
//     const year = dateObj.getFullYear().toString().slice(-2);
//     return `${day}/${month}/${year}`;
//   };

//   const getFullLink = (platform, link) => {
//     if (!link.startsWith("www.") && !link.startsWith("https://")) {
//       switch (platform) {
//         case "Instagram":
//           return `https://www.instagram.com/${link}`;
//         case "Facebook":
//           return `https://www.facebook.com/${link}`;
//         case "YouTube":
//           return `https://www.youtube.com/${link}`;
//         default:
//           return link;
//       }
//     }
//     return link;
//   };

//   return (
//     <>
//       {loading && (
//         <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}>
//           <PrimaryLoader />
//         </div>
//       )}
//       <div>
//         <BackIcon path={"campaign/CampaignList"} />
//       </div>
//       <div className="campaign-details-unique">
//         <EditIcon path={`campaign/update-campaign/${id}`} />
//         <img src="https://cdn.shopify.com/s/files/1/1276/5299/files/Filler-mobile-2-power-sunglasses.jpg?v=1685976704?v=1719360000163" alt="Campaign Banner" className="campaign-banner-unique" />
//         <div className="campaign-content-unique">
//           <h1 className="campaign-title-unique">{campaignDetails?.campaign_name}</h1>
//           <p className="campaign-status-unique"><strong>Status:</strong> {campaignDetails?.status}</p>
//           <p className="campaign-type-unique"><strong>Type:</strong> {campaignDetails?.campaign_type}</p>
//           <p className="campaign-product-unique"><strong>Product:</strong> {campaignDetails?.product}</p>
//           <p className="campaign-industry-unique"><strong>Target Industry:</strong> {campaignDetails?.industry}</p>
//           <p className="campaign-language-unique"><strong>Language:</strong> {campaignDetails?.language}</p>
//           <p className="campaign-age-unique"><strong>Influencer Age:</strong> {campaignDetails?.age} - {campaignDetails?.till_age}</p>
//           <p className="campaign-gender-unique"><strong>Gender:</strong> {campaignDetails?.gender}</p>
//           <p className="campaign-description-unique"><strong>Description:</strong> {campaignDetails?.remark}</p>
//           <p className="campaign-deliverables-unique"><strong>Deliverables:</strong> {campaignDetails?.requiredDeliverables?.join(', ') || 'N/A'}</p>
//           <div className="campaign-followers-unique">
//             <h3><strong>Required Followers</strong></h3>
//             {followerrequired.length > 0 ? followerrequired?.map((follower, index) => (
//               <div key={index}>
//                 <p> <strong> {follower?.platforms[0]}:</strong> {follower?.followers}</p>
//               </div>
//             )) : <p>No followers required</p>}
//           </div>
//           <p className="campaign-hashtags-unique"><strong>Hashtags:</strong> {campaignDetails?.hash_tag}</p>
//           <img src="https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?cs=srgb&dl=pexels-nitin-creative-46710.jpg&fm=jpg" alt="Product" className="campaign-product-image-unique" />
//           <p className="campaign-platform-unique"><strong>Platform:</strong> {campaignDetails?.platforms}</p>
//           <p className="campaign-link-unique"><strong>Link:</strong> <Link to={campaignDetails?.platform_link} target="_blank" rel="noopener noreferrer">{campaignDetails?.platform_link}</Link></p>
//           <p className="campaign-tags-unique"><strong>Profiles to Tag: </strong>{campaignDetails?.profile_tag}</p>
//           <p className="campaign-location-unique"><strong>Location:</strong> {campaignDetails?.city}, {campaignDetails?.state}, {campaignDetails?.country}</p>
//           <p className="campaign-deadline-unique"><strong>Deadline:</strong> {formatDate(campaignDetails?.dead_line)}</p>
//           <p className="campaign-todo-unique"><strong>To Do:</strong> {campaignDetails?.to_do}</p>
//           <p className="campaign-nottodo-unique"><strong>Not To Do:</strong> {campaignDetails?.not_todo}</p>
//           <p className="campaign-deadline-unique"> <strong> Deadline:</strong> {campaignDetails?.dead_line}</p>
//           <p className="campaign-deadline-unique" ><strong> Created Date: </strong> {campaignDetails?.created_date}</p>

//           <p className="campaign-screenshots-unique"><strong>Screenshots Required:</strong> {campaignDetails?.is_screen_shots_required ? "Yes" : "No"}</p>
//           <div className="campaign-location-unique">
//             <h3>Location</h3>
//             <p>Country: {campaignDetails?.country}</p>
//             <p>State: {campaignDetails?.state}</p>
//             <p>City: {campaignDetails?.city}</p>
//           </div>
//         </div>
//          <button
//           onClick={() => {
//             setShowAppliedUsers(!showAppliedUsers);
//           }}
//           className="apply-details-unique">
//           Applied Users Details
//         </button>
//       </div>

//       <div className="container">
       
//         {showAppliedUsers &&
//           <div>
//             <div className="tab-header">
//               <button
//                 className={selectedTab === 'Accepted' ? 'active' : ''}
//                 onClick={() => handleTabChange('Accepted')}>
//                 Accepted
//               </button>
//               <button
//                 className={selectedTab === 'Pending' ? 'active' : ''}
//                 onClick={() => handleTabChange('Pending')}>
//                 Pending
//               </button>
//               <button
//                 className={selectedTab === 'Rejected' ? 'active' : ''}
//                 onClick={() => handleTabChange('Rejected')}>
//                 Rejected
//               </button>
//               <input
//                 className="search-box"
//                 type="text"
//                 placeholder="Search by name or number..."
//                 onChange={(e) => handleSearch(e.target.value)}
//               />
//             </div>
//             <div className="applied-users-list">
//               {filteredUsers.length === 0 && (
//                 <div className="no-users-message">No users available</div>
//               )}
//               {filteredUsers.map((user) => (
//                 <div className="applied-user" key={user._id}>
//                   <div className="applied-user-main">
//                     <p className="applied-user-detail"><strong>Username:</strong> {user?.user?.user_name}</p>
//                     <p className="applied-user-detail"><strong>Mobile:</strong> {formatPhoneNumber(user?.user?.mobile)}</p>
//                     <p className="applied-user-detail"><strong>Approval Status:</strong> {user?.influ_approval}</p>
//                     <button className="show-details-button" onClick={() => toggleMoreDetails(user._id)}>
//                       {showMoreDetails === user._id ? 'Hide Details' : 'Show Details'}
//                     </button>
//                   </div>
//                   {showMoreDetails === user._id && (
//                     <div className="applied-user-more-details">
//                       <p className="applied-user-detail"><strong>Campaign Applied:</strong> {formatDate(user?.apply_date)}</p>
//                       <p className="applied-user-detail"><strong>Content Approved:</strong> {user?.content_approved}</p>
//                       {user?.content_approved === 'Rejected' && (
//                         <div>
//                           <textarea
//                             className="deny-reason-input"
//                             placeholder="Enter Reason for Rejection"
//                             value={remark}
//                             onChange={(e) => setRemark(e.target.value)}
//                           />
//                           <button
//                             className="approve-button"
//                             onClick={() => handleVerifieruserForcapaign(user._id, "Approved", remark)}>
//                             Submit Reason
//                           </button>
//                         </div>
//                       )}
//                       <button
//                         className="approve-button"
//                         onClick={() => handleVerifieruserNameForcapaign(user._id, user.influ_approval === 'Accepted' ? 'Rejected' : 'Accepted')}>
//                         {user.influ_approval === 'Accepted' ? 'Reject' : 'Approve'}
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>}
//       </div>
//     </>
//   );
// }

// export default CampaignDetails;
