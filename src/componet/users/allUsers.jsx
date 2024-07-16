import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeApi } from '../../api/callApi.tsx';
import "../../style/user/allUsers.css";
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';

function AllUser() {
  const [users, setUsers] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedVerification, setSelectedVerification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [editUser, setEditUser] = useState({});

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await makeApi(`/V1/influencers?name=${searchQuery}&verification=${selectedVerification}&level=${selectedLevel}&perPage=50&page=${currentPage}`, 'GET');
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

  useEffect(() => {
    fetchUsers();
  }, [searchQuery, selectedVerification, selectedLevel, currentPage]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleVerificationChange = (event) => {
    const value = event.target.value;
    setSelectedVerification(value === 'All' ? '' : value);
  };

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
    setShowPopup(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await makeApi(`/V1/influencers/${editUser._id}`, 'PUT', editUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === editUser._id ? response.data : user))
      );
      setShowPopup(false);

    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const startPage = Math.max(1, currentPage - 4);
  const endPage = Math.min(totalPages, startPage + 9);

  return (
    <>
      {loading && <div style={{ height: "100%", width: "100%", top: "0", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999", position: "fixed", backgroundColor: "rgba(0,0,0,0.3)" }}> <PrimaryLoader /> </div>}
      <div className="all-user-users-page">
        <div className="all-user-top-bar">
          <div className="all-user-tabs">
            {['All', 'New', 'Rejected', 'Verified', 'Suspended', 'Sleep mode', 'Prime Content'].map(tab => (
              <button
                key={tab}
                className={`tab-button ${selectedVerification === tab ? 'active' : ''}`}
                onClick={() => handleVerificationChange({ target: { value: tab } })}
              >
                {tab}
              </button>
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="tab-button all-user-search"
              style={{ cursor: 'text' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="all-user-level-filter">
            <label htmlFor="level" className='all-user-level-filter-text'>Filter by Level:</label>
            <select id="level" value={selectedLevel} onChange={handleLevelChange}>
              <option value="">All</option>
              {[...Array(8)].map((_, index) => (
                <option key={index} value={index}>{index}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="all-user-users-list">
          {users.map(user => (
            <div key={user._id} className={`all-user-user-card ${getVerificationClass(user.verification)}`}>
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt={user.user_name}
                className="all-user-user-image"
              />
              <div className="all-user-user-info">
                <h3>{user.user_name}</h3>
                <p><strong>Level:</strong> {user.level}</p>
                <p><strong>Verification:</strong> {user.verification}</p>
                <div>
                  <p><strong>Primary Platform:</strong> {user.primary_platform}</p>
                </div>
                <div className="all-user-social-media">




                  <div className="all-user-social-media">
                    <p><strong>Followers:</strong> {user?.socialMedia?.follower ? user?.socialMedia?.follower : 'N/A'}</p>
                    <div className='d-flex gap-4'>
                      <div><strong>Platform:</strong> {user?.socialMedia?.platform ? user?.socialMedia?.platform : 'N/A'}</div>
                      <div>
                        {user?.socialMedia?.platform === "Instagram" && (
                          <Link to={user?.socialMedia?.link} target="_blank" className='text-black' style={{ textDecoration: 'none', color: 'black' }} rel="noopener noreferrer" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.372 1.942.372.853.038 1.125.048 3.297.048 2.173 0 2.444-.01 3.297-.048.851-.04 1.432-.174 1.941-.372a3.9 3.9 0 0 0 1.417-.923 3.9 3.9 0 0 0 .923-1.417c.198-.51.372-1.09.372-1.942.038-.853.048-1.125.048-3.297 0-2.174-.01-2.445-.048-3.297-.04-.852-.174-1.433-.372-1.942a3.9 3.9 0 0 0-.923-1.417 3.9 3.9 0 0 0-1.417-.923c-.51-.198-1.09-.372-1.942-.372C10.445.01 10.173 0 8 0ZM8 1.46c2.13 0 2.384.01 3.226.047.78.035 1.204.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.281.24.705.276 1.485.037.842.046 1.096.046 3.227 0 2.13-.01 2.384-.046 3.226-.035.78-.166 1.204-.276 1.485a2.45 2.45 0 0 1-.598.92 2.45 2.45 0 0 1-.92.598c-.281.11-.705.24-1.485.276-.842.037-1.096.047-3.226.047-2.131 0-2.385-.01-3.227-.047-.78-.035-1.204-.166-1.485-.276a2.45 2.45 0 0 1-.92-.598 2.45 2.45 0 0 1-.598-.92c-.11-.281-.24-.705-.276-1.485-.037-.842-.047-1.096-.047-3.226 0-2.131.01-2.385.047-3.227.035-.78.166-1.204.276-1.485a2.45 2.45 0 0 1 .598-.92 2.45 2.45 0 0 1 .92-.598c.281-.11.705-.24 1.485-.276.842-.037 1.096-.046 3.227-.046ZM8 3.892A4.108 4.108 0 1 0 8 12.108 4.108 4.108 0 0 0 8 3.892Zm0 1.455a2.653 2.653 0 1 1 0 5.306 2.653 2.653 0 0 1 0-5.306ZM12.733 3.534a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92Z" />
                            </svg>
                          </Link>
                        )}
                        {/* facebook */}
                        {user?.socialMedia?.platform === "Facebook" && (
                          <Link to={user?.socialMedia?.link} target="_blank" className='' style={{ textDecoration: 'none' }} rel="noopener noreferrer" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                            </svg>
                          </Link>
                        )}

                        {user?.socialMedia?.platform === "YouTube" && (
                          <Link to={user?.socialMedia?.link} target="_blank" className='text-black' style={{ textDecoration: 'none', color: 'red' }} rel="noopener noreferrer" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
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

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                  </button>
                </div>
              </div>
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

      {showPopup && (
        <div className="popup_for_edit_user">
          <div className="popup-inner_for_edit_user">
            <h3>Edit User</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Verification Status:
                <select
                  value={editUser.verification}
                  onChange={(e) => setEditUser({ ...editUser, verification: e.target.value })}
                >
                  <option value="Verified">Verified</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Social Media Verification Pending">Social Media Verification Pending</option>
                  <option value="Suspended">Suspended</option>
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
    </>
  );
}

export default AllUser;
