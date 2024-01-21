// Welcome.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../global-components/Loading'; // Import the Loading component
import '../styles/Welcom.css'; // Make sure the path to your CSS file is correct

// Your WelcomeComponent
const WelcomeComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay (e.g., API call, data loading)
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(delay);
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
   
    <div  className="welcome-container">
      
      {isLoading ? (
        <Loading /> // Use the Loading component here
      ) : (
       
       <div className="welcome-container-otions">
          <h1>Welcome to the W3data!</h1>
          <div className="welcome-container-links">
          <Link className="welcome-container-links_child" to="/admin">Click here if you are Admin</Link>
          <br />
          <br />
          
          <Link to="/user">Click here if you are User</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default WelcomeComponent;
