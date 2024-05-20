import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const FaceDetection = () => {
  const webcamRef = useRef(null);
  const [faces, setFaces] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    if (imageSrc) {
      await detectFaces(imageSrc);
    }
  };

  const detectFaces = async (imageSrc) => {
    try {
      const blob = await fetch(imageSrc).then(res => res.blob());
      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');
      
      const response = await axios.post('http://localhost:5000/detect_faces', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setFaces(response.data.faces);
    } catch (error) {
      console.error('Error detecting faces:', error);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{
          position: 'absolute',
          top: '10%', // Adjust as needed
          left: '10%', // Adjust as needed
          height: '80%', // Adjust as needed
          width: '80%' // Adjust as needed
        }}
      />
      <button
        onClick={capture}
        style={{
          position: 'absolute',
          bottom: '10%', // Adjust as needed
          left: '50%', // Adjust as needed
          transform: 'translateX(-50%)'
        }}
      >
        Capture
      </button>
      {imageSrc && (
        <div
          style={{
            position: 'absolute',
            top: '10%', // Adjust as needed
            right: '10%', // Adjust as needed
            width: '40%', // Adjust as needed
            border: '2px solid red'
          }}
        >
          <img src={imageSrc} alt="Captured" width="100%" />
          {faces.map((face, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                border: '2px solid blue',
                top: face.y,
                left: face.x,
                width: face.width,
                height: face.height,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaceDetection;
