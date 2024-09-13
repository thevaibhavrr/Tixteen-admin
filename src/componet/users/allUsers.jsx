import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeApi } from '../../api/callApi.tsx';
import "../../style/user/allUsers.css";
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
 
function AllUser() {
  const dummyimage = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  const [users, setUsers] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedVerification, setSelectedVerification] = useState('Social Media Verification Pending');
  const [searchQuery, setSearchQuery] = useState('');

  const [loading, setLoading] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [ApplyFilterPopup, setApplyFilterPopup] = useState(false);
  const [filterGender, setFilterGender] = useState("");
  const [IndustryList, setIndustryList] = useState([]);
  const [cityList, setCitiesList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStatesList] = useState([]);
  const [filterState, setFilterState] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [filterPrimaryPlatform, setFilterPrimaryPlatform] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [levels, setLevels] = useState([]);
  const [selectedinfulencerLevel, setSelectedinfulencerLevel] = useState('')
  const [serachQuery, setSerachQuery] = useState("name");


  const [languageList, setLanguageList] = useState([]);

  const [filterLanguage, setFilterLanguage] = useState("");

  const [showRejectionPopup, setShowRejectionPopup] = useState(false);

  const [countuser, setCountuser] = useState()


  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await makeApi(`/V1/influencers?${serachQuery}=${searchQuery}&verification=${selectedVerification}&level=${selectedLevel}&gender=${filterGender}&industry=${filterIndustry}&language=${filterLanguage}&primary_platform=${filterPrimaryPlatform}&ship_country=${filterCountry}&ship_state=${filterState}&ship_city=${filterCity}&perPage=50&page=${currentPage}`, 'GET');
      const Count = await makeApi('/V1/influencers/influencers-count', 'GET');
      console.log(Count.data.data)
      setCountuser(Count.data.data)
      const newUsers = response.data.data;
      const total = response.data.dataCount;

      setTotalPages(Math.ceil(total / 50));
      setUsers(newUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchLanguages = async () => {
    setLoading(true);
    try {
      const res = await makeApi('/v1/get-all-languages', 'GET');
      setLanguageList(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLevels = async () => {
    try {
      setLoading(true);
      const response = await makeApi('/v1/get-all-levels', "GET");
      setLevels(response.data.data);
    } catch (error) {
      console.error("Failed to fetch levels:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const FetchStateList = async () => {
    setLoading(true);
    try {
      const res = await makeApi('/v1/get-all-states', 'GET');
      setStatesList(res.data.data);
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
    fetchLevels();
    fetchLanguages();
  }, []);




  useEffect(() => {
    fetchUsers();
  }, [searchQuery, filterGender, filterPrimaryPlatform, filterIndustry, filterLanguage, selectedVerification, selectedLevel, currentPage]);

  const handleChangeLevel = (event) => {
    setSelectedinfulencerLevel(event.target.value);
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
  const toggleLanguage = (languageName) => {
    let updatedFilterLanguage;
    if (filterLanguage.includes(languageName)) {
      updatedFilterLanguage = filterLanguage
        .split(',')
        .filter(name => name !== languageName)
        .join(',');
    } else {
      updatedFilterLanguage = filterLanguage
        ? `${filterLanguage},${languageName}`
        : languageName;
    }
    setFilterLanguage(updatedFilterLanguage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleVerificationChange = (event) => {
    const value = event.target.value;
    if (value === 'All') {
      setSelectedVerification('');
    }
    else if (value === 'New') {
      setSelectedVerification('Social Media Verification Pending');
    }
    else {
      setSelectedVerification(value);

    }
    // setSelectedVerification(value === 'New' ? 'Social Media Verification Pending' : value);

  };
  const updateUserverificationStatus = (e) => {
    setEditUser({ ...editUser, verification: e.target.value });
    if (e.target.value === 'Rejected') {
      setShowRejectionPopup(true);
    } else {
      setShowRejectionPopup(false);
    }
  }

  const getVerificationClass = (verification) => {
    switch (verification) {
      case 'Rejected':
        return 'rejected';
      case 'Verified':
        return 'verified';
      case 'Social Media Verification Pending':
        return 'social-media-pending';
      default:
        return '';
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setSelectedinfulencerLevel(user.level)
    setShowPopup(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // const response = await makeApi(`/V1/influencers/${editUser._id}`, 'PUT', editUser);
      const data = {
        ...editUser,
        level: selectedinfulencerLevel
      }
      const response = await makeApi(`/api/update-user/${editUser._id}`, 'PUT', { editUser: data });
      setShowPopup(false);
      setShowRejectionPopup(false)
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === editUser._id ? response.data : user))
      );

    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      fetchUsers();
    setLoading(false);

    }
  };

  const startPage = Math.max(1, currentPage - 4);
  const endPage = Math.min(totalPages, startPage + 9);

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();

    // Adjust age if the birth month hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }

    return age;
  };

  const filterName = [
    { name: `All\n${countuser?.countAlluser}`, value: "" },
    { name: `New\n${countuser?.countPaninguser}`, value: "Social Media Verification Pending" },
    { name: `Verified\n${countuser?.countVerifieduser}`, value: "Verified" },
    { name: `Rejected\n${countuser?.countRejecteduser}`, value: "Rejected" },
    // { name: "Suspended", value: "Suspended" },
    // { name: "Sleep mode", value: "Sleep mode" },
    // { name: "Prime Content", value: "Prime Content" },
  ];


  const getFullLink = (platform, link) => {
    if (!link.startsWith("www.") && !link.startsWith("https://")) {
      switch (platform) {
        case "Instagram":
          return `https://www.instagram.com/${link}`;
        case "Facebook":
          return `https://www.facebook.com/${link}`;
        case "YouTube":
          return `https://www.youtube.com/${link}`;
        default:
          return link;
      }
    }
    return link;
  };

  return (
    <>
      {loading && <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}> <PrimaryLoader /> </div>}
      <div className="all-user-users-page">
        <div className="all-user-top-bar">
          <div className="all-user-tabs">

            {filterName.map((tab) => (
              <button
                key={tab.name}
                className={`tab-button ${selectedVerification === tab.value ? 'active' : ''}`}
                onClick={() => handleVerificationChange({ target: { value: tab.value } })}
              >
                <span dangerouslySetInnerHTML={{ __html: tab.name.replace(/\n/g, '<br />') }} />
              </button>
            ))}


            <button
              className={`tab-button `}
              onClick={() => setApplyFilterPopup(true)}
            >
              Filters
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
              </svg>
            </button>
          </div>
          <div className='d-flex gap-4' >
            <div>
              <select className="tab-button all-user-search" value={serachQuery} onChange={(e) => { setSerachQuery(e.target.value) }}>
                <option value="name">From Name</option>
                <option value="id">From Id</option>
                <option value="phone">From Phone</option>
              </select>
            </div>

            <div>
              <input
                type="text"
                placeholder={`Search by ${serachQuery}....`}
                className="tab-button all-user-search"
                style={{ cursor: 'text' }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="all-user-level-filter">
            <label htmlFor="level" className='all-user-level-filter-text'>Filter by Level:</label>
            <select className='tab-button all-user-search' id="level" value={selectedLevel} onChange={handleLevelChange}>
              <option value="">All</option>
              {levels.map((data, index) => (
                <option key={index} value={data.level}>{data.level}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="all-user-users-list">
          {users.map(user => (
            <div key={user._id} className={`all-user-user-card ${getVerificationClass(user.verification)}`}>
              {/* <strong className='pb-1 text-danger' >TXT-{user.id}</strong> */}
              <strong>{`TX${user?.user_name?.charAt(0).toUpperCase()}-${user.id}`}</strong>
              <LazyLoadImage effect="blur"
               
                src={
                  user.profile_img && user.profile_img.includes('http://res.cloudinary.com')
                    ? user.profile_img
                    :  `https://storage.tixteen.com/assets/${user.profile_img}`
                }
                loading='lazy'
               
                alt={user.user_name}
                className="all-user-user-image"
              />
              <div className="all-user-user-info">
                <div className='all-user-user-name' >{user.user_name}</div>
                <div className='all-user-user-details-small' >
                  <div>
                    <p><strong>Level:</strong> {user.level}</p>
                  </div>
                  <div>
                    <p><strong>{user.verification}</strong> </p>
                  </div>
                </div>
                <div className='all-user-user-details-small'>
                  <div>
                    <p><strong>Age:</strong> {calculateAge(user.dob)}</p>
                  </div>
                  <div>
                    <p><strong>Gender:</strong> {user.gender}</p>
                  </div>
                </div>
                <div className='all-user-user-details-small'>
                  {/* <p><strong>Primary Platform:</strong> {user.primary_platform}</p> */}
                </div>
                <p className='all-user-industry'> <strong>Industry:</strong> {user.industry} </p>
                <div className="all-user-social-media">
                  <div className="all-user-social-media">
                    <p><strong>Followers:</strong> {user?.socialMedia?.follower ? user?.socialMedia?.follower : 'N/A'}</p>
                    <div className='d-flex justify-content-between'>
                      <div><strong>Platform:</strong> {user?.socialMedia?.platform ? user?.socialMedia?.platform : 'N/A'}</div>
                      <div>
                        {user?.socialMedia?.platform === "Instagram" && (
                          // <Link to={user?.socialMedia?.link} target="_blank" className='text-black' style={{ textDecoration: 'none', color: 'black' }} rel="noopener noreferrer" >
                          <Link to={getFullLink("Instagram", user?.socialMedia?.link)} target="_blank" className='text-black' style={{ textDecoration: 'none', color: 'black' }} rel="noopener noreferrer" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.372 1.942.372.853.038 1.125.048 3.297.048 2.173 0 2.444-.01 3.297-.048.851-.04 1.432-.174 1.941-.372a3.9 3.9 0 0 0 1.417-.923 3.9 3.9 0 0 0 .923-1.417c.198-.51.372-1.09.372-1.942.038-.853.048-1.125.048-3.297 0-2.174-.01-2.445-.048-3.297-.04-.852-.174-1.433-.372-1.942a3.9 3.9 0 0 0-.923-1.417 3.9 3.9 0 0 0-1.417-.923c-.51-.198-1.09-.372-1.942-.372C10.445.01 10.173 0 8 0ZM8 1.46c2.13 0 2.384.01 3.226.047.78.035 1.204.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.281.24.705.276 1.485.037.842.046 1.096.046 3.227 0 2.13-.01 2.384-.046 3.226-.035.78-.166 1.204-.276 1.485a2.45 2.45 0 0 1-.598.92 2.45 2.45 0 0 1-.92.598c-.281.11-.705.24-1.485.276-.842.037-1.096.047-3.226.047-2.131 0-2.385-.01-3.227-.047-.78-.035-1.204-.166-1.485-.276a2.45 2.45 0 0 1-.92-.598 2.45 2.45 0 0 1-.598-.92c-.11-.281-.24-.705-.276-1.485-.037-.842-.047-1.096-.047-3.226 0-2.131.01-2.385.047-3.227.035-.78.166-1.204.276-1.485a2.45 2.45 0 0 1 .598-.92 2.45 2.45 0 0 1 .92-.598c.281-.11.705-.24 1.485-.276.842-.037 1.096-.046 3.227-.046ZM8 3.892A4.108 4.108 0 1 0 8 12.108 4.108 4.108 0 0 0 8 3.892Zm0 1.455a2.653 2.653 0 1 1 0 5.306 2.653 2.653 0 0 1 0-5.306ZM12.733 3.534a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92Z" />
                            </svg>
                          </Link>
                        )}
                        {/* facebook */}
                        {user?.socialMedia?.platform === "Facebook" && (
                          <Link to={user?.socialMedia?.link} target="_blank" className='' style={{ textDecoration: 'none' }} rel="noopener noreferrer" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                            </svg>
                          </Link>
                        )}

                        {user?.socialMedia?.platform === "YouTube" && (
                          <Link to={user?.socialMedia?.link} target="_blank" className='text-black' style={{ textDecoration: 'none', color: 'red' }} rel="noopener noreferrer" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                            </svg>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="all-user-actions d-flex align-items-center gap-5 pt-4">
                <div>

                  <Link to={`/user/user-details/${user._id}`} target='_blank'>
                    <button className="all-user-view-more-button">View More</button>
                  </Link>
                </div>
                <div>

                  <button className='btn ' onClick={() => handleEditClick(user)}>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                  </button>
                </div>
              </div>
              Approved By - <b> {user.approved_by} </b>
            </div>
          ))}
        </div>
        <div className="all_user_pagination d-flex justify-content-center">
          {startPage > 1 && (
            <>
              <button onClick={() => handlePageClick(1)}>&laquo;</button>
              <span>...</span>
            </>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(pageNumber => (
            <button
              key={pageNumber}
              className={pageNumber === currentPage ? 'active' : ''}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          {endPage < totalPages && (
            <>
              <span>...</span>
              <button onClick={() => handlePageClick(totalPages)}>&raquo;</button>
            </>
          )}
        </div>

      </div>
      {/* edit user verification status */}
      {showPopup && (
        <div className="popup_for_edit_user">
          <div className="popup-inner_for_edit_user">
            <h3>Edit User</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Verification Status:
                <select
                  value={editUser.verification}
                  // onChange={(e) => setEditUser({ ...editUser, verification: e.target.value })}
                  onChange={(e) => updateUserverificationStatus(e)}
                >
                  <option value="Verified">Verified</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Social Media Verification Pending">Social Media Verification Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </label>

              <label>
                Level:
                <select value={selectedinfulencerLevel} onChange={handleChangeLevel}>
                  <option value="">Select a level</option>
                  {levels.map((level) => (
                    <option key={level.id} value={level.level}>
                      Level {level.level}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                User Details:
                <input
                  type="text"
                  value={editUser.user_name}
                  onChange={(e) => setEditUser({ ...editUser, user_name: e.target.value })}
                />
              </label>
              <div className='d-flex gap-5' >

                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* appply filter popup */}
      {ApplyFilterPopup && (
        <>
          <div className="popup_for_edit_user">
            <div className="popup-inner_for_edit_user">
              <div className='text-end' >
                <button type="" style={{ padding: '0px' }} onClick={() => setApplyFilterPopup(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                </button>
              </div>
              <h3>Apply Filter </h3>
              <div>
                {/* Gender */}
                <div>
                  <label>
                    Gender:
                    <select
                      value={filterGender}
                      onChange={(e) => setFilterGender(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </label>
                </div>
                {/* primary_platform dropdown */}
                <div>
                  <label>
                    Primary Platform:
                    <select
                      value={filterPrimaryPlatform}
                      onChange={(e) => setFilterPrimaryPlatform(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Twitter">Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="youtube">Youtube</option>
                    </select>
                  </label>

                </div>



                {/* industry dropdown with checkbox */}
                <div>
                  <div>
                    Industry:
                  </div>
                  <div className='filter_chebox_parent_div'>
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

                {/* language dropdown with checkbox */}
                <div>
                  <div>
                    Language:
                  </div>
                  <div className='filter_chebox_parent_div'>
                    {languageList.map((language) => (
                      <div key={language.language} className='d-flex align-items-center'>
                        <div className='w-25'>
                          <input
                            type="checkbox"
                            id={language.language}
                            value={language.language}
                            checked={filterLanguage.split(',').includes(language.language)}
                            onChange={() => toggleLanguage(language.language)}
                            style={{ width: "20px", height: "20px", cursor: "pointer" }}
                          />
                        </div>
                        <div className='w-100'>
                          <label htmlFor={language.language}>{language.language}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* country dropdown  */}
              <div>
                <div>
                  Country:
                  <select
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                  >
                    <option value="">All</option>
                    {countryList.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* state dropdown */}

              <div>
                <label>
                  State:
                  <select
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                  >
                    <option value="">All</option>
                    {stateList.map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* city dropdown  */}
              <div>
                <label>
                  City:
                  <select
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                  >
                    <option value="">All</option>
                    {cityList.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>



            </div>
          </div>
        </>
      )}

      {showRejectionPopup && (
        <div className="popup_for_rejection">
          <div className="popup-inner_for_rejection">
            <div className='reject_head' >
              <h3>Reason of Rejection</h3>
            </div>
            <div className='reject_body_for_rejection' >
              <div>

                Thank you for your application. We really appreciate your interest in joining our company and we want to thank you for the time and energy you invested.
              </div>
              <div>

                We received a large number of application, and after carefully reviewing all of them, unfortunately, we have to inform you that this time we won’t be able to invite you to the next phase of our selection process.
              </div>
              <div>
                We wish you every personal and professional success in your future endeavors.<br />
              </div>
              <div>

                Once again, thank you for your interest in working with us.<br />
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }} >
                Thanks,
                <br />
                Team Tixteen.
              </div>
            </div>
            {/* <form onSubmit={handleRejectionSubmit}> */}
            <form onSubmit={handleFormSubmit}>
              <label>
                <textarea
                  onChange={(e) => setEditUser({ ...editUser, reject_mark: e.target.value })}
                  placeholder='Enter your rejection message'
                />
              </label>
              <div className="d-flex justify-content-center w-100 gap-5">
                <button type="submit" className='btn btn-danger' >Reject</button>
                <button type="button" className='btn btn-secondary' onClick={() => setShowRejectionPopup(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AllUser;
