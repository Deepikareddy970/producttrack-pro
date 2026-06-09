import { Link, useNavigate } from "react-router-dom";

function HRDashboard() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("currentUser")) || {};

  const employees =
    JSON.parse(localStorage.getItem("employees")) || [];

  const attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-10 bg-slate-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            HR Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome, {user.username || "HR"}
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
            ✅ HR Department manages employee records and attendance.
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
                    key={employee.id}
                    className="text-center border-b"
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

    </div>
  );
}

export default HRDashboard;