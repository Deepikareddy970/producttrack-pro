import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-8">
        ProductTrack Pro
      </h1>

      <div className="flex flex-col gap-3">

        <Link
          to="/admin"
          className="bg-slate-800 p-3 rounded hover:bg-blue-600"
        >
          Dashboard
        </Link>

        <Link
          to="/employees"
          className="bg-slate-800 p-3 rounded hover:bg-blue-600"
        >
          Employees
        </Link>

        <Link
          to="/attendance"
          className="bg-slate-800 p-3 rounded hover:bg-blue-600"
        >
          Attendance
        </Link>

        <Link
          to="/inventory-page"
          className="bg-slate-800 p-3 rounded hover:bg-blue-600"
        >
          Inventory
        </Link>

        <Link
          to="/production-page"
          className="bg-slate-800 p-3 rounded hover:bg-blue-600"
        >
          Production
        </Link>

        <Link
          to="/sales-page"
          className="bg-slate-800 p-3 rounded hover:bg-blue-600"
        >
          Sales
        </Link>

        <Link
          to="/reports"
          className="bg-slate-800 p-3 rounded hover:bg-blue-600"
        >
          Reports
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;