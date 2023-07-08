// import React, { useState } from 'react';
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// const VideoCropper = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [croppedVideoUrl, setCroppedVideoUrl] = useState('');

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   const cropVideo = async () => {
//     if (!selectedFile) {
//       alert('Please select a video file.');
//       return;
//     }

//     const ffmpeg = createFFmpeg({ log: true });
//     await ffmpeg.load();

//     // Read the input video file
//     ffmpeg.FS('writeFile', selectedFile.name, await fetchFile(selectedFile));

//     // Run the FFmpeg command to crop the video
//     await ffmpeg.run('-i', selectedFile.name, '-vf', 'crop=320:240:0:0', 'output.mp4');

//     // Read the output file
//     const outputData = ffmpeg.FS('readFile', 'output.mp4');

//     // Create a Blob from the output data
//     const outputBlob = new Blob([outputData.buffer], { type: 'video/mp4' });

//     // Create a URL for the output Blob
//     const outputURL = URL.createObjectURL(outputBlob);
//     setCroppedVideoUrl(outputURL);

//     // Cleanup
//     ffmpeg.FS('unlink', 'output.mp4');
//     ffmpeg.FS('unlink', selectedFile.name);
//     ffmpeg.exit();
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileSelect} accept="video/*" />
//       <button onClick={cropVideo}>Crop</button>
//       <br />
//       {croppedVideoUrl && (
//         <video src={croppedVideoUrl} controls />
//       )}
//     </div>
//   );
// };

// export default VideoCropper;
