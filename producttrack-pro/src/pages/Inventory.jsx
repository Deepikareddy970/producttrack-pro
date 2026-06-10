import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Inventory() {
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");

  const [items, setItems] = useState([]);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(
        "https://producttrack-backend-5wd3.onrender.com/api/inventory"
      );

      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async () => {
    if (
      !productName ||
      !category ||
      !quantity ||
      !supplier
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "https://producttrack-backend-5wd3.onrender.com/api/inventory",
        {
          productName,
          category,
          quantity,
          supplier,
        }
      );

      setProductName("");
      setCategory("");
      setQuantity("");
      setSupplier("");

      fetchInventory();

      alert("Inventory Item Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://producttrack-backend-5wd3.onrender.com/api/inventory/${id}`
      );

      fetchInventory();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    navigate("/login");
  };

  const totalStock = items.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 0),
    0
  );

  return (
    <div className="p-10 bg-slate-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Inventory Management
          </h1>

          <p className="text-gray-600 mt-2">
            Manage Products, Stock & Suppliers
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
          >
            Back
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

      {/* Add Inventory - Hidden for Manager */}
      {userRole !== "manager" && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

          <h2 className="text-2xl font-bold mb-5">
            Add Inventory Item
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) =>
                setProductName(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Supplier"
              value={supplier}
              onChange={(e) =>
                setSupplier(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

          </div>

          <button
            onClick={addItem}
            className="mt-5 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Add Item
          </button>

        </div>
      )}

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Products
          </h2>

          <p className="text-4xl font-bold mt-3">
            {items.length}
          </p>

        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Stock
          </h2>

          <p className="text-4xl font-bold mt-3">
            {totalStock}
          </p>

        </div>

      </div>

      {/* Inventory Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-5">
          Inventory Items
        </h2>

        <table className="w-full border">

          <thead>

            <tr className="bg-yellow-500 text-white">

              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Supplier</th>

              {userRole !== "manager" && (
                <th className="p-3">Action</th>
              )}

            </tr>

          </thead>

          <tbody>

            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    userRole === "manager" ? 4 : 5
                  }
                  className="text-center p-5"
                >
                  No Inventory Items Found
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item._id}
                  className="text-center border-b hover:bg-slate-100"
                >

                  <td className="p-3">
                    {item.productName}
                  </td>

                  <td className="p-3">
                    {item.category}
                  </td>

                  <td className="p-3">
                    {item.quantity}
                  </td>

                  <td className="p-3">
                    {item.supplier}
                  </td>

                  {userRole !== "manager" && (
                    <td className="p-3">

                      <button
                        onClick={() =>
                          deleteItem(item._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>

                    </td>
                  )}

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Inventory;