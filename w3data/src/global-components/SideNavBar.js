import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaSearch,  FaCode, FaUser, FaFileUpload } from 'react-icons/fa'; // Import FontAwesome icons
import { TbHelpOctagonFilled } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";

import '../styles/SideNavBar.css';

const SideNavBar = () => {
  const { username } = useParams();

  return (
    <div  className="side-navbar">
      <nav className='sidebar'>
        <ul>
        <li>
            <Link className="link-style" to={`/home/${username}`} title="W3data">
              <FaDatabase className="nav-icon" />
              W3data
              <div style={{borderBottom:'1px solid #fff',width:'88%',height:'10px'}}></div>
            </Link>
          </li>
          <li>
            <Link className="link-style" to={`/Search/${username}`} title="Search Data">
              <FaSearch className="nav-icon" />
              Search Data
            </Link>
          </li>
          <li>
            <Link className="link-style" to={`/MyProjects/${username}`} title="MyProjects">
              <FaCode className="nav-icon" />
             MyProjects
            </Link>
          </li>
          
          <li>
            <Link className="link-style" to={`/UploadForm/${username}`} title="Upload Data">
              <FaFileUpload  className="nav-icon" />
              Upload Data
            </Link>
          </li>
        
          <li>
            <Link className="link-style" to={`/myprofile/${username}`} title="My Profile">
              <FaUser className="nav-icon" />
              My Profile
            </Link>
          </li>
         
        
          <li>
            <Link className="link-style" to={`/HelpComponent/${username}`} title="Help">
              <TbHelpOctagonFilled style={{marginTop:'4px'}} className="nav-icon" />
             Help
            </Link>
          </li>
       
       
          {/* Add more links as needed based on your routes */}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavBar;
