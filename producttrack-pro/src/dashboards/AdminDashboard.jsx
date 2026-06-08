import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const employees =
    JSON.parse(localStorage.getItem("employees")) || [];

  const attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

  const inventory =
    JSON.parse(localStorage.getItem("inventory")) || [];

  const production =
    JSON.parse(localStorage.getItem("production")) || [];

  const sales =
    JSON.parse(localStorage.getItem("sales")) || [];

  const revenue = sales.reduce(
    (sum, order) => sum + Number(order.amount || 0),
    0
  );

  const chartData = [
    {
      name: "Employees",
      value: employees.length,
    },
    {
      name: "Attendance",
      value: attendance.length,
    },
    {
      name: "Inventory",
      value: inventory.length,
    },
    {
      name: "Production",
      value: production.length,
    },
    {
      name: "Sales",
      value: sales.length,
    },
  ];

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
              Admin Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Welcome, {user.username || "Admin"}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

          <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold">
              Employees
            </h2>

            <p className="text-4xl font-bold mt-3">
              {employees.length}
            </p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold">
              Attendance
            </h2>

            <p className="text-4xl font-bold mt-3">
              {attendance.length}
            </p>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold">
              Inventory
            </h2>

            <p className="text-4xl font-bold mt-3">
              {inventory.length}
            </p>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold">
              Production
            </h2>

            <p className="text-4xl font-bold mt-3">
              {production.length}
            </p>
          </div>

          <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold">
              Revenue
            </h2>

            <p className="text-4xl font-bold mt-3">
              ₹{revenue}
            </p>
          </div>

        </div>

        {/* Company Overview */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Company Overview
          </h2>

          <div className="space-y-4 text-lg">

            <p>
              👥 Total Employees :
              {" "}
              {employees.length}
            </p>

            <p>
              📅 Attendance Records :
              {" "}
              {attendance.length}
            </p>

            <p>
              📦 Inventory Items :
              {" "}
              {inventory.length}
            </p>

            <p>
              🏭 Production Records :
              {" "}
              {production.length}
            </p>

            <p>
              💰 Total Revenue :
              {" "}
              ₹{revenue}
            </p>

          </div>

        </div>

        {/* Analytics Chart */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Company Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={chartData}>

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#2563eb"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>
          </ResponsiveContainer>

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
                      key={employee.id}
                      className="border-b text-center"
                    >
                      <td>{employee.name}</td>
                      <td>{employee.role}</td>
                      <td>{employee.department}</td>
                    </tr>
                  ))}

              </tbody>

            </table>
          )}

        </div>

        {/* Recent Orders */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          {sales.length === 0 ? (
            <p>No Orders Found</p>
          ) : (
            <table className="w-full border">

              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Amount</th>
                </tr>
              </thead>

              <tbody>

                {sales
                  .slice(-5)
                  .reverse()
                  .map((order) => (
                    <tr
                      key={order.id}
                      className="border-b text-center"
                    >
                      <td>{order.customer}</td>
                      <td>₹{order.amount}</td>
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

export default AdminDashboard;