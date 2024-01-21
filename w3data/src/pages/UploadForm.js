

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Uploadform.css';
import { fetchMeasurementNames } from '../api-services/measurmnets-api-services';

const UploadForm = () => {
  // State variables
  const [file, setFile] = useState(null);
  const [dataCreator, setDataCreator] = useState('');
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [dateGenerated, setDateGenerated] = useState('');
  const [measurementNames, setMeasurementNames] = useState([]);
  const [selectedMeasurement, setSelectedMeasurement] = useState('');
  const [abstract, setAbstract] = useState('');
  const [dataOwner, setDataOwner] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [orcidId, setOrcidId] = useState('');
  const [otherContributors, setOtherContributors] = useState('');
  const [fundingInformation, setFundingInformation] = useState('');
  const [dataLicense, setDataLicense] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('');
  const [sensorMakeAndType, setSensorMakeAndType] = useState('');
  const [sensorAccuracy, setSensorAccuracy] = useState('');
  const [samplingMethod, setSamplingMethod] = useState('');
  const [relatedPublication, setRelatedPublication] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(true);

  // Navigation hook
  const navigate = useNavigate();

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

  // Fetch measurement names on component mount
  useEffect(() => {
    fetchMeasurementNames(setMeasurementNames);
  }, []);

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate file and selected measurement
    if (!file || !selectedMeasurement) {
      toast.error('Please select a file and a measurement');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dataCreator', dataCreator);
    formData.append('projectName', projectName);
    formData.append('location', location);
    formData.append('dateGenerated', dateGenerated);
    formData.append('selectedMeasurement', selectedMeasurement);
    formData.append('abstract', abstract);
    formData.append('dataOwner', dataOwner);
    formData.append('contactEmail', contactEmail);
    formData.append('orcidId', orcidId);
    formData.append('otherContributors', otherContributors);
    formData.append('fundingInformation', fundingInformation);
    formData.append('dataLicense', dataLicense);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('timeZone', timeZone);
    formData.append('unitOfMeasurement', unitOfMeasurement);
    formData.append('sensorMakeAndType', sensorMakeAndType);
    formData.append('sensorAccuracy', sensorAccuracy);
    formData.append('samplingMethod', samplingMethod);
    formData.append('relatedPublication', relatedPublication);
    formData.append('additionalNotes', additionalNotes);

    try {
      // Make API request
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Show success message
      toast.success(response.data.message || 'Data uploaded successfully');
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code
        const status = error.response.status;
        if (status === 400) {
          toast.error('Bad Request. Please check your request data.');
        } else if (status === 401) {
          toast.error('Unauthorized. Please log in and try again.');
        } else if (status === 403) {
          toast.error('Forbidden. You do not have permission to access this resource.');
        } else if (status === 404) {
          toast.error('Not Found. The requested resource was not found.');
        } else if (status === 500) {
          toast.error('Internal Server Error. Please try again later.');
        } else {
          toast.error('An error occurred');
        }
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('Network error. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error('An error occurred');
      }
    }
  };




  const handleLongitudeChange = (event) => {
    // Validate input to allow only numbers
    const inputValue = event.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setLongitude(inputValue);
    }
  };
  const handleLatitudeChange = (event) => {
    // Validate input to allow only numbers
    const inputValue = event.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setLatitude(inputValue);
    }
  };

  return (
    <div style={{ width: '80%', float:'right',marginBottom:'50px'}}>
      {loading && (
        <div className='loader_design'>
         <ScaleLoader color="#3358f4" margin={3} radius={4} speedMultiplier={1} width={10} />
         <p>Loading Data ....</p>
        </div>
      )}
 {!loading && (
    <div style={{ width: '60%',  textAlign: 'left',marginInline:'auto',float:'right' }}>
      <h1>Upload Data :</h1>   
      <form className='Uplaod-form' onSubmit={handleSubmit}>
      <label style={{ padding:'0px 0px 0px 15px'}}>Abstract :</label>
      <br></br>
      <textarea style={{  }} placeholder="Abstract" value={abstract} onChange={(e) => setAbstract(e.target.value)}/>
      <div className='Uplaod-form-div'>
      <div>     
        <label>Select a Measurement * :</label>
        <select value={selectedMeasurement} onChange={(e) => setSelectedMeasurement(e.target.value)}>
          <option value=""> -- Select Measurement --</option>
          {measurementNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>   

        <label>Uplaod file * :</label>
        <input type="file" onChange={handleFileChange} />
        <label>Data Creator * :</label>
        <input type="email" placeholder="enter you login username" value={dataCreator} onChange={(e) => setDataCreator(e.target.value)} required/>
         <label>Project Name * :</label>
        <input type="text" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} required/>
        <label>Location * :</label>
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required/>
        <label>Date Generated :</label>
        <input type="text" placeholder="Date Generated" value={dateGenerated} onChange={(e) => setDateGenerated(e.target.value)}/>    
        <label>Data Owner :</label>
        <input type="text" placeholder="Data Owner" value={dataOwner} onChange={(e) => setDataOwner(e.target.value)} />
        <label>Contact Email :</label>
        <input type="email" placeholder="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        <label>ORCID ID  :</label>
        <input type="text" placeholder="ORCID ID" value={orcidId} onChange={(e) => setOrcidId(e.target.value)} />
        <label>Co-ordinates Format :</label>
        <input type="text" placeholder="Co-ordinates Format:" value={orcidId} onChange={(e) => setOrcidId(e.target.value)} /> 
        <label>Other Contributors :</label>
        <input type="text" placeholder="Other Contributors" value={otherContributors} onChange={(e) => setOtherContributors(e.target.value)} />
      </div>
      <div> 
        <label>Funding Information :</label>
        <input type="text" placeholder="Funding Information" value={fundingInformation} onChange={(e) => setFundingInformation(e.target.value)} />
        <label>Data License :</label>
        <select value={dataLicense} onChange={(e) => setDataLicense(e.target.value)} >
          <option value="">-- Select Data License --</option>
          <option value="License Option 1">License Option 1</option>
          <option value="License Option 2">License Option 2</option>
          <option value="License Option 3">License Option 3</option>       
      </select>
        <label>Latitude * :</label>
        <input type="text" inputMode="numeric" placeholder="Enter latitude (e.g., 37.7749)" value={latitude} onChange={handleLatitudeChange}  required/>
        <label>Longitude * :</label>
        <input type="text" inputMode="numeric" placeholder="Enter longitude (e.g., -122.4194)" value={longitude} onChange={handleLongitudeChange} required/>
        <label>Time Zone :</label>
        <input type="text" placeholder="Time Zone" value={timeZone} onChange={(e) => setTimeZone(e.target.value)} />
        <label>Unit of Measurement :</label>
        <input type="text" placeholder="Unit of Measurement" value={unitOfMeasurement} onChange={(e) => setUnitOfMeasurement(e.target.value)} />
        <label>Sensor Make and Type :</label>
        <input type="text" placeholder="Sensor Make and Type" value={sensorMakeAndType} onChange={(e) => setSensorMakeAndType(e.target.value)} />
        <label>Sensor Accuracy :</label>
        <input type="text" placeholder="Sensor Accuracy" value={sensorAccuracy} onChange={(e) => setSensorAccuracy(e.target.value)} />
        <label>Sampling Method :</label>
        <input type="text" placeholder="Sampling Method" value={samplingMethod} onChange={(e) => setSamplingMethod(e.target.value)} />
        <label>Related Publication :</label>
        <input type="text" placeholder="Related Publication" value={relatedPublication} onChange={(e) => setRelatedPublication(e.target.value)} />
        <label>Additional Notes :</label>
        <input type="text" placeholder="Additional Notes" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
        <div>
      </div>
        <br>
        </br>
    </div>
</div>
     <div style={{ width: '100%',marginTop: '20px',justifyContent:'center' }}>
          <button className='Upload-form-submit' type="submit">Submit</button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
 )}
    </div>
  );
};

export default UploadForm;
