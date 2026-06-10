import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
      alert("Invalid Username or Password");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    if (user.role === "admin")
      navigate("/admin");

    if (user.role === "manager")
      navigate("/manager");

    if (user.role === "hr")
      navigate("/hr");

    if (user.role === "production")
      navigate("/production-dashboard");

    if (user.role === "inventory")
      navigate("/inventory-dashboard");

    if (user.role === "sales")
      navigate("/sales-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-4">

      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-700 to-indigo-900 text-white p-12">

          <h1 className="text-5xl font-bold mb-4">
            ProductTrack Pro
          </h1>

          <p className="text-lg mb-8">
            Smart Manufacturing & Workforce
            Management System
          </p>

          <div className="space-y-4 text-lg">
            <p>✅ Employee Tracking</p>
            <p>✅ Inventory Monitoring</p>
            <p>✅ Production Management</p>
            <p>✅ Sales Analytics</p>
            <p>✅ Real-Time Reports</p>
          </div>

        </div>

        {/* Right Side */}
        <div className="p-10 flex flex-col justify-center">

          <div className="text-center mb-8">

            <div className="w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">

              <span className="text-white text-3xl font-bold">
                PT
              </span>

            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to continue
            </p>

          </div>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
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
            className="text-blue-700 cursor-pointer mt-2 mb-4"
          >
            {showPassword
              ? "Hide Password"
              : "Show Password"}
          </p>

          <div className="flex justify-between items-center mb-6">

            <label className="flex items-center gap-2">

              <input type="checkbox" />

              Remember Me

            </label>

            <span className="text-blue-700 cursor-pointer">
              Forgot Password?
            </span>

          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-lg font-semibold"
          >
            Login
          </button>

          <p className="text-center mt-6 text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-700 font-semibold ml-2"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;