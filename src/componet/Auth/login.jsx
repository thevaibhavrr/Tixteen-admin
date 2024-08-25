import React, { useState } from 'react';
import logo from '../../assets/header/tixteen_icon.png';
import '../../style/auth/login.css';
import { makeApi } from '../../api/callApi.tsx';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import PrimaryLoader from '../../utils/PrimaryLoader.jsx';

function Login() {
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setuser] = useState('');
  const [password, setPassword] = useState('');
  const [showsubmitbutton, setshowsubmitbutton] = useState(true);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user){
       toast("Please fill user");
       return;
    }

    if(!password){
       toast("Please fill password");
       return;
    }

    const data = {
      user: user,
      password: password,
    };

    try { 

      setLoading(true);
      const response = await makeApi('/v1/admin/api/login-admin', 'POST', data);
      localStorage.setItem('token', response.data.token);
      setshowsubmitbutton(false);
      // toast(response.data.message);
      toast.success(response.data.message, {
        onClose: () => {
          navigate("/");
        }
      })

    } catch (error) {
      // toast(error.message);
      console.error('Error logging in:', error.response.data.message);
      toast(error.response.data.message);

    }finally {
      setLoading(false);
  }
  };

  return (
    <>
    <ToastContainer position="top-center" autoClose={1000}  newestOnTop  closeOnClick rtl={false}  draggable pauseOnHover theme="dark" />
    <div className="login_container">
      <div className="login_formContainer">
        <img src={logo} alt="Logo" className="login_logo" />
        <h2 className="login_title">Admin Login</h2>
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="login_formGroup">
            <label htmlFor="user" className="login_label">User</label>
            <input
              type="text"
              id="user"
              className="login_input"
              value={user}
              onChange={(e) => setuser(e.target.value)}
            // required 
            />
          </div>
          <div className="login_formGroup">
            <label htmlFor="password" className="login_label">Password</label>
            <div className="login_passwordContainer">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                className="login_input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // required
              />
              <button
                type="button"
                className="login_passwordToggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
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
              </button>
            </div>
          </div>
          {showsubmitbutton &&
          <button type="submit" className="login_button">Login</button>
          }
        </form>
        {/* <p className="login_forgotPassword"><Link to="/forgot-password">Forgot Password?</Link></p> */}
      </div>
    </div>
    </>

  );
}

export default Login;
