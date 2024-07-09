
import React, { useState, useEffect } from 'react';
import "../../style/managment/SendMessage.css";
import { makeApi } from "../../api/callApi.tsx";
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';

const App = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [filters, setFilters] = useState({
    levels: [],
    industry: [],
    gender: '',
    country: [],
    state: [],
    city: [],
    language: []
  });
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [industryList, setIndustryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [campignLoading, setCampignLoading] = useState(false);

  // Fetch Industry
  const fetchIndustry = async () => {
    setCampignLoading(true);
    try {
      const response = await makeApi("/v1/get-all-industries", "GET");
      setIndustryList(response.data.data);
    } catch (error) {
      console.error('Error fetching industry:', error);
    }finally {
      setCampignLoading(false);
    }
  };

  // Fetch Country
  const fetchCountry = async () => {
    try {
      const response = await makeApi("/v1/get-all-countries", "GET");
      setCountryList(response.data.data);
    } catch (error) {
      console.error('Error fetching country:', error);
    }
  };

  // Fetch City
  const fetchCity = async () => {
    try {
      const response = await makeApi("/v1/get-all-cities", "GET");
      setCityList(response.data.data);
    } catch (error) {
      console.error('Error fetching city:', error);
    }
  };

  useEffect(() => {
    fetchIndustry();
    fetchCountry();
    fetchCity();
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        const response = await makeApi("/v1/admin/api/filtered-campaign-summary", "GET");
        setCampaigns(response.data.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const fetchUsers = async (filters) => {
    setIsLoading(true);
    try {
      const response = await makeApi("/v1/influencers/filter", "POST", filters);
      const users = response.data.data.map(user => ({
        id: user.id,
        name: user.user_name,
        mobile: user.mobile,
        level: user.level,
        industry: user.industry,
        gender: user.gender,
        country: user.ship_country,
        state: user.ship_state,
        city: user.ship_city
      }));
      setUserList(users);
      setFilteredUserList(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCampaignDetails = async (id) => {
    setCampignLoading(true);
    try {
      const response = await makeApi(`/v1/campaigns/${id}`, "GET");
      setCampaignDetails(response.data.data);
      setFilters({
        ...filters,
        industry: response.data.data.industry ? [response.data.data.industry] : [],
        gender: response.data.data.gender.toLowerCase(),
        country: response.data.data.country ? [response.data.data.country] : [],
        state: response.data.data.state ? [response.data.data.state] : [],
        city: response.data.data.city ? [response.data.data.city] : [],
        language: response.data.data.language ? [response.data.data.language] : []
      });
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    } finally {
      setCampignLoading(false);
    }
  };

  const handleCampaignChange = (e) => {
    const selectedCampaign = e.target.value;
    setSelectedCampaign(selectedCampaign);
    const selectedCampaignObj = campaigns.find(campaign => campaign.campaign_name === selectedCampaign);
    fetchCampaignDetails(selectedCampaignObj._id);
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'gender') {
      setFilters({ ...filters, gender: value });
    } else {
      setFilters({
        ...filters,
        [name]: checked
          ? [...filters[name], value]
          : filters[name].filter(item => item !== value)
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const userId = e.target.value;
    setSelectedUsers(prevSelectedUsers =>
      e.target.checked
        ? [...prevSelectedUsers, userId]
        : prevSelectedUsers.filter(id => id !== userId)
    );
  };

  const handleSendMessages = () => {
    const selectedUserDetails = selectedUsers.map(userId => {
      const user = filteredUserList.find(user => user.id === userId);
      return {
        id: user.id,
        name: user.name,
        mobile: user.mobile
      };
    });

    window.alert(`Sending messages to:\n${selectedUserDetails.map(user => `${user.name} (${user.mobile})`).join('\n')}`);
    console.log('Sending messages to:', selectedUserDetails);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSuggestions(value ? campaigns.filter(campaign => campaign.campaign_name.toLowerCase().includes(value.toLowerCase())) : []);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedCampaign(suggestion.campaign_name);
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleApplyFilters = () => {
    fetchUsers(filters);
  };

  return (
    <>
      {campignLoading &&
    <div style={{position:"fixed" , top:"0" , height:"100vh" , width:"100%" }} >
      <PrimaryLoader/>
    </div>
      }
    <div className="app">
      <h1 className="app__title">Send Campaign Messages</h1>
      <div className="app__filter-section">
        <div className="app__campaign-selection">
          <div className="app__search-container">
            <input
              type="text"
              placeholder="Search Campaigns"
              value={searchTerm}
              onChange={handleSearchChange}
              className="app__search-input"
            />
            {suggestions.length > 0 && (
              <ul className="app__suggestions">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="app__suggestion-item">
                    {suggestion.campaign_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <select
            value={selectedCampaign}
            onChange={handleCampaignChange}
            className="app__campaign-dropdown"
          >
            <option value="">Select Campaign</option>
            {campaigns.map((campaign, index) => (
              <option key={index} value={campaign.campaign_name}>
                {campaign.campaign_name}
              </option>
            ))}
          </select>
        </div>
        {selectedCampaign && (
          <div className="app__filters">
            <div className="app__filter-item">
              <label className="app__filter-label">Levels:</label>
              <div className="app__filter-checkboxes">
                {['0', '1', '2', '3', '4', '5', '6'].map(level => (
                  <label key={level}>
                    <input
                      type="checkbox"
                      name="levels"
                      value={level}
                      checked={filters.levels.includes(level)}
                      onChange={handleFilterChange}
                      className="app__filter-checkbox"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
            <div className="app__filter-item">
              <label className="app__filter-label">Industry:</label>
              <div className="app__filter-checkboxes" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {industryList.map((industry, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      name="industry"
                      value={industry.name}
                      checked={filters.industry.includes(industry.name)}
                      onChange={handleFilterChange}
                      className="app__filter-checkbox"
                    />
                    {industry.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="app__filter-item">
              <label className="app__filter-label">Gender:</label>
              <div className="app__filter-radios">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleFilterChange}
                  className="app__filter-radio"
                  checked={filters.gender === 'male'}
                /> Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleFilterChange}
                  className="app__filter-radio"
                  checked={filters.gender === 'female'}
                /> Female
                <input
                  type="radio"
                  name="gender"
                  value="both"
                  onChange={handleFilterChange}
                  className="app__filter-radio"
                  checked={filters.gender === 'both'}
                /> Both
              </div>
            </div>
            <div className="app__filter-item">
              <label className="app__filter-label">Country:</label>
              <div className="app__filter-checkboxes" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {countryList.map((country, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      name="country"
                      value={country.name}
                      checked={filters.country.includes(country.name)}
                      onChange={handleFilterChange}
                      className="app__filter-checkbox"
                    />
                    {country.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="app__filter-item">
              <label className="app__filter-label">State:</label>
              <div className="app__filter-checkboxes">
                {['California', 'New York', 'Texas', 'Maharashtra', 'Karnataka'].map(state => (
                  <label key={state}>
                    <input
                      type="checkbox"
                      name="state"
                      value={state}
                      checked={filters.state.includes(state)}
                      onChange={handleFilterChange}
                      className="app__filter-checkbox"
                    />
                    {state}
                  </label>
                ))}
              </div>
            </div>
            <div className="app__filter-item">
              <label className="app__filter-label">City:</label>
              <div className="app__filter-checkboxes" style={{ maxHeight: "200px", overflowY: "auto" }}>
                {cityList.map((city, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      name="city"
                      value={city.name}
                      checked={filters.city.includes(city.name)}
                      onChange={handleFilterChange}
                      className="app__filter-checkbox"
                    />
                    {city.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="app__filter-item">
              <label className="app__filter-label">Language:</label>
              <div className="app__filter-checkboxes">
                {['English', 'Hindi', 'Spanish', 'French', 'German'].map(language => (
                  <label key={language}>
                    <input
                      type="checkbox"
                      name="language"
                      value={language}
                      checked={filters.language.includes(language)}
                      onChange={handleFilterChange}
                      className="app__filter-checkbox"
                    />
                    {language}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <button onClick={handleApplyFilters} className="app__apply-filters-button btn btn-warning">
        Apply Filters
      </button>
      <div className="app__user-list">
        <h2>Users {filteredUserList.length}</h2>
        {isLoading ? (
          <div>Loading...

            <PrimaryLoader/>
          </div>
        ) : (
          <table className="app__user-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Level</th>
                <th>Industry</th>
                <th>Gender</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserList.map(user => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      value={user.id}
                      onChange={handleCheckboxChange}
                      checked={selectedUsers.includes(user.id)}

                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.level}</td>
                  <td>{user.industry}</td>
                  <td>{user.gender}</td>
                  <td>{user.country}</td>
                  <td>{user.state}</td>
                  <td>{user.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button onClick={handleSendMessages} className="app__send-button">
        Send Messages
      </button>
    </div>
    </>

  );
};

export default App;
