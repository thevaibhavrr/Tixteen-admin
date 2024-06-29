// import React, { useState, useEffect } from 'react';
// import "../../style/user/allUsers.css";
// import { Link } from 'react-router-dom';
// import { makeApi } from '../../api/callApi.tsx';


// const usersData = [
//   {
//     id: "1",
//     user_name: "Manish Singh",
//     profile_img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     level: "L2",
//     verification: "Rejected",
//     primary_platform: "Instagram",
//     ship_state: "Madhya Pradesh"
//   },
//   {
//     id: "2",
//     user_name: "Amit Kumar",
//     profile_img: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1868",
//     level: "L1",
//     verification: "Verified",
//     primary_platform: "YouTube",
//     ship_state: "Delhi"
//   },
//   {
//     id: "1",
//     user_name: "Manish Singh",
//     profile_img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     level: "L2",
//     verification: "Rejected",
//     primary_platform: "Instagram",
//     ship_state: "Madhya Pradesh"
//   },
//   {
//     id: "2",
//     user_name: "Amit Kumar",
//     profile_img: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1868",
//     level: "L1",
//     verification: "Verified",
//     primary_platform: "YouTube",
//     ship_state: "Delhi"
//   },
//   {
//     id: "1",
//     user_name: "Manish Singh",
//     profile_img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     level: "L2",
//     verification: "Rejected",
//     primary_platform: "Instagram",
//     ship_state: "Madhya Pradesh"
//   },
//   {
//     id: "2",
//     user_name: "Amit Kumar",
//     profile_img: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1868",
//     level: "L1",
//     verification: "Verified",
//     primary_platform: "YouTube",
//     ship_state: "Delhi"
//   },
// ];

// function AllUser() {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [selectedState, setSelectedState] = useState('All');
//   const [selectedTab, setSelectedTab] = useState('New');


//   const FetchUser = async () => {
//     try{
//       const response = await makeApi('/V1/influencers', 'GET');   
//       console.log("-----------",response.data.data)
//     }catch(error){
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     FetchUser();
//     setUsers(usersData);
//     setFilteredUsers(usersData);
//   }, []);

//   useEffect(() => {
//     if (selectedState === 'All') {
//       setFilteredUsers(users);
//     } else {
//       setFilteredUsers(users.filter(user => user.ship_state === selectedState));
//     }
//   }, [selectedState, users]);

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//     // Apply your filter logic for different tabs here
//   };

//   const handleStateChange = (event) => {
//     setSelectedState(event.target.value);
//   };

//   return (
//     <div className="all-user-users-page">
//       <div className="all-user-top-bar">
//         <div className="all-user-tabs">
//           {['New', 'Pending', 'Rejected', 'Verified', 'Suspended', 'Sleep mode', 'Prime Content'].map(tab => (
//             <button
//               key={tab}
//               className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
//               onClick={() => handleTabChange(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//         <div className="all-user-state-filter">
//           <label htmlFor="state" className='all-user-state-filter-text' >Filter by State:</label>
//           <select id="state" value={selectedState} onChange={handleStateChange}>
//             <option value="All">All</option>
//             <option value="Madhya Pradesh">Madhya Pradesh</option>
//             <option value="Delhi">Delhi</option>
//             {/* Add more states as needed */}
//           </select>
//         </div>
//       </div>
//       <div className="all-user-users-list">
//         {filteredUsers.map(user => (
//           <div key={user.id} className="all-user-user-card">
//             <img src={user.profile_img} alt={user.user_name} className="all-user-user-image" />
//             <div className="all-user-user-info">
//               <h3>{user.user_name}</h3>
//               <p><strong>Level:</strong> {user.level}</p>
//               <p><strong>Verification:</strong> {user.verification}</p>
//               <p><strong>Primary Platform:</strong> {user.primary_platform}</p>
//             </div>
//             <Link to={"/user/user-details/23"} target='_blank'  >
//             <button className="all-user-view-more-button">View More</button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AllUser;

// import React, { useState, useEffect } from 'react';
// import "../../style/user/allUsers.css";
// import { Link } from 'react-router-dom';
// import { makeApi } from '../../api/callApi.tsx';

