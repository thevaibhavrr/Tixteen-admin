
// import React, { useState, useEffect } from 'react';
// import "../../style/managment/SendMessage.css";
// import { makeApi } from "../../api/callApi.tsx";

// const SendMessageForCamp = () => {
//   const [selectedCampaign, setSelectedCampaign] = useState('');
//   const [filters, setFilters] = useState({
//     levels: '',
//     industry: '',
//     gender: '',
//     country: '',
//     state: '',
//     city: ''
//   });
//   const [userList, setUserList] = useState([]);
//   console.log(userList.length)
//   const [filteredUserList, setFilteredUserList] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [campaigns, setCampaigns] = useState([]); // Store all campaigns
//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         const response = await makeApi("/v1/admin/api/filtered-campaign-summary", "GET");
//         setCampaigns(response.data.data);
//       } catch (error) {
//         console.error('Error fetching campaigns:', error);
//       }
//     };
//     fetchCampaigns();
//   }, []);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await makeApi("/v1/influencers", "GET");
//         const users = response.data.data.map(user => ({
//           id: user.id,
//           name: user.user_name,
//           mobile: user.mobile,
//           level: user.level,
//           industry: user.industry,
//           // gender: user.gender.toLowerCase(), // Ensure gender matches the filter values
//           gender: user.gender, // Ensure gender matches the filter values
//           country: user.ship_country,
//           state: user.ship_state,
//           city: user.ship_city
//         }));
//         setUserList(users);
//         setFilteredUserList(users);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleCampaignChange = (e) => {
//     setSelectedCampaign(e.target.value);
//     setSearchTerm('');
//     setSuggestions([]);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value
//     });
//   };

//   const handleCheckboxChange = (e) => {
//     const userId = e.target.value;
//     setSelectedUsers(prevSelectedUsers =>
//       e.target.checked
//         ? [...prevSelectedUsers, userId]
//         : prevSelectedUsers.filter(id => id !== userId)
//     );
//   };

//   const handleSendMessages = () => {
//     const selectedUserDetails = selectedUsers.map(userId => {
//       const user = filteredUserList.find(user => user.id === userId);
//       return {
//         id: user.id,
//         name: user.user_name,
//         mobile: user.mobile
//       };
//     });

//     window.alert(`Sending messages to:\n${selectedUserDetails.map(user => `${user.name} (${user.mobile})`).join('\n')}`);
//     console.log('Sending messages to:', selectedUserDetails);
//   };


//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setSuggestions(value ? campaigns.filter(campaign => campaign.campaign_name.toLowerCase().includes(value.toLowerCase())) : []);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSelectedCampaign(suggestion.campaign_name);
//     setSearchTerm('');
//     setSuggestions([]);
//   };

//   useEffect(() => {
//     let filtered = userList;
//     if (filters.levels) {
//       filtered = filtered.filter(user => user.level === filters.levels);
//     }
//     if (filters.industry) {
//       filtered = filtered.filter(user => user.industry.includes(filters.industry));
//     }
//     if (filters.gender) {
//       filtered = filtered.filter(user => user.gender === filters.gender);
//     }
//     if (filters.country) {
//       filtered = filtered.filter(user => user.country === filters.country);
//     }
//     if (filters.state) {
//       filtered = filtered.filter(user => user.state === filters.state);
//     }
//     if (filters.city) {
//       filtered = filtered.filter(user => user.city === filters.city);
//     }
//     setFilteredUserList(filtered);
//   }, [filters, userList]);

//   useEffect(() => {
//     setSelectedUsers(filteredUserList.map(user => user.id));
//   }, [filteredUserList]);


//   return (
//     <div className="app">
//       <h1 className="app__title">Send Campaign Messages</h1>
//       <div className="app__filter-section">
//         <div className="app__campaign-selection">
//           <div className="app__search-container">
//             <input
//               type="text"
//               placeholder="Search Campaigns"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="app__search-input"
//             />
//             {suggestions.length > 0 && (
//               <ul className="app__suggestions">
//                 {suggestions.map((suggestion, index) => (
//                   <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="app__suggestion-item">
//                     {suggestion.campaign_name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <select
//             value={selectedCampaign}
//             onChange={handleCampaignChange}
//             className="app__campaign-dropdown"
//           >
//             <option value="">Select Campaign</option>
//             {campaigns.map((campaign, index) => (
//               <option key={index} value={campaign.campaign_name}>
//                 {campaign.campaign_name}
//               </option>
//             ))}
//           </select>
//         </div>
//         {selectedCampaign && (
//           <div className="app__filters">
//             <div className="app__filter-item">
//               <label className="app__filter-label">Levels:</label>
//               <select
//                 name="levels"
//                 value={filters.levels}
//                 onChange={handleFilterChange}
//                 className="app__filter-select"
//               >
//                 <option value="">Select Level</option>
//                 <option value="1">L1</option>
//                 <option value="2">L2</option>
//                 <option value="3">L3</option>
//                 <option value="4">L4</option>
//                 <option value="5">L5</option>
//                 <option value="6">L6</option>

