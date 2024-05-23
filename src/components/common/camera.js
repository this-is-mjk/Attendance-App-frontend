import Webcam from "react-webcam";

export default function Camera({ hasCameraAccess, webcamRef }) {
  return (
    <div>
      {hasCameraAccess ? (
        <Webcam
          className="webcam"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      ) : (
        <p
          style={{
            padding: "20px",
            fontSize: "larger",
            color: "red",
            fontStyle: "italic",
          }}
        >
          Camera access is required to proceed.
        </p>
      )}
    </div>
  );
}
