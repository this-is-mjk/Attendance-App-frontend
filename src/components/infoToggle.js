import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const InfoToggle = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleInfo = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button
        onClick={toggleInfo}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <FontAwesomeIcon icon={faInfoCircle} size="lg" /> Info
      </button>
      {isVisible && (
        <div
          style={{
            border: "1px solid #ccc",
            paddingRight: "5px",
            marginTop: "5px",
            fontStyle: "italic",
            fontSize: "15px",
            color: "red",
          }}
        >
          <ul>
            <li>Make sure good lighting on your face</li>
            <li>Enter id and click mark attendance to mark present</li>
            <li>Enter id and login to check yout attendance report</li>
            <li>Ask Admin to register you if you are not registered</li>
            <li>Look into the camera</li>
            <li>
              Click
              <button
                onClick={toggleInfo}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faInfoCircle} size="lg" />
              </button>{" "}
              to disapear
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default InfoToggle;
