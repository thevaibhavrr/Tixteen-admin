
import React, { useEffect, useState } from 'react';
import "../../../style/campaign/createCampaign.css";
import CampaignRequirement from './campaginrequiemnt';
import { makeApi } from '../../../api/callApi.tsx';
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';
import uploadToCloudinary from '../../../utils/cloudinaryUpload.jsx';

function CreateCampaign() {
  const [totalCampaignPrice, setTotalCampaignPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [IndustryList, setIndustryList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    product: '',
    campaign_name: '',
    attachment: '',
    industry: '',
    hash_tag: '',
    country: '',
    state: '',
    city: '',
    age: '',
    till_age: '',
    gender: '',
    remark: '',
    platforms: '',
    platform_link: '',
    language: '',
    profile_tag: '',
    to_do: '',
    not_todo: '',
    client_id: '',
    content_type: '',
    created_date: '',
    campaign_no: '',
    availability: '',
  });

  const FetchIndustryList = async () => {
    setLoading(true);
    try {
      const res = await makeApi('/v1/get-all-industries', 'GET');
      setIndustryList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const FetchCountryList = async () => {
    setLoading(true);
    try {
      const res = await makeApi('/v1/get-all-countries', 'GET');
      setCountryList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const FetchCitiesList = async () => {
    setLoading(true);
    try {
      const res = await makeApi('/v1/get-all-cities', 'GET');
      await setCitiesList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchCitiesList();
    FetchIndustryList();
    FetchCountryList();
  }, []);

  const CampaignLanguage = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Panjabi', label: 'Panjabi' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Urdu', label: 'Urdu' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Malayalam', label: 'Malayalam' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Gujarati', label: 'Gujarati' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Odia', label: 'Odia' },
    { value: 'Assamese', label: 'Assamese' },  
  ];
  const INFLUENCERSGENDER = [
    { value: 'Both', label: 'Both' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  const states = [
    { value: 'State A', label: 'State A' },
    { value: 'State B', label: 'State B' },
    { value: 'State C', label: 'State C' },
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
      const response = await makeApi('/v1/create-campaign', 'POST', { ...formData, totalCampaignPrice });
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
        <div style={{ height: "100vh", width: "100%", top: "0", position: "fixed" }}>
          <PrimaryLoader />
        </div>
      }
      <CampaignRequirement totalSum={handleTotal} />
      <div className='main_create_campaign_requirement'>
        <h1 className='create_campaign_select_category_header'>MAKE CAMPAIGN</h1>
        <div className='create_campaign_select_category_section'>
          <div className='create_campaign_form_title'>PLEASE ENTER THE CAMPAIGN DETAILS</div>
          <div className='create_campaign_form' >
            {/* ID */}
            <div className='form_group'>
              <label htmlFor="id" className='form_label'>ID:</label>
              <input type="text" id="id" name="id" className='form_input' onChange={handleChange} />
            </div>
            {/* Product */}
            <div className='form_group'>
              <label htmlFor="product" className='form_label'>Product:</label>
              <input type="text" id="product" name="product" className='form_input' onChange={handleChange} />
            </div>
            {/* Campaign Name */}
            <div className='form_group'>
              <label htmlFor="campaign_name" className='form_label'>Campaign Name:</label>
              <input type="text" id="campaign_name" name="campaign_name" className='form_input' onChange={handleChange} />
            </div>
            {/* Attachment */}
            <div className='form_group'>
              <label htmlFor="attachment" className='form_label'>Attachment:</label>
              <input type="file" id="attachment" name="attachment" className='form_file_input' onChange={(e) => handleFileChange(e, 'attachment')} />
            </div>
            {/* Industry */}
            <div className='form_group'>
              <label htmlFor="industry" className='form_label'>Industry:</label>
              <select id="industry" name="industry" className='form_select' onChange={handleChange}>
                {IndustryList.map((industry) => (
                  <option key={industry._id} value={industry.name}>
                    {industry.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Hash Tag */}
            <div className='form_group'>
              <label htmlFor="hash_tag" className='form_label'>Hash Tag:</label>
              <input type="text" id="hash_tag" name="hash_tag" className='form_input' onChange={handleChange} />
            </div>
            {/* Country */}
            <div className='form_group'>
              <label htmlFor="country" className='form_label'>Country:</label>
              <select id="country" name="country" className='form_select' onChange={(e) => handleNestedChange(e, 'location', 'country')}>
                {countryList.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {/* State */}
            <div className='form_group'>
              <label htmlFor="state" className='form_label'>State:</label>
              <select id="state" name="state" className='form_select' onChange={(e) => handleNestedChange(e, 'location', 'state')}>
                {states.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
            {/* City */}
            <div className='form_group'>
              <label htmlFor="city" className='form_label'>City:</label>
              <select id="city" name="city" className='form_select' onChange={(e) => handleNestedChange(e, 'location', 'city')}>
                {citiesList.map((city) => (
                  <option key={city.value} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Age */}
            <div className='form_group'>
              <label htmlFor="age" className='form_label'>Age:</label>
              <input type="text" id="age" name="age" className='form_input' onChange={handleChange} />
            </div>
            {/* Till Age */}
            <div className='form_group'>
              <label htmlFor="till_age" className='form_label'>Till Age:</label>
              <input type="text" id="till_age" name="till_age" className='form_input' onChange={handleChange} />
            </div>
            {/* Gender */}
            <div className='form_group'>
              <label htmlFor="gender" className='form_label'>Gender:</label>
              <select id="gender" name="gender" className='form_select' onChange={handleChange}>
                {INFLUENCERSGENDER.map((gender) => (
                  <option key={gender.value} value={gender.value}>
                    {gender.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Remark */}
            <div className='form_group'>
              <label htmlFor="remark" className='form_label'>Remark:</label>
              <input type="text" id="remark" name="remark" className='form_input' onChange={handleChange} />
            </div>
            {/* Platforms */}
            <div className='form_group'>
              <label htmlFor="platforms" className='form_label'>Platforms:</label>
              <input type="text" id="platforms" name="platforms" className='form_input' onChange={handleChange} />
            </div>
            {/* Platform Link */}
            <div className='form_group'>
              <label htmlFor="platform_link" className='form_label'>Platform Link:</label>
              <input type="text" id="platform_link" name="platform_link" className='form_input' onChange={handleChange} />
            </div>
            {/* Language */}
            <div className='form_group'>
              <label htmlFor="language" className='form_label'>Language:</label>
              <select id="language" name="language" className='form_select' onChange={handleChange}>
                {CampaignLanguage.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
            {/* Profile Tag */}
            <div className='form_group'>
              <label htmlFor="profile_tag" className='form_label'>Profile Tag:</label>
              <input type="text" id="profile_tag" name="profile_tag" className='form_input' onChange={handleChange} />
            </div>
            {/* To Do */}
            <div className='form_group'>
              <label htmlFor="to_do" className='form_label'>To Do:</label>
              <input type="text" id="to_do" name="to_do" className='form_input' onChange={handleChange} />
            </div>
            {/* Not To Do */}
            <div className='form_group'>
              <label htmlFor="not_todo" className='form_label'>Not To Do:</label>
              <input type="text" id="not_todo" name="not_todo" className='form_input' onChange={handleChange} />
            </div>
            {/* Client ID */}
            <div className='form_group'>
              <label htmlFor="client_id" className='form_label'>Client ID:</label>
              <input type="text" id="client_id" name="client_id" className='form_input' onChange={handleChange} />
            </div>
            {/* Content Type */}
            <div className='form_group'>
              <label htmlFor="content_type" className='form_label'>Content Type:</label>
              <input type="text" id="content_type" name="content_type" className='form_input' onChange={handleChange} />
            </div>
            {/* Created Date */}
            <div className='form_group'>
              <label htmlFor="created_date" className='form_label'>Created Date:</label>
              <input type="date" id="created_date" name="created_date" className='form_input' onChange={handleChange} />
            </div>
            {/* Campaign No */}
            <div className='form_group'>
              <label htmlFor="campaign_no" className='form_label'>Campaign No:</label>
              <input type="text" id="campaign_no" name="campaign_no" className='form_input' onChange={handleChange} />
            </div>
            {/* Availability */}
            <div className='form_group'>
              <label htmlFor="availability" className='form_label'>Availability:</label>
              <input type="text" id="availability" name="availability" className='form_input' onChange={handleChange} />
            </div>
            {/* Total Campaign Price */}
            <div className='form_group'>
              <label htmlFor="totalCampaignPrice" className='form_label'>Total Campaign Price:</label>
              <input type="text" id="totalCampaignPrice" name="totalCampaignPrice" className='form_input' value={totalCampaignPrice} readOnly />
            </div>
            {/* Submit Button */}
            <button className='create_campaign_form_btn' onClick={handleSubmit}>Create Campaign</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCampaign;



