import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function InventoryDashboard() {
  const navigate = useNavigate();

  const [report, setReport] = useState({
    inventory: 0,
  });

  const user =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/reports/dashboard"
      );

      setReport({
        inventory: res.data.inventory,
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
            Inventory Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome, {user.username || "Inventory User"}
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

        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Inventory Items
          </h2>

          <p className="text-4xl font-bold mt-3">
            {report.inventory}
          </p>

        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Stock Status
          </h2>

          <p className="text-2xl font-bold mt-3">
            Available
          </p>

        </div>

      </div>

      {/* Inventory Operations */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Inventory Operations
        </h2>

        <Link
          to="/inventory-page"
          className="block bg-yellow-500 hover:bg-yellow-600 text-white text-center p-5 rounded-lg text-lg font-semibold"
        >
          Manage Inventory
        </Link>

      </div>

      {/* Inventory Summary */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Inventory Summary
        </h2>

        <div className="space-y-4 text-lg">

          <p>
            📦 Total Inventory Items :
            {" "}
            {report.inventory}
          </p>

          <p>
            🏪 Stock Monitoring Enabled
          </p>

          <p>
            ✅ Inventory Team manages stock,
            materials and warehouse records.
          </p>

        </div>

      </div>

      {/* Status Section */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Inventory Status
        </h2>

        <div className="space-y-4">

          <div className="bg-green-100 p-4 rounded-lg">
            ✔ Inventory Tracking Active
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            ✔ Stock Monitoring Enabled
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            ✔ Warehouse Records Updated
          </div>

        </div>

      </div>

    </div>
  );
}

export default InventoryDashboard;