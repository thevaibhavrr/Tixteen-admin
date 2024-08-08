import React, { useState } from 'react';
import '../../style/managment/client/Createregister.css'
import { makeApi } from '../../api/callApi.tsx';
import BackIcon from '../../utils/BackIcon.jsx';
const Createregister = () => {
    const [clientData, setClientData] = useState({
        client_id: '',
        client_name: '',
        email_id: '',
        phone_number: '',
        pin_code: '',
        nation: 'India',
        state: '',
        company_name: '',
        brand_name: '',
        gst_no: '',
        website: '',
        password: '',
        city: '',
        verified: 'yes',
        status: '0',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setClientData({
            ...clientData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await makeApi('/v1/admin/api/create-client', 'POST', clientData);

            alert('Client created successfully');
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="client_container" style={{ position: "relative" }} >
            <div style={{ position: "absolute", top: "-30px", left: "10px" }} >

                <BackIcon path={`management/client-management`} />
            </div>
            <form className="client_form" onSubmit={handleSubmit}>

                <div className="client_form_group">
                    <label className="client_form_label">Client Name</label>
                    <input
                        type="text"
                        name="client_name"
                        value={clientData.client_name}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>

                <div className="client_form_group">
                    <label className="client_form_label">Email ID</label>
                    <input
                        type="email"
                        name="email_id"
                        value={clientData.email_id}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>

                <div className="client_form_group">
                    <label className="client_form_label">Phone Number</label>
                    <input
                        type="tel"
                        name="phone_number"
                        value={clientData.phone_number}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>

                <div className="client_form_group">
                    <label className="client_form_label">Pin Code</label>
                    <input
                        type="text"
                        name="pin_code"
                        value={clientData.pin_code}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>

                <div className="client_form_group">
                    <label className="client_form_label">Nation</label>
                    <input
                        type="text"
                        name="nation"
                        value={clientData.nation}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>

                <div className="client_form_group">
                    <label className="client_form_label">State</label>
                    <input
                        type="text"
                        name="state"
                        value={clientData.state}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>

                <div className="client_form_group">
                    <label className="client_form_label">Company Name</label>
                    <input
                        type="text"
                        name="company_name"
                        value={clientData.company_name}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>

                <div className="client_form_group">
                    <label className="client_form_label">Brand Name</label>
                    <input
                        type="text"
                        name="brand_name"
                        value={clientData.brand_name}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>

                <div className="client_form_group">
                    <label className="client_form_label">GST No</label>
                    <input
                        type="text"
                        name="gst_no"
                        value={clientData.gst_no}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>

                <div className="client_form_group">
                    <label className="client_form_label">Website</label>
                    <input
                        type="url"
                        name="website"
                        value={clientData.website}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>

                <div className="client_form_group">
                    <label className="client_form_label">Password</label>
                    <div className="client_password_wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={clientData.password}
                            onChange={handleChange}
                            className="client_form_input"
                        />
                        <span className="client_password_toggle" onClick={togglePasswordVisibility}>
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                </svg>
                            )}
                        </span>
                    </div>
                </div>


                <div className="client_form_group">
                    <label className="client_form_label">City</label>
                    <input
                        type="text"
                        name="city"
                        value={clientData.city}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>

                <div className="client_form_group">
                    <label className="client_form_label">Verified</label>
                    <input
                        type="text"
                        name="verified"
                        value={clientData.verified}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>

                <div className="client_form_group">
                    <label className="client_form_label">Status</label>
                    <input
                        type="text"
                        name="status"
                        value={clientData.status}
                        onChange={handleChange}
                        className="client_form_input"
                    />
                </div>
                <div className='w-100 text-center' >

                    <button type="submit" className="client_form_button w-50">Create Client</button>
                </div>
            </form>
        </div>
    );
};

export default Createregister;
