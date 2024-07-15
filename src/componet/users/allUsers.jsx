
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeApi } from '../../api/callApi.tsx';
import "../../style/user/allUsers.css";
import { useInView } from 'react-intersection-observer'; 
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';

function AllUser() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedVerification, setSelectedVerification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 1, 
  });

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await makeApi(`/V1/influencers?name=${searchQuery}&verification=${selectedVerification}&perPage=10&page=${page}`, 'GET');
      const newUsers = response.data.data;
      if(searchQuery || selectedVerification){
        
        console.log("serch",users.length)

        // setUsers(newUsers);
        // setFilteredUsers(newUsers);
        setUsers(prevUsers => [...prevUsers, ...newUsers]);
        setFilteredUsers(prevUsers => [...prevUsers, ...newUsers]);
        return
      }else{
        console.log("normal")

        setUsers(prevUsers => [...prevUsers, ...newUsers]);
        setFilteredUsers(prevUsers => [...prevUsers, ...newUsers]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally{
      setLoading(false);
    }
    
  };
  const fetchUserss = async (page = 1) => {
    setLoading(true);
    try {
      const response = await makeApi(`/V1/influencers?name=${searchQuery}&level=${selectedLevel}&perPage=10&page=${page}`, 'GET');
      const newUsers = response.data.data;
      
      // Update users state with new data
      setUsers(prevUsers => [...prevUsers, ...newUsers]);
      
      // Update filteredUsers state based on search query
      if (searchQuery.trim() !== '') {
        setFilteredUsers(newUsers); // Set to new fetched data if searching
      } else {
        setFilteredUsers(prevUsers => [...prevUsers, ...newUsers]); // Append to existing filteredUsers
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchUsers(); 
  }, [searchQuery,selectedVerification]);

  useEffect(() => {
    if (inView && !loading ) {
      // Fetch more users when end of list is in view
      const nextPage = Math.ceil(users.length / 10) + 1; // Adjust perPage as needed
      fetchUsers(nextPage);
    }
  }, [inView]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // setPage(1);
    // setUsers([]);

  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleVerificationChange = (event) => {
    setSelectedVerification(event.target.value);
    // setPage(1);
    // setUsers([]);
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

  return (
    <>
    {loading && <div style={{height:"100%",width:"100%" ,top:"0", display:"flex",justifyContent:"center",alignItems:"center",zIndex:"9999",position:"fixed",backgroundColor:"rgba(0,0,0,0.3)"}}> <PrimaryLoader/> </div> }
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
        {filteredUsers.map(user => (
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
                       {user?.socialMedia?.platform === "YouTube" && (
                         <Link to={user?.socialMedia?.link} target="_blank" className='text-black' style={{ textDecoration: 'none', color: 'black' }} rel="noopener noreferrer" >
                           <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                             <path d="M8.051 1.999h-.002C3.786 2.014 1.17 2.68.293 3.135a2.01 2.01 0 0 0-.778.611c-.296.36-.504.837-.623 1.525C-.002 6.47 0 8.37 0 8.37s-.002 1.9.116 3.099c.12.688.328 1.166.623 1.526.185.223.425.409.778.61.88.456 3.497 1.121 7.756 1.136 4.265-.015 6.879-.68 7.756-1.136.354-.201.593-.387.778-.61.296-.36.504-.838.623-1.526.118-1.199.116-3.099.116-3.099s.002-1.9-.116-3.099c-.12-.688-.328-1.166-.623-1.526a2.01 2.01 0 0 0-.778-.61c-.88-.456-3.497-1.121-7.756-1.136h-.002Zm0 1.067c4.148.015 6.557.648 7.343 1.047.181.094.31.185.41.297a1.171 1.171 0 0 1 .362.895c.113 1.127.113 2.683.113 2.683s0 1.557-.113 2.684a1.171 1.171 0 0 1-.362.895 1.174 1.174 0 0 1-.41.297c-.786.399-3.195 1.032-7.343 1.047-4.148-.015-6.557-.648-7.343-1.047a1.174 1.174 0 0 1-.41-.297 1.171 1.171 0 0 1-.362-.895C.574 9.928.574 8.371.574 8.371s0-1.556.113-2.683a1.171 1.171 0 0 1 .362-.895c.1-.112.229-.203.41-.297.786-.399 3.195-1.032 7.343-1.047Zm-1.051 2.317v4.634l4.004-2.317-4.004-2.317Z" />
                           </svg>
                         </Link>
                       )}
                     </div>
                   </div>
                 </div>
            </div>
            <Link to={`/user-profile/${user._id}`} className="all-user-view-profile">
              View Profile
            </Link>
          </div>
        ))}
        <div ref={ref} style={{ height: '10px' }}></div> {/* Intersection Observer reference */}
      </div>
      {loading && <div>Loading...</div>}
    </div>
    </>
  );
}

export default AllUser;
