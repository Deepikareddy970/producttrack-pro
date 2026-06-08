import { useState, useEffect } from "react";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedEmployees =
      JSON.parse(localStorage.getItem("employees")) || [];

    setEmployees(savedEmployees);
  }, []);

  const addEmployee = () => {
    if (!name || !role || !department) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      const updatedEmployees = employees.map((employee) =>
        employee.id === editId
          ? {
              ...employee,
              name,
              role,
              department,
            }
          : employee
      );

      setEmployees(updatedEmployees);

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      );

      setEditId(null);
    } else {
      const newEmployee = {
        id: Date.now(),
        name,
        role,
        department,
      };

      const updatedEmployees = [
        ...employees,
        newEmployee,
      ];

      setEmployees(updatedEmployees);

      localStorage.setItem(
        "employees",
        JSON.stringify(updatedEmployees)
      );
    }

    setName("");
    setRole("");
    setDepartment("");
  };

  const editEmployee = (employee) => {
    setEditId(employee.id);
    setName(employee.name);
    setRole(employee.role);
    setDepartment(employee.department);
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter(
      (employee) => employee.id !== id
    );

    setEmployees(updatedEmployees);

    localStorage.setItem(
      "employees",
      JSON.stringify(updatedEmployees)
    );
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Employee Management
      </h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">
          {editId ? "Edit Employee" : "Add Employee"}
        </h2>

        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          onClick={addEmployee}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">
          Employee List
        </h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Department</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-4"
                >
                  No Employees Found
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr
                  key={employee.id}
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

                  <td className="p-3">
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          editEmployee(employee)
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteEmployee(employee.id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>
                  </td>
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