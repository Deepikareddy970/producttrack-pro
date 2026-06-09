import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Production() {
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");

  const [production, setProduction] = useState([]);

  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("In Progress");

  useEffect(() => {
    fetchProduction();
  }, []);

  const fetchProduction = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/production"
      );

      setProduction(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduction = async () => {
    if (!productName || !quantity) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/api/production",
        {
          productName,
          quantity,
          status,
          date: new Date().toLocaleDateString(),
        }
      );

      setProductName("");
      setQuantity("");
      setStatus("In Progress");

      fetchProduction();

      alert("Production Record Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/production/${id}`
      );

      fetchProduction();
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

  const completedCount = production.filter(
    (item) => item.status === "Completed"
  ).length;

  const totalUnits = production.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 0),
    0
  );

  return (
    <div className="p-10 bg-slate-100 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Production Management
          </h1>

          <p className="text-gray-600 mt-2">
            Track Production Records & Output
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

      {userRole !== "manager" && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

          <h2 className="text-2xl font-bold mb-5">
            Add Production Record
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

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
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="border p-3 rounded-lg"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="border p-3 rounded-lg"
            >
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>

          <button
            onClick={addProduction}
            className="mt-5 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Add Record
          </button>

        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Records
          </h2>

          <p className="text-4xl font-bold mt-3">
            {production.length}
          </p>

        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Completed Records
          </h2>

          <p className="text-4xl font-bold mt-3">
            {completedCount}
          </p>

        </div>

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Units Produced
          </h2>

          <p className="text-4xl font-bold mt-3">
            {totalUnits}
          </p>

        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-5">
          Production Records
        </h2>

        <table className="w-full border">

          <thead>

            <tr className="bg-purple-600 text-white">

              <th className="p-3">Product</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>

              {userRole !== "manager" && (
                <th className="p-3">Action</th>
              )}

            </tr>

          </thead>

          <tbody>

            {production.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    userRole === "manager" ? 4 : 5
                  }
                  className="text-center p-5"
                >
                  No Production Records Found
                </td>
              </tr>
            ) : (
              production.map((item) => (
                <tr
                  key={item._id}
                  className="text-center border-b hover:bg-slate-100"
                >

                  <td className="p-3">
                    {item.productName}
                  </td>

                  <td className="p-3">
                    {item.quantity}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        item.status === "Completed"
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td className="p-3">
                    {item.date}
                  </td>

                  {userRole !== "manager" && (
                    <td className="p-3">

                      <button
                        onClick={() =>
                          deleteRecord(item._id)
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

export default Production;