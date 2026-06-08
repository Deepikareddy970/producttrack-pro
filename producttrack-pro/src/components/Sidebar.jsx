import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-8">
        ProductTrack Pro
      </h1>

      <div className="flex flex-col gap-3">

        <Link
          to="/admin"
          className="bg-slate-800 p-3 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/employees"
          className="bg-slate-800 p-3 rounded"
        >
          Employees
        </Link>

        <Link
          to="/attendance"
          className="bg-slate-800 p-3 rounded"
        >
          Attendance
        </Link>

        <Link
          to="/inventory-page"
          className="bg-slate-800 p-3 rounded"
        >
          Inventory
        </Link>

        <Link
          to="/production-page"
          className="bg-slate-800 p-3 rounded"
        >
          Production
        </Link>

        <Link
          to="/sales-page"
          className="bg-slate-800 p-3 rounded"
        >
          Sales
        </Link>

        <Link
          to="/reports"
          className="bg-slate-800 p-3 rounded"
        >
          Reports
        </Link>

        <button
          onClick={logout}
          className="bg-red-600 p-3 rounded mt-5"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;