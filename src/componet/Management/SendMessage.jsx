import React, { useState, useEffect } from 'react';
import "../../style/managment/SendMessage.css";
import { makeApi } from "../../api/callApi.tsx";
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
import { ToastContainer, toast } from "react-toastify";


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
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filteredUserList, setFilteredUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [IndustryList, setIndustryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [campignLoading, setCampignLoading] = useState(false);
  const [levels, setLevels] = useState([]);
  const [ḶevelLoading, setḶevelLoading] = useState(false);
  const [languages, setLanguages] = useState([]);

  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterGender, setFilterGender] = useState("");

  // Fetch Industry
  const fetchIndustry = async () => {
    setCampignLoading(true);
    try {
      const response = await makeApi("/v1/get-all-industries", "GET");
      setIndustryList(response.data.data);
    } catch (error) {
      console.error('Error fetching industry:', error);
    } finally {
      setCampignLoading(false);
    }
  };

  const fetchLevels = async () => {
    try {
      setḶevelLoading(true);
      const response = await makeApi('/v1/get-all-levels', "GET");
      setLevels(response.data.data);
    } catch (error) {
      console.error("Failed to fetch levels:", error);
    } finally {
      setḶevelLoading(false);
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
  const fetchLanguages = async () => {
    // setLoading (true);
    try {
      const res = await makeApi('/v1/get-all-languages', 'GET');

      setLanguages(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading (false);
    }
  };

  useEffect(() => {
    fetchIndustry();
    fetchCountry();
    fetchCity();
    fetchLevels();
    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        const response = await makeApi("/v1/admin/api/filtered-campaign-summary", "GET");
        const campaigns = response.data.data;
        const reversedCampaigns = [...campaigns].reverse();
        setCampaigns(reversedCampaigns);
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

      const response = await makeApi(`/V1/influencers?MultiLevels=${filterLevel}&industry=${filterIndustry}&language=${filterLanguage}&verification=Verified&gender=${filterGender}&perPage=50000000&page=${currentPage}`, 'GET');
      console.log(response.data.data);
      setUserList(response.data.data);
      setFilteredUserList(response.data.data);
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


  // filter items 

  const togglelevel = (industryName) => {
    let updatedFilterIndustry;
    if (filterLevel.includes(industryName)) {
      updatedFilterIndustry = filterLevel
        .split(',')
        .filter(name => name !== industryName)
        .join(',');
    } else {
      updatedFilterIndustry = filterLevel
        ? `${filterLevel},${industryName}`
        : industryName;
    }
    setFilterLevel(updatedFilterIndustry);
  };
  const toggleLanguage = (industryName) => {
    let updatedFilterIndustry;
    if (filterLanguage.includes(industryName)) {
      updatedFilterIndustry = filterLanguage
        .split(',')
        .filter(name => name !== industryName)
        .join(',');
    } else {
      updatedFilterIndustry = filterLanguage
        ? `${filterLanguage},${industryName}`
        : industryName;
    }
    setFilterLanguage(updatedFilterIndustry);
  };
  const toggleIndustry = (industryName) => {
    let updatedFilterIndustry;
    if (filterIndustry.includes(industryName)) {
      updatedFilterIndustry = filterIndustry
        .split(',')
        .filter(name => name !== industryName)
        .join(',');
    } else {
      updatedFilterIndustry = filterIndustry
        ? `${filterIndustry},${industryName}`
        : industryName;
    }
    setFilterIndustry(updatedFilterIndustry);
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
  const handleFilterLevelChecke = (e) => {
    console.log(e.target.value)
  }

  const handleCheckboxChange = (e) => {
    const userId = e.target.value;
    setSelectedUsers(prevSelectedUsers =>
      e.target.checked
        ? [...prevSelectedUsers, userId]
        : prevSelectedUsers.filter(id => id !== userId)
    );
  };

  const handleSendMessages = async () => {
    setLoading(true);
    try {
      const selectedUserDetails = selectedUsers.map(userId => {
        const user = filteredUserList.find(user => user.id === userId);
        return {
          id: user.id,
          name: user.user_name,
          mobile: user.mobile
        };
      });
      const response = await makeApi("/v1/admin/api/send-message", "POST", { users: selectedUserDetails, campaignData: campaignDetails });
      console.log("Messages sent successfully:", response.data);
      toast.success("Message sended. ")
      setLoading(false);
    } catch (error) {
      console.error("Error sending messages:", error);
      toast.error("Something went wrong. ")
    } finally {
      setLoading(false);
    }

  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSuggestions(value ? campaigns.filter(campaign => campaign.campaign_name.toLowerCase().includes(value.toLowerCase())) : []);
  };

  // suggestion button
  const handleSuggestionClick = (suggestion) => {
    setSelectedCampaign(suggestion.campaign_name);
    setSearchTerm('');
    const selectedCampaignObj = campaigns.find(campaign => campaign.campaign_name === selectedCampaign);
    fetchCampaignDetails(selectedCampaignObj._id);
    setSuggestions([]);
  };

  const handleApplyFilters = () => {
    fetchUsers(filters);
    const allUserIds = filteredUserList.map(user => user.id);
    setSelectedUsers(allUserIds);

  };

  // all checked
  const handleSelectAllFilteredUsers = () => {
    // Extract user IDs from filteredUserList
    const allUserIds = filteredUserList.map(user => user.id);
    setSelectedUsers(allUserIds);
  };



  function GenderRadio() {
    return <>
      <div className="app__filter-item">
        <label className="app__filter-label">Gender:</label>
        <div className="app__filter-radios">
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={() => setFilterGender("Male")}
            className="app__filter-radio"
            checked={filterGender === 'Male'}

          /> Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={() => setFilterGender("Female")}
            className="app__filter-radio"
            checked={filterGender === 'Female'}
          /> Female
          <input
            type="radio"
            name="gender"
            value=""
            onChange={() => setFilterGender("")}
            className="app__filter-radio"
            checked={filterGender === ''}
          /> Both
        </div>
      </div>
    </>
  }
  const handleSelectAllIndustries = () => {
    const allIndustries = IndustryList.map(industry => industry.name);
    setFilterIndustry(allIndustries.join(','));
  };
  
  const handleSelectAllLevels = () => {
    const allLevels = levels.map(level => level.level);
    setFilterLevel(allLevels.join(','));
  };
  
  const handleSelectAllLanguages = () => {
    const allLanguages = languages.map(language => language.language);
    setFilterLanguage(allLanguages.join(','));
  };
  
  function IndustryCheckbox() {
    return <>

      <div style={{ maxWidth: "280px" }} >
        <label className="app__filter-label">Industry:</label>
        <div className='filter_chebox_parent_div'>
        {/* <button onClick={handleSelectAllIndustries} className="btn btn-primary">Select All Industries</button> */}
          {IndustryList.map((industry) => (
            <div key={industry.name} className='d-flex align-items-center'>
              <div className='w-25'>
                <input
                  type="checkbox"
                  id={industry.name}
                  value={industry.name}
                  checked={filterIndustry.split(',').includes(industry.name)}
                  onChange={() => toggleIndustry(industry.name)}
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              </div>
              <div className='w-100'>
                <label htmlFor={industry.name}>{industry.name}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  }

  function LanguageCheckbox() {
    return <>
      <div style={{ maxWidth: "280px", minWidth: "250px" }}>
        <label className="app__filter-label">Language:</label>
        <div className='filter_chebox_parent_div'>
        {/* <button onClick={handleSelectAllLanguages} className="btn btn-primary">Select All Languages</button> */}
  
          {languages.map((industry) => (
            <div key={industry.language} className='d-flex align-items-center'>
              <div className='w-25'>
                <input
                  type="checkbox"
                  id={industry.language}
                  value={industry.language}
                  checked={filterLanguage.split(',').includes(industry.language)}
                  onChange={() => toggleLanguage(industry.language)}
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              </div>
              <div className='w-100'>
                <label htmlFor={industry.language}>{industry.language}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  }
  function CityCheckBox() {
    return <>
      <div>
        <label className="app__filter-label">City:</label>
        <div className='filter_chebox_parent_div'>
          {cityList.map((city) => (
            <div key={city.name} className='d-flex align-items-center'>
              <div className='w-25'>
                <input
                  type="checkbox"
                  id={city.name}
                  value={city.name}
                  // checked={filterCity.split(',').includes(city.name)}
                  // onChange={() => toggleCity(city.name)}
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
              </div>
              <div className='w-100'>
                <label htmlFor={city.name}>{city.name}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  }
  function LevelsCheckBox() {
    return <>
      <div className="app__filter-item" style={{ maxWidth: "220px" }}>
        <label className="app__filter-label">Levels:</label>
        <div className="">
          <div>
            <div className='filter_chebox_parent_div '>
            {/* <button onClick={handleSelectAllLevels} className="btn btn-primary">Select All Levels</button> */}
  
              {levels.map((industry) => (
                <div key={industry.level} className='d-flex align-items-center'>
                  <div className='w-25'>
                    <input
                      type="checkbox"
                      id={industry.level}
                      value={industry.level}
                      checked={filterLevel.split(',').includes(industry.level)}
                      onChange={() => togglelevel(industry.level)}
                      style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    />
                  </div>
                  <div className='w-100'>
                    <label htmlFor={industry.level}>L{industry.level}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  }
  function StateCheckBox() {
    return <>
      <div>
        <label className="app__filter-label">State:</label>
        <div className='filter_chebox_parent_div'>
          {/* {stateList.map((state) => (
                    <div key={state.name} className='d-flex align-items-center'>
                      <div className='w-25'>
                        <input
                          type="checkbox"
                          id={state.name}
                          value={state.name}
                          // checked={filterState.split(',').includes(state.name)}
                          // onChange={() => toggleState(state.name)}
                          style={{ width: "20px", height: "20px", cursor: "pointer" }}
                        />
                      </div>
                      <div className='w-100'>
                        <label htmlFor={state.name}>{state.name}</label>
                      </div>
                    </div>
                  ))} */}
        </div>
      </div>
    </>
  }
  function CountryCheckBox() {
    return <>
      <div>
        <label className="app__filter-label">Country:</label>
        <div className='filter_chebox_parent_div'>
          {/* {countryList.map((country) => (
                    <div key={country.name} className='d-flex align-items-center'>
                      <div className='w-25'>
                        <input
                          type="checkbox"
                          id={country.name}
                          value={country.name}
                          // checked={filterCountry.split(',').includes(country.name)}
                          // onChange={() => toggleCountry(country.name)}
                          style={{ width: "20px", height: "20px", cursor: "pointer" }}
                        />
                      </div>
                      <div className='w-100'>
                        <label htmlFor={country.name}>{country.name}</label>
                      </div>
                    </div>
                  ))} */}
        </div>
      </div>
    </>
  }


 
  return (
    <>
      {loading &&
        <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}>
          <PrimaryLoader />
        </div>
      }
      {campignLoading &&
        <div style={{ position: "fixed", top: "0", height: "100vh", width: "100%" }} >
          <PrimaryLoader />
        </div>
      }
      <ToastContainer />
      <div className="app" style={{marginBottom:"100px"}} >
        <h1 className="app__title">Send Campaign Messages</h1>
        <div className="app__filter-section">
          <div className="app__campaign-selection">
          {/* <StatusCheckbox /> */}

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
              <IndustryCheckbox />
              <LevelsCheckBox />
              <GenderRadio />
              <LanguageCheckbox />
              {/* <CountryCheckBox/> */}
              {/* <StateCheckBox/> */}
              {/* <CityCheckBox /> */}

            </div>
          )}
        </div>

        <button onClick={handleApplyFilters} className="app__apply-filters-button btn btn-warning">
          Apply Filters
        </button>
        <div className="app__user-list">

          <h2>Users {filteredUserList.length}</h2>
          <button onClick={handleSelectAllFilteredUsers} className="btn btn-primary">
            select all
          </button>
          {isLoading ? (
            <div>Loading...
              <PrimaryLoader />
            </div>
          ) : (
            <div className='send-message-user-data-table-div' >
              <table className="app__user-table">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Level</th>
                    <th>Industry</th>
                    <th>Gender</th>
                    {/* <th>Country</th> */}
                    <th>State</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody >
                  {filteredUserList.map(user => (
                    <tr className='send-message-user-data-tbody' key={user.id}>
                      <td>
                        <input
                          type="checkbox"
                          value={user.id}
                          onChange={handleCheckboxChange}
                          checked={selectedUsers.includes(user.id)} // Checkbox will be checked if user is in selectedUsers
                        />
                      </td>
                      <td>{user.user_name}</td>
                      <td>{user.mobile}</td>
                      <td>{user.level}</td>
                      <td>{user.industry}</td>
                      <td>{user.gender}</td>
                      {/* <td>{user.country}</td> */}
                      <td>{user.state}</td>
                      <td>{user.city}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
        <button onClick={handleSendMessages} className="app__send-button">
          Send Messages
        </button>
      </div>
    </>

  );
}

export default App;

