

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import { FaQuestionCircle } from 'react-icons/fa'; // Import the question mark icon
import '../styles/Uploadform.css';
import { fetchMeasurementNames } from '../api-services/measurmnets-api-services';

const UploadForm = () => {
  // State variables
  const [file, setFile] = useState(null);
  const { username } = useParams();
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
  const [coordinatesFormat, setCoordinatesFormat] = useState('');
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
  const [projects, setProjects] = useState([]);
  const [instructionVisibility, setInstructionVisibility] = useState({
    abstract: false,
    selectedMeasurement: false,
    fileUpload: false,
    dataCreator:false,
    projectName:false,
    location:false,
    dateGenerated:false,
    dataOwner:false,
    contactEmail:false,
    orcidId:false,
    otherContributors:false,
    fundingInformation:false,
    dataLicense:false,
    latitude:false,
    longitude:false,
    timeZone:false,
    unitOfMeasurement:false,
    sensorMakeAndType:false,
    sensorAccuracy:false,
    samplingMethod:false,
    relatedPublication:false,
    additionalNotes:false,
    projects:false,
    coordinatesFormat:false,


    // Add more instruction visibility states for other fields as needed
  });
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/user-projects/${username}`); // Use the username from URL parameter
        setProjects(response.data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchData();
  }, [username]); // Fetch data whenever the username changes

  
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
    formData.append('coordinatesFormat',coordinatesFormat)

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
      <label style={{ padding: '0px 0px 0px 15px' }}>
              Abstract 
              
              <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, abstract: !instructionVisibility.abstract })} />
              {instructionVisibility.abstract && (
                <span className='instruction-span'>
                 This field is for providing a brief summary or abstract of your data. Please enter a concise description of the dataset's contents.
                </span>
              )}
            : </label>
      <br></br>
      <textarea style={{  }} placeholder="Abstract" value={abstract} onChange={(e) => setAbstract(e.target.value)}/>
      <div className='Uplaod-form-div'>
      <div>     
        <label>Select a Measurement * 
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, selectedMeasurement: !instructionVisibility.selectedMeasurement })} />
        {instructionVisibility.selectedMeasurement && (
                    <span className='instruction-span' >
                       Indicate the specific measurement or variable that is the focus of your data. Provide the name or label of the measurement being recorded.
                    </span>
                  )}


        :</label>
        <select value={selectedMeasurement} onChange={(e) => setSelectedMeasurement(e.target.value)}>
          <option value=""> -- Select Measurement --</option>
          {measurementNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>   

        <label>Uplaod file * 
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, fileUpload: !instructionVisibility.fileUpload })} />
        {instructionVisibility.fileUpload && (
                    <span className='instruction-span' >
                     Use this option to upload your data file(s).
                      Click the upload button and select the file(s) from your device.
                    </span>
                  )}
          
          :</label>
        <input type="file" onChange={handleFileChange} />
       
       
       
       
       
        <label>Data Creator * 
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, dataCreator: !instructionVisibility.dataCreator })} />
        {instructionVisibility.dataCreator && (
                    <span className='instruction-span' >
                      Enter the Username  of the individual or organization responsible for creating the dataset.
                    </span>
                  )}:</label>
        <input type="email" placeholder="enter you login username" value={dataCreator} onChange={(e) => setDataCreator(e.target.value)} required/>
        <label>Select Project *
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, projectName: !instructionVisibility.projectName })} />
        {instructionVisibility.projectName && (
                    <span className='instruction-span' >
                     Provide the name of the project associated with this dataset, from the dropdown options.
                    </span>
                  )}
          :</label>
            <select value={projectName} onChange={(e) => setProjectName(e.target.value)} required>
              <option value=""> -- Select Project --</option>
              {projects.map((project) => (
                <option key={project.project_id} value={project.project_name}>
                  {project.project_name}
                </option>
              ))}
            </select>
        <label>Location * 
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, location: !instructionVisibility.location })} />
        {instructionVisibility.location && (
                    <span className='instruction-span' >
                      Enter the geographical location where the data was collected or is relevant.
                    </span>
                  )}
          :</label>
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required/>
        <label>Date Generated 
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, dateGenerated: !instructionVisibility.dateGenerated })} />
        {instructionVisibility.dateGenerated && (
                    <span className='instruction-span' >
                      Specify the date when the data is being uploaded in the system.
                    </span>
                  )}:</label>
        <input type="text" placeholder="Date Generated" value={dateGenerated} onChange={(e) => setDateGenerated(e.target.value)}/>    
        <label>Data Owner 
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, dataOwner: !instructionVisibility.dataOwner })} />
        {instructionVisibility.dataOwner && (
                    <span className='instruction-span' >
                      Enter the name or identity of the individual or organization that owns the dataset.
                    </span>
                  )}:</label>
        <input type="text" placeholder="Data Owner" value={dataOwner} onChange={(e) => setDataOwner(e.target.value)} />
        <label>Contact Email 
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, contactEmail: !instructionVisibility.contactEmail })} />
        {instructionVisibility.contactEmail && (
                    <span className='instruction-span' >
                     Provide a contact email address for inquiries related to the dataset.
                    </span>
                  )}:</label>
        <input type="email" placeholder="Contact Email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        <label>ORCID ID  
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, orcidId: !instructionVisibility.orcidId })} />
        {instructionVisibility.orcidId && (
                    <span className='instruction-span' >
                     Optionally, provide your ORCID identifier if available.
                    </span>
                  )}:</label>
        <input type="text" placeholder="ORCID ID" value={orcidId} onChange={(e) => setOrcidId(e.target.value)} />
        <label>Co-ordinates Format 
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, coordinatesFormat: !instructionVisibility.coordinatesFormat })} />
        {instructionVisibility.coordinatesFormat && (
                    <span className='instruction-span' >
                      Choose the type of measurement you are uploading.
                    </span>
                  )}:</label>
       <select value={coordinatesFormat} onChange={(e) => setCoordinatesFormat(e.target.value)}>
       <option value="">-- Select Co-ordinates Format  --</option>
  <option value=" World Geodetic System"> World Geodetic System (WGS)</option>
  <option value="DMS">Degrees Minutes Seconds (DMS)</option>
  {/* Add more options as needed */}
</select>
        <label>Other Contributors 
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, otherContributors: !instructionVisibility.otherContributors })} />
        {instructionVisibility.otherContributors && (
                    <span className='instruction-span' >
                     Enter the names or identities of any other individuals or organizations that contributed to the creation or processing of the dataset.
                    </span>
                  )}:</label>
        <input type="text" placeholder="Other Contributors" value={otherContributors} onChange={(e) => setOtherContributors(e.target.value)} />
      </div>
      <div> 
        <label>Funding Information 
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, fundingInformation: !instructionVisibility.fundingInformation })} />
        {instructionVisibility.fundingInformation && (
                    <span className='instruction-span' >
                      If applicable, provide details about the funding source(s) that supported the creation or collection of the data.
                    </span>
                  )}:</label>
        <input type="text" placeholder="Funding Information" value={fundingInformation} onChange={(e) => setFundingInformation(e.target.value)} />
        <label>Data License 
        <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, dataLicense: !instructionVisibility.dataLicense })} />
        {instructionVisibility.dataLicense && (
                    <span className='instruction-span' >
                      Specify the license under which the data is made available. Include any relevant terms or restrictions.To know more about dataLicense
                       visit
                          https://creativecommons.org/share-your-work/cclicenses/
                    </span>
                  )}:</label>
        <select value={dataLicense} onChange={(e) => setDataLicense(e.target.value)} >
          <option value="">-- Select Data License --</option>
          <option value="CC BY">CC BY</option>
          <option value="CC BY-SA">CC BY-SA</option>
          <option value="CC BY-NC">CC BY-NC</option>       
          <option value="LCC BY-NC-SA">CC BY-NC-SA</option>       
          <option value="CC BY-ND">CC BY-ND</option>       
          <option value="CC BY-NC-ND">CC BY-NC-ND</option>       
      </select>
        <label>Latitude * <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, latitude: !instructionVisibility.latitude })} />
        {instructionVisibility.latitude && (
                    <span className='instruction-span' >
                      Enter the latitude coordinates of the location where the data was collected.
                    </span>
                  )}:</label>
        <input type="text" inputMode="numeric" placeholder="Enter latitude (e.g., 37.7749)" value={latitude} onChange={handleLatitudeChange}  required/>
        <label>Longitude * <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, longitude: !instructionVisibility.longitude })} />
        {instructionVisibility.longitude && (
                    <span className='instruction-span' >
                      Enter the longitude coordinates of the location where the data was collected.
                    </span>
                  )}:</label>
        <input type="text" inputMode="numeric" placeholder="Enter longitude (e.g., -122.4194)" value={longitude} onChange={handleLongitudeChange} required/>
        <label>Time Zone <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, timeZone: !instructionVisibility.timeZone })} />
        {instructionVisibility.timeZone && (
                    <span className='instruction-span' >
                      Specify the time zone associated with the timestamps in the dataset, if applicable.
                    </span>
                  )}:</label>
        <input type="text" placeholder="Time Zone" value={timeZone} onChange={(e) => setTimeZone(e.target.value)} />
        <label>Unit of Measurement * <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, unitOfMeasurement: !instructionVisibility.unitOfMeasurement })} />
        {instructionVisibility.unitOfMeasurement && (
                    <span className='instruction-span' >
                      Specify the unit of measurement used for the data, such as meters, kilograms, etc.
                    </span>
                  )}:</label>
        <input type="text" placeholder="Unit of Measurement" value={unitOfMeasurement} onChange={(e) => setUnitOfMeasurement(e.target.value)} required/>
        <label>Sensor Make and Type <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, sensorMakeAndType: !instructionVisibility.sensorMakeAndType })} />
        {instructionVisibility.sensorMakeAndType && (
                    <span className='instruction-span' >
                      Provide information about the make and type of sensor used to collect the data.
                    </span>
                  )}:</label>
        <input type="text" placeholder="Sensor Make and Type" value={sensorMakeAndType} onChange={(e) => setSensorMakeAndType(e.target.value)} />
        <label>Sensor Accuracy <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, sensorAccuracy: !instructionVisibility.sensorAccuracy })} />
        {instructionVisibility.sensorAccuracy && (
                    <span className='instruction-span' >
                      Specify the accuracy or precision of the sensor readings, if known.
                    </span>
                  )}:</label>
        <input type="text" placeholder="Sensor Accuracy" value={sensorAccuracy} onChange={(e) => setSensorAccuracy(e.target.value)} />
        <label>Sampling Method <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, samplingMethod: !instructionVisibility.samplingMethod })} />
        {instructionVisibility.samplingMethod && (
                    <span className='instruction-span' >
                       Describe the method used to sample or collect the data (e.g., random sampling, stratified sampling).
                    </span>
                  )}:</label>
        <input type="text" placeholder="Sampling Method" value={samplingMethod} onChange={(e) => setSamplingMethod(e.target.value)} />
        <label>Related Publication <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, relatedPublication: !instructionVisibility.relatedPublication})} />
        {instructionVisibility.relatedPublication && (
                    <span className='instruction-span' >
                      If the dataset is associated with a publication, provide the citation or link to the publication.
                    </span>
                  )}:</label>
        <input type="text" placeholder="Related Publication" value={relatedPublication} onChange={(e) => setRelatedPublication(e.target.value)} />
        <label>Additional Notes <FaQuestionCircle className='instruction-icon-upload' onClick={() => setInstructionVisibility({ ...instructionVisibility, additionalNotes: !instructionVisibility.additionalNotes })} />
        {instructionVisibility.additionalNotes && (
                    <span className='instruction-span' >
                      Use this field for any additional information or comments about the dataset.
                    </span>
                  )}:</label>
        <input type="text-a" placeholder="Additional Notes" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} />
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
