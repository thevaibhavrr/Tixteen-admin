import React, { useState, useEffect } from 'react';
import "../../style/managment/SendMessage.css";
import { makeApi } from "../../api/callApi.tsx";

const App = () => {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [filters, setFilters] = useState({
    levels: '',
    industry: '',
    gender: '',
    country: '',
    state: '',
    city: ''
  });
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]); // Store all campaigns
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await makeApi("/v1/admin/api/filtered-campaign-summary", "GET");
        setCampaigns(response.data.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };
    fetchCampaigns();
  }, []);

  useEffect(() => {
    // Dummy user data
    const users = [
      { id: 1, name: 'John Doe', mobile: '1234567890', level: 'L2', industry: 'GYM', gender: 'male', country: 'USA', state: 'California', city: 'Los Angeles' },
      { id: 2, name: 'Jane Doe', mobile: '0987654321', level: 'L1', industry: 'Food', gender: 'female', country: 'USA', state: 'Texas', city: 'Houston' },
    ];
    setUserList(users);
    setFilteredUserList(users);
  }, []);

  const handleCampaignChange = (e) => {
    setSelectedCampaign(e.target.value);
    setSearchTerm('');
    setSuggestions([]);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
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
    // Send messages to selected users
    window.alert('Sending messages to:', selectedUsers);
    console.log('Sending messages to:', selectedUsers);
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

  useEffect(() => {
    let filtered = userList;
    if (filters.levels) {
      filtered = filtered.filter(user => user.level === filters.levels);
    }
    if (filters.industry) {
      filtered = filtered.filter(user => user.industry === filters.industry);
    }
    if (filters.gender) {
      filtered = filtered.filter(user => user.gender === filters.gender);
    }
    if (filters.country) {
      filtered = filtered.filter(user => user.country === filters.country);
    }
    if (filters.state) {
      filtered = filtered.filter(user => user.state === filters.state);
    }
    if (filters.city) {
      filtered = filtered.filter(user => user.city === filters.city);
    }
    setFilteredUserList(filtered);
  }, [filters]);

  return (
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
              <select
                name="levels"
                value={filters.levels}
                onChange={handleFilterChange}
                className="app__filter-select"
              >
                <option value="">Select Level</option>
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
                <option value="L4">L4</option>
              </select>
            </div>
            <div className="app__filter-item">
              <label className="app__filter-label">Industry:</label>
              <select
                name="industry"
                value={filters.industry}
                onChange={handleFilterChange}
                className="app__filter-select"
              >
                <option value="">Select Industry</option>
                <option value="Food">Food</option>
                <option value="GYM">GYM</option>
                <option value="Traveling">Traveling</option>
                {/* Add more industries here */}
              </select>
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
                /> Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleFilterChange}
                  className="app__filter-radio"
                /> Female
                <input
                  type="radio"
                  name="gender"
                  value="both"
                  onChange={handleFilterChange}
                  className="app__filter-radio"
                /> Both
              </div>
            </div>
            <div className="app__filter-item">
              <label className="app__filter-label">Country:</label>
              <select
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                className="app__filter-select"
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                {/* Add more countries here */}
              </select>
            </div>
            <div className="app__filter-item">
              <label className="app__filter-label">State:</label>
              <select
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
                className="app__filter-select"
              >
                <option value="">Select State</option>
                <option value="California">California</option>
                <option value="Texas">Texas</option>
                <option value="New York">New York</option>
                {/* Add more states here */}
              </select>
            </div>
            <div className="app__filter-item">
              <label className="app__filter-label">City:</label>
              <select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="app__filter-select"
              >
                <option value="">Select City</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Houston">Houston</option>
                <option value="New York City">New York City</option>
                {/* Add more cities here */}
              </select>
            </div>
          </div>
        )}
      </div>
      {selectedCampaign && filteredUserList.length > 0 && (
        <div className="app__user-list">
          <h2 className="app__user-list-title">Users</h2>
          {filteredUserList.map(user => (
            <div key={user.id} className="app__user-item">
              <input
                type="checkbox"
                value={user.id}
                onChange={handleCheckboxChange}
                className="app__user-checkbox"
              />
              <span className="app__user-info">{user.name} - {user.mobile}</span>
            </div>
          ))}
        </div>
      )}
      {selectedCampaign && filteredUserList.length > 0 && (
        <button className="app__send-button" onClick={handleSendMessages}>
          Send Messages
        </button>
      )}
    </div>
  );
};

export default App;


