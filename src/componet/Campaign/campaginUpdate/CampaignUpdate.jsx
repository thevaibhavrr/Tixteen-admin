import React, { useState } from 'react';
import '../../../style/campaign/campaignUpdate.css';
import BackIcon from '../../../utils/BackIcon';


function CampaignUpdate() {
  const [campaign, setCampaign] = useState({
    id: '3',
    company: 'Company A',
    campaignName: 'New Product Launch',
    campaignBanner: 'https://via.placeholder.com/1200x400',
    campaignType: 'Paid',
    brandProduct: 'Super Gadget',
    targetIndustry: 'Technology',
    campaignLanguage: 'English',
    influencerAgeFrom: '18',
    influencerAgeTo: '35',
    influencerGender: 'All',
    describeProduct: 'This is a revolutionary new gadget that simplifies your life.',
    requiredDeliverables: ['Post', 'Story', 'Reel'],
    requiredFollowers: {
      Facebook: 5000,
      Instagram: 10000,
      Twitter: 3000,
      LinkedIn: 2000,
      Youtube: 8000,
    },
    hashtags: '#SuperGadget #TechRevolution',
    productImage: 'https://via.placeholder.com/400',
    platformPreference: 'Instagram',
    platformLink: 'https://instagram.com/supergadget',
    profilesToTag: '@techinfluencer, @gadgetlover',
    do: 'Showcase the unique features of the product',
    dont: 'Do not make false claims',
    productPrice: '₹299',
    deadline: '2024-12-31',
    screenshotsRequired: 'Yes',
    location: {
      country: 'Country A',
      state: 'State A',
      city: 'City A',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Campaign:', campaign);
    // Implement the logic to update the campaign details
  };

  return (
    <div className=''>
      <BackIcon path={`campaign/campaign-details/${campaign.id}`} />
      <div className="campaign-update">
        <h1 className="update-title">Update Campaign Details</h1>
        <form onSubmit={handleSubmit} className="campaign-form">
          <label>
            Campaign Name:
            <input
              type="text"
              name="campaignName"
              value={campaign.campaignName}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={campaign.company}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Campaign Type:
            <input
              type="text"
              name="campaignType"
              value={campaign.campaignType}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Brand Product:
            <input
              type="text"
              name="brandProduct"
              value={campaign.brandProduct}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Target Industry:
            <input
              type="text"
              name="targetIndustry"
              value={campaign.targetIndustry}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Campaign Language:
            <input
              type="text"
              name="campaignLanguage"
              value={campaign.campaignLanguage}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Influencer Age From:
            <input
              type="number"
              name="influencerAgeFrom"
              value={campaign.influencerAgeFrom}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Influencer Age To:
            <input
              type="number"
              name="influencerAgeTo"
              value={campaign.influencerAgeTo}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Influencer Gender:
            <input
              type="text"
              name="influencerGender"
              value={campaign.influencerGender}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Describe Product:
            <textarea
              name="describeProduct"
              value={campaign.describeProduct}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Hashtags:
            <input
              type="text"
              name="hashtags"
              value={campaign.hashtags}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Platform Preference:
            <input
              type="text"
              name="platformPreference"
              value={campaign.platformPreference}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Platform Link:
            <input
              type="text"
              name="platformLink"
              value={campaign.platformLink}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Profiles to Tag:
            <input
              type="text"
              name="profilesToTag"
              value={campaign.profilesToTag}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Do:
            <input
              type="text"
              name="do"
              value={campaign.do}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Don't:
            <input
              type="text"
              name="dont"
              value={campaign.dont}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Product Price:
            <input
              type="text"
              name="productPrice"
              value={campaign.productPrice}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Deadline:
            <input
              type="date"
              name="deadline"
              value={campaign.deadline}
              onChange={handleChange}
              className="form-input"
            />
          </label>
          <label>
            Screenshots Required:
            <select
              name="screenshotsRequired"
              value={campaign.screenshotsRequired}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
          <label>
            Location - Country:
            <input
              type="text"
              name="country"
              value={campaign.location.country}
              onChange={(e) => handleNestedChange(e, 'location')}
              className="form-input"
            />
          </label>
          <label>
            Location - State:
            <input
              type="text"
              name="state"
              value={campaign.location.state}
              onChange={(e) => handleNestedChange(e, 'location')}
              className="form-input"
            />
          </label>
          <label>
            Location - City:
            <input
              type="text"
              name="city"
              value={campaign.location.city}
              onChange={(e) => handleNestedChange(e, 'location')}
              className="form-input"
            />
          </label>
          <button type="submit" className="form-button">Update Campaign</button>
        </form>
      </div>
    </div>

  );
}

export default CampaignUpdate;
