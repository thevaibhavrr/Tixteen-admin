import React, { useState } from 'react';
import "../../style/advance/ApplyCampaignForm.css";

const ApplyCampaignForm = () => {
  const [formData, setFormData] = useState({
    level: '',
    Noof_influencer: '1',
    category_id: '',
    client_id: '',
    campaign_no: '',
    amount: '',
    influ_approval: 'Pending',
    availability: '', 
    content: '',
    content_upload_date: '',
    post_link: '',
    approval: '',
    content_approved: '',
    submition: '',
    change_reason: '',
    opt_date: '',
    accept_date: '',
    content_approved_date: '',
    cam_complt_date: '',
    submit_date: '',
    pay_scedule_date: '',
    rewards: '',
    transaction_id: '',
    payment: '',
    payment_date: '',
    year: '',
    month: '',
    influ_puchase_id: '',
    approval_rejection_date: '',
    hold: '',
    status_change_by: '',
    screenshots: '',
    product_price: '',
  });

  const dummyUsers = [{ id: '1', name: 'User 1' }, { id: '2', name: 'User 2' }];
  const dummyCampaigns = [{ id: '1001', name: 'Campaign 1' }, { id: '1002', name: 'Campaign 2' }];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserSelect = (userId) => {
    setFormData({ ...formData, influ_id: userId });
  };

  const handleCampaignSelect = (campaignId) => {
    setFormData({ ...formData, campaign_no: campaignId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="apply-campaign-form">
      <label className="apply-campaign-label">
        Level:
        <input type="text" name="level" value={formData.level} onChange={handleChange} className="apply-campaign-input" />
      </label>

      <label className="apply-campaign-label">
        No of Influencers:
        <input type="text" name="Noof_influencer" value={formData.Noof_influencer} onChange={handleChange} className="apply-campaign-input" />
      </label>

      <label className="apply-campaign-label">
        Category ID:
        <input type="text" name="category_id" value={formData.category_id} onChange={handleChange} className="apply-campaign-input" />
      </label>

      <label className="apply-campaign-label">
        Client ID:
        <input type="text" name="client_id" value={formData.client_id} onChange={handleChange} className="apply-campaign-input" />
      </label>

      <label className="apply-campaign-label">
        Campaign No:
        <input type="text" name="campaign_no" value={formData.campaign_no} onChange={handleChange} className="apply-campaign-input" />
      </label>

      <label className="apply-campaign-label">
        Amount:
        <input type="text" name="amount" value={formData.amount} onChange={handleChange} className="apply-campaign-input" />
      </label>

      <label className="apply-campaign-label">
        Opt Date:
        <input type="date" name="opt_date" value={formData.opt_date} onChange={handleDateChange} className="apply-campaign-input" />
      </label>

      <label className="apply-campaign-label">
        Screenshots:
        <input type="file" name="screenshots" onChange={handleFileChange} className="apply-campaign-input" />
      </label>

      <div className="apply-campaign-search">
        <input
          type="text"
          placeholder="Search Users"
          className="apply-campaign-input"
          onChange={(e) => handleChange(e)}
        />
        <ul className="apply-campaign-suggestions">
          {dummyUsers.map(user => (
            <li key={user.id} onClick={() => handleUserSelect(user.id)} className="apply-campaign-suggestion">
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="apply-campaign-search">
        <input
          type="text"
          placeholder="Search Campaigns"
          className="apply-campaign-input"
          onChange={(e) => handleChange(e)}
        />
        <ul className="apply-campaign-suggestions">
          {dummyCampaigns.map(campaign => (
            <li key={campaign.id} onClick={() => handleCampaignSelect(campaign.id)} className="apply-campaign-suggestion">
              {campaign.name}
            </li>
          ))}
        </ul>
      </div>

      <button type="submit" className="apply-campaign-button">Apply</button>
    </form>
  );
};

export default ApplyCampaignForm;
