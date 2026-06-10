import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ProductionDashboard() {
  const navigate = useNavigate();

  const [report, setReport] = useState({
    production: 0,
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
        production: res.data.production,
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
            Production Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome, {user.username || "Production User"}
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

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Production Records
          </h2>

          <p className="text-4xl font-bold mt-3">
            {report.production}
          </p>

        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Production Status
          </h2>

          <p className="text-2xl font-bold mt-3">
            Active
          </p>

        </div>

      </div>

      {/* Production Operations */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Production Operations
        </h2>

        <Link
          to="/production-page"
          className="block bg-purple-600 hover:bg-purple-700 text-white text-center p-5 rounded-lg text-lg font-semibold"
        >
          Manage Production
        </Link>

      </div>

      {/* Production Summary */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Production Summary
        </h2>

        <div className="space-y-4 text-lg">

          <p>
            🏭 Total Production Records :
            {" "}
            {report.production}
          </p>

          <p>
            📦 Manufacturing Process Tracking Enabled
          </p>

          <p>
            ✅ Production Team manages manufacturing and output tracking.
          </p>

        </div>

      </div>

      {/* Status Section */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Production Status
        </h2>

        <div className="space-y-4">

          <div className="bg-green-100 p-4 rounded-lg">
            ✔ Production Line Active
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            ✔ Daily Monitoring Enabled
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            ✔ Quality Check In Progress
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductionDashboard;