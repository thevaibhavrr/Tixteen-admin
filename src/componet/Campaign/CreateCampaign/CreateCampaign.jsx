
import React, { useState } from 'react';
import "../../../style/campaign/createCampaign.css";
import CampaignRequirement from './campaginrequiemnt';
import { makeApi } from '../../../api/callApi.tsx';
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';
import uploadToCloudinary from '../../../utils/cloudinaryUpload.jsx';

function CreateCampaign() {
  const [totalCampaignPrice, setTotalCampaignPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    campaignName: '',
    campaignBanner: '',
    campaignType: '',
    brandProduct: '',
    targetIndustry: '',
    campaignLanguage: '',
    influencerAgeFrom: '',
    influencerAgeTo: '',
    influencerGender: '',
    describeProduct: '',
    requiredDeliverables: [],
    requiredFollowers: {
      Facebook: 0,
      Instagram: 0,
      Twitter: 0,
      LinkedIn: 0,
      Youtube: 0,
    },
    hashtags: '',
    productImage: '',
    platformPreference: '',
    platformLink: '',
    profilesToTag: '',
    do: '',
    dont: '',
    productPrice: '',
    deadline: '',
    screenshotsRequired: '',
    location: {
      country: '',
      state: '',
      city: '',
    },
  });

  const companies = [
    { value: '1', label: 'Company A' },
    { value: '2', label: 'Company B' },
    { value: '3', label: 'Company C' },
  ];
  const TARGETIndustry = [
    { value: '1', label: 'Education' },
    { value: '2', label: 'Health' },
    { value: '3', label: 'Entertainment' },
    { value: '4', label: 'Sports' },
    { value: '5', label: 'Business' },
    { value: '6', label: 'Technology' },
    { value: '7', label: 'Finance' },
  ];
  const CampaignLanguage = [
    { value: '1', label: 'English' },
    { value: '2', label: 'Hindi' },
    { value: '3', label: 'Spanish' },
  ];
  const INFLUENCERSGENDER = [
    { value: '1', label: 'Male' },
    { value: '2', label: 'Female' },
  ];
  const RequiredDeliverable = [
    { value: '1', label: 'Post' },
    { value: '2', label: 'Story' },
    { value: '3', label: 'Reel' },
  ];

  const countries = [
    { value: '1', label: 'Country A' },
    { value: '2', label: 'Country B' },
    { value: '3', label: 'Country C' },
  ];

  const states = [
    { value: '1', label: 'State A' },
    { value: '2', label: 'State B' },
    { value: '3', label: 'State C' },
  ];

  const cities = [
    { value: '1', label: 'City A' },
    { value: '2', label: 'City B' },
    { value: '3', label: 'City C' },
  ];

  const handleTotal = (totalValue) => {
    console.log(totalValue);
    setTotalCampaignPrice(totalValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNestedChange = (e, group, key) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [group]: {
        ...formData[group],
        [key]: value,
      },
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      requiredDeliverables: checked
        ? [...formData.requiredDeliverables, name]
        : formData.requiredDeliverables.filter((item) => item !== name),
    });
  };

  const handleFileChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const uploadedUrl = await uploadToCloudinary(file);
        setFormData({
          ...formData,
          [fieldName]: uploadedUrl,
        });
      } catch (error) {
        console.error("Error uploading file: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the form data to the console
    console.log('Form Data:', { ...formData, totalCampaignPrice });

    // Send the form data to the API
    try {
      setLoading(true);
      const response = await makeApi('/admin/api/create-campaign', 'POST', { ...formData, totalCampaignPrice });
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading &&
        <div style={{ height:"100vh" , width:"100%", top:"0" , position:"fixed" }} >
          <PrimaryLoader />
        </div>
      }
      <CampaignRequirement totalSum={handleTotal} />
      <div className='main_create_campaign_requirement'>
        <h1 className='create_campaign_select_category_header'>MAKE CAMPAIGN</h1>
        <div className='create_campaign_select_category_section'>
          <div className='create_campaign_form_title'>PLEASE ENTER THE CAMPAIGN DETAILS</div>
          <div className='create_campaign_form' >
            {/* Company dropdown */}
            <div className='form_group'>
              <label htmlFor="companySelect" className='form_label'>Select a company:</label>
              <select id="companySelect" name="company" className='form_select' onChange={handleChange}>
                {companies.map((company) => (
                  <option key={company.value} value={company.value}>
                    {company.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Campaign Name */}
            <div className='form_group'>
              <label htmlFor="campaignName" className='form_label'>Campaign Name:</label>
              <input type="text" id="campaignName" name="campaignName" className='form_input' onChange={handleChange} />
            </div>
            {/* Campaign Banner */}
            <div className='form_group'>
              <label htmlFor="campaignBanner" className='form_label'>Campaign Banner:</label>
              <input type="file" id="campaignBanner" name="campaignBanner" className='form_file_input' onChange={(e) => handleFileChange(e, 'campaignBanner')} />
            </div>
            {/* Campaign Type */}
            <div className='form_group'>
              <label className='form_label'>Campaign Type:</label>
              <div className='form_radio_group'>
                <input type="radio" id="Paid" name="campaignType" value="Paid" className='form_radio_input' onChange={handleChange} />
                <label htmlFor="Paid" className='form_radio_label'>Paid</label>
                <input type="radio" id="Barter" name="campaignType" value="Barter" className='form_radio_input' onChange={handleChange} />
                <label htmlFor="Barter" className='form_radio_label'>Barter</label>
              </div>
            </div>
            {/* Brand Product */}
            <div className='form_group'>
              <label htmlFor="brandProduct" className='form_label'>Brand Product:</label>
              <input type="text" id="brandProduct" name="brandProduct" className='form_input' onChange={handleChange} />
            </div>
            {/* Target Industry */}
            <div className='form_group'>
              <label htmlFor="targetIndustry" className='form_label'>TARGET Industry:</label>
              <select id="targetIndustry" name="targetIndustry" className='form_select' onChange={handleChange}>
                {TARGETIndustry.map((industry) => (
                  <option key={industry.value} value={industry.value}>
                    {industry.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Campaign Language */}
            <div className='form_group'>
              <label htmlFor="campaignLanguage" className='form_label'>Campaign Language:</label>
              <select id="campaignLanguage" name="campaignLanguage" className='form_select' onChange={handleChange}>
                {CampaignLanguage.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Influencer's Age */}
            <div className='form_group'>
              <label htmlFor="influencerAge" className='form_label'>Influencer's Age:</label>
              <div className='form_age_group'>
                <input type="text" id="influencerAgeFrom" name="influencerAgeFrom" placeholder='From' className='form_input form_age_input' onChange={handleChange} />
                <input type="text" id="influencerAgeTo" name="influencerAgeTo" placeholder='To' className='form_input form_age_input' onChange={handleChange} />
              </div>
            </div>
            {/* Influencer's Gender */}
            <div className='form_group'>
              <label htmlFor="influencerGender" className='form_label'>Influencer's Gender:</label>
              <select id="influencerGender" name="influencerGender" className='form_select' onChange={handleChange}>
                {INFLUENCERSGENDER.map((gender) => (
                  <option key={gender.value} value={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Describe your Product */}
            <div className='form_group'>
              <label htmlFor="describeProduct" className='form_label'>Describe your Product:</label>
              <textarea id="describeProduct" name="describeProduct" className='form_textarea' onChange={handleChange}></textarea>
            </div>
            {/* Required Deliverable */}
            <div className='form_group'>
              <label className='form_label'>Required Deliverable:</label>
              <div className='form_checkbox_group'>
                {RequiredDeliverable.map((deliverable) => (
                  <div key={deliverable.value} className='form_checkbox_item'>
                    <input
                      type="checkbox"
                      id={deliverable.value}
                      name={deliverable.value}
                      value={deliverable.value}
                      className='form_checkbox_input'
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={deliverable.value} className='form_checkbox_label'>{deliverable.label}</label>
                  </div>
                ))}
              </div>
            </div>
            {/* Required Followers */}
            <div className='form_group'>
              <label htmlFor="requiredFollowers" className='form_label'>Required Followers:</label>
              <div className='form_followers_group'>
                <input type="number" id="requiredFollowersFacebook" name="Facebook" placeholder='Facebook' className='form_input' onChange={(e) => handleNestedChange(e, 'requiredFollowers', 'Facebook')} />
                <input type="number" id="requiredFollowersInstagram" name="Instagram" placeholder='Instagram' className='form_input' onChange={(e) => handleNestedChange(e, 'requiredFollowers', 'Instagram')} />
                <input type="number" id="requiredFollowersTwitter" name="Twitter" placeholder='Twitter' className='form_input' onChange={(e) => handleNestedChange(e, 'requiredFollowers', 'Twitter')} />
                <input type="number" id="requiredFollowersLinkedIn" name="LinkedIn" placeholder='LinkedIn' className='form_input' onChange={(e) => handleNestedChange(e, 'requiredFollowers', 'LinkedIn')} />
                <input type="number" id="requiredFollowersYoutube" name="Youtube" placeholder='Youtube' className='form_input' onChange={(e) => handleNestedChange(e, 'requiredFollowers', 'Youtube')} />
              </div>
            </div>
            {/* Hashtags */}
            <div className='form_group'>
              <label htmlFor="hashtags" className='form_label'>Hashtags:</label>
              <input type="text" id="hashtags" name="hashtags" className='form_input' onChange={handleChange} />
            </div>
            {/* Product Image */}
            <div className='form_group'>
              <label htmlFor="productImage" className='form_label'>Product Image:</label>
              <input type="file" id="productImage" name="productImage" className='form_file_input' onChange={(e) => handleFileChange(e, 'productImage')} />
            </div>
            {/* Platform Preference */}
            <div className='form_group'>
              <label className='form_label'>Platform Preference:</label>
              <div className='form_radio_group'>
                <input type="radio" id="platformPreferenceFacebook" name="platformPreference" value="Facebook" className='form_radio_input' onChange={handleChange} />
                <label htmlFor="platformPreferenceFacebook" className='form_radio_label'>Facebook</label>
                <input type="radio" id="platformPreferenceInstagram" name="platformPreference" value="Instagram" className='form_radio_input' onChange={handleChange} />
                <label htmlFor="platformPreferenceInstagram" className='form_radio_label'>Instagram</label>
                <input type="radio" id="platformPreferenceTwitter" name="platformPreference" value="Twitter" className='form_radio_input' onChange={handleChange} />
                <label htmlFor="platformPreferenceTwitter" className='form_radio_label'>Twitter</label>
                <input type="radio" id="platformPreferenceLinkedIn" name="platformPreference" value="LinkedIn" className='form_radio_input' onChange={handleChange} />
                <label htmlFor="platformPreferenceLinkedIn" className='form_radio_label'>LinkedIn</label>
                <input type="radio" id="platformPreferenceYoutube" name="platformPreference" value="Youtube" className='form_radio_input' onChange={handleChange} />
                <label htmlFor="platformPreferenceYoutube" className='form_radio_label'>Youtube</label>
              </div>
            </div>
            {/* Platform Link */}
            <div className='form_group'>
              <label htmlFor="platformLink" className='form_label'>Platform Link:</label>
              <input type="text" id="platformLink" name="platformLink" className='form_input' onChange={handleChange} />
            </div>
            {/* Profiles To Tag */}
            <div className='form_group'>
              <label htmlFor="profilesToTag" className='form_label'>Profiles To Tag:</label>
              <input type="text" id="profilesToTag" name="profilesToTag" className='form_input' onChange={handleChange} />
            </div>
            {/* Do */}
            <div className='form_group'>
              <label htmlFor="do" className='form_label'>Do:</label>
              <input type="text" id="do" name="do" className='form_input' onChange={handleChange} />
            </div>
            {/* Don't */}
            <div className='form_group'>
              <label htmlFor="dont" className='form_label'>Don't:</label>
              <input type="text" id="dont" name="dont" className='form_input' onChange={handleChange} />
            </div>
            {/* Product Price */}
            <div className='form_group'>
              <label htmlFor="productPrice" className='form_label'>Product Price:</label>
              <input type="text" id="productPrice" name="productPrice" className='form_input' onChange={handleChange} />
            </div>
            {/* Price */}
            <div className='form_group'>
              <label htmlFor="price" className='form_label'>Price:</label>
              <input type="text" id="price" name="price" className='form_input' value={totalCampaignPrice} readOnly />
            </div>
            {/* Deadline */}
            <div className='form_group'>
              <label htmlFor="deadline" className='form_label'>Deadline:</label>
              <input type="date" id="deadline" name="deadline" className='form_input' onChange={handleChange} />
            </div>
            {/* Screenshots Required */}
            <div className='form_group'>
              <label className='form_label'>Screenshots Required:</label>
              <div className='form_radio_group'>
                <input type="radio" id="screenShotsRequiredYes" name="screenshotsRequired" value="Yes" className='form_radio_input' onChange={handleChange} />
                <label htmlFor="screenShotsRequiredYes" className='form_radio_label'>Yes</label>
                <input type="radio" id="screenShotsRequiredNo" name="screenshotsRequired" value="No" className='form_radio_input' onChange={handleChange} />
                <label htmlFor="screenShotsRequiredNo" className='form_radio_label'>No</label>
              </div>
            </div>
            {/* Choose Location */}
            <div className='form_location_group'>
              <div className='form_location_item'>
                <label htmlFor="selectCountry" className='form_label'>Select Country:</label>
                <select id="selectCountry" name="country" className='form_select' onChange={(e) => handleNestedChange(e, 'location', 'country')}>
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form_location_item'>
                <label htmlFor="selectState" className='form_label'>Select State:</label>
                <select id="selectState" name="state" className='form_select' onChange={(e) => handleNestedChange(e, 'location', 'state')}>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form_location_item'>
                <label htmlFor="selectCity" className='form_label'>Select City:</label>
                <select id="selectCity" name="city" className='form_select' onChange={(e) => handleNestedChange(e, 'location', 'city')}>
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Add Button */}
            <div className='form_group'>
              <button type="submit" onClick={handleSubmit} className='form_button btn bg-warning'>Add Campaign</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCampaign;

// import React, { useState } from 'react';
// import "../../../style/campaign/createCampaign.css";
// import CampaignRequirement from './campaginrequiemnt';
// import { makeApi } from '../../../api/callApi.tsx';
// import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';
// function CreateCampaign() {
//   const [totalCampaignPrice, setTotalCampaignPrice] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     company: '',
//     campaignName: '',
//     campaignBanner: '',
//     campaignType: '',
//     brandProduct: '',
//     targetIndustry: '',
//     campaignLanguage: '',
//     influencerAgeFrom: '',
//     influencerAgeTo: '',
//     influencerGender: '',
//     describeProduct: '',
//     requiredDeliverables: [],
//     requiredFollowers: {
//       Facebook: 0,
//       Instagram: 0,
//       Twitter: 0,
//       LinkedIn: 0,
//       Youtube: 0,
//     },
//     hashtags: '',
//     productImage: '',
//     platformPreference: '',
//     platformLink: '',
//     profilesToTag: '',
//     do: '',
//     dont: '',
//     productPrice: '',
//     deadline: '',
//     screenshotsRequired: '',
//     location: {
//       country: '',
//       state: '',
//       city: '',
//     },
//   });

//   const companies = [
//     { value: '1', label: 'Company A' },
//     { value: '2', label: 'Company B' },
//     { value: '3', label: 'Company C' },
//   ];
//   const TARGETIndustry = [
//     { value: '1', label: 'Education' },
//     { value: '2', label: 'Health' },
//     { value: '3', label: 'Entertainment' },
//     { value: '4', label: 'Sports' },
//     { value: '5', label: 'Business' },
//     { value: '6', label: 'Technology' },
//     { value: '7', label: 'Finance' },
//   ];
//   const CampaignLanguage = [
//     { value: '1', label: 'English' },
//     { value: '2', label: 'Hindi' },
//     { value: '3', label: 'Spanish' },
//   ];
//   const INFLUENCERSGENDER = [
//     { value: '1', label: 'Male' },
//     { value: '2', label: 'Female' },
//   ];
//   const RequiredDeliverable = [
//     { value: '1', label: 'Post' },
//     { value: '2', label: 'Story' },
//     { value: '3', label: 'Reel' },
//   ];

//   const countries = [
//     { value: '1', label: 'Country A' },
//     { value: '2', label: 'Country B' },
//     { value: '3', label: 'Country C' },
//   ];

//   const states = [
//     { value: '1', label: 'State A' },
//     { value: '2', label: 'State B' },
//     { value: '3', label: 'State C' },
//   ];

//   const cities = [
//     { value: '1', label: 'City A' },
//     { value: '2', label: 'City B' },
//     { value: '3', label: 'City C' },
//   ];

//   const handleTotal = (totalValue) => {
//     console.log(totalValue);
//     setTotalCampaignPrice(totalValue);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleNestedChange = (e, group, key) => {
//     const { value } = e.target;
//     setFormData({
//       ...formData,
//       [group]: {
//         ...formData[group],
//         [key]: value,
//       },
//     });
//   };

//   const handleCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData({
//       ...formData,
//       requiredDeliverables: checked
//         ? [...formData.requiredDeliverables, name]
//         : formData.requiredDeliverables.filter((item) => item !== name),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Log the form data to the console
//     console.log('Form Data:', { ...formData, totalCampaignPrice });

//     // Send the form data to the API
//     try {
//       setLoading(true);
//       const response = await makeApi('/admin/api/create-campaign', 'POST', { ...formData, totalCampaignPrice });
//       console.log('API Response:', response.data);
//     } catch (error) {
//       console.error('There was a problem with the fetch operation:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {loading &&
//         <div >
//           <PrimaryLoader />
//         </div>
//       }
//       <CampaignRequirement totalSum={handleTotal} />
//       <div className='main_create_campaign_requirement'>
//         <h1 className='create_campaign_select_category_header'>MAKE CAMPAIGN</h1>
//         <div className='create_campaign_select_category_section'>
//           <div className='create_campaign_form_title'>PLEASE ENTER THE CAMPAIGN DETAILS</div>
//           <div className='create_campaign_form' >
//             {/* Company dropdown */}
//             <div className='form_group'>
//               <label htmlFor="companySelect" className='form_label'>Select a company:</label>
//               <select id="companySelect" name="company" className='form_select' onChange={handleChange}>
//                 {companies.map((company) => (
//                   <option key={company.value} value={company.value}>
//                     {company.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {/* Campaign Name */}
//             <div className='form_group'>
//               <label htmlFor="campaignName" className='form_label'>Campaign Name:</label>
//               <input type="text" id="campaignName" name="campaignName" className='form_input' onChange={handleChange} />
//             </div>
//             {/* Campaign Banner */}
//             <div className='form_group'>
//               <label htmlFor="campaignBanner" className='form_label'>Campaign Banner:</label>
//               <input type="file" id="campaignBanner" name="campaignBanner" className='form_file_input' onChange={handleChange} />
//             </div>
//             {/* Campaign Type */}
//             <div className='form_group'>
//               <label className='form_label'>Campaign Type:</label>
//               <div className='form_radio_group'>
//                 <input type="radio" id="Paid" name="campaignType" value="Paid" className='form_radio_input' onChange={handleChange} />
//                 <label htmlFor="Paid" className='form_radio_label'>Paid</label>
//                 <input type="radio" id="Barter" name="campaignType" value="Barter" className='form_radio_input' onChange={handleChange} />
//                 <label htmlFor="Barter" className='form_radio_label'>Barter</label>
//               </div>
//             </div>
//             {/* Brand Product */}
//             <div className='form_group'>
//               <label htmlFor="brandProduct" className='form_label'>Brand Product:</label>
//               <input type="text" id="brandProduct" name="brandProduct" className='form_input' onChange={handleChange} />
//             </div>
//             {/* Target Industry */}
//             <div className='form_group'>
//               <label htmlFor="targetIndustry" className='form_label'>TARGET Industry:</label>
//               <select id="targetIndustry" name="targetIndustry" className='form_select' onChange={handleChange}>
//                 {TARGETIndustry.map((industry) => (
//                   <option key={industry.value} value={industry.value}>
//                     {industry.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {/* Campaign Language */}
//             <div className='form_group'>
//               <label htmlFor="campaignLanguage" className='form_label'>Campaign Language:</label>
//               <select id="campaignLanguage" name="campaignLanguage" className='form_select' onChange={handleChange}>
//                 {CampaignLanguage.map((language) => (
//                   <option key={language.value} value={language.value}>
//                     {language.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {/* Influencer's Age */}
//             <div className='form_group'>
//               <label htmlFor="influencerAge" className='form_label'>Influencer's Age:</label>
//               <div className='form_age_group'>
//                 <input type="text" id="influencerAgeFrom" name="influencerAgeFrom" placeholder='From' className='form_input form_age_input' onChange={handleChange} />
//                 <input type="text" id="influencerAgeTo" name="influencerAgeTo" placeholder='To' className='form_input form_age_input' onChange={handleChange} />
//               </div>
//             </div>
//             {/* Influencer's Gender */}
//             <div className='form_group'>
//               <label htmlFor="influencerGender" className='form_label'>Influencer's Gender:</label>
//               <select id="influencerGender" name="influencerGender" className='form_select' onChange={handleChange}>
//                 {INFLUENCERSGENDER.map((gender) => (
//                   <option key={gender.value} value={gender.value}>
//                     {gender.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {/* Describe your Product */}
//             <div className='form_group'>
//               <label htmlFor="describeProduct" className='form_label'>Describe your Product:</label>
//               <textarea id="describeProduct" name="describeProduct" className='form_textarea' onChange={handleChange}></textarea>
//             </div>
//             {/* Required Deliverable */}
//             <div className='form_group'>
//               <label className='form_label'>Required Deliverable:</label>
//               <div className='form_checkbox_group'>
//                 {RequiredDeliverable.map((deliverable) => (
//                   <div key={deliverable.value} className='form_checkbox_item'>
//                     <input
//                       type="checkbox"
//                       id={deliverable.value}
//                       name={deliverable.value}
//                       value={deliverable.value}
//                       className='form_checkbox_input'
//                       onChange={handleCheckboxChange}
//                     />
//                     <label htmlFor={deliverable.value} className='form_checkbox_label'>{deliverable.label}</label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             {/* Required Followers */}
//             <div className='form_group'>
//               <label htmlFor="requiredFollowers" className='form_label'>Required Followers:</label>
//               <div className='form_followers_group'>
//                 <input type="number" id="requiredFollowersFacebook" name="Facebook" placeholder='Facebook' className='form_input' onChange={(e) => handleNestedChange(e, 'requiredFollowers', 'Facebook')} />
//                 <input type="number" id="requiredFollowersInstagram" name="Instagram" placeholder='Instagram' className='form_input' onChange={(e) => handleNestedChange(e, 'requiredFollowers', 'Instagram')} />
//                 <input type="number" id="requiredFollowersTwitter" name="Twitter" placeholder='Twitter' className='form_input' onChange={(e) => handleNestedChange(e, 'requiredFollowers', 'Twitter')} />
//                 <input type="number" id="requiredFollowersLinkedIn" name="LinkedIn" placeholder='LinkedIn' className='form_input' onChange={(e) => handleNestedChange(e, 'requiredFollowers', 'LinkedIn')} />
//                 <input type="number" id="requiredFollowersYoutube" name="Youtube" placeholder='Youtube' className='form_input' onChange={(e) => handleNestedChange(e, 'requiredFollowers', 'Youtube')} />
//               </div>
//             </div>
//             {/* Hashtags */}
//             <div className='form_group'>
//               <label htmlFor="hashtags" className='form_label'>Hashtags:</label>
//               <input type="text" id="hashtags" name="hashtags" className='form_input' onChange={handleChange} />
//             </div>
//             {/* Product Image */}
//             <div className='form_group'>
//               <label htmlFor="productImage" className='form_label'>Product Image:</label>
//               <input type="file" id="productImage" name="productImage" className='form_file_input' onChange={handleChange} />
//             </div>
//             {/* Platform Preference */}
//             <div className='form_group'>
//               <label className='form_label'>Platform Preference:</label>
//               <div className='form_radio_group'>
//                 <input type="radio" id="platformPreferenceFacebook" name="platformPreference" value="Facebook" className='form_radio_input' onChange={handleChange} />
//                 <label htmlFor="platformPreferenceFacebook" className='form_radio_label'>Facebook</label>
//                 <input type="radio" id="platformPreferenceInstagram" name="platformPreference" value="Instagram" className='form_radio_input' onChange={handleChange} />
//                 <label htmlFor="platformPreferenceInstagram" className='form_radio_label'>Instagram</label>
//                 <input type="radio" id="platformPreferenceTwitter" name="platformPreference" value="Twitter" className='form_radio_input' onChange={handleChange} />
//                 <label htmlFor="platformPreferenceTwitter" className='form_radio_label'>Twitter</label>
//                 <input type="radio" id="platformPreferenceLinkedIn" name="platformPreference" value="LinkedIn" className='form_radio_input' onChange={handleChange} />
//                 <label htmlFor="platformPreferenceLinkedIn" className='form_radio_label'>LinkedIn</label>
//                 <input type="radio" id="platformPreferenceYoutube" name="platformPreference" value="Youtube" className='form_radio_input' onChange={handleChange} />
//                 <label htmlFor="platformPreferenceYoutube" className='form_radio_label'>Youtube</label>
//               </div>
//             </div>
//             {/* Platform Link */}
//             <div className='form_group'>
//               <label htmlFor="platformLink" className='form_label'>Platform Link:</label>
//               <input type="text" id="platformLink" name="platformLink" className='form_input' onChange={handleChange} />
//             </div>
//             {/* Profiles To Tag */}
//             <div className='form_group'>
//               <label htmlFor="profilesToTag" className='form_label'>Profiles To Tag:</label>
//               <input type="text" id="profilesToTag" name="profilesToTag" className='form_input' onChange={handleChange} />
//             </div>
//             {/* Do */}
//             <div className='form_group'>
//               <label htmlFor="do" className='form_label'>Do:</label>
//               <input type="text" id="do" name="do" className='form_input' onChange={handleChange} />
//             </div>
//             {/* Don't */}
//             <div className='form_group'>
//               <label htmlFor="dont" className='form_label'>Don't:</label>
//               <input type="text" id="dont" name="dont" className='form_input' onChange={handleChange} />
//             </div>
//             {/* Product Price */}
//             <div className='form_group'>
//               <label htmlFor="productPrice" className='form_label'>Product Price:</label>
//               <input type="text" id="productPrice" name="productPrice" className='form_input' onChange={handleChange} />
//             </div>
//             {/* Price */}
//             <div className='form_group'>
//               <label htmlFor="price" className='form_label'>Price:</label>
//               <input type="text" id="price" name="price" className='form_input' value={totalCampaignPrice} readOnly />
//             </div>
//             {/* Deadline */}
//             <div className='form_group'>
//               <label htmlFor="deadline" className='form_label'>Deadline:</label>
//               <input type="date" id="deadline" name="deadline" className='form_input' onChange={handleChange} />
//             </div>
//             {/* Screenshots Required */}
//             <div className='form_group'>
//               <label className='form_label'>Screenshots Required:</label>
//               <div className='form_radio_group'>
//                 <input type="radio" id="screenShotsRequiredYes" name="screenshotsRequired" value="Yes" className='form_radio_input' onChange={handleChange} />
//                 <label htmlFor="screenShotsRequiredYes" className='form_radio_label'>Yes</label>
//                 <input type="radio" id="screenShotsRequiredNo" name="screenshotsRequired" value="No" className='form_radio_input' onChange={handleChange} />
//                 <label htmlFor="screenShotsRequiredNo" className='form_radio_label'>No</label>
//               </div>
//             </div>
//             {/* Choose Location */}
//             <div className='form_location_group'>
//               <div className='form_location_item'>
//                 <label htmlFor="selectCountry" className='form_label'>Select Country:</label>
//                 <select id="selectCountry" name="country" className='form_select' onChange={(e) => handleNestedChange(e, 'location', 'country')}>
//                   {countries.map((country) => (
//                     <option key={country.value} value={country.value}>
//                       {country.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className='form_location_item'>
//                 <label htmlFor="selectState" className='form_label'>Select State:</label>
//                 <select id="selectState" name="state" className='form_select' onChange={(e) => handleNestedChange(e, 'location', 'state')}>
//                   {states.map((state) => (
//                     <option key={state.value} value={state.value}>
//                       {state.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className='form_location_item'>
//                 <label htmlFor="selectCity" className='form_label'>Select City:</label>
//                 <select id="selectCity" name="city" className='form_select' onChange={(e) => handleNestedChange(e, 'location', 'city')}>
//                   {cities.map((city) => (
//                     <option key={city.value} value={city.value}>
//                       {city.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             {/* Add Button */}
//             <div className='form_group'>
//               <button type="submit" onClick={handleSubmit} className='form_button btn bg-warning'>Add Campaign</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CreateCampaign;




{/* Campaign Banner */ }
{/* <div className='form_group'>
  <label htmlFor="campaignBanner" className='form_label'>Campaign Banner:</label>
  <input type="file" id="campaignBanner" name="campaignBanner" className='form_file_input' onChange={(e) => handleFileChange(e, 'campaignBanner')} />
</div> */}
{/* Product Image */ }
{/* <div className='form_group'>
<label htmlFor="productImage" className='form_label'>Product Image:</label>
<input type="file" id="productImage" name="productImage" className='form_file_input' onChange={(e) => handleFileChange(e, 'productImage')} />
</div> */}
















