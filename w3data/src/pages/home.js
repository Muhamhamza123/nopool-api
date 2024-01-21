import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import '../styles/home.css';
import { FiEdit } from "react-icons/fi";
import { ScaleLoader } from 'react-spinners';
import Charts from '../global-components/Charts';
import Table from '../global-components/tables';
import { fetchUserProject, updateProject } from '../api-services/home-api-service';

const Home = () => {
  const navigate = useNavigate();
  const { username } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [userProjects, setUserProjects] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [editedProject, setEditedProject] = useState({});
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserProject(username, setUserProjects, setProjectCount, setLoading);
      } catch (error) {
        console.error('Error fetching user projects:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handleSaveEdit = () => {
    updateProject(editedProject, editedDescription, setIsSuccessMessageVisible);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleEditClick = (project) => {
    setEditedProject(project);
    setEditedName(project.project_name);
    setEditedDescription(project.project_description);
    setIsEditPopupVisible(true);
  };

  const handleOkClick = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="home_main_container">
    <div className='side-bar-navigation'></div>








      {loading && (
        <div className='loader_design'>
          <ScaleLoader color="#3358f4" margin={3} radius={4} speedMultiplier={1} width={10} />
          <p>Loading Data ....</p>
        </div>
      )}
      {!loading && (
        <div className="main-container-body">
          <div className='chart_view_section'>
            <Charts/>
          </div>
          {isEditPopupVisible && (
            <div className="edit-popup">
              <div className="edit-content">
                <h2>Edit Project</h2>
                <br></br>
                <input
                  type="text"
                  placeholder="Project Name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <br></br>
                <input
                  type="text"
                  placeholder="Project Description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
                <br></br>
                <button className='popup-save-changes' onClick={handleSaveEdit}>Save</button>
                <button className='close' onClick={() => setIsEditPopupVisible(false)}>X</button>
                {isSuccessMessageVisible && (
                  <div className="success-message">
                    <p>Project updated successfully!</p>
                    <button onClick={handleOkClick}>OK</button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="table_section" >
            <div className='table_section_body'>
              <h3>User Projects: {projectCount}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Project Description</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {userProjects && userProjects.map((project, index) => (
                    <tr key={index}>
                      <td>{project.project_name}</td>
                      <td>{project.project_description}</td>
                      <td>
                        <button className='edit_home' onClick={() => handleEditClick(project)}> 
                          <FiEdit style={{fontSize:'12px', width:'25px',height:'25px'}} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='influxdata_table_home' >
              <h2>Table View</h2>
              <Table/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;