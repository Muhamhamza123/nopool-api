import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Loading.css';
import '../styles/home.css';
import useExperimentalEffect from '../api-services/useExperimental_service';

const Tables = () => {
  const { username } = useParams();
  const { data } = useExperimentalEffect(username);

  const renderTable = () => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return <p>No data available.</p>;
    }

    // Extract unique field names dynamically
    const uniqueFieldNames = [...new Set(data.map((item) => item.Field))];

    const tableData = data.reduce((acc, item) => {
      const timestamp = item.Time;
      const existingRow = acc.find((row) => row.Time === timestamp);

      if (existingRow) {
        existingRow[item.Field] = item.Value;
      } else {
        const newRow = { Time: timestamp, [item.Field]: item.Value };
        acc.push(newRow);
      }

      return acc;
    }, []);

    return (
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              {uniqueFieldNames.map((fieldName) => (
                <th key={fieldName}>{fieldName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.Time}</td>
                {uniqueFieldNames.map((fieldName) => (
                  <td key={fieldName}>{row[fieldName] || ''}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ width: '100%', height: 'auto-fit' }}>
      {renderTable()}
    </div>
  );
};

export default Tables;
