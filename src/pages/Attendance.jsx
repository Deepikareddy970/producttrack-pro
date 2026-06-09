import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Attendance() {
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");
  const isManager = userRole === "manager";

  const [attendance, setAttendance] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/attendance"
      );

      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addAttendance = async () => {
    if (!employeeName) {
      alert("Enter Employee Name");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/attendance",
        {
          employeeName,
          status,
          date: new Date().toLocaleDateString(),
        }
      );

      setEmployeeName("");
      setStatus("Present");

      fetchAttendance();

      alert("Attendance Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/attendance/${id}`
      );

      fetchAttendance();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    navigate("/login");
  };

  const presentCount = attendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (record) => record.status === "Absent"
  ).length;

  return (
    <div className="p-10 bg-slate-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Attendance Management
          </h1>

          <p className="text-gray-600 mt-2">
            Manage Employee Attendance Records
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Back
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

      {!isManager && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

          <h2 className="text-2xl font-bold mb-5">
            Mark Attendance
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Employee Name"
              value={employeeName}
              onChange={(e) =>
                setEmployeeName(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="border p-3 rounded-lg"
            >
              <option>Present</option>
              <option>Absent</option>
            </select>

          </div>

          <button
            onClick={addAttendance}
            className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Save Attendance
          </button>

        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="font-semibold">
            Total Records
          </h2>

          <p className="text-4xl font-bold mt-2">
            {attendance.length}
          </p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="font-semibold">
            Present
          </h2>

          <p className="text-4xl font-bold mt-2">
            {presentCount}
          </p>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="font-semibold">
            Absent
          </h2>

          <p className="text-4xl font-bold mt-2">
            {absentCount}
          </p>
        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-5">
          Attendance Records
        </h2>

        <table className="w-full border rounded-lg overflow-hidden">

          <thead>

            <tr className="bg-green-600 text-white">

              <th className="p-3">Employee</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>

              {!isManager && (
                <th className="p-3">Action</th>
              )}

            </tr>

          </thead>

          <tbody>

            {attendance.length === 0 ? (
              <tr>
                <td
                  colSpan={isManager ? "3" : "4"}
                  className="text-center p-5"
                >
                  No Attendance Records Found
                </td>
              </tr>
            ) : (
              attendance.map((record) => (
                <tr
                  key={record._id}
                  className="text-center border-b hover:bg-slate-100"
                >

                  <td className="p-3">
                    {record.employeeName}
                  </td>

                  <td className="p-3">
                    {record.status}
                  </td>

                  <td className="p-3">
                    {record.date}
                  </td>

                  {!isManager && (
                    <td className="p-3">

                      <button
                        onClick={() =>
                          deleteRecord(record._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>

                    </td>
                  )}

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Attendance;