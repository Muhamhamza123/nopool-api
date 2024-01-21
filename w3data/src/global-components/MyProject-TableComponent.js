// TableComponent.js
import React from 'react';

const TableComponent = ({ data, showTable, toggleView }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>No data available.</p>;
  }

  // Extract unique field names dynamically
  const uniqueFieldNames = [...new Set(data.map((item) => item.Field))];

  console.log('data:', data);
  console.log('uniqueFieldNames:', uniqueFieldNames);

  // Pivot the data to have each timestamp in a single row
  const pivotedData = data.reduce((acc, item) => {
    const existingRow = acc.find((row) => row.Time === item.Time);

    if (existingRow) {
      existingRow[item.Field] = item.Value;
    } else {
      const newRow = { Time: item.Time };
      newRow[item.Field] = item.Value;
      acc.push(newRow);
    }

    return acc;
  }, []);

  return (
    <div style={{ width: '100%', overflow: 'auto', height: '500px', marginBottom: '20px' }}>
      <button className='toggel_button' onClick={toggleView}>
       
        {showTable ? 'Show Graphs' : 'Show Table'}
      </button>
      <br></br>
      <br></br>
     
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {uniqueFieldNames.map((fieldName) => (
              <th key={fieldName}>{fieldName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pivotedData.map((item, index) => {
            console.log('item:', item);
            return (
              <tr key={index}>
                <td>{item.Time}</td>
                {uniqueFieldNames.map((fieldName) => (
                  <td key={fieldName}>{item[fieldName] || ''}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
