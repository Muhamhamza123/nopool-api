import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { BsChevronDown } from 'react-icons/bs';

import '../styles/topnav.css';
import useProfileEffect from '../api-services/profile_service';

const TopNavBar = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const {
    userProfile
    
     // Include the new function
  } = useProfileEffect(username);


  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('access_token');
    // Redirect to the login page
    navigate('/login');
  };
  return (
    <div className="top-navbar">
      <div className="logo">
       <h3>Dashboard</h3>
      </div>
      <nav>
        <ul>
          <li>
            <div className="dropdown-container">
              <NavDropdown
                title={
                  userProfile ? (
                    <>
                      <img
                        style={{ width: '50px', height: '50px',borderRadius:'50%' }}
                        src={`data:image/jpeg;base64,${userProfile.profile_picture}`}
                        alt="Profile"
                        className="profile-picture"
                      />
                      <BsChevronDown className="dropdown-icon" />
                    </>
                  ) : (
                    'Profile'
                  )
                }
                id="basic-nav-dropdown"
                className="nav-dropdown-menu"
              >            
                <NavDropdown.Item as={Link} to={`/myprofile/${username}`}>
                  My Profile
                  
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
           
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopNavBar;
