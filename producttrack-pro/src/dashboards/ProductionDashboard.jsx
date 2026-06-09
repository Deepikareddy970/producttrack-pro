import { Link } from "react-router-dom";

function ProductionDashboard() {
  const production =
    JSON.parse(localStorage.getItem("production")) || [];

  const totalProduced = production.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <div className="p-10 bg-slate-100 min-h-screen">

      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Production Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Production Records
          </h2>

          <p className="text-4xl font-bold mt-3">
            {production.length}
          </p>

        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Production
          </h2>

          <p className="text-4xl font-bold mt-3">
            {totalProduced}
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
            {production.length}
          </p>

          <p>
            📦 Units Produced :
            {" "}
            {totalProduced}
          </p>

          <p>
            ✅ Production Team manages
            manufacturing and output tracking.
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