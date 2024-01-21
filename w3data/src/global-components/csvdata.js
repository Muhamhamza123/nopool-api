import React from 'react';

const DataDownload = ({ searchResults}) => {
    const downloadCSV = () => {
        const csvContent = [
          Object.keys(searchResults[0]).map(header => `${header}`).join(','),
          ...searchResults.map(row =>
            Object.values(row).map(value => (typeof value === 'string' ? `${value}` : value)).join(',')
          ),
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(blob, 'search_results.csv');
        } else {
          const url = URL.createObjectURL(blob);
          link.href = url;
          link.download = 'search_results.csv';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      };

  return (
    <div>
      <button className='metadata_download' onClick={downloadCSV}>
        Download data CSV
      </button>
    </div>
  );
};

export default DataDownload;