import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Avatar,
  IconButton,
  Menu,
  Tooltip,
  Alert,
  Chip,
} from "@mui/material";
import {
  ArrowBack,
  CalendarToday,
  Schedule,
  Person,
  EventAvailable,
  EventBusy,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NetworkConstants from "../constants/NetworkConstants";
import { useAuth } from "../contexts/AuthContext";

const AppointmentsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Profile menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const goToProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("mediconnectToken");
      const endpoint = user?.role === "doctor"
        ? `${NetworkConstants.BASE_URL}/api/doctors/appointments`
        : `${NetworkConstants.BASE_URL}/api/patients/appointments`;
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      case 'completed':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <EventAvailable />;
      case 'pending':
        return <Schedule />;
      case 'cancelled':
        return <EventBusy />;
      case 'completed':
        return <EventAvailable />;
      default:
        return <Schedule />;
    }
  };

  return (
    <Box sx={{ position: "relative", p: 2 }}>
      {/* Top right corner avatar with dropdown */}
      <Box sx={{ position: "absolute", right: 16, top: 16, display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleMenuOpen}
            size="large"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{
              width: 56,
              height: 56,
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              border: '2px solid #2563eb',
              '&:hover': {
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <Avatar
              sx={{
                width: 48,
                height: 48,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                backgroundColor: '#2563eb',
                color: 'white'
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              mt: 1.5,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={goToProfile}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={() => navigate("/")}>
            <Avatar /> Dashboard
          </MenuItem>
          <MenuItem onClick={() => navigate("/prescriptions")}>
            <Avatar /> Prescriptions
          </MenuItem>
          <MenuItem onClick={() => navigate("/medicine-reminders")}>
            <Avatar /> Medicine Reminders
          </MenuItem>
        </Menu>
      </Box>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/")}
          sx={{ mr: 2 }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4">
          Your Appointments
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Typography>Loading appointments...</Typography>
      )}

      {/* Appointments List */}
      {!loading && appointments.length === 0 && (
        <Typography>No appointments found.</Typography>
      )}

      {!loading && appointments.length > 0 && (
        <List>
          {appointments.map((appt) => (
            <Paper key={appt._id} sx={{ mb: 2, p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CalendarToday sx={{ mr: 1, color: '#10b981' }} />
                <Typography variant="h6" fontWeight="bold">
                  Appointment #{appt._id.slice(-8)}
                </Typography>
                <Chip
                  label={appt.status}
                  color={getStatusColor(appt.status)}
                  icon={getStatusIcon(appt.status)}
                  sx={{ ml: 2 }}
                />
              </Box>

              <Typography variant="body1" gutterBottom>
                <strong>Date:</strong> {new Date(appt.appointmentDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Time:</strong> {appt.timeSlot}
              </Typography>

              {appt.doctorId && (
                <Typography variant="body1" gutterBottom>
                  <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                  <strong>Doctor:</strong> {appt.doctorId.name} ({appt.doctorId.speciality})
                </Typography>
              )}

              {appt.notes && (
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                  <strong>Notes:</strong> {appt.notes}
                </Typography>
              )}
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AppointmentsPage;
