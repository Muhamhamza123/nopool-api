// dataService.js

import axios from 'axios';

export const fetchData = async (username, selectedMeasurement, selectedProject, setData, setFieldNames, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(`/influxdb-data/${username}`, {
      params: { measurement: selectedMeasurement, project: selectedProject },
    });
    setData(response.data.data_list);
    setFieldNames(response.data.field_names);
    setLoading(false);
  } catch (error) {
    console.error('Error:', error);
    setLoading(false);
  }
};

export const fetchUserProjects = async (username, setUserProjects, setMetadata, setUniqueVersions) => {
  try {
    
    const projectResponse = await axios.get(`/user-projects/${username}`);
    setUserProjects(projectResponse.data.projects);
    if (projectResponse.data.metadata && Array.isArray(projectResponse.data.metadata)) {
    // Set metadata in the state
    setMetadata(projectResponse.data.metadata);

    // Extract unique versions from metadata and set them in state
    const versions = projectResponse.data.metadata.map((meta) => meta.version);
    const uniqueVersions = [...new Set(versions)];
    setUniqueVersions(uniqueVersions);
  } else {
    console.error('Metadata is missing or not an array:', projectResponse.data);
  }
  
} catch (error) {
  console.error('Error:', error);
  
}
};



export const fetchMeasurementNames = async (setMeasurementNames) => {
  try {
    
    const measurementsResponse = await axios.get('/measurements');
    setMeasurementNames(measurementsResponse.data);
  } catch (error) {
    console.error('Error:', error);
    }
};

