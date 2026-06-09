import { useEffect, useState } from "react";
import axios from "axios";
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

  const [dashboardData, setDashboardData] = useState({
    employees: 0,
    attendance: 0,
    inventory: 0,
    production: 0,
    sales: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/reports/dashboard"
      );

      setDashboardData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const chartData = [
    {
      name: "Employees",
      value: dashboardData.employees,
    },
    {
      name: "Attendance",
      value: dashboardData.attendance,
    },
    {
      name: "Inventory",
      value: dashboardData.inventory,
    },
    {
      name: "Production",
      value: dashboardData.production,
    },
    {
      name: "Sales",
      value: dashboardData.sales,
    },
  ];

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
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

          <div className="bg-blue-600 text-white p-6 rounded-xl">
            <h2>Employees</h2>
            <p className="text-4xl font-bold mt-3">
              {dashboardData.employees}
            </p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-xl">
            <h2>Attendance</h2>
            <p className="text-4xl font-bold mt-3">
              {dashboardData.attendance}
            </p>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-xl">
            <h2>Inventory</h2>
            <p className="text-4xl font-bold mt-3">
              {dashboardData.inventory}
            </p>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-xl">
            <h2>Production</h2>
            <p className="text-4xl font-bold mt-3">
              {dashboardData.production}
            </p>
          </div>

          <div className="bg-red-600 text-white p-6 rounded-xl">
            <h2>Revenue</h2>
            <p className="text-4xl font-bold mt-3">
              ₹{dashboardData.revenue}
            </p>
          </div>

        </div>

        {/* Company Overview */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Company Overview
          </h2>

          <div className="space-y-4 text-lg">

            <p>
              👥 Employees : {dashboardData.employees}
            </p>

            <p>
              📅 Attendance : {dashboardData.attendance}
            </p>

            <p>
              📦 Inventory : {dashboardData.inventory}
            </p>

            <p>
              🏭 Production : {dashboardData.production}
            </p>

            <p>
              🛒 Sales : {dashboardData.sales}
            </p>

            <p>
              💰 Revenue : ₹{dashboardData.revenue}
            </p>

          </div>

        </div>

        {/* Chart */}
        <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Company Statistics
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
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;