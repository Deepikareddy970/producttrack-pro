import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function ManagerDashboard() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const [report, setReport] = useState({
    employees: 0,
    attendance: 0,
    inventory: 0,
    production: 0,
    sales: 0,
    revenue: 0,
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchEmployees();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/reports/dashboard"
      );

      setReport(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-10 bg-slate-100 min-h-screen">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Manager Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Welcome, {user.username || "Manager"}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

          <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="font-semibold">
              Employees
            </h2>

            <p className="text-4xl font-bold mt-2">
              {report.employees}
            </p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="font-semibold">
              Attendance
            </h2>

            <p className="text-4xl font-bold mt-2">
              {report.attendance}
            </p>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
            <h2 className="font-semibold">
              Inventory
            </h2>

            <p className="text-4xl font-bold mt-2">
              {report.inventory}
            </p>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="font-semibold">
              Production
            </h2>

            <p className="text-4xl font-bold mt-2">
              {report.production}
            </p>
          </div>

          <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="font-semibold">
              Revenue
            </h2>

            <p className="text-3xl font-bold mt-2">
              ₹{report.revenue}
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <Link
              to="/employees"
              className="bg-blue-600 text-white p-5 rounded-lg text-center hover:bg-blue-700"
            >
              Manage Employees
            </Link>

            <Link
              to="/attendance"
              className="bg-green-600 text-white p-5 rounded-lg text-center hover:bg-green-700"
            >
              Manage Attendance
            </Link>

            <Link
              to="/reports"
              className="bg-purple-600 text-white p-5 rounded-lg text-center hover:bg-purple-700"
            >
              View Reports
            </Link>

          </div>

        </div>

        {/* Department Overview */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Department Overview
          </h2>

          <div className="space-y-4 text-lg">

            <p>
              👥 Employees : {report.employees}
            </p>

            <p>
              📅 Attendance Records : {report.attendance}
            </p>

            <p>
              📦 Inventory Items : {report.inventory}
            </p>

            <p>
              🏭 Production Records : {report.production}
            </p>

            <p>
              🛒 Sales Orders : {report.sales}
            </p>

            <p>
              💰 Revenue : ₹{report.revenue}
            </p>

          </div>

        </div>

        {/* Recent Employees */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Recent Employees
          </h2>

          {employees.length === 0 ? (
            <p>No Employees Found</p>
          ) : (
            <table className="w-full border">

              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3">Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Department</th>
                </tr>
              </thead>

              <tbody>

                {employees
                  .slice(-5)
                  .reverse()
                  .map((employee) => (
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
                    </tr>
                  ))}

              </tbody>

            </table>
          )}

        </div>

      </div>

    </div>
  );
}

export default ManagerDashboard;