import { useState, useEffect } from "react";

function Inventory() {
  const [items, setItems] = useState([]);

  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const savedItems =
      JSON.parse(localStorage.getItem("inventory")) || [];

    setItems(savedItems);
  }, []);

  const addItem = () => {
    if (
      !itemName ||
      !category ||
      !supplier ||
      !quantity ||
      !price
    ) {
      alert("Please fill all fields");
      return;
    }

    const newItem = {
      id: "INV" + Date.now(),
      itemName,
      category,
      supplier,
      quantity: Number(quantity),
      price: Number(price),
      status:
        Number(quantity) < 20
          ? "Low Stock"
          : "Available",
    };

    const updatedItems = [
      ...items,
      newItem,
    ];

    setItems(updatedItems);

    localStorage.setItem(
      "inventory",
      JSON.stringify(updatedItems)
    );

    setItemName("");
    setCategory("");
    setSupplier("");
    setQuantity("");
    setPrice("");
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter(
      (item) => item.id !== id
    );

    setItems(updatedItems);

    localStorage.setItem(
      "inventory",
      JSON.stringify(updatedItems)
    );
  };

  const totalStock = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalValue = items.reduce(
    (sum, item) =>
      sum + item.quantity * item.price,
    0
  );

  return (
    <div className="p-10 bg-slate-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Inventory Management
      </h1>

      {/* Add Item Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

        <h2 className="text-2xl font-bold mb-5">
          Add Inventory Item
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) =>
              setItemName(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Supplier Name"
            value={supplier}
            onChange={(e) =>
              setSupplier(e.target.value)
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
            placeholder="Unit Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="border p-3 rounded"
          />

        </div>

        <button
          onClick={addItem}
          className="mt-5 bg-yellow-500 text-white px-6 py-3 rounded-lg"
        >
          Add Item
        </button>

      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Stock
          </h2>

          <p className="text-4xl font-bold mt-3">
            {totalStock}
          </p>

        </div>

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Inventory Value
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹{totalValue}
          </p>

        </div>

      </div>

      {/* Inventory Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-5">
          Inventory Records
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full border">

            <thead>
              <tr className="bg-yellow-500 text-white">

                <th className="p-3">ID</th>
                <th className="p-3">Item</th>
                <th className="p-3">Category</th>
                <th className="p-3">Supplier</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>

              </tr>
            </thead>

            <tbody>

              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center p-5"
                  >
                    No Inventory Found
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className="text-center border-b"
                  >

                    <td>{item.id}</td>
                    <td>{item.itemName}</td>
                    <td>{item.category}</td>
                    <td>{item.supplier}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price}</td>
                    <td>{item.status}</td>

                    <td>
                      <button
                        onClick={() =>
                          deleteItem(item.id)
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

export default Inventory;