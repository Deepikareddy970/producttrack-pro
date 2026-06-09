import { useState, useEffect } from "react";

function Attendance() {
  const [records, setRecords] = useState([]);
  const [employee, setEmployee] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const savedRecords =
      JSON.parse(localStorage.getItem("attendance")) || [];
    setRecords(savedRecords);
  }, []);

  const addAttendance = () => {
    if (!employee || !status) return;

    const newRecord = {
      id: Date.now(),
      employee,
      status,
      date: new Date().toLocaleDateString(),
    };

    const updatedRecords = [...records, newRecord];

    setRecords(updatedRecords);

    localStorage.setItem(
      "attendance",
      JSON.stringify(updatedRecords)
    );

    setEmployee("");
    setStatus("");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Attendance Management
      </h1>

      <input
        type="text"
        placeholder="Employee Name"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
        className="border p-2 mr-2"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 mr-2"
      >
        <option value="">Select</option>
        <option>Present</option>
        <option>Absent</option>
      </select>

      <button
        onClick={addAttendance}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Mark Attendance
      </button>

      <table className="w-full mt-5 border">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th>Employee</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.employee}</td>
              <td>{record.status}</td>
              <td>{record.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;