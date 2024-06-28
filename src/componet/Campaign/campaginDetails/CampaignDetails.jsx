
import React, { useState } from 'react';
import '../../../style/campaign/campaignDetails.css';
import { Link , useParams } from 'react-router-dom';
import BackIcon from '../../../utils/BackIcon';
import EditIcon from '../../../utils/EditIcon';


function CampaignDetails() {
  const { id } = useParams();
  const [showAppliedUsers, setShowAppliedUsers] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(null);  // New state for toggling more details

  const campaign = {
    id: id,
    company: 'Company A',
    campaignName: 'New Product Launch',
    campaignBanner: 'https://cdn.shopify.com/s/files/1/1276/5299/files/Filler-mobile-2-power-sunglasses.jpg?v=1685976704?v=1719360000163',
    campaignType: 'Paid',
    brandProduct: 'Super Gadget',
    targetIndustry: 'Technology',
    campaignLanguage: 'English',
    influencerAgeFrom: '18',
    influencerAgeTo: '35',
    influencerGender: 'All',
    describeProduct: 'This is a revolutionary new gadget that simplifies your life.',
    requiredDeliverables: ['Post', 'Story', 'Reel'],
    requiredFollowers: {
      Facebook: 5000,
      Instagram: 10000,
      Twitter: 3000,
      LinkedIn: 2000,
      Youtube: 8000,
    },
    hashtags: '#SuperGadget #TechRevolution',
    productImage: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?cs=srgb&dl=pexels-nitin-creative-46710.jpg&fm=jpg',

    platformPreference: 'Instagram',
    platformLink: 'https://instagram.com/supergadget',
    profilesToTag: '@techinfluencer, @gadgetlover',
    do: 'Showcase the unique features of the product',
    dont: 'Do not make false claims',
    productPrice: '₹299',
    deadline: '2024-12-31',
    screenshotsRequired: 'Yes',
    location: {
      country: 'Country A',
      state: 'State A',
      city: 'City A',
    },
  };



  const appliedUsers = [
    { id: 1, date: '2024-06-25', name: 'John Doe', city: 'City B', contact: '1234567890', level: 'L1',image:"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" ,link: 'https://instagram.com/johndoe', content: 'photo', status: 'accepted' , instagramFollowers: 10000,youtubeSubscribers: 5000 , facebookFollowers: 800 ,engagementRate: 0.7  },
    { id: 2, date: '2024-06-26', name: 'Jane Smith', city: 'City C', contact: '0987654321', level: 'L2',image:"https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1868" ,link: 'https://instagram.com/janesmith', content: 'video', status: 'denied', instagramFollowers: 2000,youtubeSubscribers: 1000 , facebookFollowers: 200 ,engagementRate: 0.5  },
    { id: 3, date: '2024-06-27', name: 'Alice Johnson', city: 'City D', contact: '1122334455', level: 'L3', image :"https://dwpdigital.blog.gov.uk/wp-content/uploads/sites/197/2017/07/jude-1-620x556.jpg" ,link: 'https://instagram.com/alicejohnson', content: 'photo', status: 'pending' , instagramFollowers: 3000,youtubeSubscribers: 3000 , facebookFollowers: 300 ,engagementRate: 0.3  },
  ];
  const toggleMoreDetails = (userId) => {
    setShowMoreDetails(showMoreDetails === userId ? null : userId);
  };

  return (
    <>
    <div>
      <BackIcon path={"campaign/CampaignList"} />
    </div>
    <div className="campaign-details-unique">
      {/* <Link to={`/campaign/update-campaign/${campaign.id}`}>
        <div className='w-100 text-end' >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg>
        </div>
      </Link> */}
      <EditIcon path={`campaign/update-campaign/${campaign.id}`}/>
      <img src={campaign.campaignBanner} alt="Campaign Banner" className="campaign-banner-unique" />
      <div className="campaign-content-unique">
        <h1 className="campaign-title-unique">{campaign.campaignName}</h1>
        <p className="campaign-company-unique">Company: {campaign.company}</p>
        <p className="campaign-type-unique">Type: {campaign.campaignType}</p>
        <p className="campaign-product-unique">Product: {campaign.brandProduct}</p>
        <p className="campaign-industry-unique">Target Industry: {campaign.targetIndustry}</p>
        <p className="campaign-language-unique">Language: {campaign.campaignLanguage}</p>
        <p className="campaign-age-unique">Influencer Age: {campaign.influencerAgeFrom} - {campaign.influencerAgeTo}</p>
        <p className="campaign-gender-unique">Gender: {campaign.influencerGender}</p>
        <p className="campaign-description-unique">Description: {campaign.describeProduct}</p>
        <p className="campaign-deliverables-unique">Deliverables: {campaign.requiredDeliverables.join(', ')}</p>
        <div className="campaign-followers-unique">
          <h3>Required Followers</h3>
          <p>Facebook: {campaign.requiredFollowers.Facebook}</p>
          <p>Instagram: {campaign.requiredFollowers.Instagram}</p>
          <p>Twitter: {campaign.requiredFollowers.Twitter}</p>
          <p>LinkedIn: {campaign.requiredFollowers.LinkedIn}</p>
          <p>Youtube: {campaign.requiredFollowers.Youtube}</p>
        </div>
        <p className="campaign-hashtags-unique">Hashtags: {campaign.hashtags}</p>
        <img src={campaign.productImage} alt="Product" className="campaign-product-image-unique" />
        <p className="campaign-platform-unique">Platform: {campaign.platformPreference}</p>
        <p className="campaign-link-unique">Link: <a href={campaign.platformLink}>{campaign.platformLink}</a></p>
        <p className="campaign-tags-unique">Profiles to Tag: {campaign.profilesToTag}</p>
        <p className="campaign-do-unique">Do: {campaign.do}</p>
        <p className="campaign-dont-unique">Don't: {campaign.dont}</p>
        <p className="campaign-price-unique">Price: {campaign.productPrice}</p>
        <p className="campaign-deadline-unique">Deadline: {campaign.deadline}</p>
        <p className="campaign-screenshots-unique">Screenshots Required: {campaign.screenshotsRequired}</p>
        <div className="campaign-location-unique">
          <h3>Location</h3>
          <p>Country: {campaign.location.country}</p>
          <p>State: {campaign.location.state}</p>
          <p>City: {campaign.location.city}</p>
        </div>
      </div>
      <button onClick={() => setShowAppliedUsers(!showAppliedUsers)} className="view-applied-users-button">
        View Applied Users
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
        </svg>
      </button>
      {showAppliedUsers && (
        <div className="applied-users-list-unique">
          {appliedUsers.map(user => (
            <div key={user.id} className={`applied-user-card-unique ${user.status === 'accepted' ? 'accepted' : user.status === 'denied' ? 'denied' : ''}`}>
              <div className="applied-user-content-unique">
                <div className='d-flex flex-column gap-4 align-items-center'>
                  <div>
                    <img src={user.image} alt={user.name} className="user-image-unique" />
                  </div>
                  <Link to={"/user/user-details/23"} target='_blank' >
                  <div className='btn btn-warning'>View Profile</div>
                  </Link>
                </div>
                <div className="user-details-unique">
                  <p>Apply Date: {user.date}</p>
                  <p>Name: {user.name}, City: {user.city}, Contact: {user.contact}</p>
                  <p>Level: {user.level}</p>
                  <p>Link: <a href={user.link} target="_blank" rel="noopener noreferrer">{user.link}</a></p>
                  <p>Content: {user.content}</p>
                  <div className="user-actions-unique">
                    <button className="accept-button-unique">Accept</button>
                    <button className="deny-button-unique">Deny</button>
                  </div>
                  <button className="view-more-button-unique" onClick={() => toggleMoreDetails(user.id)}>View More</button>
                  {showMoreDetails === user.id && (
                    <div className="more-details-unique">
                      <p>Instagram Followers: {user.instagramFollowers}</p>
                      <p>YouTube Subscribers: {user.youtubeSubscribers}</p>
                      <p>Facebook Followers: {user.facebookFollowers}</p>
                      <p>Engagement Rate: {user.engagementRate}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
    </>
  );
}

export default CampaignDetails;
