import React, { useState } from 'react';
import axios from 'axios'
import Toolbar from './Toolbar';
import AWS from 'aws-sdk';

const accessKeyId = 'AKIA5AOH4VZHWYBBOF62';
const secretAccessKey = '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';
const region = 'us-east-1';

AWS.config.update({ accessKeyId, secretAccessKey, region });

const s3 = new AWS.S3();

const uploadFile = (file, bucketName,key) => {

  const params = {
    Bucket: bucketName,
    Body: file,
    Key: key,
  };
  console.log("putting object")
  s3.putObject(params, (err, data) => {
    if (err) {
      console.error('Error uploading file:', err);
    } else {
      console.log('File uploaded successfully:', data);
    }
  });
};


const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();

      formData.append('file', selectedFile);

      const bucketName = 'testbucket1senior-design';
      uploadFile(selectedFile, bucketName,'latlong.txt');//change when you get he chance
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
