import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../styles/MeasurementProjectsDetails.css';
import { fetchData, fetchUserProjects, fetchMeasurementNames} from '../api-services/measurmnets-api-services';
import ChartComponent from '../global-components/Myproject-Chart-Component';
import TableComponent from '../global-components/MyProject-TableComponent';
import Metadata from '../global-components/metadata';
import { ScaleLoader } from 'react-spinners';


const MyProjects = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [userProjects, setUserProjects] = useState([]);  
  const [fieldNames, setFieldNames] = useState([]);
  const [measurementNames, setMeasurementNames] = useState([]);
  const [selectedMeasurement, setSelectedMeasurement] = useState('');
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [metadata, setMetadata] = useState([]); // New state for metadata
  const [selectedVersion, setSelectedVersion] = useState(''); // Initialize with an empty string
  const [uniqueVersions, setUniqueVersions] = useState([]);
 


// Check for the presence of the token on component mount
useEffect(() => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    // Redirect to the login page if the token is not present
    navigate('/login');
  }
}, [navigate]);

// Simulate loading delay
useEffect(() => {
  const delay = 2000;
  const timeoutId = setTimeout(() => {
    setLoading(false);
  }, delay);

  // Clear timeout when the component unmounts
  return () => clearTimeout(timeoutId);
}, [setLoading]);

  useEffect(() => {
    fetchData(username, selectedMeasurement, selectedProject, setData, setFieldNames, setLoading);
  }, [username, selectedMeasurement, selectedProject]);

  useEffect(() => {
    fetchUserProjects(username, setUserProjects, setMetadata, setUniqueVersions);
  }, [username]);

  useEffect(() => {
    fetchMeasurementNames(setMeasurementNames);
  }, []);
  const toggleView = () => {
    setShowTable(!showTable);
  };
  const handleMeasurementSelection = (event) => {
    const selectedMeasurement = event.target.value;
    setSelectedMeasurement(selectedMeasurement);
  };
  const handleProjectSelection = (event) => {
    const selectedProject = event.target.value;
    setSelectedProject(selectedProject);
  };
  const handleVersionSelection = (event) => {
    const version = event.target.value;
    setSelectedVersion(version);  
  };
  const toggleFieldSelection = (field) => {
    setSelectedFields((prevSelectedFields) =>
      prevSelectedFields.includes(field)
        ? prevSelectedFields.filter((f) => f !== field)
        : [...prevSelectedFields, field]
    );
  };





  
























  return (
<div className="MeasurementProjectsDetails-container"> 
{loading && (
        <div className='loader_design'>
         <ScaleLoader color="#3358f4" margin={3} radius={4} speedMultiplier={1} width={10} />
         <p>Loading Data ....</p>
        </div>
      )}
 {!loading && (
<div style={{width:'90%'}}>
<div className='project_selection'>
<div style={{width:'40%',height:'auto'}} >
<h2>Select a Project</h2>
<div>
{userProjects && userProjects.length > 0 && (
  <select onChange={handleProjectSelection}>
    <option value="">Select a project</option>
    {userProjects.map((project, index) => (
      <option key={index} value={project.project_name}>
        {project.project_name}
      </option>
    ))}
  </select>
  )}
</div>

{selectedProject && (
  <div>
    <div className='project_description_section'>
    <h3>Project Description</h3>
    <p>{userProjects.find((project) => project.project_name === selectedProject)?.project_description}</p>
    </div>
    <div>
  <h2>Meta Data For The Project</h2>
  {uniqueVersions && uniqueVersions.length > 0 && (
  <select onChange={handleVersionSelection}>
    <option value="">Select a version</option>
    {/* Render options based on unique versions */}
    {uniqueVersions.map((version, index) => (
      <option key={index} value={version}>
        {version}
      </option>
      
    ))}
  </select>  
  )}
</div>
  </div>
)}
     </div>
     <div style={{width:'40%',height:'auto'}} >
     <div>
        <h2>Measurement Names</h2>
        {measurementNames && measurementNames.length > 0 && (
        <select onChange={handleMeasurementSelection}>
          <option value="">Select a measurement</option>
          {measurementNames.map((measurement, index) => (
            <option key={index} value={measurement}>
              {measurement}
            </option>
          ))}
        </select>
        )}
      </div>
      {fieldNames && fieldNames.length > 0 && (           
      <div style={{marginTop:'20px'}}>
        {fieldNames.map((fieldName) => (
         <label key={fieldName}>
            <input
              type="checkbox"
              value={fieldName}
              checked={selectedFields.includes(fieldName)}
              onChange={() => toggleFieldSelection(fieldName)}
            />
            {fieldName}
          </label>
        ))}
      </div>
      )}      
     </div>
      {/* Display metadata information */}  
    </div>      
    <div className='metadata_section'>
    <h2>Meta Data For The Project </h2>
    <Metadata metadata={metadata} selectedVersion={selectedVersion} selectedProject={selectedProject} />
    </div>   
    <div className='chart_section'>
    <div>
        </div>
    {loading ? (
        <p>Loading data...</p>
      ) : showTable ? (
        <div>
          
          <h2>Table View</h2>
          <TableComponent data={data} fieldNames={fieldNames} showTable={showTable} toggleView={toggleView} />
        </div>
      ) : (
        <div style={{width:'100%'}}>
           
          <h2>Chart View</h2>
          <ChartComponent data={data} fieldNames={fieldNames} selectedFields={selectedFields} toggleView={toggleView} showTable={showTable} />
        </div>
      )}
    </div>
    </div>
 )}
    </div>        
  );
};

export default MyProjects;