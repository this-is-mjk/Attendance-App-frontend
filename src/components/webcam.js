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
    <div>
      <Webcam
        className='webcam'
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      </div>
  );
};

export default FaceDetection;
