import React, { useRef, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import "./home.css";
import InfoToggle from "../components/infoToggle";

import Camera from "../components/common/camera";
import LoadingScreen from "../components/loadScreen";
import MakeAlert from "../components/alert.js";
import { createFormData } from "../components/utils/createFormData.js";
import requestCameraPermission from "../components/utils/requestCameraPermission.js";
import { sendRequest } from "../components/common/request.js";
import InputID from "../components/common/inputID.js";
import AttendanceTable from "../components/attendenceTable.js";
import axios from "axios";

const Home = () => {
  const [rollNumber, setRollNumber] = useState("");
  const webcamRef = useRef(null);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [attendenceData, setAttendenceData] = useState(null);
  const setVariable = {
    setLoading,
    setAlertContent,
    setAlert,
    setAlertType,
    setIsAdmin,
    setLogin,
    isLogin,
    attendenceData,
    setAttendenceData,
  };

  useEffect(() => {
    requestCameraPermission(setHasCameraAccess);
  }, []);
  const login = async () => {
    const formData = await createFormData(rollNumber, webcamRef);
    await sendRequest(
      "POST",
      formData,
      "http://localh.st:5000/login",
      "L",
      setVariable
    );
  };
  const markAttendance = async () => {
    const formData = await createFormData(rollNumber, webcamRef);
    await sendRequest(
      "POST",
      formData,
      "http://localh.st:5000/mark-attendence",
      "M",
      setVariable
    );
  };
  const addStudent = async () => {
    const formData = await createFormData(rollNumber, webcamRef);
    await sendRequest(
      "POST",
      formData,
      "http://localh.st:5000/add-student",
      "A",
      setVariable
    );
  };
  const getAttendance = async () => {
    const formData = new FormData();
    if (rollNumber === "") {
      alert("Please fill User ID");
      return;
    }
    formData.set("user_id", rollNumber);
    setLoading(true);
    axios({
      method: "POST",
      url: "http://localh.st:5000/get-attendence",
      data: formData,
    })
      .then((response) => {
        if (response.status === 200) {
          setAlert(true);
          setAlertContent(response.data.status);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
          setAlertType("success");
          setAttendenceData(response.data.attendence);
        }
      })
      .catch((error) => {
        console.log(error);
        setAlertContent(error.response.data.status);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
        setAlertType("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const markOthersAbsent = async () => {
    axios({
      method: "get",
      url: "http://localh.st:5000/mark-absent-all",
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setAlertContent(response.data.status);
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
          setAlertType("success");
        }
      })
      .catch((error) => {
        console.log(error);
        setAlertContent(error.response.data.status);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
        setAlertType("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const logout = () => {
    Cookies.remove("token");
    setLogin(false);
    setIsAdmin(false);
    window.location.reload();
  };
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className="home">
      <div className="home-image" />
      <MakeAlert
        alert={alert}
        alertType={alertType}
        alertContent={alertContent}
      />
      <div className="flex">
        <Camera hasCameraAccess={hasCameraAccess} webcamRef={webcamRef} />
        <div className="form">
          <h3 className="heading">Easy Attendance Ever!</h3>
          <InputID rollNumber={rollNumber} setRollNumber={setRollNumber} />
          {isAdmin && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={addStudent}
                className="btn-input"
                style={{ margin: "5px auto" }}
              >
                Add Student
              </Button>
              <Button
                variant="outlined"
                onClick={getAttendance}
                className="btn-input"
                style={{
                  border: "2px solid green",
                  color: "black",
                  hover: "backgroundcolor: grey",
                  margin: "5px auto",
                }}
              >
                Get Attendance
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={markOthersAbsent}
                className="btn-input"
                style={{ margin: "5px auto" }}
              >
                Mark Others Absent
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={logout}
                className="btn-input"
                style={{ margin: "5px auto" }}
              >
                Logout
              </Button>
            </>
          )}
          {!isAdmin && isLogin && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={markAttendance}
                className="btn-input"
                style={{ margin: "5px auto" }}
              >
                Mark Attendance
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={logout}
                className="btn-input"
                style={{ margin: "5px auto" }}
              >
                Logout
              </Button>
            </>
          )}
          {!isLogin && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={markAttendance}
                className="btn-input"
                style={{ margin: "5px auto" }}
              >
                Mark Attendance
              </Button>
              <Button
                variant="outlined"
                onClick={login}
                className="btn-input"
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
            </>
          )}
        </div>
      </div>
      <div>{attendenceData && <AttendanceTable data={attendenceData} />}</div>
    </div>
  );
};
export default Home;
