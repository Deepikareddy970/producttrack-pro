import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Inventory from "./pages/Inventory";
import Production from "./pages/Production";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";

// Dashboards
import AdminDashboard from "./dashboards/AdminDashboard";
import ManagerDashboard from "./dashboards/ManagerDashboard";
import HRDashboard from "./dashboards/HRDashboard";
import ProductionDashboard from "./dashboards/ProductionDashboard";
import InventoryDashboard from "./dashboards/InventoryDashboard";
import SalesDashboard from "./dashboards/SalesDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/hr" element={<HRDashboard />} />
        <Route
          path="/production-dashboard"
          element={<ProductionDashboard />}
        />
        <Route
          path="/inventory-dashboard"
          element={<InventoryDashboard />}
        />
        <Route
          path="/sales-dashboard"
          element={<SalesDashboard />}
        />

        {/* Functional Pages */}
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/inventory-page" element={<Inventory />} />
        <Route path="/production-page" element={<Production />} />
        <Route path="/sales-page" element={<Sales />} />
        <Route path="/reports" element={<Reports />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;