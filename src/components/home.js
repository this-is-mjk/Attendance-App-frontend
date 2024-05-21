import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./home.css";

const Home = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [hasTyped, setHasTyped] = useState(false); // New state to track whether the user has typed anything

  const handleChange = (event) => {
    setRollNumber(event.target.value);
    setHasTyped(true); // Update state to indicate that the user has typed something
  };
  const login = () => {
    console.log("Login");
  };
  const markAttendance = () => {
    console.log("Mark Attendance");
  };
  return (
    <div className="home">
      <div className="home-image" />
      <div className="form">
        <h3 className="heading">Easy Attendance Ever!</h3>
        <input
          autoFocus={true}
          type="tel"
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
          style={{margin: "5px auto"}}
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
            margin: "5px auto"
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
export default Home;
