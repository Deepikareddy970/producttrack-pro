import { useState, useEffect } from "react";

function Sales() {
  const [orders, setOrders] = useState([]);

  const [customer, setCustomer] = useState("");
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("sales")) || [];

    setOrders(savedOrders);
  }, []);

  const addOrder = () => {
    if (
      !customer ||
      !shopName ||
      !location ||
      !product ||
      !quantity ||
      !amount
    ) {
      alert("Please fill all fields");
      return;
    }

    const newOrder = {
      id: "ORD" + Date.now(),
      customer,
      shopName,
      location,
      product,
      quantity,
      amount: Number(amount),
      status,
      date: new Date().toLocaleDateString(),
    };

    const updatedOrders = [
      ...orders,
      newOrder,
    ];

    setOrders(updatedOrders);

    localStorage.setItem(
      "sales",
      JSON.stringify(updatedOrders)
    );

    setCustomer("");
    setShopName("");
    setLocation("");
    setProduct("");
    setQuantity("");
    setAmount("");
    setStatus("Pending");
  };

  const deleteOrder = (id) => {
    const updatedOrders = orders.filter(
      (order) => order.id !== id
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "sales",
      JSON.stringify(updatedOrders)
    );
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.amount),
    0
  );

  return (
    <div className="p-10 bg-slate-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Sales Management
      </h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

        <h2 className="text-2xl font-bold mb-5">
          Create Order
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Customer Name"
            value={customer}
            onChange={(e) =>
              setCustomer(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Shop Name"
            value={shopName}
            onChange={(e) =>
              setShopName(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Shop Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Product"
            value={product}
            onChange={(e) =>
              setProduct(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="border p-3 rounded"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="border p-3 rounded"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Delivered</option>
          </select>

        </div>

        <button
          onClick={addOrder}
          className="mt-5 bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          Add Order
        </button>

      </div>

      {/* Revenue */}
      <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg mb-8">

        <h2 className="text-2xl font-bold">
          Total Revenue
        </h2>

        <p className="text-4xl font-bold mt-2">
          ₹{totalRevenue}
        </p>

      </div>

      {/* Orders Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-5">
          Orders List
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full border">

            <thead>
              <tr className="bg-red-600 text-white">

                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Shop</th>
                <th className="p-3">Location</th>
                <th className="p-3">Product</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>

              </tr>
            </thead>

            <tbody>

              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center p-5"
                  >
                    No Orders Found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b text-center"
                  >

                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.shopName}</td>
                    <td>{order.location}</td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>₹{order.amount}</td>
                    <td>{order.status}</td>
                    <td>{order.date}</td>

                    <td>
                      <button
                        onClick={() =>
                          deleteOrder(order.id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Sales;