//               </select>
//             </div>
//             <div className="app__filter-item">
//               <label className="app__filter-label">Industry:</label>
//               <select
//                 name="industry"
//                 value={filters.industry}
//                 onChange={handleFilterChange}
//                 className="app__filter-select"
//               >
//                 <option value="">Select Industry</option>
//                 <option value="Food">Food</option>
//                 <option value="GYM">GYM</option>
//                 <option value="Travel & Lifestyle">Travel & Lifestyle</option>
//                 <option value="Men Fashion">Men Fashion</option>
//                 <option value="Dance & Music">Dance & Music</option>
//                 <option value="Entertainment">Entertainment</option>
//                   <option value="Kitchen">Kitchen</option>
//                 </select>
//             </div>
//             <div className="app__filter-item">
//               <label className="app__filter-label">Gender:</label>
//               <div className="app__filter-radios">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Male"
//                   onChange={handleFilterChange}
//                   className="app__filter-radio"
//                 /> Male
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Female"
//                   onChange={handleFilterChange}
//                   className="app__filter-radio"
//                 /> Female
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="both"
//                   onChange={handleFilterChange}
//                   className="app__filter-radio"
//                 /> Both
//               </div>
//             </div>
//             <div className="app__filter-item">
//               <label className="app__filter-label">Country:</label>
//               <select
//                 name="country"
//                 value={filters.country}
//                 onChange={handleFilterChange}
//                 className="app__filter-select"
//               >
//                 <option value="">Select Country</option>
//                 <option value="USA">USA</option>
//                 <option value="Canada">Canada</option>
//                 <option value="UK">UK</option>
//                 {/* Add more countries here */}
//               </select>
//             </div>
//             <div className="app__filter-item">
//               <label className="app__filter-label">State:</label>
//               <select
//                 name="state"
//                 value={filters.state}
//                 onChange={handleFilterChange}
//                 className="app__filter-select"
//               >
//                 <option value="">Select State</option>
//                 <option value="California">California</option>
//                 <option value="Texas">Texas</option>
//                 <option value="New York">New York</option>
//                 {/* Add more states here */}
//               </select>
//             </div>
//             <div className="app__filter-item">
//               <label className="app__filter-label">City:</label>
//               <select
//                 name="city"
//                 value={filters.city}
//                 onChange={handleFilterChange}
//                 className="app__filter-select"
//               >
//                 <option value="">Select City</option>
//                 <option value="Los Angeles">Los Angeles</option>
//                 <option value="Houston">Houston</option>
//                 <option value="New York City">New York City</option>
//                 {/* Add more cities here */}
//               </select>
//             </div>
//           </div>
//         )}
//       </div>
//       {selectedCampaign && filteredUserList.length > 0 && (
//         <div className="app__user-list">
//           <h2 className="app__user-list-title">Users</h2>
//           {filteredUserList.map(user => (
//             <div key={user.id} className="app__user-item">
//              <input
//   type="checkbox"
//   value={user.id}
//   onChange={handleCheckboxChange}
//   className="app__user-checkbox"
//   checked={selectedUsers.includes(user.id)}
// />
//               <span className="app__user-name">{user.name}</span>
//               <span className="app__user-mobile">{user.mobile}</span>
//               {/* Add more user details if needed */}
//             </div>
//           ))}
//         </div>
//       )}
//       {selectedCampaign && (
//         <button onClick={handleSendMessages} className="app__send-button">
//           Send Messages
//         </button>
//       )}
//     </div>
//   );
// };

// export default SendMessageForCamp;




// import React, { useState, useEffect } from 'react';
// import "../../style/managment/SendMessage.css";
// import { makeApi } from "../../api/callApi.tsx";

// const SendMessageForCamp = () => {
//   const [selectedCampaign, setSelectedCampaign] = useState('');
//   const [filters, setFilters] = useState({
//     levels: '',
//     industry: '',
//     gender: '',
//     country: '',
//     state: '',
//     city: ''
//   });
//   const [filteredUserList, setFilteredUserList] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [campaigns, setCampaigns] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     const fetchCampaigns = async () => {
//       try {
//         const response = await makeApi("/v1/admin/api/filtered-campaign-summary", "GET");
//         setCampaigns(response.data.data);
//       } catch (error) {
//         console.error('Error fetching campaigns:', error);
//       }
//     };
//     fetchCampaigns();
//   }, []);

