import React, { useState } from 'react';
import axios from 'axios'
import Toolbar from './Toolbar';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Perform file upload to the database
      // You can use libraries like Axios or Fetch to send the file to your backend server
      // Here's an example using Axios:
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios.post('/upload', formData)
        .then((response) => {
          console.log('File uploaded successfully:', response.data);
          // Handle success response from the server
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          // Handle error response from the server
        });
    }
  };

  return (
    <div>
        <Toolbar></Toolbar>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
