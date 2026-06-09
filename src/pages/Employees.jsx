import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Employees() {
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");
  const isManager = userRole === "manager";

  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/employees"
      );

      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addEmployee = async () => {
    if (!name || !role || !department) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/employees",
        {
          name,
          role,
          department,
        }
      );

      alert("Employee Added Successfully");

      setName("");
      setRole("");
      setDepartment("");

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/employees/${id}`
      );

      alert("Employee Deleted Successfully");

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Employee Management
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
        >
          Back
        </button>

      </div>

      {!isManager && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">

          <h2 className="text-xl font-bold mb-4">
            Add Employee
          </h2>

          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 w-full mb-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-3 w-full mb-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
            className="border p-3 w-full mb-3 rounded-lg"
          />

          <button
            onClick={addEmployee}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg"
          >
            Add Employee
          </button>

        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-xl font-bold mb-4">
          Employee List
        </h2>

        <table className="w-full border">

          <thead>

            <tr className="bg-blue-700 text-white">

              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Department</th>

              {!isManager && (
                <th className="p-3">Action</th>
              )}

            </tr>

          </thead>

          <tbody>

            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan={isManager ? "3" : "4"}
                  className="text-center p-4"
                >
                  No Employees Found
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr
                  key={employee._id}
                  className="text-center border-b"
                >

                  <td className="p-3">
                    {employee.name}
                  </td>

                  <td className="p-3">
                    {employee.role}
                  </td>

                  <td className="p-3">
                    {employee.department}
                  </td>

                  {!isManager && (
                    <td className="p-3">

                      <button
                        onClick={() =>
                          deleteEmployee(employee._id)
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

export default Employees;