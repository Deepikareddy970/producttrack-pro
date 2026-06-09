import { Link } from "react-router-dom";

function InventoryDashboard() {
  const inventory =
    JSON.parse(localStorage.getItem("inventory")) || [];

  const totalQuantity = inventory.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <div className="p-10 bg-slate-100 min-h-screen">

      <h1 className="text-4xl font-bold text-slate-800 mb-8">
        Inventory Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Inventory Items
          </h2>

          <p className="text-4xl font-bold mt-3">
            {inventory.length}
          </p>

        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Stock Quantity
          </h2>

          <p className="text-4xl font-bold mt-3">
            {totalQuantity}
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
            📦 Total Products :
            {" "}
            {inventory.length}
          </p>

          <p>
            🏪 Available Stock :
            {" "}
            {totalQuantity}
          </p>

          <p>
            ✅ Inventory Team manages stock,
            materials and warehouse records.
          </p>

        </div>

      </div>

    </div>
  );
}

export default InventoryDashboard;