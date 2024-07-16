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
                  <p><strong>Followers:</strong> {user?.socialMedia?.follower ? user?.socialMedia?.follower : 'N/A'}</p>
                  <div className="all-user-social-icons">
                    {user?.socialMedia?.instagram &&
                      <a href={user.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                      </a>
                    }
                    {user?.socialMedia?.youtube &&
                      <a href={user.socialMedia.youtube} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube"></i>
                      </a>
                    }
                    {user?.socialMedia?.tiktok &&
                      <a href={user.socialMedia.tiktok} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-tiktok"></i>
                      </a>
                    }
                  </div>
                </div>
              </div>
              <div className="all-user-actions d-flex align-items-center gap-5">
                <div>

                  <Link to={`/user/user-details/${user._id}`} target='_blank'>
                    <button className="all-user-view-more-button">View More</button>
                  </Link>
                </div>
                <div>

                  <button className='btn ' onClick={() => handleEditClick(user)}>

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
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
