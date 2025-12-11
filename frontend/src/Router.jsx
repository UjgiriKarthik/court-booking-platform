// frontend/src/Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import CourtsPage from "./pages/CourtsPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CourtsAdminPage from "./pages/CourtsAdminPage";
import AdminDashboard from "./pages/AdminDashboard";
import EquipmentPage from "./pages/EquipmentPage";
import CoachesPage from "./pages/CoachesPage";
import NotFound from "./pages/NotFound";

import { AuthProvider } from "./context/AuthContext";
import useAuth from "./hooks/useAuth";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <LoginPage />;
}

// Wrapper to hide navbar
function LayoutWrapper({ children }) {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/signup"];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<CourtsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/coaches" element={<CoachesPage />} />

            {/* PROTECTED ROUTES */}
            <Route
              path="/courts"
              element={
                <PrivateRoute>
                  <CourtsAdminPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/booking/:courtId"
              element={
                <PrivateRoute>
                  <BookingPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            {/* NOT FOUND */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </AuthProvider>
  );
}
