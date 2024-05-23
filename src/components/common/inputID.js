import { useState } from "react";

export default function InputID({ rollNumber, setRollNumber }) {
  const [hasTyped, setHasTyped] = useState(false);
  const handleChange = (event) => {
    setRollNumber(event.target.value);
    setHasTyped(true);
  };
  return (
    <>
      <input
        autoFocus={true}
        type="number"
        placeholder="ID NUMBER"
        value={rollNumber}
        onChange={handleChange}
        className="btn-input"
      />
      {hasTyped && rollNumber === "" && (
        <p style={{ color: "red", fontSize: "0.7rem", margin: "1px" }}>
          Please write your ID
        </p>
      )}
    </>
  );
}
