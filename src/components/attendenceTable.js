import React from "react";
import "./attendenceTable.css";
export default function AttendanceTable({ data }) {
  return (
    <div>
      <h2
        style={{
          color: "green",
          fontStyle: "italic",
          margin: "10px auto",
          width: "fit-content",
        }}
      >
        Attendance Table
      </h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td
                style={
                  item.status === "Present"
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {item.status}
              </td>
              <td>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
