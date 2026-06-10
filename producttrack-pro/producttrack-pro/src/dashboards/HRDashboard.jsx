import { Link } from "react-router-dom";

function HRDashboard() {
  const employees =
    JSON.parse(localStorage.getItem("employees")) || [];

  const attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

  return (
    <div className="p-10 bg-slate-100 min-h-screen">

      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        HR Dashboard
      </h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Total Employees
          </h2>

          <p className="text-4xl font-bold mt-3">
            {employees.length}
          </p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">
            Attendance Records
          </h2>

          <p className="text-4xl font-bold mt-3">
            {attendance.length}
          </p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          HR Operations
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <Link
            to="/employees"
            className="bg-blue-600 text-white p-5 rounded-lg text-center text-lg font-semibold hover:bg-blue-700"
          >
            Manage Employees
          </Link>

          <Link
            to="/attendance"
            className="bg-green-600 text-white p-5 rounded-lg text-center text-lg font-semibold hover:bg-green-700"
          >
            Manage Attendance
          </Link>

        </div>

      </div>

      {/* HR Summary */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          HR Summary
        </h2>

        <div className="space-y-4 text-lg">

          <p>
            👥 Employees Registered :
            {" "}
            {employees.length}
          </p>

          <p>
            📅 Attendance Entries :
            {" "}
            {attendance.length}
          </p>

          <p>
            ✅ HR Department manages
            employee records and attendance.
          </p>

        </div>

      </div>

    </div>
  );
}

export default HRDashboard;