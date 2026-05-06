import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import { useAuth } from "./contexts/AuthContext";
import { CssBaseline, Container, ThemeProvider, Box } from "@mui/material";
import Profile from "./pages/Profile";
import MedicineReminder from "./pages/MedicineReminder";
import HeroSection from "./components/HeroSection";
import theme from "./theme";

function PrivateRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

const App = () => {
  const { user } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Show Hero Section only when user is not logged in */}
        {!user && <HeroSection />}

        {/* Main Content */}
        <Container
          maxWidth={user ? "lg" : "md"}
          sx={{
            flex: 1,
            py: user ? 4 : 0,
            px: user ? 3 : 0,
          }}
        >
          <Routes>
            <Route path="/" element={user ? <Navigate to={user.role === 'patient' ? "/patient" : "/doctor"} replace /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/medicine-reminders" element={<MedicineReminder />} />
            <Route path="/prescriptions" element={<PrescriptionsPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />

            <Route
              path="/patient"
              element={
                <PrivateRoute role="patient">
                  <PatientDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/doctor"
              element={
                <PrivateRoute role="doctor">
                  <DoctorDashboard />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
