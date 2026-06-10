import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

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

        {/* Protected Dashboards */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRole="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hr"
          element={
            <ProtectedRoute allowedRole="hr">
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/production-dashboard"
          element={
            <ProtectedRoute allowedRole="production">
              <ProductionDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory-dashboard"
          element={
            <ProtectedRoute allowedRole="inventory">
              <InventoryDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales-dashboard"
          element={
            <ProtectedRoute allowedRole="sales">
              <SalesDashboard />
            </ProtectedRoute>
          }
        />

        {/* Functional Pages */}

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory-page"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/production-page"
          element={
            <ProtectedRoute>
              <Production />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales-page"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;