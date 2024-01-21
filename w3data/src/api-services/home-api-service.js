import axios from 'axios';

export const fetchUserProject = async (username, setUserProjects, setProjectCount, setLoading) => {
  try {
    setLoading(true);  // Set loading to true when starting the request
    const projectResponse = await axios.get(`/user-projects/${username}`);
    setUserProjects(projectResponse.data.projects);
    setProjectCount(projectResponse.data.project_count);
    setLoading(false);  // Set loading to false when the request is successful
  } catch (error) {
    console.error('Error:', error);
    setLoading(false);  // Set loading to false in case of an error
  }
};

  
  export const updateProject = async (editedProject, editedDescription, setIsSuccessMessageVisible) => {
    try {
      const response = await axios.put(`/update-project`, {
        project_name: editedProject.project_name,
        project_description: editedDescription,
      });
      if (response.data.success) {
        setIsSuccessMessageVisible(true);
      } else {
        console.error('Error updating project:', response.data.message);
      }
    } catch (error) {
      console.error('Error making the request:', error);
    }
  };
  
  