//   const fetchUsers = async (filters) => {
//     try {
//       const response = await makeApi("/v1/influencers/filter", "POST", filters);
//       const users = response.data.data.map(user => ({
//         id: user.id,
//         name: user.user_name,
//         mobile: user.mobile,
//         level: user.level,
//         industry: user.industry,
//         gender: user.gender,
//         country: user.ship_country,
//         state: user.ship_state,
//         city: user.ship_city
//       }));
//       setFilteredUserList(users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   useEffect(() => {
//     fetchUsers(filters);
//   }, [filters]);

//   const handleCampaignChange = (e) => {
//     setSelectedCampaign(e.target.value);
//     setSearchTerm('');
//     setSuggestions([]);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value
//     });
//   };

//   const handleCheckboxChange = (e) => {
//     const userId = e.target.value;
//     setSelectedUsers(prevSelectedUsers =>
//       e.target.checked
//         ? [...prevSelectedUsers, userId]
//         : prevSelectedUsers.filter(id => id !== userId)
//     );
//   };

//   const handleSendMessages = () => {
//     const selectedUserDetails = selectedUsers.map(userId => {
//       const user = filteredUserList.find(user => user.id === userId);
//       return {
//         id: user.id,
//         name: user.user_name,
//         mobile: user.mobile
//       };
//     });

//     window.alert(`Sending messages to:\n${selectedUserDetails.map(user => `${user.name} (${user.mobile})`).join('\n')}`);
//     console.log('Sending messages to:', selectedUserDetails);
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setSuggestions(value ? campaigns.filter(campaign => campaign.campaign_name.toLowerCase().includes(value.toLowerCase())) : []);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSelectedCampaign(suggestion.campaign_name);
//     setSearchTerm('');
//     setSuggestions([]);
//   };

//   useEffect(() => {
//     setSelectedUsers(filteredUserList.map(user => user.id));
//   }, [filteredUserList]);

//   return (
//     <div className="app">
//       <h1 className="app__title">Send Campaign Messages</h1>
//       <div className="app__filter-section">
//         <div className="app__campaign-selection">
//           <div className="app__search-container">
//             <input
//               type="text"
//               placeholder="Search Campaigns"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="app__search-input"
//             />
//             {suggestions.length > 0 && (
//               <ul className="app__suggestions">
//                 {suggestions.map((suggestion, index) => (
//                   <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="app__suggestion-item">
//                     {suggestion.campaign_name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <select
//             value={selectedCampaign}
//             onChange={handleCampaignChange}
//             className="app__campaign-dropdown"
//           >
//             <option value="">Select Campaign</option>
//             {campaigns.map((campaign, index) => (
//               <option key={index} value={campaign.campaign_name}>
//                 {campaign.campaign_name}
//               </option>
//             ))}
//           </select>
//         </div>
//         {selectedCampaign && (
//           <div className="app__filters">
//             <div className="app__filter-item">
//               <label className="app__filter-label">Levels:</label>
//               <select
//                 name="levels"
//                 value={filters.levels}
//                 onChange={handleFilterChange}
//                 className="app__filter-select"
//               >
//                 <option value="">Select Level</option>
//                 <option value="1">L1</option>
//                 <option value="2">L2</option>
//                 <option value="3">L3</option>
//                 <option value="4">L4</option>
//                 <option value="5">L5</option>
//                 <option value="6">L6</option>
//               </select>
//             </div>
//             <div className="app__filter-item">
//               <label className="app__filter-label">Industry:</label>
//               <select
//                 name="industry"
//                 value={filters.industry}
//                 onChange={handleFilterChange}
//                 className="app__filter-select"
//               >
//                 <option value="">Select Industry</option>
//                 <option value="Food">Food</option>
//                 <option value="GYM">GYM</option>
//                 <option value="Travel & Lifestyle">Travel & Lifestyle</option>
//                 <option value="Men Fashion">Men Fashion</option>
//                 <option value="Dance & Music">Dance & Music</option>
//                 <option value="Entertainment">Entertainment</option>
//                 <option value="Kitchen">Kitchen</option>
//               </select>
//             </div>
//             <div className="app__filter-item">
//               <label className="app__filter-label">Gender:</label>
//               <div className="app__filter-radios">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Male"
//                   onChange={handleFilterChange}
//                   className="app__filter-radio"
//                 /> Male
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Female"
//                   onChange={handleFilterChange}
//                   className="app__filter-radio"
//                 /> Female
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="both"
//                   onChange={handleFilterChange}
//                   className="app__filter-radio"
//                 /> Both
//               </div>
//             </div>
//             <div className="app__filter-item">
//               <label className="app__filter-label">Country:</label>
//               <select
//                 name="country"
//                 value={filters.country}
//                 onChange={handleFilterChange}
//                 className="app__filter-select"
//               >
//                 <option value="">Select Country</option>
//                 <option value="USA">USA</option>
//                 <option value="Canada">Canada</option>
//                 <option value="UK">UK</option>
//               </select>
//             </div>
//             <div className="app__filter-item">
//               <label className="app__filter-label">State:</label>
//               <select
//                 name="state"
//                 value={filters.state}
//                 onChange={handleFilterChange}
//                 className="app__filter-select"
//               >
//                 <option value="">Select State</option>
//                 <option value="California">California</option>
//                 <option value="Texas">Texas</option>
//                 <option value="New York">New York</option>
//               </select>
//             </div>
//             <div className="app__filter-item">
//               <label className="app__filter-label">City:</label>
//               <select
//                 name="city"
//                 value={filters.city}
//                 onChange={handleFilterChange}
//                 className="app__filter-select"
//               >
//                 <option value="">Select City</option>
//                 <option value="Los Angeles">Los Angeles</option>
//                 <option value="Houston">Houston</option>
//                 <option value="New York City">New York City</option>
//               </select>
//             </div>
//           </div>
//         )}
//       </div>
//       {selectedCampaign && filteredUserList.length > 0 && (
//         <div className="app__user-list">
//           <h2 className="app__user-list-title">Users </h2><span style={{fontSize: '14px'}} >({selectedUsers.length}) </span>
//           {filteredUserList.map(user => (
//             <div key={user.id} className="app__user-item">
//               <input
//                 type="checkbox"
//                 value={user.id}
//                 onChange={handleCheckboxChange}
//                 className="app__user-checkbox"
//                 checked={selectedUsers.includes(user.id)}
//               />
//               <span className="app__user-name">{user.name}</span>
//               <span className="app__user-mobile">{user.mobile}</span>
//             </div>
//           ))}
//         </div>
//       )}
//       {selectedCampaign && (
//         <button onClick={handleSendMessages} className="app__send-button">
//           Send Messages
//           <img src='https://png.pngtree.com/png-clipart/20190515/original/pngtree-whatsapp-icon-logo-png-image_3560534.jpg'

