import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">ProductTrack Pro</h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-white text-blue-700 px-4 py-2 rounded"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-yellow-400 text-black px-4 py-2 rounded"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-6xl font-bold text-blue-700 mb-4">
          ProductTrack Pro
        </h1>

        <p className="text-xl text-gray-700">
          Smart Employee, Production & Sales Tracking System
        </p>

        <div className="mt-8">
          <Link
            to="/login"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg mr-4"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-4 gap-6 p-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg">Employee Tracking</h2>
          <p>Monitor employee attendance and activities.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg">Production Tracking</h2>
          <p>Track daily production targets and progress.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg">Inventory Management</h2>
          <p>Manage stock and inventory levels.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-bold text-lg">Sales Monitoring</h2>
          <p>Track orders and sales performance.</p>
        </div>
      </section>

    </div>
  );
}

export default Landing;