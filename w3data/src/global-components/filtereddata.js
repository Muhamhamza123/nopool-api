// MetadataDownload.js

import React from 'react';

const MetadataDownload = ({ filteredMetadata, selectedVersion }) => {
  const downloadMetadataCSV = () => {
    const formattedContent = filteredMetadata.map((item) =>
      Object.entries(item)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    ).join('\n');
    const blob = new Blob([formattedContent], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, `metadata_${selectedVersion}.txt`);
    } else {
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = `metadata_${selectedVersion}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <button className='Download-metadata-myprojects' onClick={downloadMetadataCSV}>
        Download Metadata CSV
      </button>
    </div>
  );
};

export default MetadataDownload;