//             alt="send icon"
//             width={30}
//             className='ms-2'
//           />
//         </button>
//       )}
//     </div>
//   );
// };

// export default SendMessageForCamp;

import React, { useState, useEffect } from 'react';
import "../../style/managment/SendMessage.css";
import { makeApi } from "../../api/callApi.tsx";

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

  const fetchUsers = async (filters) => {
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
    }
  };

  useEffect(() => {
    fetchUsers(filters);
  }, [filters]);

  const fetchCampaignDetails = async (id) => {
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
        name: user.user_name,
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

  useEffect(() => {
    setSelectedUsers(filteredUserList.map(user => user.id));
  }, [filteredUserList]);

  const industiresList = [
    "Education",
    "Entertainment",
    "Environment",
    "Health",
    "Sports",
    "Tourism",
    "Education",
    "Entertainment",
    "Environment",
    "Health",
    "Sports",
    "Tourism",
    "Education",
    "Entertainment",
    "Environment",
    "Health",
    "Sports",
    "Tourism",
    "Education",
    "Entertainment",
    "Environment",
    "Health",
    "Sports",
    "Tourism",
    "Education",
    "Entertainment",
    "Environment",
    "Health",
    "Sports",
    "Tourism",
    "Education",
    "Entertainment",
    "Environment",
    "Health",
    "Sports",
    "Tourism",
    "Education",
    "Entertainment",
    "Environment",
    "Health",
    "Sports",
    "Tourism",
    "Other"
  ]

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
              <div className="app__filter-checkboxes"style={{maxHeight: "200px", overflowY: "auto"}} >
                {/* drop down */}

                {industiresList.map(industry => (
                  <label key={industry}>
                    <input
                      type="checkbox"
                      name="industry"
                      value={industry}
                      checked={filters.industry.includes(industry)}
                      onChange={handleFilterChange}
                      className="app__filter-checkbox"
                    />
                    {industry}
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
              <div className="app__filter-checkboxes">
                {['India', 'USA', 'UK', 'Canada', 'Australia'].map(country => (
                  <label key={country}>
                    <input
                      type="checkbox"
                      name="country"
                      value={country}
                      checked={filters.country.includes(country)}
                      onChange={handleFilterChange}
                      className="app__filter-checkbox"
                    />
                    {country}
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
              <div className="app__filter-checkboxes">
                {['Mumbai', 'Bangalore', 'New York City', 'Los Angeles', 'Toronto'].map(city => (
                  <label key={city}>
                    <input
                      type="checkbox"
                      name="city"
                      value={city}
                      checked={filters.city.includes(city)}
                      onChange={handleFilterChange}
                      className="app__filter-checkbox"
                    />
                    {city}
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
      <div className="app__user-list">
        <h2>Users {filteredUserList.length} </h2>
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
      </div>
      <button onClick={handleSendMessages} className="app__send-button">
        Send Messages
      </button>
    </div>
  );
};

export default App;

