import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./home.css";
import InfoToggle from "./infoToggle";
import axios from "axios";
import Webcam from "react-webcam";

const Home = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [hasTyped, setHasTyped] = useState(false); // New state to track whether the user has typed anything
  const webcamRef = useRef(null);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraAccess(true);
      } catch (error) {
        console.error("Camera access denied", error);
        setHasCameraAccess(false);
      }
    };

    requestCameraPermission();
  }, []);
  // const [image, setImage] = useState(null);
  const handleChange = (event) => {
    setRollNumber(event.target.value);
    setHasTyped(true); // Update state to indicate that the user has typed something
  };
  // const capture = () => {
  //   const image = webcamRef.current.getScreenshot();
  //   setImage(image);
  // };

  const capture = async () => {
    return new Promise((resolve) => {
      const screenshot = webcamRef.current.getScreenshot();
      // setImage(screenshot);
      resolve(screenshot);
    });
  };

  function dataURItoBlob(dataURI) {
    // Split the data URI into parts
    const parts = dataURI.split(",");
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(":")[1].split(";")[0];

    // Create a new ArrayBuffer for the binary data
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    // Write the binary data to the ArrayBuffer
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    // Create and return a new Blob object
    return new Blob([arrayBuffer], { type: mimeString });
  }
  const createFormData = (image) => {
    const formData = new FormData();
    formData.set("user_id", rollNumber);
    formData.set("image", dataURItoBlob(image));
    return formData;
  };
  const sendRequest = async (formData, url) => {
    axios({
      method: "post",
      url: url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        console.log("Response from server:", response);
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  };
  const login = async () => {
    const screenshot = await capture();
    const formData = createFormData(screenshot);
    // sendRequest(formData, "http://localhost:5000/mark-attendence");
    await sendRequest(formData, "http://localh.st:5000/login");
    // console.log("Login");
  };
  const markAttendance = async () => {
    const screenshot = await capture();
    const formData = createFormData(screenshot);
    // sendRequest(formData, "http://localhost:5000/mark-attendence");
    await sendRequest(formData, "http://localh.st:5000/mark-attendence");
  };
  return (
    <div className="home">
      <div className="home-image" />
      <div className="flex">
        <div style={{ margin: "0 auto", width: "50%" }}>
        {hasCameraAccess ? (
            <Webcam
              className="webcam"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          ) : (
            <p>Camera access is required to proceed.</p>
          )}
        </div>
        <div className="form">
          <h3 className="heading">Easy Attendance Ever!</h3>
          <input
            autoFocus={true}
            type="number"
            placeholder="ID NUMBER"
            value={rollNumber}
            onChange={handleChange}
            className="form-element"
          />
          {hasTyped && rollNumber === "" && (
            <p style={{ color: "red", fontSize: "0.7rem", margin: "1px" }}>
              Please write your ID
            </p>
          )}
          <Button
            variant="contained"
            color="success"
            onClick={markAttendance}
            display=""
            className="form-element"
            style={{ margin: "5px auto" }}
          >
            Mark Attendance
          </Button>
          <Button
            variant="outlined"
            onClick={login}
            className="form-element"
            style={{
              border: "2px solid green",
              color: "black",
              hover: "backgroundcolor: grey",
              margin: "5px auto",
            }}
          >
            Login
          </Button>
          <InfoToggle />
        </div>
      </div>
    </div>
  );
};
export default Home;

// method 2
// const capture = (callback) => {
//   const screenshot = webcamRef.current.getScreenshot();
//   setImage(screenshot);
//   if (callback) callback(screenshot);
// };

// const login = () => {
//   capture((screenshot) => {
//     const formData = createFormData(screenshot);
//     sendRequest(formData, "http://localhost:5000/mark-attendence");
//   });
// };
