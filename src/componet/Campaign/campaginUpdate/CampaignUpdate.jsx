
import React, { useEffect, useState } from 'react';
import '../../../style/campaign/campaignUpdate.css';
import BackIcon from '../../../utils/BackIcon';
import { useParams, useNavigate } from 'react-router-dom';
import { makeApi } from '../../../api/callApi.tsx';
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';
import { ToastContainer, toast } from "react-toastify";

function CampaignUpdate() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deliverables, setDeliverables] = useState([]);
  const [newDeliverable, setNewDeliverable] = useState("");


  const [campaign, setCampaign] = useState({
    id: '',
    campaign_name: '',
    campaign_type: '',
    product: '',
    industry: '',
    language: '',
    age: '',
    till_age: '',
    gender: '',
    remark: '',
    platforms: '',
    platform_link: '',
    profile_tag: '',
    to_do: '',
    not_todo: '',
    product_price: '',
    price: '',
    dead_line: '',
    is_screen_shots_required: '',
    country: '',
    state: '',
    city: '',
    approval: '',
  });

  const fetchCampaignDetails = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/v1/campaign/details/${id}`, 'GET');
      const campaignData = response.data.data;

      setCampaign({
        id: campaignData.id || '',
        campaign_name: campaignData.campaign_name || '',
        campaign_type: campaignData.campaign_type || '',
        product: campaignData.product || '',
        industry: campaignData.industry || '',
        language: campaignData.language || '',
        age: campaignData.age || '',
        till_age: campaignData.till_age || '',
        gender: campaignData.gender || '',
        remark: campaignData.remark || '',
        platforms: campaignData.platforms || '',
        platform_link: campaignData.platform_link || '',
        profile_tag: campaignData.profile_tag || '',
        to_do: campaignData.to_do || '',
        not_todo: campaignData.not_todo || '',
        product_price: campaignData.product_price || '',
        price: campaignData.price || '',
        dead_line: campaignData.dead_line ? campaignData.dead_line.substring(0, 10) : '',
        is_screen_shots_required: campaignData.is_screen_shots_required || 'No',
        country: campaignData.country || '',
        state: campaignData.state || '',
        city: campaignData.city || '',
        approval: campaignData.approval
      });

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
    fetchCampaignDetails();
    fetchCampaignDeliverables()
  }, [id]);

  const handleDeleteDeliverable = async (deletedelid) => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/campaign/deliverable/${deletedelid}`, 'DELETE');
      fetchCampaignDeliverables();
    } catch (error) {
      console.error('Error deleting campaign deliverable:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDeliverable = async (deliverableId, updatedName) => {
    try {
      setLoading(true);
      await makeApi(`/api/campaign/deliverable/${deliverableId}`, 'PUT', { deliverable: updatedName });
      fetchCampaignDeliverables();
    } catch (error) {
      console.error('Error updating campaign deliverable:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddDeliverable = async () => {
    if (!newDeliverable) return;

    try {
      setLoading(true);
      await makeApi('/api/campaign/deliverable', 'POST', { campaign_no: id, deliverable: newDeliverable });
      setNewDeliverable("");
      fetchCampaignDeliverables();
    } catch (error) {
      console.error('Error adding campaign deliverable:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setCampaign((prevCampaign) => ({
      ...prevCampaign,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, category) => {
    const { name, value } = e.target;
    setCampaign((prevCampaign) => ({
      ...prevCampaign,
      [category]: {
        ...prevCampaign[category],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeApi(`/v1/campaign/update/${id}`, 'PUT', campaign);
      toast("campaign update successfully", {
        onClose: () => {
          navigate(`/campaign/campaign-details/${id}`);
        }
      });
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={1700} />

      {loading && <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}> <PrimaryLoader /> </div>}

      <div className=''>
        <BackIcon path={`campaign/campaign-details/${id}`} />
        <div className="campaign-update">
          <h1 className="update-title">Update Campaign Details</h1>
          <form onSubmit={handleSubmit} className="campaign-form">
            <label>
              Campaign Name:
              <input
                type="text"
                name="campaign_name"
                value={campaign.campaign_name}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Approval:
              <select
                name="approval"
                value={campaign.approval}
                onChange={handleChange}
                className="form-input"
              >
                <option value="0">Inactive</option>
                <option value="1">Active</option>
              </select>
            </label>

            <label>
              Campaign Type:
              <input
                type="text"
                name="campaign_type"
                value={campaign.campaign_type}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Product:
              <input
                type="text"
                name="product"
                value={campaign.product}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Industry:
              <input
                type="text"
                name="industry"
                value={campaign.industry}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Language:
              <input
                type="text"
                name="language"
                value={campaign.language}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Age From:
              <input
                type="number"
                name="age"
                value={campaign.age}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Age To:
              <input
                type="number"
                name="till_age"
                value={campaign.till_age}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Gender:
              <input
                type="text"
                name="gender"
                value={campaign.gender}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Remark:
              <textarea
                name="remark"
                value={campaign.remark}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Platforms:
              <input
                type="text"
                name="platforms"
                value={campaign.platforms}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Platform Link:
              <input
                type="text"
                name="platform_link"
                value={campaign.platform_link}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Profile Tag:
              <input
                type="text"
                name="profile_tag"
                value={campaign.profile_tag}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              To Do:
              <input
                type="text"
                name="to_do"
                value={campaign.to_do}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Not To Do:
              <input
                type="text"
                name="not_todo"
                value={campaign.not_todo}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Product Price:
              <input
                type="text"
                name="product_price"
                value={campaign.product_price}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Payout:
              <input
                type="text"
                name="price"
                value={campaign.price}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Deadline:
              <input
                type="date"
                name="dead_line"
                value={campaign.dead_line}
                onChange={handleChange}
                className="form-input"
              />
            </label>
            <label>
              Screenshots Required:
              <select
                name="is_screen_shots_required"
                value={campaign.is_screen_shots_required}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            {/* <label>
            Location - Country:
            <input
              type="text"
              name="country"
              value={campaign.country}
              onChange={(e) => handleNestedChange(e, 'location')}
              className="form-input"
            />
          </label> */}
            {/* <label>
            Location - State:
            <input
              type="text"
              name="state"
              value={campaign.state}
              onChange={(e) => handleNestedChange(e, 'location')}
              className="form-input"
            />
          </label>
          <label>
            Location - City:
            <input
              type="text"
              name="city"
              value={campaign.city}
              onChange={(e) => handleNestedChange(e, 'location')}
              className="form-input"
            />
          </label> */}
            <button type="submit" className="form-button">Update Campaign</button>
          </form>
        </div>
        <div className='campaign-update' >
          <h4 className="update-title">Update Deliverables</h4>

          <div className="deliverables-container">
            {deliverables.map((item) => (
              <div key={item._id} className="deliverable-row">
                <input
                  type="text"
                  value={item.deliverable}
                  onChange={(e) => {
                    const updatedDeliverables = deliverables.map((deliverable) =>
                      deliverable._id === item._id ? { ...deliverable, deliverable: e.target.value } : deliverable
                    );
                    setDeliverables(updatedDeliverables);
                  }}
                  className="deliverable-input"
                />
                <button
                  onClick={() => handleUpdateDeliverable(item._id, item.deliverable)}
                  className="update-btn"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteDeliverable(item._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}

            <div className="add-deliverable-row">
              <input
                type="text"
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                placeholder="Add new deliverable"
                className="deliverable-input"
              />
              <button onClick={handleAddDeliverable} className="add-btn">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default CampaignUpdate;
