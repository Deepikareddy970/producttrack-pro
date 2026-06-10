import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SalesDashboard() {
  const navigate = useNavigate();

  const [report, setReport] = useState({
    sales: 0,
    revenue: 0,
  });

  const user =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "https://producttrack-backend-5wd3.onrender.com/api/reports/dashboard"
      );

      setReport({
        sales: res.data.sales,
        revenue: res.data.revenue,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="p-10 bg-slate-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Sales Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome, {user.username || "Sales User"}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Orders
          </h2>

          <p className="text-4xl font-bold mt-3">
            {report.sales}
          </p>

        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹{report.revenue}
          </p>

        </div>

      </div>

      {/* Sales Operations */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Sales Operations
        </h2>

        <Link
          to="/sales-page"
          className="block bg-red-600 hover:bg-red-700 text-white text-center p-5 rounded-lg text-lg font-semibold"
        >
          Manage Sales Orders
        </Link>

      </div>

      {/* Sales Summary */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Sales Summary
        </h2>

        <div className="space-y-4 text-lg">

          <p>
            🧾 Total Orders :
            {" "}
            {report.sales}
          </p>

          <p>
            💰 Total Revenue :
            {" "}
            ₹{report.revenue}
          </p>

          <p>
            📍 Shop Locations Tracked
          </p>

          <p>
            ✅ Sales Team manages customer
            orders and revenue tracking.
          </p>

        </div>

      </div>

      {/* Sales Status */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Sales Status
        </h2>

        <div className="space-y-4">

          <div className="bg-green-100 p-4 rounded-lg">
            ✔ Orders Processing Active
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            ✔ Revenue Tracking Enabled
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            ✔ Customer Orders Updated
          </div>

        </div>

      </div>

    </div>
  );
}

export default SalesDashboard;