// function AllUser() {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [selectedState, setSelectedState] = useState('All');
//   const [selectedTab, setSelectedTab] = useState('New');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await makeApi('/V1/influencers', 'GET');
//           setUsers(response.data.data);
//           setFilteredUsers(response.data.data);
        
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     if (selectedState === 'All') {
//       setFilteredUsers(users);
//     } else {
//       setFilteredUsers(users.filter(user => user.ship_state === selectedState));
//     }
//   }, [selectedState, users]);

//   const handleTabChange = (tab) => {
//     setSelectedTab(tab);
//     switch (tab) {
//       case 'New':
//         setFilteredUsers(users.filter(user => user.verification === 'New'));
//         break;
//       case 'Pending':
//         setFilteredUsers(users.filter(user => user.verification === 'Pending'));
//         break;
//       case 'Rejected':
//         setFilteredUsers(users.filter(user => user.verification === 'Rejected'));
//         break;
//       case 'Verified':
//         setFilteredUsers(users.filter(user => user.verification === 'Verified'));
//         break;
//       case 'Suspended':
//         setFilteredUsers(users.filter(user => user.verification === 'Suspended'));
//         break;
//       case 'Sleep mode':
//         setFilteredUsers(users.filter(user => user.verification === 'Sleep mode'));
//         break;
//       case 'Prime Content':
//         setFilteredUsers(users.filter(user => user.prime_content === 'Prime Content'));
//         break;
//       default:
//         setFilteredUsers(users);
//         break;
//     }
//   };

//   const handleStateChange = (event) => {
//     setSelectedState(event.target.value);
//   };

//   return (
//     <div className="all-user-users-page">
//       <div className="all-user-top-bar">
//         <div className="all-user-tabs">
//           {['New', 'Pending', 'Rejected', 'Verified', 'Suspended', 'Sleep mode', 'Prime Content'].map(tab => (
//             <button
//               key={tab}
//               className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
//               onClick={() => handleTabChange(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//         <div className="all-user-state-filter">
//           <label htmlFor="state" className='all-user-state-filter-text'>Filter by State:</label>
//           <select id="state" value={selectedState} onChange={handleStateChange}>
//             <option value="All">All</option>
//             {/* You can dynamically generate options based on available states if needed */}
//             <option value="Madhya Pradesh">Madhya Pradesh</option>
//             <option value="Delhi">Delhi</option>
//             <option value="Gujarat">Gujarat</option>
//             <option value="Maharashtra">Maharashtra</option>
//             {/* Add more states as needed */}
//           </select>
//         </div>
//       </div>
//       <div className="all-user-users-list">
//         {filteredUsers.map(user => (
//           <div key={user._id} className="all-user-user-card">
//             {/* <img src={user.profile_img} alt={user.user_name} className="all-user-user-image" /> */}
//             <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt={user.user_name} className="all-user-user-image" />
//             <div className="all-user-user-info">
//               <h3>{user.user_name}</h3>
//               <p><strong>Level:</strong> {user.level}</p>
//               <p><strong>Verification:</strong> {user.verification}</p>
//               <p><strong>Primary Platform:</strong> {user.primary_platform}</p>
//             </div>
//             <Link to={`/user/user-details/${user.id}`} target='_blank'>
//               <button className="all-user-view-more-button">View More</button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AllUser;

import React, { useState, useEffect } from 'react';
import "../../style/user/allUsers.css";
import { Link } from 'react-router-dom';
import { makeApi } from '../../api/callApi.tsx';

function AllUser() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedState, setSelectedState] = useState('All');
  const [selectedTab, setSelectedTab] = useState('New');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeApi('/V1/influencers', 'GET');
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedState === 'All') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.ship_state === selectedState));
    }
  }, [selectedState, users]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    switch (tab) {
      case 'New':
        setFilteredUsers(users.filter(user => user.verification === 'New'));
        break;
      case 'Pending':
        setFilteredUsers(users.filter(user => user.verification === 'Pending'));
        break;
      case 'Rejected':
        setFilteredUsers(users.filter(user => user.verification === 'Rejected'));
        break;
      case 'Verified':
        setFilteredUsers(users.filter(user => user.verification === 'Verified'));
        break;
      case 'Suspended':
        setFilteredUsers(users.filter(user => user.verification === 'Suspended'));
        break;
      case 'Sleep mode':
        setFilteredUsers(users.filter(user => user.verification === 'Sleep mode'));
        break;
      case 'Prime Content':
        setFilteredUsers(users.filter(user => user.prime_content === 'Prime Content'));
        break;
      case 'All':
        setFilteredUsers(users);
        break;
      default:
        setFilteredUsers(users);
        break;
    }
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <div className="all-user-users-page">
      <div className="all-user-top-bar">
        <div className="all-user-tabs">
          {['All', 'New', 'Pending', 'Rejected', 'Verified', 'Suspended', 'Sleep mode', 'Prime Content'].map(tab => (
            <button
              key={tab}
              className={`tab-button ${selectedTab === tab ? 'active' : ''}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="all-user-state-filter">
          <label htmlFor="state" className='all-user-state-filter-text'>Filter by State:</label>
          <select id="state" value={selectedState} onChange={handleStateChange}>
            <option value="All">All</option>
            {/* You can dynamically generate options based on available states if needed */}
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Delhi">Delhi</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Maharashtra">Maharashtra</option>
            {/* Add more states as needed */}
          </select>
        </div>
      </div>
      <div className="all-user-users-list">
        {filteredUsers.map(user => (
          <div key={user._id} className="all-user-user-card">
             <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt={user.user_name} className="all-user-user-image" />

            <div className="all-user-user-info">
              <h3>{user.user_name}</h3>
              <p><strong>Level:</strong> {user.level}</p>
              <p><strong>Verification:</strong> {user.verification}</p>
              <p><strong>Primary Platform:</strong> {user.primary_platform}</p>
            </div>
            <Link to={`/user/user-details/${user._id}`} target='_blank'>
              <button className="all-user-view-more-button">View More</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUser;
