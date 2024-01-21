import React from 'react';
import '../styles/help.css';

const HelpComponent = () => {
  return (
    <div className='main_container'>
      <div className='Instruction_section'>

      <h2>CSV File Structure Instructions</h2>
      <p>
        To successfully process your CSV file, ensure that it follows the required structure outlined below:
      </p>
      <ul>
        <li>The CSV file should have a header row with column names.</li>
        <li>The file must contain either "Date" and "Time" columns or a "timestamp" column.</li>
        <li>If using "Date" and "Time" columns, the date and time values should be in the format "YYYY-MM-DD" and "HH:MM:SS" respectively.</li>
        <li>If using a "timestamp" column, ensure the timestamp format is either "YYYY-MM-DD HH:MM:SS" or "YYYY-MM-DD HH:MM:SS.ssssss".</li>

        <li>The CSV file should be delimited using a semicolon (;) or (,).</li>
        <li>To chnage file Format to correct Csv import data into Excel and store file as CSV(Comma delimited).</li>
      </ul>
      <p>
        Note: Make sure that the CSV file adheres to the specified structure for successful processing.
      </p>

      </div>
    
    </div>
  );
};

export default HelpComponent;
