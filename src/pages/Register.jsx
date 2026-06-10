import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {

      console.log(error);

      alert(
      error.response?.data?.message ||
      error.message ||
      "Registration Failed"
    );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-4">

      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-green-600 to-emerald-800 text-white p-12">

          <h1 className="text-5xl font-bold mb-4">
            ProductTrack Pro
          </h1>

          <p className="text-lg mb-8">
            Smart Manufacturing & Workforce
            Management System
          </p>

          <div className="space-y-4 text-lg">
            <p>✅ Employee Management</p>
            <p>✅ Attendance Tracking</p>
            <p>✅ Inventory Control</p>
            <p>✅ Production Monitoring</p>
            <p>✅ Sales & Reports</p>
          </div>

        </div>

        <div className="p-10 flex flex-col justify-center">

          <div className="text-center mb-8">

            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">

              <span className="text-white text-3xl font-bold">
                PT
              </span>

            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Join ProductTrack Pro
            </p>

          </div>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border border-gray-300 p-3 rounded-lg mb-4"
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <p
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="text-green-600 cursor-pointer mt-2 mb-4"
          >
            {showPassword
              ? "Hide Password"
              : "Show Password"}
          </p>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full border border-gray-300 p-3 rounded-lg mb-6"
          >
            <option value="">
              Select Role
            </option>

            <option value="admin">
              Admin
            </option>

            <option value="manager">
              Manager
            </option>

            <option value="hr">
              HR
            </option>

            <option value="production">
              Production
            </option>

            <option value="inventory">
              Inventory
            </option>

            <option value="sales">
              Sales
            </option>
          </select>

          <button
            onClick={handleRegister}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold"
          >
            Create Account
          </button>

          <p className="text-center mt-6 text-gray-600">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-700 font-semibold ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;