import React, { useEffect, useState } from 'react';
import "../../style/user/userDetails.css";
import EditIcon from "../../utils/EditIcon";
import BackIcon from "../../utils/BackIcon";
import { makeApi } from "../../api/callApi.tsx";
import { useParams } from "react-router-dom";
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';
import { Link } from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [socialData, setSocialData] = useState([]);
    const [BankDetails, setBankdetails] = useState([]);
    const [activeTab, setActiveTab] = useState('Pending');
    const [socialMediaData, setSocialMediaData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [IdentityINfo, setIdentityINfo] = useState();
    console.log("IdentityINfo", IdentityINfo)

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await makeApi('/V1/influencers', 'POST', { _id: id });
            await setUser(response.data.data);
            await setApplications(response.data.apply);
            await setSocialData(response.data.socialMedia);
            await setBankdetails(response.data.BankDetails)
            await setIdentityINfo(response.data.InfluencerIdentity)
            await filterApplications('Pending', response.data.apply); // Initial filter
            fetchSocialMediaData(response.data.data.influ_soc_link)
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };
    const fetchSocialMediaData = async (id) => {
        setLoading(true);

        try {
            const response = await makeApi(`/api/get-social-media-by-user-id/${id}`, "GET");
            setSocialMediaData(response.data.data);
        }
        catch (error) {
            console.error("Error fetching social media data:", error);
        } finally {
            setLoading(false);
        }
    }
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
    //     const formatPhoneNumber = (number) => {
    //     if (!number) return '';

    //     // Remove spaces and non-numeric characters
    //     const cleanedNumber = number.replace(/\D+/g, '');

    //     // Conditionally add +91 if the number length is more than 10
    //     return cleanedNumber.length > 10 ? `+91${cleanedNumber}` : cleanedNumber;
    // };
    const formatPhoneNumber = (number) => {
        if (!number) return '';
        const cleanedNumber = number.replace(/\D+/g, '');
        return cleanedNumber.length > 10 ? `+91${cleanedNumber}` : cleanedNumber;
    };

    const filterApplications = (status, apps) => {
        let filtered;
        switch (status) {
            case 'Pending':
                filtered = apps.filter(app => app.influ_approval === 'Pending');
                break;
            case 'Completed':
                filtered = apps.filter(app => app.submition === 'Completed');
                break;
            case 'Rejected':
                filtered = apps.filter(app => app.influ_approval === 'Rejected');
                break;
            case 'Ongoing':
                filtered = apps.filter(app =>
                    app.influ_approval !== 'Pending' &&
                    app.influ_approval !== 'Rejected' &&
                    app.submition !== 'Completed'
                );
                break;
            default:
                filtered = apps;
                break;
        }
        setFilteredApplications(filtered);
        setActiveTab(status);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!user) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <PrimaryLoader />
            </div>
        );
    }
    // const formatPhoneNumber = (number) => {
    //     if (!number) return '';

    //     // Remove spaces from the phone number
    //     const cleanedNumber = number.replace(/\s+/g, '');

    //     // Conditionally add +91 if the number length is more than 10
    //     return cleanedNumber.length > 10 ? `+91${cleanedNumber}` : cleanedNumber;
    //   };

    return (
        <div>
            <BackIcon path={`user/all-users`} />
            <div className="user-details-container" style={{ paddingBottom: "300px" }}>
                <div className="user-card">
                    <EditIcon path={`user/update-user-details/${user._id}`} />
                    <div className="user-header">
                        {/* <img src={user.profile_img} alt={user.user_name} className="user-profile-img" /> */}
                        <LazyLoadImage effect="blur"
                            src={
                                user.profile_img && user.profile_img.includes('http://res.cloudinary.com')
                                    ? user.profile_img
                                    : `https://storage.tixteen.com/assets/${user.profile_img}`
                            }
                            alt={user.user_name}
                            className="user-profile-img"
                            loading='lazy'

                        />
                        <div className="user-info">
                            <h1>{user.user_name}</h1>
                            <p>{user.gender ? `${user.gender}, Age: ${user.age}` : 'Gender: Not Provided'}</p>

                            <p>{user.language ? user.language : 'Language: Not Provided'}</p>
                            <p>{user.level ? `Level: ${user.level}` : 'Level: Not Provided'}</p>
                            {/* <p>{user.rating ? `Rating: ${user.rating}` : 'Rating: Not Provided'}</p> */}
                            <p>   Approved By - <b style={{ color: 'black' }}> <em> {user.approved_by}</em> </b> </p>

                        </div>
                    </div>

                    <div className="user-body">
                        <div className="user-section">
                            <h2>Contact Information</h2>
                            <p>{user.mobile ? `Mobile: ${user.mobile}` : 'Mobile: Not Provided'}</p>
                            <p>{user.mobile_2 ? `Alternate Mobile: ${user.mobile_2}` : 'Alternate Mobile: Not Provided'}</p>
                            <p>{user.email ? `Email: ${user.email}` : 'Email: Not Provided'}</p>
                            <>
                                <div style={{ cursor: 'pointer', color: '#25D366' }} >
                                    <span className='me-2' >
                                        WhatsApp chat:
                                    </span>
                                    <Link style={{ textDecoration: 'none', color: '#25D366' }} to={`https://wa.me/${formatPhoneNumber(user?.user?.mobile)}`} target={'_blank'} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                        </svg>
                                    </Link>
                                </div>
                            </>
                            <span className='me-2'>
                                Call:
                            </span>
                            <Link
                                style={{ textDecoration: 'none', color: '#25D366' }}
                                to={`tel:${formatPhoneNumber(user.mobile)}`}
                            // to={`tel:9501987577`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                                    <path d="M1.884 1.884a2 2 0 0 1 2.83 0l1.66 1.66a2 2 0 0 1 0 2.83l-1.66 1.66a2 2 0 0 1-2.83 0l-1.66-1.66a2 2 0 0 1 0-2.83l1.66-1.66zM4.568 2.728a1 1 0 0 0-1.414 0l-1.66 1.66a1 1 0 0 0 0 1.414l1.66 1.66a1 1 0 0 0 1.414 0l1.66-1.66a1 1 0 0 0 0-1.414l-1.66-1.66zM13.707 13.707a2 2 0 0 1-2.83 0l-1.66-1.66a2 2 0 0 1 0-2.83l1.66 1.66a2 2 0 0 1 0 2.83l-1.66 1.66zM11.577 11.577l1.66-1.66a1 1 0 0 0 0-1.414l-1.66-1.66a1 1 0 0 0-1.414 0l-1.66 1.66a1 1 0 0 0 0 1.414l1.66 1.66a1 1 0 0 0 1.414 0z" />
                                </svg>
                            </Link>
                        </div>

                        <div className="user-section">
                            <h2>Industry</h2>
                            <p>{user.industry ? user.industry : 'Industry: Not Provided'}</p>
                        </div>
                        <div className="user-section">
                            <h2>Content Type</h2>
                            <p>{user.content_type ? user.content_type : 'Content Type: Not Provided'}</p>
                        </div>
                        <div className="user-section">
                            <h2>Social Links</h2>
                            <p>{user.primary_platform ? `Instagram: ${user.primary_platform}` : 'Instagram: Not Provided'}</p>
                            <p>{user.influ_soc_link ? `Influence Social Link: ${user.influ_soc_link}` : 'Influence Social Link: Not Provided'}</p>
                        </div>
                        <div className='d-flex flex-column gap-3 my-2' >
                            <div className='d-flex gap-3 my-2' >
                                <div>
                                    Social :
                                </div>
                                <div>
                                    {socialData?.platform === "Instagram" && (
                                        <div className='d-flex gap-3' >
                                            <div>
                                                <Link to={getFullLink("Instagram", socialData?.link)} target="_blank" className='text-black' style={{ textDecoration: 'none', color: 'black' }} rel="noopener noreferrer" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.372 1.942.372.853.038 1.125.048 3.297.048 2.173 0 2.444-.01 3.297-.048.851-.04 1.432-.174 1.941-.372a3.9 3.9 0 0 0 1.417-.923 3.9 3.9 0 0 0 .923-1.417c.198-.51.372-1.09.372-1.942.038-.853.048-1.125.048-3.297 0-2.174-.01-2.445-.048-3.297-.04-.852-.174-1.433-.372-1.942a3.9 3.9 0 0 0-.923-1.417 3.9 3.9 0 0 0-1.417-.923c-.51-.198-1.09-.372-1.942-.372C10.445.01 10.173 0 8 0ZM8 1.46c2.13 0 2.384.01 3.226.047.78.035 1.204.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.281.24.705.276 1.485.037.842.046 1.096.046 3.227 0 2.13-.01 2.384-.046 3.226-.035.78-.166 1.204-.276 1.485a2.45 2.45 0 0 1-.598.92 2.45 2.45 0 0 1-.92.598c-.281.11-.705.24-1.485.276-.842.037-1.096.047-3.226.047-2.131 0-2.385-.01-3.227-.047-.78-.035-1.204-.166-1.485-.276a2.45 2.45 0 0 1-.92-.598 2.45 2.45 0 0 1-.598-.92c-.11-.281-.24-.705-.276-1.485-.037-.842-.047-1.096-.047-3.226 0-2.131.01-2.385.047-3.227.035-.78.166-1.204.276-1.485a2.45 2.45 0 0 1 .598-.92 2.45 2.45 0 0 1 .92-.598c.281-.11.705-.24 1.485-.276.842-.037 1.096-.046 3.227-.046ZM8 3.892A4.108 4.108 0 1 0 8 12.108 4.108 4.108 0 0 0 8 3.892Zm0 1.455a2.653 2.653 0 1 1 0 5.306 2.653 2.653 0 0 1 0-5.306ZM12.733 3.534a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92Z" />
                                                    </svg>
                                                </Link>
                                            </div>

                                            <div> {socialData?.follower} </div>

                                        </div>
                                    )}
                                    {socialData?.platform === "Facebook" && (
                                        <Link to={getFullLink("Facebook", socialData?.link)} target="_blank" className='' style={{ textDecoration: 'none' }} rel="noopener noreferrer" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                            </svg>
                                        </Link>
                                    )}

                                    {socialData?.platform === "YouTube" && (
                                        <Link to={socialData?.link} target="_blank" className='text-black' style={{ textDecoration: 'none', color: 'red' }} rel="noopener noreferrer" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                                                <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                                            </svg>
                                        </Link>
                                    )}

                                </div>
                            </div>
                            <div className="user-section" >
                                {socialMediaData?.map((data) => {
                                    return <div style={{ borderBottom: "1px solid black", backgroundColor: "lightcyan" }} >
                                        <p>
                                            platform : {data.platform}
                                        </p>
                                        <p>

                                            Link : <Link to={data.link} target="_blank" rel="noopener noreferrer">Open</Link>
                                        </p>
                                        <p>

                                            follower : {data.follower}
                                        </p>
                                    </div>
                                })
                                }
                            </div>

                        </div>

                        <div className="user-section">
                            <h2>Shipping Address</h2>
                            <p>{user.shipping_address ? user.shipping_address : 'Shipping Address: Not Provided'}</p>
                            <p>{user.ship_city && user.ship_state && user.ship_country ? `${user.ship_city}, ${user.ship_state}, ${user.ship_country}` : 'Location: Not Provided'}</p>
                            <p>{user.ship_pin_code ? `Pin Code: ${user.ship_pin_code}` : 'Pin Code: Not Provided'}</p>
                        </div>
                    </div>
                    <div className="user-section ps-2">
                        <h2>Introduction Video</h2>
                        {!user.intro_video_link ? (
                            // <video width="100%" controls>
                            //     <source src="https://res.cloudinary.com/dyl3gzm7d/video/upload/v1715863302/exaqwk3k1lqa2xhklsha.mp4" type="video/mp4" />
                            //     Your browser does not support the video tag.
                            // </video>
                            <p>Introduction Video: Not Provided</p>
                        ) : (
                            <>
                                <video width="100%" height="auto" controls>
                                    <source src={user.intro_video_link} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                            </>
                        )}
                    </div>
                    <h1></h1>



                    <div className="user-section ps-4 ">
                        <h2>Additional Information</h2>
                        <p>{user.regs_date ? `Registration Date: ${user.regs_date}` : 'Registration Date: Not Provided'}</p>
                        <p>{user.verification ? `Verification Status: ${user.verification}` : 'Verification Status: Not Provided'}</p>
                        <p>{user.refrence ? `Reference: ${user.refrence}` : 'Reference: Not Provided'}</p>
                        <p>{user.prime_content ? `Prime Content: ${user.prime_content}` : 'Prime Content: Not Provided'}</p>
                    </div>
                    <div className="user-section user-footer">
                        <h2>Bank details</h2>
                        <p>{BankDetails?.accholdername ? `accholdername: ${BankDetails?.accholdername}` : 'Mobile: Not Provided'}</p>
                        <p>{BankDetails?.bankname ? `bankname: ${BankDetails?.bankname}` : 'bankname: Not Provided'}</p>
                        <p>{BankDetails?.accountnumber ? `accountnumber: ${BankDetails?.accountnumber}` : 'accountnumber: Not Provided'}</p>
                        <p>{BankDetails?.ifsccode ? `ifsccode: ${BankDetails?.ifsccode}` : 'ifsccode: Not Provided'}</p>
                        <p>{BankDetails?.swiftcode ? `swiftcode: ${BankDetails?.swiftcode}` : 'swiftcode: Not Provided'}</p>
                        <p>{BankDetails?.phone ? `phone: ${BankDetails?.phone}` : 'phone: Not Provided'}</p>
                        <p>{BankDetails?.verify ? `verify: ${BankDetails?.verify}` : 'verify: Not Provided'}</p>
                        <p>{BankDetails?.bankdate ? `bankdate: ${BankDetails?.bankdate}` : 'bankdate: Not Provided'}</p>
                    </div>
                    <div className="user-section user-footer">
                        <h2>Idetity details</h2>
                        <p>{IdentityINfo?.adhar_front ? <> Addhar front: <img src={IdentityINfo?.adhar_front} alt="adhar_front" style={{ maxWidth: "100px" }} /></> : 'adhar_front: Not Provided'}</p>
                        <p>{IdentityINfo?.adhar_back ? <> Addhar Back: <img src={IdentityINfo?.adhar_back} alt="adhar_back" style={{ maxWidth: "100px" }} /></> : 'adhar_back: Not Provided'}</p>
                        <p>{IdentityINfo?.pan ? <> pan Card: <img src={IdentityINfo?.pan} alt="pan" style={{ maxWidth: "100px" }} /></> : 'pan: Not Provided'}</p>
                        <p>{IdentityINfo?.pan_no ? `pan_no: ${IdentityINfo?.pan_no}` : 'pan_no: Not Provided'}</p>
                    </div>
                </div>

                <div className="user-section px-5">
                    <div className="user-tabs">
                        {['Pending', 'Ongoing', 'Completed', 'Rejected'].map(tab => (
                            <button
                                key={tab}
                                className={`user-tab ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => filterApplications(tab, applications)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="applications-list">
                        {filteredApplications.length > 0 ? (
                            filteredApplications.map(app => (
                                <div key={app._id} className="application-item">
                                    <p><strong>Campaign Name:</strong> {app.campaignDetails.campaign_name}
                                        <Link style={{ textDecoration: 'none' }} to={`/campaign/campaign-details/${app.campaign_no}`} target="_blank" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ fontWeight: 'bold' }} className="bi bi-box-arrow-up-right ms-2" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                            </svg>
                                        </Link>
                                    </p>
                                    <p><strong>Status:</strong> {app.influ_approval}</p>
                                    <p><strong>Submission:</strong> {app.submition}</p>
                                    <p><strong>Product:</strong> {app.campaignDetails.product}</p>
                                    <p><strong>Industry:</strong> {app.campaignDetails.industry}</p>
                                    <p><strong>Platform:</strong> {app.campaignDetails.platforms}
                                        {app.campaignDetails.platform_link &&
                                            <Link to={app.campaignDetails.platform_link} target="_blank" rel="noopener noreferrer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ fontWeight: 'bold' }} className="bi bi-box-arrow-up-right ms-2" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                                </svg>
                                            </Link>
                                        }
                                    </p>


                                    <p><strong>Price:</strong> {app.campaignDetails.price}</p>
                                    <p><strong>Deadline:</strong> {app.campaignDetails.dead_line}</p>
                                    <p> <strong>Applied On:</strong> {app.opt_date} </p>
                                    {app.content && (
                                        <>
                                            <strong>Content: </strong>
                                            <Link to={app.content} target="_blank" rel="noopener noreferrer">
                                                View
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ fontWeight: 'bold' }} className="bi bi-box-arrow-up-right ms-2" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                                </svg>
                                            </Link>
                                        </>
                                    )}
                                    {app.post_link && (
                                        <>
                                            <strong>View Post:</strong>
                                            <Link to={app.post_link} target="_blank" rel="noopener noreferrer">
                                                <strong  > View Post   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ fontWeight: 'bold' }} className="bi bi-box-arrow-up-right ms-2" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                                </svg></strong>
                                            </Link>
                                        </>
                                    )}

                                </div>
                            ))
                        ) : (
                            <p>No applications found for this status.</p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
