import React, { useEffect, useState } from 'react';
import "../../../style/campaign/createCampaign.css";
import CampaignRequirement from './campaginrequiemnt';
import { makeApi } from '../../../api/callApi.tsx';
import PrimaryLoader from '../../../utils/PrimaryLoader.jsx';
import uploadToCloudinary from '../../../utils/cloudinaryUpload.jsx';

const CampaignLanguage = [
  { _id: 1, name: 'English' },
  { _id: 2, name: 'Spanish' },
  // Add more languages as needed
];

const stateList = [
  { _id: 1, name: 'California' },
  { _id: 2, name: 'New York' },
  // Add more states as needed
];

function CreateCampaign() {
  const [totalCampaignPrice, setTotalCampaignPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [industryList, setIndustryList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [deliverables, setDeliverables] = useState(['Story', 'Paid Partnership']);
  const [followers, setFollowers] = useState([{ platform: 'Facebook', followers: 0 }]);
  const [formData, setFormData] = useState({
    campaign_no: '',
    campaign_name: '',
    attachment: '',
    campaign_type: '',
    product: '',
    industry: '',
    language: 'English',
    age: '',
    till_age: '',
    gender: 'Both',
    remark: '',
    hash_tag: '',
    platforms: 'Facebook',
    platform_link: '',
    profile_tag: '',
    to_do: '',
    not_todo: '',
    availability: '',
    country: '',
    state: '',
    city: '',
    is_screen_shots_required: "",
    created_date: new Date().toLocaleString('en-GB', { timeZone: 'UTC' }),
    dead_line: "",
    client_id: '',
    created_by: '',
    compaction: '',
    status: '',
    price: '',
    job_type: '',
    // campaign_type: '',
    product_price: '',
    banner: '',
    area: '',
  });

  console.log(formData);

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

  const fetchCountryList = async () => {
    setLoading(true);
    try {
      const res = await makeApi('/v1/get-all-countries', 'GET');
      setCountryList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCitiesList = async () => {
    setLoading(true);
    try {
      const res = await makeApi('/v1/get-all-cities', 'GET');
      setCitiesList(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustryList();
    fetchCountryList();
    fetchCitiesList();
    generateCampaignNo();
  }, []);

  const generateCampaignNo = () => {
    const id = `CMP${Date.now()}`;
    setFormData({ ...formData, campaign_no: id });
  };

  const handleTotal = (totalValue) => {
    setTotalCampaignPrice(totalValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNestedChange = (e, group) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [group]: value,
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

  const handleAddDeliverable = () => {
    setDeliverables([...deliverables, '']);
  };

  const handleRemoveDeliverable = (index) => {
    const newDeliverables = deliverables.filter((_, i) => i !== index);
    setDeliverables(newDeliverables);
  };

  const handleDeliverableChange = (e, index) => {
    const newDeliverables = [...deliverables];
    newDeliverables[index] = e.target.value;
    setDeliverables(newDeliverables);
  };

  const handleAddFollower = () => {
    setFollowers([...followers, { platform: 'Facebook', followers: 0 }]);
  };

  const handleRemoveFollower = (index) => {
    const newFollowers = followers.filter((_, i) => i !== index);
    setFollowers(newFollowers);
  };

  const handleFollowerChange = (index, field, value) => {
    const newFollowers = [...followers];
    newFollowers[index][field] = value;
    setFollowers(newFollowers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Form Data:', { ...formData, totalCampaignPrice, deliverables, followers });
      setLoading(true);
      const response = await makeApi('/v1/create-campaign', 'POST', {
        ...formData,
        totalCampaignPrice,
        deliverables,
        followers,
      });
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div style={{ height: "100vh", width: "100%", top: "0", position: "fixed" }}>
          <PrimaryLoader />
        </div>
      )}
      <CampaignRequirement totalSum={handleTotal} setFormData={setFormData} />
      <div className='main_create_campaign_requirement'>
        <h1 className='create_campaign_select_category_header'>MAKE CAMPAIGN</h1>
        <div className='create_campaign_select_category_section'>
          <div className='create_campaign_form_title'>PLEASE ENTER THE CAMPAIGN DETAILS</div>
          <div className='create_campaign_form'>
            {/* Campaign Name */}
            <div className='form_group'>
              <label htmlFor="campaign_name" className='form_label'>Campaign Name:</label>
              <input type="text" id="campaign_name" name="campaign_name" className='form_input' onChange={handleChange} />
            </div>
            {/* Campaign Banner */}
            <div className='form_group'>
              <label htmlFor="attachment" className='form_label'>Campaign Banner:</label>
              <input type="file" id="attachment" name="attachment" className='form_file_input' onChange={(e) => handleFileChange(e, 'attachment')} />
            </div>
            {/* Campaign Type */}
            <div className='form_group'>
              <label className='form_label'>Campaign Type:</label>
              <div className='form_radio_group'>
                <label>
                  <input type="radio" name="campaign_type" value="Paid" checked={formData.campaign_type === 'Paid'} onChange={handleChange} />
                  Paid
                </label>
                <label>
                  <input type="radio" name="campaign_type" value="Barter" checked={formData.campaign_type === 'Barter'} onChange={handleChange} />
                  Barter
                </label>
              </div>
            </div>
            {/* is_screen_shots_required  */}
            <div className='form_group'>
              <label className='form_label'>Screen Shots:</label>
              <div className='form_radio_group'>
                <label>
                  <input type="radio" name="is_screen_shots_required" value="Yes" checked={formData.is_screen_shots_required === 'Yes'} onChange={handleChange} />
                  Yes
                </label>
                <label>
                  <input type="radio" name="is_screen_shots_required" value="No" checked={formData.is_screen_shots_required === 'No'} onChange={handleChange} />
                  No
                </label>
              </div>
            </div>
            {/* Brand Product */}
            <div className='form_group'>
              <label htmlFor="product" className='form_label'>Brand Product:</label>
              <input type="text" id="product" name="product" className='form_input' onChange={handleChange} />
            </div>

            {/* product price */}
            <div className='form_group'>
              <label htmlFor="product_price" className='form_label'>Product Price:</label>
              <input type="number" id="product_price" name="product_price" className='form_input' onChange={handleChange} />
            </div>

            {/* Target Industry */}
            <div className='form_group'>
              <label htmlFor="industry" className='form_label'>Target Industry:</label>
              <select id="industry" name="industry" className='form_select' onChange={handleChange}>
                {industryList.map((industry) => (
                  <option key={industry._id} value={industry.name}>
                    {industry.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Campaign Language */}
            <div className='form_group'>
              <label htmlFor="language" className='form_label'>Campaign Language:</label>
              <select id="language" name="language" className='form_select' onChange={handleChange}>
                {CampaignLanguage.map((language) => (
                  <option key={language.name} value={language.name}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Influencer's Age */}
            <div className='form_group'>
              <label htmlFor="age" className='form_label'>Influencer's Age:</label>
              <input type="number" id="age" name="age" className='form_input' onChange={handleChange} />
              <label htmlFor="till_age" className='form_label'>till</label>
              <input type="number" id="till_age" name="till_age" className='form_input' onChange={handleChange} />
            </div>
            {/* Influencer's Gender */}
            <div className='form_group'>
              <label htmlFor="gender" className='form_label'>Influencer's Gender:</label>
              <select id="gender" name="gender" className='form_select' onChange={handleChange}>
                <option value="Both">Both</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            {/* Remarks */}
            <div className='form_group'>
              <label htmlFor="remark" className='form_label'>Remarks:</label>
              <textarea id="remark" name="remark" className='form_textarea' onChange={handleChange} />
            </div>
            {/* Hashtags */}
            <div className='form_group'>
              <label htmlFor="hash_tag" className='form_label'>Hashtags:</label>
              <input type="text" id="hash_tag" name="hash_tag" className='form_input' onChange={handleChange} />
            </div>
            {/* Platforms */}
            <div className='form_group'>
              <label htmlFor="platforms" className='form_label'>Platforms:</label>
              <select id="platforms" name="platforms" className='form_select' onChange={handleChange}>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
              </select>
            </div>
            {/* Platform Link */}
            <div className='form_group'>
              <label htmlFor="platform_link" className='form_label'>Platform Link:</label>
              <input type="url" id="platform_link" name="platform_link" className='form_input' onChange={handleChange} />
            </div>
            {/* Profile Tag */}
            <div className='form_group'>
              <label htmlFor="profile_tag" className='form_label'>Profile Tag:</label>
              <input type="text" id="profile_tag" name="profile_tag" className='form_input' onChange={handleChange} />
            </div>
            {/* To Do */}
            <div className='form_group'>
              <label htmlFor="to_do" className='form_label'>To Do:</label>
              <textarea id="to_do" name="to_do" className='form_textarea' onChange={handleChange} />
            </div>
            {/* Not To Do */}
            <div className='form_group'>
              <label htmlFor="not_todo" className='form_label'>Not To Do:</label>
              <textarea id="not_todo" name="not_todo" className='form_textarea' onChange={handleChange} />
            </div>
            {/* Availability */}
            <div className='form_group'>
              <label htmlFor="availability" className='form_label'>Availability:</label>
              <textarea id="availability" name="availability" className='form_textarea' onChange={handleChange} />
            </div>
            {/* Country */}
            <div className='form_group'>
              <label htmlFor="country" className='form_label'>Country:</label>
              <select id="country" name="country" className='form_select' onChange={handleChange}>
                {countryList.map((country) => (
                  <option key={country._id} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {/* State */}
            <div className='form_group'>
              <label htmlFor="state" className='form_label'>State:</label>
              <select id="state" name="state" className='form_select' onChange={handleChange}>
                {stateList.map((state) => (
                  <option key={state._id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            {/* City */}
            <div className='form_group'>
              <label htmlFor="city" className='form_label'>City:</label>
              <select id="city" name="city" className='form_select' onChange={handleChange}>
                {citiesList.map((city) => (
                  <option key={city._id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* dead_line */}
            <div className='form_group'>
              <label htmlFor="dead_line" className='form_label'>Deadline:</label>
              <input type="date" id="dead_line" name="dead_line" className='form_input' onChange={handleChange} />
            </div>
            {/* Deliverables */}
            <div className='form_group'>
              <label className='form_label'>Deliverables:</label>
              {deliverables.map((deliverable, index) => (
                <div key={index} className='form_nested_group'>
                  <input type="text" value={deliverable} className='form_nested_input' onChange={(e) => handleDeliverableChange(e, index)} />
                  <button type="button" className='form_nested_button btn btn-danger ms-2' onClick={() => handleRemoveDeliverable(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className='form_add_button btn btn-warning' style={{ width: "200px" }} onClick={handleAddDeliverable}>
                Add Deliverable
              </button>
            </div>
            {/* Followers */}
            <div className='form_group'>
              <label className='form_label'>Followers Requirements:</label>
              {followers.map((follower, index) => (
                <div key={index} className='form_nested_group'>
                  <select value={follower.platform} className='form_nested_select btn' onChange={(e) => handleFollowerChange(index, 'platform', e.target.value)}>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Twitter">Twitter</option>
                  </select>
                  <input type="number" value={follower.followers} className='form_nested_input ms-2' onChange={(e) => handleFollowerChange(index, 'followers', e.target.value)} />
                  <button type="button" className='form_nested_button btn btn-danger ms-2' onClick={() => handleRemoveFollower(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className='form_add_button btn btn-warning ' style={{ width: "300px" }} onClick={handleAddFollower}>
                Add Follower Requirement
              </button>
            </div>

            {/* Submit Button */}
            <div className='form_group'>
              <button type="submit" className='form_submit_button btn btn-warning ' onClick={handleSubmit}>
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCampaign;

