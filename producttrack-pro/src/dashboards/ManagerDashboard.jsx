function ManagerDashboard() {
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

  return (
    <div className="p-10 bg-slate-100 min-h-screen">

      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Manager Dashboard
      </h1>

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

      {/* Business Overview */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Business Overview
        </h2>

        <div className="space-y-4 text-lg">

          <p>
            👥 Total Employees : {employees.length}
          </p>

          <p>
            📅 Attendance Records : {attendance.length}
          </p>

          <p>
            📦 Inventory Items : {inventory.length}
          </p>

          <p>
            🏭 Production Records : {production.length}
          </p>

          <p>
            💰 Total Revenue : ₹{revenue}
          </p>

        </div>

      </div>

      {/* Department Status */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Department Status
        </h2>

        <div className="space-y-4">

          <div className="p-4 bg-blue-100 rounded-lg">
            HR Department Active
          </div>

          <div className="p-4 bg-green-100 rounded-lg">
            Inventory Department Active
          </div>

          <div className="p-4 bg-yellow-100 rounded-lg">
            Production Department Active
          </div>

          <div className="p-4 bg-red-100 rounded-lg">
            Sales Department Active
          </div>

        </div>

      </div>

      {/* Manager Note */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          Manager Access
        </h2>

        <p className="text-lg text-gray-700">
          Manager can monitor employees,
          attendance, inventory, production,
          sales and reports. Data modification
          is handled by the respective departments.
        </p>

      </div>

    </div>
  );
}

export default ManagerDashboard;