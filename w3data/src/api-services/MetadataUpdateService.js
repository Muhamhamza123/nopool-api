// MetadataUpdateService.js
import { toast } from 'react-toastify';

const handleSaveChanges = (selectedProject, selectedVersion, editedMetadata, setIsSaving) => {
  setIsSaving(true);

  fetch('/update_metadata', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        selectedProject,
      version: selectedVersion,
      editedMetadata,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Saved changes:', data);
      setIsSaving(false);

      if (data.message === 'Metadata updated successfully') {
        toast.success('Metadata updated successfully');
      } else if (data.message === 'No changes to update') {
        toast.info('No changes to update');
      } else if (data.error === 'Record not found') {
        toast.warn('Record not found');
      } else if (data.error === 'Project not found') {
        toast.error('Project not found');
      }
    })
    .catch((error) => {
      console.error('Error saving changes:', error);
      setIsSaving(false);
      toast.error('Error updating metadata');
    });
};

export default handleSaveChanges;
