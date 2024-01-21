import React, { useState } from 'react';
import MetadataDownload from './filtereddata';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetadataUpdateService from '../api-services/MetadataUpdateService';
import '../styles/metadata.css';




const Metadata = ({ metadata, selectedVersion,selectedProject }) => {
  const [editedMetadata, setEditedMetadata] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  if (!metadata || metadata.length === 0 || !selectedVersion) {
    return <p>No metadata available.</p>;
  }

  // Filter metadata based on the selected version
  const filteredMetadata = metadata.filter((meta) => String(meta.version) === selectedVersion);

  if (filteredMetadata.length === 0) {
    return <p>No metadata available for the selected version.</p>;
  }

  const handleInputChange = (key, newValue) => {
    setEditedMetadata((prev) => ({ ...prev, [key]: newValue }));
  };

  const callHandleSaveChanges = () => {
    MetadataUpdateService(selectedProject, selectedVersion, editedMetadata, setIsSaving);
  };
  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
      <h2>Edit Metadata for Version: {selectedVersion}</h2>
      <div className='buttons-metadata-myprojects'>

      {filteredMetadata.length > 0 && (
        <MetadataDownload filteredMetadata={filteredMetadata} selectedVersion={selectedVersion} />
      )}
      <button className='save-changes-metadata' onClick={callHandleSaveChanges} disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>



      </div>
   

{filteredMetadata.map((meta, index) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }} key={index}>
    {Object.entries(meta).map(([key, value]) => (
      value !== undefined && (
        <div key={key} style={{ width: '50%' }}>
          <p>
            <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong>
          </p>
          <input
            type="text"
            name='metedatavalues'
            value={editedMetadata[key] !== undefined ? editedMetadata[key] : value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className='metadata-input-myproject'
          />
        </div>
      )
    ))}
  </div>
))}

    
    </div>
  );
};

export default Metadata;