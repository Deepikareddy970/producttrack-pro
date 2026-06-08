
import { Link } from "react-router-dom";

function SalesDashboard() {
  const sales =
    JSON.parse(localStorage.getItem("sales")) || [];

  const revenue = sales.reduce(
    (sum, order) => sum + Number(order.amount || 0),
    0
  );

  return (
    <div className="p-10 bg-slate-100 min-h-screen">

      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Sales Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Orders
          </h2>

          <p className="text-4xl font-bold mt-3">
            {sales.length}
          </p>

        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹{revenue}
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
            🧾 Total Orders : {sales.length}
          </p>

          <p>
            💰 Total Revenue : ₹{revenue}
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

      {/* Recent Orders */}
      <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          Recent Orders
        </h2>

        {sales.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          <table className="w-full border">

            <thead>
              <tr className="bg-red-600 text-white">
                <th className="p-3">Customer</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>

            <tbody>
              {sales.slice(-5).map((order, index) => (
                <tr
                  key={index}
                  className="text-center border-b"
                >
                  <td className="p-3">
                    {order.customer}
                  </td>

                  <td className="p-3">
                    ₹{order.amount}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}

export default SalesDashboard;