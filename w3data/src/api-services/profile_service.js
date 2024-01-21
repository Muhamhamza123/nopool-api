import { useEffect, useState } from 'react';
import axios from 'axios';

const useProfileEffect = (username) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editedUserProfile, setEditedUserProfile] = useState({
    username: '',
    email: '',
    profile_picture: null,
    firstname: '',
    lastname: '',
    city: '',
    country: '',
    aboutme: '',
    teamname: '',
    Address: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/profile/${username}`);
        setUserProfile(response.data);
        setLoading(false);

        // Set the initial edited data
        setEditedUserProfile({
          username: response.data.username,
          email: response.data.email,
          profile_picture: null,
          firstname: response.data.firstname || '',
          lastname: response.data.lastname || '',
          city: response.data.city || '',
          country: response.data.country || '',
          aboutme: response.data.aboutme || '',
          teamname: response.data.teamname || '',
          Address: response.data.Address || '',
        });
      } catch (error) {
        setError('Error fetching user profile. Please try again later.');
        setLoading(false);
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();


  }, [username]);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', editedUserProfile.username);
    formData.append('email', editedUserProfile.email);
    formData.append('profile_picture', editedUserProfile.profile_picture);
    formData.append('firstname', editedUserProfile.firstname);
    formData.append('lastname', editedUserProfile.lastname);
    formData.append('city', editedUserProfile.city);
    formData.append('country', editedUserProfile.country);
    formData.append('aboutme', editedUserProfile.aboutme);
    formData.append('teamname', editedUserProfile.teamname);
    formData.append('Address', editedUserProfile.Address);

    try {
      await axios.put(`/profile/${username}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('User profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return { userProfile, loading, error, editedUserProfile, setEditedUserProfile, handleFormSubmit };
};



export default useProfileEffect;
