import React from 'react';
import { ScaleLoader } from 'react-spinners';
import '../styles/Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">    
     
      <ScaleLoader color="#3358f4" margin={3} radius={4} speedMultiplier={1} width={10} />


        
   
    </div>
  );
};

export default Loading;
