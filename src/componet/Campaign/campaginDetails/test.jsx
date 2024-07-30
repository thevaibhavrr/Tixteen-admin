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
  const [showDenyInput, setShowDenyInput] = useState(false);
  const [remark, setRemark] = useState('');
  const [followerrequired, setFollowerrequired] = useState([]);

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
    fetchFollowers();
  }, [id]);

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

      const response = await makeApi(`/v1/edit-apply-campaign/${userId}/${id}`, "PUT", requestBody);

      if (response.success) {
        // Update the local state after the API call
        fetchCampaignDetailsWithAppliedUsers();
      } else {
        console.error('Error updating user approval:', response.message);
      }
    } catch (error) {
      console.error('Error updating user approval:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}> <PrimaryLoader /> </div>}
      <div>
        <BackIcon path={"campaign/CampaignList"} />
      </div>
      <div className="campaign-details-unique">
        <EditIcon path={`campaign/update-campaign/${campaignDetails?.id}`} />
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
            <path d="M15 14s-1 0-1-1 1-4 4-4 4 4 4 4 1 1 1 1H15zm-4-4s-1 0-1-1 1-4 4-4 4 4 4 4 1 1 1 1H11zm-4-6a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm0 8H1v-1s1-3 4-3 4 3 4 3v1zm5-3a2 2 0 1 0-4 0 2 2 0 0 0 4 0z" />
          </svg>
        </button>
        {showAppliedUsers && (
          <div className="applied-users-container">
            <div className="campaign-tabs">
              <button
                className={selectedTab === 'Accepted' ? 'active' : ''}
                onClick={() => handleTabChange('Accepted')}
              >
                Accepted
              </button>
              <button
                className={selectedTab === 'Pending' ? 'active' : ''}
                onClick={() => handleTabChange('Pending')}
              >
                Pending
              </button>
              <button
                className={selectedTab === 'Rejected' ? 'active' : ''}
                onClick={() => handleTabChange('Rejected')}
              >
                Rejected
              </button>
            </div>
            <h2>Applied Users</h2>
            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
              <div key={user.id} className="applied-user">
                <div className="applied-user-basic">
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Approval Status:</strong> {user.influ_approval}</p>
                  <button onClick={() => toggleMoreDetails(user.id)}>
                    {showMoreDetails === user.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                {showMoreDetails === user.id && (
                  <div className="applied-user-details">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>City:</strong> {user.city}</p>
                    <p><strong>State:</strong> {user.state}</p>
                    <p><strong>Country:</strong> {user.country}</p>
                    <p><strong>Followers:</strong> {user.follower_count}</p>
                    <p><strong>Content:</strong> {user.content}</p>
                    <div className="applied-user-action-buttons">
                      <button onClick={() => handleVerifieruserForcapaign(user.id, 'Accepted')}>Accept</button>
                      <button onClick={() => setShowDenyInput(user.id)}>Deny</button>
                      <button onClick={() => handleVerifieruserForcapaign(user.id, 'Changes')}>Changes</button>
                    </div>
                    {showDenyInput === user.id && (
                      <div className="deny-reason-input">
                        <textarea
                          value={remark}
                          onChange={(e) => setRemark(e.target.value)}
                          placeholder="Enter reason for denial..."
                        />
                        <button onClick={() => handleVerifieruserForcapaign(user.id, 'Rejected', remark)}>Submit</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )) : (
              <p>No users found for this campaign.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CampaignDetails;
